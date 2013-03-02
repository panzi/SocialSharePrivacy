/*
 * jquery.socialshareprivacy.js
 *
 * Copyright (c) 2012 Mathias Panzenböck
 *
 * is released under the MIT License http://www.opensource.org/licenses/mit-license.php
 *
 */
(function ($, undefined) {
	"use strict";

	var DISQUSWIDGETS = {
		displayCount: function (data) {
			var options = requestQueue.shift();
			$('.social_share_privacy_area .disqus .disqus-widget:not(.init)').each(function () {
				var $widget = $(this);
				if ($widget.attr("data-shortname") === options.shortname && $widget.attr("data-uri") === options.uri) {
					var key = $widget.attr("data-count");
					var count = data.counts[0][key];
					var text = data.text[key];
					var scount = $.fn.socialSharePrivacy.formatNumber(count);
					$widget.attr('title', count === 0 ? text.zero : count === 1 ? text.one : text.multiple.replace('{num}', scount));
					$widget.find('.count a').text(scount);
					$widget.addClass('init');
				}
			});
		}
	};

	var requestId     = 0;
	var requestActive = false;
	var requestQueue  = [];

	function enqueue (options) {
		options.requestId = String(requestId ++);
		requestQueue.push(options);
		if (!requestActive) {
			request(options);
		}
	}

	function request (options) {
		// this breaks every other usage of the disqus count API:
		window.DISQUSWIDGETS = DISQUSWIDGETS;

		requestActive = true;
		var script = document.createElement('script');
		script.type  = "text/javascript";
		script.src   = 'http://'+options.shortname+'.disqus.com/count.js?q=1&0=2,'+encodeURIComponent(options.uri);
		script.async = true;
		script.setAttribute('data-request-id', options.requestId);
		script.onload = script.onreadystatechange = script.onerror = requestLoad;
		(document.head||document.body).appendChild(script);
	}

	function requestLoad (event) {
		if (!event) event = window.event;
		if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete' || event.type === 'error') {
			this.onload = this.onreadystatechange = this.onerror = requestLoad;
			var $script = $(this);
			var requestId = $script.attr('data-request-id');

			if (requestQueue.length > 0 && requestQueue[0].requestId === requestId) {
				requestQueue.shift();
			}
		
			if (requestQueue.length > 0) {
				request(requestQueue[0]);
			}
			else {
				requestActive = false;
			}
		}
	}

	$.fn.socialSharePrivacy.settings.services.disqus = {
		'status'            : true,
		'dummy_line_img'    : 'images/dummy_disqus.png',
		'dummy_box_img'     : 'images/dummy_box_disqus.png',
		'dummy_alt'         : '"Disqus"-Dummy',
		'txt_info'          : 'Two clicks for more privacy: The Disqus button will be enabled once you click here. Activating the button already sends data to Disqus &ndash; see <em>i</em>.',
		'txt_off'           : 'not connected to Disqus',
		'txt_on'            : 'connected to Disqus',
		'perma_option'      : true,
		'display_name'      : 'Disqus',
		'referrer_track'    : '',
		'shortname'         : '',
		'count'             : 'comments',
		'onclick'           : null,
		'button'            : function (options, uri, settings) {
			var shortname = options.shortname || window.disqus_shortname || '';
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

			$code.attr({
				'data-count'     : options.count,
				'data-shortname' : shortname,
				'data-uri'       : uri + options.referrer_track
			});

			if (options.onclick) {
				$code.find('a').click(typeof options.onclick === "function" ?
					options.onclick : new Function("event", options.onclick));
			}

			enqueue({
				shortname : shortname,
				uri       : uri + options.referrer_track
			});

			return $code;
		}
	};
})(jQuery);
