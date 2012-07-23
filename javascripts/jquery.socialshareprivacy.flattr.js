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

	function get (self, options, uri, settings, name) {
		var value = options[name];
		if (typeof value === "function") {
			return value.call(self, options, uri, settings);
		}
		return String(value);
	}

	$.fn.socialSharePrivacy.settings.services.flattr = {
		'status'            : 'on', 
		'button_class'      : 'flatter',
		'dummy_line_img'    : 'socialshareprivacy/images/dummy_flattr.png',
		'dummy_box_img'     : 'socialshareprivacy/images/dummy_box_flattr.png',
		'dummy_alt'         : '"Flattr"-Dummy',
		'txt_info'          : '2 clicks for more privacy: The Flattr button will be enabled once you click here. Activating the button already sends data to Flattr &ndash; see <em>i</em>.',
		'txt_off'           : 'not connceted to Flattr',
		'txt_on'            : 'connceted to Flattr',
		'perma_option'      : 'on',
		'display_name'      : 'Flattr',
		'referrer_track'    : '',
		'title'             : $.fn.socialSharePrivacy.getTitle,
		'description'       : $.fn.socialSharePrivacy.getDescription,
		'uid'               : '',
		'category'          : '',
		'tags'              : '',
		'popout'            : '',
		'hidden'            : '',
		'button'            : function (options, uri, settings) {
			var attrs = {
				href                   : uri + options.referrer_track,
				title                  : get(this, options, uri, settings, 'title'),
				'data-flattr-language' : options.language, // XXX: the language option doesn't
				lang                   : options.language  //      seem to have any effect
			};
			if (options.uid)      attrs['data-flattr-uid']      = options.uid;
			if (options.hidden)   attrs['data-flattr-hidden']   = options.hidden;
			if (options.popout)   attrs['data-flattr-popout']   = options.popout;
			if (options.category) attrs['data-flattr-category'] = options.category;
			if (options.tags)     attrs['data-flattr-tags']     = options.tags;
			if (settings.layout === 'line') attrs['data-flattr-button'] = 'compact';

			var $code = $('<a class="FlattrButton">' + get(this, options, uri, settings, 'description') +
				'</a><script text="text/javscript" src="//api.flattr.com/js/0.6/load.js?mode=auto"></script>');

			$code.filter('a').attr(attrs);

			return $code;
		}
	};
})(jQuery);
