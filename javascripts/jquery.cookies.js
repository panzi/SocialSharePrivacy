"use strict";

(function ($,undefined) {
	function get (name) {
		var cookies = {};
		if (document.cookie) {
			var values = document.cookie.split(/; */g);
			for (var i = 0; i < values.length; ++ i) {
				var value = values[i];
				var pos = value.search("=");
				var key, value;
				
				if (pos < 0) {
					key   = decodeURIComponent(value);
					value = undefined;
				}
				else {
					key   = decodeURIComponent(value.slice(0,pos));
					value = decodeURIComponent(value.slice(pos+1));
				}

				cookies[key] = value;
			}
		}

		if (name === undefined) {
			return cookies;
		}
		else {
			return cookies[name];
		}
	}
	
	function set (name, value, expires, path, domain, secure) {
		switch (arguments.length) {
			case 1:
				for (var key in name) {
					set(key, name[key]);
				}
				return;

			case 2:
				if (value && typeof(value) === "object") {
					expires = value.expires;
					path    = value.path;
					domain  = value.domain;
					secure  = value.secure;
					value   = value.value;
				}
		}

		if (value === null || value === undefined) {
			expires = -1;
		}

		var buf = [encodeURIComponent(name)+'='+encodeURIComponent(value)];
		switch (typeof(expires)) {
			case "string":
				expires = new Date(expires);

			case "object":
				buf.push("expires="+expires.toUTCString());
				break;

			case "boolean":
				if (expires) {
					break;
				}
				expires = 365*2000;

			case "number":
				var date = new Date();
				date.setTime(date.getTime()+(1000*60*60*24*expires));
				buf.push("expires="+date.toUTCString());
				break;
		}

		if (path === true) {
			buf.push("path="+document.location.pathname);
		}
		else if (path !== undefined && path !== false) {
			buf.push("path="+path.replace(/[;\s]/g,encodeURIComponent));
		}

		if (domain === true) {
			buf.push("domain="+document.location.host);
		}
		else if (domain !== undefined && domain !== false) {
			buf.push("domain="+domain.replace(/[;\s]/g,encodeURIComponent));
		}

		if (secure) {
			buf.push("secure");
		}

		document.cookie = buf.join("; ");
	}

	$.cookie = function () {
		switch (arguments.length) {
			case 0:
				return get();
			case 1:
				if (typeof(arguments[0]) !== "object") {
					return get(arguments[0]);
				}
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
				set.apply(this,arguments);
				return this;

			default:
				throw new Error("Illegal number of arguments");
		}
	};
})(jQuery);
