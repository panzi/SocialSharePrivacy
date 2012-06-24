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
	// abbreviate at last blank before length and add "\u2026" (horizontal ellipsis)
	function abbreviateText (text, length) {
		// length of UTF-8 encoded string
		if (unescape(encodeURIComponent(text)).length <= length) {
			return text;
		}

		// "\u2026" is actually 3 bytes long in UTF-8
		// TODO: if any of the last 3 characters is > 1 byte long this truncates too much
		var abbrev = text.slice(0, length - 3);

		if (!/\W/.test(text.charAt(length - 3))) {
			var match = /^(.*)\s\S*$/.exec(abbrev);
			if (match) {
				abbrev = match[1];
			}
		}
		return abbrev + "\u2026";
	}

	// create tweet text from content of <meta name="DC.title"> and <meta name="DC.creator">
	// fallback to content of <title> tag
	function getTweetText (options, uri) {
		var title = $('meta[name="DC.title"]').attr('content');
		var creator = $('meta[name="DC.creator"]').attr('content');

		if (title && creator) {
			return title + ' - ' + creator;
		} else {
			return $('title').text();
		}
	}

	$.fn.socialSharePrivacy.settings.services.twitter = {
		'status'            : 'on', 
		'button_class'      : 'tweet',
		'dummy_img'         : 'socialshareprivacy/images/dummy_twitter.png',
		'dummy_alt'         : '"Tweet this"-Dummy',
		'txt_info'          : '2 clicks for more privacy: The Tweet this button will be enabled when you click here. Activating the button already sends data to Twitter &ndash; see <em>i</em>.',
		'txt_off'           : 'not connceted to Twitter',
		'txt_on'            : 'connceted to Twitter',
		'perma_option'      : 'on',
		'display_name'      : 'Twitter',
		'referrer_track'    : '', 
		'tweet_text'        : getTweetText,
		'button'            : function (options, uri) {
			var text = typeof(options.tweet_text) === 'function' ?
				options.tweet_text.call(this, options, uri) :
				String(options.tweet_text||'');
			// 120 is the max character count left after twitters automatic
			// url shortening with t.co
			text = abbreviateText(text, 120);

			return $('<iframe allowtransparency="true" frameborder="0" scrolling="no" style="width:130px; height:25px;"></iframe>').attr(
				'src', 'http://platform.twitter.com/widgets/tweet_button.html?'+$.param({
					url     : uri + options.referrer_track,
					counturl: uri,
					text    : text,
					count   : 'horizontal',
					lang    : options.language
				}));
		}
	};
})(jQuery);
