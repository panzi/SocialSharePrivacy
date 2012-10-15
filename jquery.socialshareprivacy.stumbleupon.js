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

	$.fn.socialSharePrivacy.settings.services.stumbleupon = {
		'status'            : 'on', 
		'button_class'      : 'stumbleupon',
		'dummy_line_img'    : 'socialshareprivacy/images/dummy_stumbleupon.png',
		'dummy_box_img'     : 'socialshareprivacy/images/dummy_box_stumbleupon.png',
		'dummy_alt'         : '"Stumble!"-Dummy',
		'txt_info'          : '2 clicks for more privacy: The Stumble! button will be enabled once you click here. Activating the button already sends data to Stumble Upon &ndash; see <em>i</em>.',
		'txt_off'           : 'not connceted to stumble upon',
		'txt_on'            : 'connceted to stumble upon',
		'perma_option'      : 'on',
		'display_name'      : 'Stumble Upon',
		'referrer_track'    : '',
		'button'            : function (options, uri, settings) {
			var base_url = 'https:' === document.location.protocol ? 'https://' : 'http://';
			var w, h;

			if (settings.layout === 'line') {
				w = '74';
				h = '18';
				base_url += 'badge.stumbleupon.com/badge/embed/1/?';
			}
			else {
				w = '50';
				h = '60';
				base_url += 'badge.stumbleupon.com/badge/embed/5/?';
			}

			return $('<iframe allowtransparency="true" frameborder="0" scrolling="no"></iframe>').attr({
				src:    base_url+$.param({url: uri + options.referrer_track}),
				width:  w,
				height: h
			});
		}
	};
})(jQuery);
