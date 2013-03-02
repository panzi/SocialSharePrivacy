var fs = require('fs');
var extend = require('extend');

var jQuery = {
	fn: {socialSharePrivacy: {settings: {services: {}}}},
	extend: extend
};

for (var i = 2; i < process.argv.length; ++ i) {
	var filename = process.argv[i];
	var service = /jquery\.socialshareprivacy(?:\.(.*))?\.js$/.exec(filename)[1];

	if (service) {
		jQuery.fn.socialSharePrivacy.settings.services[service] = {};
	}

	eval(fs.readFileSync(filename,'utf8'));
}

var script = 'jQuery.extend(true,jQuery.fn.socialSharePrivacy.settings,'+
	JSON.stringify(jQuery.fn.socialSharePrivacy.settings)+');\n';

process.stdout.write(script,"utf8");
