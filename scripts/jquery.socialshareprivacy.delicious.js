/*
 * jquery.socialshareprivacy.js
 *
 * Copyright (c) 2012 Mathias Panzenböck
 * with code from Delicious Button v1.1 Copyright 2010 [Mike @ moretechtips.net]
 * http://code.google.com/p/delicious-button/
 *
 * Licensed under the Apache License, Version 2.0 
 * (the "License"); you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
(function ($, undefined) {
	"use strict";

	$.fn.socialSharePrivacy.settings.services.delicious = {
		'status'            : true,
		'dummy_line_img'    : 'images/dummy_delicious.png',
		'dummy_box_img'     : 'images/dummy_box_delicious.png',
		'dummy_alt'         : '"Delicious"-Dummy',
		'txt_info'          : 'Two clicks for more privacy: The Delicious button will be enabled once you click here. Activating the button already sends data to Delicious &ndash; see <em>i</em>.',
		'txt_off'           : 'not connected to Delicious',
		'txt_on'            : 'connected to Delicious',
		'perma_option'      : true,
		'display_name'      : 'Delicious',
		'txt_button'        : 'Save',
		'referrer_track'    : '',
		'title'             : $.fn.socialSharePrivacy.getTitle,
		'button'            : function (options, uri, settings) {
			var $button = $('<div class="delicious-widget"/>');
			var url = uri + options.referrer_track;

			$.ajax({
				url: "http://feeds.delicious.com/v2/json/urlinfo/data",
				data: {url: url},
				dataType: "jsonp",
				success: function (counts) {
					var hash, total_posts, title, txt_button;
					for (var i = 0; i < counts.length; ++ i) {
						var count = counts[i];
						if (count.url === url) {
							total_posts = parseInt(count.total_posts, 10);
							hash = count.hash;
							title = count.title;
							break;
						}
					}
					if (isNaN(total_posts)) total_posts = 0;
					if (total_posts > 9999) txt_button = Math.floor(total_posts / 1E3) + "K";
					else if (total_posts > 999) txt_button = Math.floor(total_posts / 1E3) + "," + total_posts % 1E3;
					else if (total_posts > 0) txt_button = String(total_posts);
					else txt_button = options.txt_button;
					var save_url = "http://delicious.com/save?"+$.param({
						v:     "5",
						url:   url,
						title: (typeof options.title === "function" ?
							options.title.call(this, options, uri, settings) :
							String(options.title)) || title
					});

					$button.html('<a target="delicious" class="icon"><div class="delicious1"></div><div class="delicious2"></div><div class="delicious3"></div></a><a class="count" target="delicious"><i></i><b></b></a>');
					if (settings.layout === 'line') $button.append('<div style="clear:both;"></div>');
					$button.find('i').text(options.txt_button);
					$button.find('b').text(txt_button);
					$button.find('a.icon').attr("href", "http://delicious.com/url/" + hash);
					$button.find('a.count').attr("href", save_url).click(function (event) {
						window.open(save_url + "&noui&jump=close", "delicious", "toolbar=no,width=555,height=555");
						event.preventDefault();
					}).hover(function () {
						var $self = $(this);
						$self.find("b").stop(1, 1).css("display", "none");
						$self.find("i").fadeIn();
					}, function () {
						var $self = $(this);
						$self.find("i").stop(1, 1).css("display", "none");
						$self.find("b").fadeIn();
					});
				}
			});

			return $button;
		}
	};
})(jQuery);
