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

	function get (self, options, uri, name) {
		var value = options[name];
		if (typeof value === "function") {
			return value.call(self, options, uri);
		}
		return String(value);
	}

	$.fn.socialSharePrivacy.settings.services.reddit = {
		'status'            : 'on', 
		'button_class'      : 'reddit',
		'dummy_img'         : 'socialshareprivacy/images/dummy_reddit.png',
		'dummy_alt'         : '"Reddit this!"-Dummy',
		'txt_info'          : '2 clicks for more privacy: The reddit this! button will be enabled when you click here. Activating the button already sends data to reddit &ndash; see <em>i</em>.',
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
		'css'               : '',
		'button'            : function (options, uri) {
			var base_url;
			if ('https:' === document.location.protocol) {
				base_url = 'https://redditstatic.s3.amazonaws.com';
			} else {
				base_url = 'http://www.reddit.com/static';
			}
			var params = {
				url   : uri + options.referrer_track,
				width : '120'
			};
			var text   = get(this, options, uri, 'text');
			var target = get(this, options, uri, 'target');
			if (text)   params.text = text;
			if (target) params.text = target;
			if (options.bgcolor)     params.bgcolor     = options.bgcolor;
			if (options.bordercolor) params.bordercolor = options.bordercolor;
			if (options.css)         params.css         = options.css;
			if (options.newwindow)   params.newwindow   = options.newwindow;

			return $('<iframe allowtransparency="true" frameborder="0" scrolling="no" style="width:120px; height:20px;"></iframe>').attr(
				'src', base_url+'/button/button1.html?'+$.param(params));
		}
	};
})(jQuery);
