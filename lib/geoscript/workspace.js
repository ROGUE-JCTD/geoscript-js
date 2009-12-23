
var util = require("geoscript/util");
util.createRegistry(exports);

exports.Workspace = require("./workspace/workspace").Workspace;
exports.MemoryWorkspace = require("./workspace/memory").MemoryWorkspace;
exports.DirectoryWorkspace = require("./workspace/directory").DirectoryWorkspace;

exports.memory = new exports.MemoryWorkspace();