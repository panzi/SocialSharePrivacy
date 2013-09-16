var fs = require('fs');
var restler = require('restler');
var FACEBOOK_FILE = "javascripts/modules/facebook.js";

restler.get("https://www.facebook.com/translations/FacebookLocales.xml").on('complete', function (res) {
	if (res instanceof Error) {
		console.error(res.message);
		process.exit(1);
	}
	else {
		var locales = {};

		// convert locales
		res.locales.locale.forEach(function (locale) {
			locale.codes.forEach(function (codes) {
				codes.code.forEach(function (code) {
					code.standard.forEach(function (standard) {
						standard.representation.forEach(function (representation) {
							var parts  = representation.split(/_/g);
							var lang   = parts[0];
							var locale = parts[1];
							var lang_locales;

							if (lang in locales) {
								lang_locales = locales[lang];
							}
							else {
								lang_locales = locales[lang] = [];
							}
							lang_locales.push(locale);
						});
					});
				});
			});
		});

		// normalize locales
		for (var lang in locales) {
			locales[lang].sort();
		}

		fs.readFile(FACEBOOK_FILE, "utf8", function (err, data) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			else {
				data = data.replace(/^[ \t]*var\s+locales\s*=\s*.*;$/m, '\tvar locales = '+JSON.stringify(locales)+';');
				fs.writeFile(FACEBOOK_FILE, data, "utf8", function (err) {
					if (err) {
						console.error(err);
						process.exit(1);
					}
					else {
						console.log("updated "+FACEBOOK_FILE);
					}
				});
			}
		});
	}
});
