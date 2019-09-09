const gulp = require('gulp');
const fs = require("fs-extra");
const request = require("request");
const gulpSequence = require('gulp-sequence');
const cp = require("child_process");
const path = require("path");


gulp.task("prepare.colors", function(cb) {

    var vars = fs.readFileSync("lucid/_ds.json");
    vars = JSON.parse(vars);
    var name,
        prop,
        colors = {};

    for (name in vars.props) {
        prop = vars.props[name];
        if (prop.type != "color") {
            continue;
        }

        name = name.replace(/-./g, function(match) {
            return match.charAt(1).toUpperCase();
        });
        colors[name] = prop.value;
    }

    colors = "export default " + JSON.stringify(colors, null, ' ');

    fs.writeFileSync("MobileApp/LucidColors.js", colors);

    cb();
});


gulp.task("prepare.fonts", function(cb) {

    var vars = fs.readFileSync("lucid/_ds.json");
    vars = JSON.parse(vars);
    var name,
        prop,
        fonts = {},
        style,
        val;

    for (name in vars.props) {
        prop = vars.props[name];
        if (prop.type != "text-style") {
            continue;
        }

        name = name.replace(/-./g, function(match) {
            return match.charAt(1).toUpperCase();
        });

        style = {};
        val = prop.value;

        if ('size' in val) {
            style.fontSize = parseInt(val.size);
        }
        if ('weight' in val) {
            style.fontWeight = ""+val.weight;
        }
        else style.fontWeight = "400";

        if ('family' in val) {
            style.fontFamily = val.family;
        }

        fonts[name] = style;
    }

    fonts = "export default " + JSON.stringify(fonts, null, ' ');

    fs.writeFileSync("MobileApp/LucidFonts.js", fonts);

    cb();
});



gulp.task("prepare.layers", function(cb) {

    var vars = fs.readFileSync("lucid/_ds.json");
    vars = JSON.parse(vars);
    var name,
        prop,
        layers = {},
        style,
        shadow, border,
        val;

    for (name in vars.props) {
        prop = vars.props[name];
        if (prop.type != "layer-style") {
            continue;
        }

        name = name.replace(/-./g, function(match) {
            return match.charAt(1).toUpperCase();
        });

        style = {};
        val = prop.value;
        shadow = val.shadow;
        border = val.border;

        if ('backgroundColor' in val) {
            style.backgroundColor = val.backgroundColor;
        }

        if (shadow) {
            if ('color' in shadow) {
                style.shadowColor = shadow.color;
            }
            if ('x' in shadow || 'y' in shadow) {
                style.shadowOffset = {
                    width: parseInt(shadow.x) || 0,
                    height: parseInt(shadow.y) || 0
                }
            }
            if ('blur' in shadow) {
                style.shadowRadius = parseInt(shadow.blur);
            }
        }

        if (border) {
            if ('width' in border && border.width) {
                style.borderWidth = parseInt(border.width);
            }
            if ('radius' in border && border.radius) {
                style.borderRadius = border.radius;
            }
            if ('color' in border) {
                style.borderColor = border.color;
            }
        }

        layers[name] = style;
    }

    layers = "export default " + JSON.stringify(layers, null, ' ');

    fs.writeFileSync("MobileApp/LucidLayers.js", layers);

    cb();
});


gulp.task("fetch.fonts", function(cb) {
    //request("http://new.lucid.style/api/export/json?export_key=5462fe008290e5d6febaa7779d18632f", {json: true}, function(error, response, body) {
        //var data = JSON.parse(body.data[0].code),
    var vars = fs.readFileSync("lucid/_ds.json");
        vars = JSON.parse(vars);
        fonts = vars.fonts,
        i, l, f,
        name, url, ext, filename,
        runLink = false,
        cnt = 0,
        fontsDir = "./MobileApp/assets/fonts";

    fs.ensureDirSync(fontsDir);
    fs.writeFileSync("./" + body.data[0].name, body.data[0].code);

    var reactLink = function() {
        cp.exec(
            "react-native link",
            {
                cwd: __dirname + "/MobileApp"
            },
            function(err, stdout, stderr) {
                runLink = false;
                if (err) {
                    console.log(err);
                }
                done();
            }
        )
    };

    var done = function() {
        if (cnt === 0) {
            if (runLink === false) {
                cb();
            }
            else {
                reactLink();
            }
        }
    };

    for (i = 0, l = fonts.length; i < l; i++) {
        f = fonts[i];
        name = f.family;
        url = f.url;
        ext = url.split(".").pop();
        filename = name + "." + ext;
        runLink = true;

        if (!fs.existsSync(fontsDir + "/" + filename)) {
            cnt++;
            request(url, {encoding: null}, function(error, response, body){
                fs.writeFileSync(fontsDir + "/" + filename, body);
                cnt--;
                done();
            });
        }
    }

    done();
    
});


gulp.task("fetch.css", function(cb){
    request("http://new.lucid.style/api/export/css?export_key=5462fe008290e5d6febaa7779d18632f", {json: true}, function(error, response, body) {
        var files = body.data,
            i, l;

        for (i = 0, l = files.length; i < l; i++) {
            fs.writeFileSync("./" + files[i].name, files[i].code);
        }

        cb();
    });
});

gulp.task("prepare", gulp.series("prepare.colors", "prepare.fonts", "prepare.layers"));
