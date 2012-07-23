/*
 * jquery.socialshareprivacy.js | 2 Klicks fuer mehr Datenschutz
 *
 * http://www.heise.de/extras/socialshareprivacy/
 * http://www.heise.de/ct/artikel/2-Klicks-fuer-mehr-Datenschutz-1333879.html
 *
 * Copyright (c) 2011 Hilko Holweg, Sebastian Hilbig, Nicolas Heiringhoff, Juergen Schmidt,
 * Heise Zeitschriften Verlag GmbH & Co. KG, http://www.heise.de
 *
 * Copiright (c) 2012 Mathias Panzenböck
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
			return value.call(self, options, uri, settings);
		}
		return String(value);
	}

	$.fn.socialSharePrivacy.settings.services.pinterest = {
		'status'            : 'on', 
		'button_class'      : 'pinit',
		'dummy_line_img'    : 'socialshareprivacy/images/dummy_pinit.png',
		'dummy_box_img'     : 'socialshareprivacy/images/dummy_box_pinit.png',
		'dummy_alt'         : '"Pin it"-Dummy',
		'txt_info'          : '2 clicks for more privacy: The Pin it button will be enabled once you click here. Activating the button already sends data to Pinterest &ndash; see <em>i</em>.',
		'txt_off'           : 'not connceted to Pinterest',
		'txt_on'            : 'connceted to Pinterest',
		'perma_option'      : 'on',
		'display_name'      : 'Pinterest',
		'referrer_track'    : '',
		'title'             : $.fn.socialSharePrivacy.getTitle,
		'description'       : $.fn.socialSharePrivacy.getDescription,
		'media'             : $.fn.socialSharePrivacy.getImage,
		'button'            : function (options, uri, settings) {
			var base_url;
			if ('https:' === document.location.protocol) {
				base_url = 'https://assets.pinterest.com/pinit.html?';
			} else {
				base_url = 'http://pinit-cdn.pinterest.com/pinit.html?';
			}
			var params = {
				ref    : uri,
				url    : uri + options.referrer_track,
				layout : settings.layout === 'line' ? 'horizontal' : 'vertical',
				count  : '1',
				media  : get(this, options, uri, settings, 'media')
			};
			var title       = get(this, options, uri, settings, 'title');
			var description = get(this, options, uri, settings, 'description');
			if (title)       params.title       = title;
			if (description) params.description = description;

			return $('<iframe allowtransparency="true" frameborder="0" scrolling="no"></iframe>').attr(
				'src', base_url+$.param(params));
		}
	};
})(jQuery);
