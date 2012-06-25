var GEOM		= require("../lib/geoscript/geom");

print("Point - X: 0, Y: 0"); //http://geoscript.org/js/api/geom/point.html
var Point = new GEOM.Point([0, 0]);	//Create a new point at the coordinates [X, Y].

print("==========================");
print(" - [Number] Point.x: " + Point.x); //The first coordinate value.
print(" - [Number] Point.y: " + Point.y); //The second coordinate value.
print(" - [geom.bounds] Point.bounds: " + Point.bounds); //The bounds defined by minimum and maximum x and y values in this geometry.

print("PointBuffer - bufferDistance: 10");
//Point.buffer(dist,options)
// - dist: Width of buffer. May be positive, negative, or zero.
// - options: Options for the buffer operation.
//    - geom.BUFFER_CAP_BUTT: Used to calculate butt caps for buffer operations.
//    - geom.BUFFER_CAP_ROUND: Used to calculate round caps for buffer operations.
//    - geom.BUFFER_CAP_SQUARE: Used to calculate square caps for buffer operations.
var bufferDistance = 10;
var bufferOptions = {segs: 8, caps: GEOM.BUFFER_CAP_ROUND, single: false };
var PointBuffer = Point.buffer(bufferDistance, bufferOptions);

print("==========================");
print(" - [Number] PointBuffer.x: " + PointBuffer.x); //The first coordinate value.
print(" - [Number] PointBuffer.y: " + PointBuffer.y); //The second coordinate value.
print(" - [geom.bounds] PointBuffer.bounds: " + PointBuffer.bounds); //The bounds defined by minimum and maximum x and y values in this geometry.

print("PointBuffer - bufferDistance: 5");
bufferDistance = 5;
PointBuffer = Point.buffer(bufferDistance, bufferOptions);

print("==========================");
print(" - [Number] PointBuffer.x: " + PointBuffer.x); //The first coordinate value.
print(" - [Number] PointBuffer.y: " + PointBuffer.y); //The second coordinate value.
print(" - [geom.bounds] PointBuffer.bounds: " + PointBuffer.bounds); //The bounds defined by minimum and maximum x and y values in this geometry.