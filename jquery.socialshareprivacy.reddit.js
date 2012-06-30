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

	$.fn.socialSharePrivacy.settings.services.reddit = {
		'status'            : 'on', 
		'button_class'      : 'reddit',
		'dummy_line_img'    : 'socialshareprivacy/images/dummy_reddit.png',
		'dummy_box_img'     : 'socialshareprivacy/images/dummy_box_reddit.png',
		'dummy_alt'         : '"Reddit this!"-Dummy',
		'txt_info'          : '2 clicks for more privacy: The reddit this! button will be enabled once you click here. Activating the button already sends data to reddit &ndash; see <em>i</em>.',
		'txt_off'           : 'not connceted to reddit',
		'txt_on'            : 'connceted to reddit',
		'perma_option'      : 'on',
		'display_name'      : 'Reddit',
		'referrer_track'    : '',
		'title'             : $.fn.socialSharePrivacy.getTitle,
		'target'            : '',
		'newwindow'         : '1',
		'bgcolor'           : 'transparent',
		'bordercolor'       : '',
		'button'            : function (options, uri, settings) {
			var base_url, w, layout;
			if (settings.layout === 'line') {
				w = 120;
				layout = '/button/button1.html?';
			}
			else {
				w = 58;
				layout = '/button/button2.html?';
			}
			if ('https:' === document.location.protocol) {
				base_url = 'https://redditstatic.s3.amazonaws.com';
			} else {
				base_url = 'http://www.reddit.com/static';
			}
			var params = {
				url   : uri + options.referrer_track,
				width : String(w)
			};
			var title  = get(this, options, uri, settings, 'title');
			var target = get(this, options, uri, settings, 'target');
			if (title)  params.title  = title;
			if (target) params.target = target;
			if (options.bgcolor)     params.bgcolor     = options.bgcolor;
			if (options.bordercolor) params.bordercolor = options.bordercolor;
			if (options.newwindow)   params.newwindow   = options.newwindow;

			return $('<iframe allowtransparency="true" frameborder="0" scrolling="no"></iframe>').attr(
				'src', base_url+layout+$.param(params));
		}
	};
})(jQuery);
