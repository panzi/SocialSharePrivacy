"use strict";

(function ($,undefined) {
	function decode (s) {
		try {
			return decodeURIComponent(s);
		}
		catch (e) {
			try {
				return unescape(s);
			}
			catch (e2) {
				return s;
			}
		}
	}

	function get () {
		var cookies = {};
		if (document.cookie) {
			var values = document.cookie.split(/; */g);
			for (var i = 0; i < values.length; ++ i) {
				var value = values[i];
				var pos = value.search("=");
				var key, value;
				
				if (pos < 0) {
					key   = decode(value);
					value = undefined;
				}
				else {
					key   = decode(value.slice(0,pos));
					value = decode(value.slice(pos+1));
				}

				cookies[key] = value;
			}
		}

		return cookies;
	}
	
	function set (name, value, expires, path, domain, secure) {
		switch (arguments.length) {
			case 1:
				for (var key in name) {
					set(key, name[key]);
				}
				return;

			case 2:
				if (typeof(value) === "object") {
					expires = value.expires;
					path    = value.path;
					domain  = value.domain;
					secure  = value.secure;
					value   = value.value;
				}

			case 3:
				if (typeof(expires) === "object" && !(expires instanceof Date)) {
					path    = expires.path;
					domain  = expires.domain;
					secure  = expires.secure;
					expires = expires.expires;
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
				date.setDate(date.getDate()+expires);
				buf.push("expires="+date.toUTCString());
				break;
		}

		if (path === true) {
			buf.push("path="+document.location.pathname);
		}
		else if (path) {
			buf.push("path="+path.replace(/[;\s]/g,encodeURIComponent));
		}

		if (domain === true) {
			buf.push("domain="+document.location.host);
		}
		else if (domain) {
			buf.push("domain="+domain.replace(/[;\s]/g,encodeURIComponent));
		}

		if (secure) {
			buf.push("secure");
		}

		document.cookie = buf.join("; ");
	}

	$.cookie = function (name) {
		switch (arguments.length) {
			case 0:
				return get();
			case 1:
				if (typeof(name) !== "object") {
					var cookies = get();
					if (name === undefined) {
						return cookies;
					}
					else if (Object.prototype.hasOwnProperty.call(cookies,name)) {
						return cookies[name];
					}
					return null;
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

	$.removeCookie = function (name) {
		var cookies = get();
		if (Object.prototype.hasOwnProperty.call(cookies,name)) {
			var args = Array.prototype.slice.call(arguments,1);
			args.unshift(name,null,-1);
			set.apply(this,args);
			return true;
		}
		return false;
	};
})(jQuery);
