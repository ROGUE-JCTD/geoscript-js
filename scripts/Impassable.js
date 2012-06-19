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

var PostGIS_Database= new WORKSPACE.PostGIS({database: "GeoScript_Test", host: "192.168.10.140", password: "p0stGISAdm!n", port: "5432", schema: "public", user: "postgres"});
print(PostGIS_Database);

var TestLayer = PostGIS_Database.get("TestLayer");
//print(Elevation.bounds);
//print(Elevation.count);

//TestLayer.features.forEach(function(feature) {
//	print(feature.toString());
//	VIEWER.draw(feature);
//});

//var rect = new FEATURE.Feature({
//	values: {
//		geom: new GEOM.Polygon([
//			[ [-90, -45], [-90, 45], [90, 45], [90, -45], [-90, -45] ]
//		]),
//		name: "Rectangle"
//	}
//});
//VIEWER.draw(rect);
//var RectLayer = PostGIS_Database.get("Rectangle");
//RectLayer.add(rect);

//print("Rect.bounds: " + rect.bounds);

//var Point = new GEOM.Point([0, 0]);	//Create a new point at the coordinates [X, Y].
var bufferDistance = 3;
var bufferOptions = {segs: 8, caps: GEOM.BUFFER_CAP_ROUND, single: false };
//var PointBuffer = Point.buffer(bufferDistance, bufferOptions);
//VIEWER.draw(PointBuffer);

var point = new FEATURE.Feature({
	values: {
		geom: new GEOM.Point([-3, -3]).buffer(bufferDistance, bufferOptions),
		name: "Point"
	}
});
var PointLayer = PostGIS_Database.get("Circle");
PointLayer.add(point);

//TestLayer.query("INTERSECTS(geom, POINT(0 0))").forEach(function(feature) {
//	print(feature.toString());
//});

//TestLayer.query("SELECT *").forEach(function(feature) {
//	print(feature.toString());
//});

//TestLayer.update();

//TestLayer.query("name = 'Metropolis'").forEach(function(feature) {
//	print(feature.toString());
//});

//var layer = new LAYER.Layer({name: "Rectangle"});
//print("layer.name: " + layer.name);
//PostGIS_Database.add(layer);

//VIEWER.draw(PointLayer);

PostGIS_Database.close(); //close the connection when we are done.
print("PostGIS Workspace Closed.");

//var Map = new MAP.Map();
//Map.add(Elevation);
//Map.render();