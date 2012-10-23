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

	$.fn.socialSharePrivacy.settings.services.linkedin = {
		'status'            : 'on',
		'dummy_line_img'    : 'socialshareprivacy/images/dummy_linkedin.png',
		'dummy_box_img'     : 'socialshareprivacy/images/dummy_box_linkedin.png',
		'dummy_alt'         : '"Linked in"-Dummy',
		'txt_info'          : '2 clicks for more privacy: The Linked in button will be enabled once you click here. Activating the button already sends data to Linked in &ndash; see <em>i</em>.',
		'txt_off'           : 'not connected to Linked in',
		'txt_on'            : 'connected to Linked in',
		'perma_option'      : 'on',
		'display_name'      : 'Linked in',
		'referrer_track'    : '',
		'button'            : function (options, uri, settings) {
			var protocol = location.protocol === 'https:' ? 'https' : 'http';
			var $code = $('<script type="IN/Share"></script>').attr({
				'data-counter' : settings.layout === 'line' ? 'right' : 'top',
				'data-url'     : uri + options.referrer_track
			});

			if (window.IN && window.IN.parse) {
				$code = $code.add('<script type="text/javascript">IN.parse(document.body);</script>');
			}
			else if ($('script[src^="'+protocol+'://platform.linkedin.com/"]').length === 0) {
				$code = $code.add('<script type="text/javascript" src="'+protocol+'://platform.linkedin.com/in.js"></script>');
			}

			return $code;
		}
	};
})(jQuery);
