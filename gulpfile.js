const gulp = require('gulp');
const fs = require("fs");

gulp.task("prepare.colors", function(cb) {

    var vars = fs.readFileSync("_vars.json");
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

    var vars = fs.readFileSync("_vars.json");
    vars = JSON.parse(vars);
    var name,
        prop,
        fonts = {},
        style,
        val;

    for (name in vars.props) {
        prop = vars.props[name];
        if (prop.type != "font") {
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

    var vars = fs.readFileSync("_vars.json");
    vars = JSON.parse(vars);
    var name,
        prop,
        layers = {},
        style,
        shadow, border,
        val;

    for (name in vars.props) {
        prop = vars.props[name];
        if (prop.type != "layer") {
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


