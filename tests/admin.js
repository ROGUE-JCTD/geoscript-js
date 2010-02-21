var zip = require("zip");
var file = require("file");

var path = function(rel) {
    return file.absolute(file.resolve(module.path, rel));
}

var meta = {
    shp: {
        source: path("data/states.shp.zip"),
        dest: path("tmp/shp"),
        setup: function() {
            meta.shp.teardown();
            zip.unzip(meta.shp.source, meta.shp.dest);
        },
        teardown: function() {
            if (file.exists(meta.shp.dest)) {
                file.rmtree(meta.shp.dest);                
            }
        }
    },
    h2: {
        source: path("data/h2.zip"),
        dest: path("tmp/h2"),
        setup: function() {
            meta.h2.teardown();
            zip.unzip(meta.h2.source, meta.h2.dest);
        },
        teardown: function() {
            if (file.exists(meta.h2.dest)) {
                Packages.org.h2.tools.DeleteDbFiles.execute(meta.h2.dest, "geoscript", true);
                file.rmtree(meta.h2.dest);
            }
        }
    },
    pg: {
        driver: new Packages.org.postgresql.Driver,
        setup: function() {
            var uri = "jdbc:postgresql:geoscript";
            var params = new java.util.Properties();
            params.setProperty("user", "postgres");
            params.setProperty("password", "postgres");
            var connection = meta.pg.driver.getConnection(uri, params);
        }
    }
};

for (var key in meta) {
    exports[key] = meta[key];
}
