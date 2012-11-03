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

	var DISQUSWIDGETS = {
		displayCount: function (data) {
			$('.social_share_privacy_area .disqus .disqus-widget:not(.init)').each(function () {
				var $widget = $(this);
				var key = $widget.attr("data-count");
				var count = data.counts[0][key];
				var text = data.text[key];
				$widget.attr('title', count === 0 ? text.zero : count === 1 ? text.one : text.multiple.replace('{num}', count));
				$widget.find('.count a').text(String(count));
				$widget.addClass('init');
			});
		}
	};

	$.fn.socialSharePrivacy.settings.services.disqus = {
		'status'            : true,
		'dummy_line_img'    : 'socialshareprivacy/images/dummy_disqus.png',
		'dummy_box_img'     : 'socialshareprivacy/images/dummy_box_disqus.png',
		'dummy_alt'         : '"Disqus"-Dummy',
		'txt_info'          : '2 clicks for more privacy: The Disqus button will be enabled once you click here. Activating the button already sends data to Disqus &ndash; see <em>i</em>.',
		'txt_off'           : 'not connected to Disqus',
		'txt_on'            : 'connected to Disqus',
		'perma_option'      : true,
		'display_name'      : 'Disqus',
		'referrer_track'    : '',
		'shortname'         : '',
		'count'             : 'comments',
		'button'            : function (options, uri, settings) {
			// this breaks every other usage of the disqus count API:
			window.DISQUSWIDGETS = DISQUSWIDGETS;

			var $code;
			if (settings.layout === 'line') {
				$code = $('<div class="disqus-widget">'+
					'<a href="#disqus_thread" class="name">Disq<span class="us">us</span></a>'+
					'<span class="count"><i></i><u></u><a href="#disqus_thread">&nbsp;</a></span></div>');
			}
			else {
				$code = $('<div class="disqus-widget">'+
					'<div class="count"><i></i><u></u><a href="#disqus_thread">&nbsp;</a></div>'+
					'<a href="#disqus_thread" class="name">Disq<span class="us">us</span></a></div>');
			}

			return $code.attr('data-count', options.count).add(
				$('<script type="text/javascript"></script>').attr('src',
					'http://'+options.shortname+'.disqus.com/count.js?q=1&0=2,'+
					encodeURIComponent(uri + options.referrer_track)));
		}
	};
})(jQuery);
