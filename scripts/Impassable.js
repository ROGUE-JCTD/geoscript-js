var GEOM		= require("../lib/geoscript/geom");
var FEATURE		= require("../lib/geoscript/feature");
var FILTER		= require("../lib/geoscript/filter");
var PROJ		= require("../lib/geoscript/proj");
var LAYER		= require("../lib/geoscript/layer");
var WORKSPACE	= require("../lib/geoscript/workspace");
var VIEWER		= require("../lib/geoscript/viewer");
var STYLE		= require("../lib/geoscript/style");
var MAP			= require("../lib/geoscript/map");

print("Opening PostGIS Workspace..."); //http://geoscript.org/js/api/workspace.html

var PostGIS_Database= new WORKSPACE.PostGIS({database: "PGDatabase", host: "localhost", password: "geoscript", port: "54321", schema: "public", user: "geoscript"});
print(PostGIS_Database);

var PGLayer = PostGIS_Database.get("Temp");
//print(Elevation.bounds);
//print(Elevation.count);

//PGLayer.add(new FEATURE.Feature({
//	values: {
//		geom: new GEOM.Point([-110, 45]),
//		name: "Metropolis"
//	}
//}));

//TestLayer.update();

//var layer = new LAYER.Layer({name: "Temp"});
//print("layer.name: " + layer.name);
//PostGIS_Database.add(layer, {name: "Temp"});

VIEWER.draw(PGLayer);

PostGIS_Database.close(); //close the connection when we are done.
print("PostGIS Workspace Closed.");

//var Map = new MAP.Map();
//Map.add(Elevation);
//Map.render();