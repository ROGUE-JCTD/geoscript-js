var json = require("json");
var geom = require("geoscript/geom");
var proj = require("geoscript/proj");
var geotools = Packages.org.geotools;
var jts = Packages.com.vividsolutions.jts;
var GeometryDescriptor = Packages.org.opengis.feature.type.GeometryDescriptor;
var SimpleFeatureBuilder = geotools.feature.simple.SimpleFeatureBuilder;
var SimpleFeatureTypeBuilder = geotools.feature.simple.SimpleFeatureTypeBuilder;
var crs = geotools.referencing.CRS;
var NameImpl = geotools.feature.NameImpl;
var CoordinateReferenceSystem = Packages.org.opengis.referencing.crs.CoordinateReferenceSystem;

var types = {};

// map type names to java types
var javaTypeNames = ["String", "Integer", "Short", "Float", "Long", "Double"];
javaTypeNames.forEach(function(str) {
    var type = java.lang[str];
    types[str] = type;
    types[type] = type;
});
// map type names to jts geometry types
var jtsTypeNames = ["Geometry", "Point", "LineString", "Polygon", "MultiPoint", "MultiLineString", "MultiPolygon"];
jtsTypeNames.forEach(function(str) {
    var type = jts.geom[str];
    types[str] = type;
    types[type] = type;
});

var getTypeName = function(type) {
    var name;
    for (var str in types) {
        if (types[str] === type) {
            name = str;
            break;
        };
    }
    return str;
};

var FeatureType = function(config) {
    config = config || {};
    config.name = config.name || "feature";
    this._ft = config.ft;
    if (config.atts) {
        // generate gt feature type from attributes
        var tb = new SimpleFeatureTypeBuilder();
        tb.setName(new NameImpl(config.name));
        config.atts.forEach(function(att) {
            var name = att[0],
                typeName = att[1];
            if (geom[typeName]) {
                if (att.length > 2) {
                    var xrs = att[2];
                    if (xrs instanceof CoordinateReferenceSystem) {
                        tb.crs(xrs);
                    } else {
                        tb.srs(xrs);
                    }
                }
            }
            tb.add(name, types[typeName]);
        });
        this._ft = tb.buildFeatureType();
    }
    this.name = this._ft.name.localPart;

    // geom property
    var gd = this._ft.geometryDescriptor;
    if (gd) {
        this.geom = [
            gd.localName,
            getTypeName(gd.type.binding)
        ];
        if (gd.coordinateReferenceSystem) {
            this.geom[2] = gd.coordinateReferenceSystem;
        }
    }
    
    // atts property
    this.atts = this._ft.attributeDescriptors.toArray().map(function(ad) {
        return [ad.localName, getTypeName(ad.type.binding)];
    });
    
    // attNames property
    this.attNames = this._ft.attributeDescriptors.toArray().map(function(ad) {
        return ad.localName;
    });

};

FeatureType.prototype = {
    feature: function(atts, id) {
        return new Feture({
            ftype: this,
            atts: atts,
            id: id
        });
    }
};

FeatureType.fromGT = function(ft) {
    return new FeatureType({ft: ft});
};


var Feature = function(config) {
    config = config || {};
    
    this.id = config.id;
    if (!config.id) {
        // TODO: generate a unique id
    }
    
    if (config.ftype) {
        this.ftype = config.ftype;
    } else {
        // TODO: generate feature type from attributes
    }
    
    if (config.feature) {
        this._feature = config.feature;
        if (this.ftype) {
            for (var name in this.ftype.atts) {
                if (ftype.geom && name === ftype.geom.name) {
                    this.geom = this._feature.getAttribute(name);
                } else {
                    this.atts[name] = this._feature.getAttribute(name);
                }
            }
        }
    }

    this.atts = {};
    for (var name in config.atts) {
        this.atts[name] = config.atts[name];
    }

    this.geom = config.geom;

};

Feature.prototype = {
    
    toString: function() {
        return json.encode(this.atts) + "; " + this.geom;
    },
    
    set: function(name, value) {
        this.atts[name] = value;
    },
    
    get: function(name) {
        return this.atts[name];
    },
    
    _sync: function() {
        if (!this._feature) {
            var builder = new SimpleFeatureBuilder(this.ftype._ft);
            this._feature = builder.buildFeature(null, []);
        }
        for (var name in this.atts) {
            this._feature.setAttribute(name, this.atts[name]);
        }
        if (this.geom) {
            this._feature.setDefaultGeometry(this.geom);
        }
    }
    
};

exports.FeatureType = FeatureType;
exports.Feature = Feature;