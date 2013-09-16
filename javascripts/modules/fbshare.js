/*
 * Facebook share module for jquery.socialshareprivacy.js | 2 Klicks fuer mehr Datenschutz
 *
 * http://www.heise.de/extras/socialshareprivacy/
 * http://www.heise.de/ct/artikel/2-Klicks-fuer-mehr-Datenschutz-1333879.html
 *
 * Copyright (c) 2011 Hilko Holweg, Sebastian Hilbig, Nicolas Heiringhoff, Juergen Schmidt,
 * Heise Zeitschriften Verlag GmbH & Co. KG, http://www.heise.de
 *
 * Copyright (c) 2012 Mathias Panzenböck
 *
 * Fbshare module:
 * copyright (c) 2013 zzzen.com
 *
 * is released under the MIT License http://www.opensource.org/licenses/mit-license.php
 *
 * Spread the word, link to us if you can.
 */
(function ($, undefined) {
	"use strict";

	function get (self, options, uri, settings, name) {
		var value = options[name];
		if (typeof value === "function") {
			value = value.call(self, options, uri, settings);
		}
		return String(value);
	}

	var getDescription = $.fn.socialSharePrivacy.getDescription;

	function getBody (options, uri, settings) {
		return getDescription.call(this, options, uri, settings) + '\n\n' + uri + options.referrer_track;
	}

	$.fn.socialSharePrivacy.settings.services.fbshare = {
		'status'            : true,
		'privacy'           : 'safe',
		'button_class'      : 'fbshare',
		'line_img'          : 'images/fbshare.png',
		'box_img'           : 'images/box_fbshare.png',
		'txt_info'          : 'Share via facebook.',
		'txt_button'        : 'FB share',
		'display_name'      : 'FB share',
		'referrer_track'    : '',
		'button'            : function (options, uri, settings) {
			return $('<a/>',{ target: '_blank', href: 'https://www.facebook.com/sharer/sharer.php?'+$.param({u:uri})}).append(
				$('<img>', { alt: options.txt_button,
					src: options.path_prefix + (settings.layout === 'line' ? options.line_img : options.box_img) }));
		}
	};
})(jQuery);
