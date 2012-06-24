/*
 * jquery.socialshareprivacy.js | 2 Klicks fuer mehr Datenschutz
 *
 * Copiright (c) 2012 Mathias Panzenböck
 *
 * is released under the MIT License http://www.opensource.org/licenses/mit-license.php
 *
 * Spread the word, link to us if you can.
 */
(function ($, undefined) {
	"use strict";

	function getCaption (options, uri) {
		var title = $('meta[name="DC.title"]').attr('content');
		var creator = $('meta[name="DC.creator"]').attr('content');

		if (title && creator) {
			return title + ' - ' + creator;
		} else {
			return $('title').text();
		}
	}

	function getQuote (options, uri) {
		var text = $('article, p').text();
		
		if (text.length <= 600) {
			return text;
		}

		var abbrev = text.slice(0, 597);
		if (!/\W/.test(text.charAt(length - 3))) {
			var match = /^(.*)\s\S*$/.exec(abbrev);
			if (match) {
				abbrev = match[1];
			}
		}
		return abbrev + "\u2026";
	}

	function getDescription (options, uri) {
		return $('meta[name="description"]').attr('content') || '';
	}

	var HTML_CHAR_MAP = {
		'<': '&lt;',
		'>': '&gt;',
		'&': '&amp;',
		'"': '&quot;',
		"'": '&#39;'
	};

	function escapeHtml (s) {
		return s.replace(/[<>&"']/g, function (ch) {
			return HTML_CHAR_MAP[ch];
		});
	}

	function getEmbedCode (options, uri) {
		return '<iframe scrolling="no" frameborder="0" style="border:none;" allowtransparency="true" src="'+escapeHtml(uri)+'"></iframe>';
	}

	function getPhoto (options, uri) {
		var imgs = $('img');
		if (imgs.length === 0) {
			return uri;
		}
		imgs.sort(function (lhs, rhs) {
			return rhs.offsetWidth * rhs.offsetHeight - lhs.offsetWidth * lhs.offsetHeight;
		});
		// browser makes src absolute:
		return imgs[0].src;
	}

	function getClickthru (options, uri) {
		return uri + options.referrer_track;
	}

	function get (self, options, uri, name) {
		var value = options[name];
		if (typeof value === "function") {
			return value.call(self, options, uri);
		}
		return String(value);
	}

	$.fn.socialSharePrivacy.settings.services.tumblr = {
		'status'            : 'on',
		'privacy'           : 'safe',
		'button_class'      : 'tubmlr',
		'txt_info'          : 'Post this on Tumblr.',
		'txt_button'        : 'Share on Tubmlr',
		'display_name'      : 'Tumblr',
		'referrer_track'    : '',
		'type'              : 'link', // possible values are 'link', 'quote', 'photo' or 'video'
		// type: 'link':
		'name'              : getCaption,
		'description'       : getDescription,
		// type: 'quote':
		'quote'             : getQuote,
		// type: 'photo':
		'photo'             : getPhoto,
		'clickthrou'        : getClickthru,
		// type: 'video':
		'embed'             : getEmbedCode,
		// type: 'photo' or 'video':
		'caption'           : getCaption,
		'button'            : function (options, uri) {
			var $code = $('<a>' + options.txt_button + '</a>');
			$code.click(function (event) {
				var winx = window.screenX || window.screenLeft;
				var winy = window.screenY || window.screenTop;
				var winw = window.outerWidth || window.innerWidth;
				var winh = window.outerHeight || window.innerHeight;
				var width = 450;
				var height = 430;
				var x = Math.round(winx + (winw - width)  * 0.5);
				var y = Math.round(winy + (winh - height) * 0.5);
				window.open(this.href, 't', 'left='+x+',top='+y+',toolbar=0,resizable=0,status=0,menubar=0,width='+width+',height='+height);
				event.preventDefault();
			});
			switch (options.type) {
				case 'link':
					return $code.attr('href', 'http://www.tumblr.com/share/link?'+$.param({
						url         : uri + options.referrer_track,
						name        : get(this, options, uri, 'name'),
						description : get(this, options, uri, 'description')
					}));

				case 'quote':
					return $code.attr('href', 'http://www.tumblr.com/share/quote?'+$.param({
						source      : uri + options.referrer_track,
						quote       : get(this, options, uri, 'quote')
					}));

				case 'photo':
					return $code.attr('href', 'http://www.tumblr.com/share/photo?'+$.param({
						source      : get(this, options, uri, 'photo'),
						caption     : get(this, options, uri, 'caption'),
						clickthrou  : get(this, options, uri, 'clickthrou')
					}));

				case 'video':
					return $code.attr('href', 'http://www.tumblr.com/share/video?'+$.param({
						embed       : get(this, options, uri, 'embed'),
						caption     : get(this, options, uri, 'caption')
					}));
			}
		}
	};
})(jQuery);
