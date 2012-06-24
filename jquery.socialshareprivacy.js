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

	/*
	 * helper functions
	 */ 

	/**
	 * Build an absolute url using a base url.
	 * The provided base url has to be a valid absolute url. It will not be validated!
	 * If no base url is given the document location is used.
	 * Schemes that behave other than http might not work.
	 * It tries to support file:-urls, but might fail in some cases.
	 * email:-urls aren't supported at all (don't make sense anyway).
	 */
	function absurl (url, base) {
		if (!base) base = document.baseURI || $("html > head > base").last().attr("href") || document.location.href;
		if (!url) {
			return base;
		}
		else if (/^[a-z][-+\.a-z0-9]*:/i.test(url)) {
			// The scheme actually could contain any kind of alphanumerical unicode
			// character, but JavaScript regular expressions don't support unicode
			// character classes. Maybe /^[^:]+:/ or even /^.*:/ would be sufficient?
			return url;
		}
		else if (url.slice(0,2) === '//') {
			return /^[^:]+:/.exec(base)[0]+url;
		}
		
		var ch = url.charAt(0);
		if (ch === '/') {
			if (/^file:/i.test(base)) {
				// file scheme has no hostname
				return 'file://'+url;
			}
			else {
				return /^[^:]+:\/*[^\/]+/i.exec(base)[0]+url;
			}
		}
		else if (ch === '#') {
			// assume "#" only occures at the end indicating the fragment
			return base.replace(/#.*$/,'')+url;
		}
		else if (ch === '?') {
			// assume "?" and "#" only occure at the end indicating the query
			// and the fragment
			return base.replace(/[\?#].*$/,'')+url;
		}
		else {
			var path;
			if (/^file:/i.test(base)) {
				path = base.replace(/^file:\/{0,2}/i,'');
				base = "file://";
			}
			else {
				var match = /^([^:]+:\/*[^\/]+)(\/.*?)?(\?.*?)?(#.*)?$/.exec(base);
				base = match[1];
				path = match[2]||"/";
			}
		
			path = path.split("/");
			path.pop();
			if (path.length === 0) {
				// Ensure leading "/". Of course this is only valid on
				// unix like filesystems. More magic would be needed to
				// support other filesystems.
				path.push("");
			}
			path.push(url);
			return base+path.join("/");
		}
	}
	
	// helper function that gets the title of the current page
	function getTitle (options, uri) {
		var title = $('meta[name="DC.title"]').attr('content');
		var creator = $('meta[name="DC.creator"]').attr('content');

		if (title && creator) {
			return title + ' - ' + creator;
		} else {
			return $('title').text();
		}
	}

	// build URI from rel="canonical" or document.location
	function getURI() {
		var uri = document.location.href;
		var canonical = $("link[rel=canonical]").attr("href");

		if (canonical) {
			uri = absurl(canonical);
		}

		return uri;
	}

	function buttonClickHandler (service, button_class, uri, options) {
		function onclick () {
			var $container = $(this).parents('li.help_info').first();
			var $switch = $container.find('span.switch');
			if ($switch.hasClass('off')) {
				$container.addClass('info_off');
				$switch.addClass('on').removeClass('off').html(service.txt_on);
				$container.find('img.privacy_dummy').replaceWith(
					typeof(service.button) === "function" ?
					service.button.call($container.parent().parent()[0],service,uri,options) :
					service.button);
			} else {
				$container.removeClass('info_off');
				$switch.addClass('off').removeClass('on').html(service.txt_off);
				$container.find('.dummy_btn').empty().
					append($('<img/>').addClass(button_class+'_privacy_dummy privacy_dummy').
						attr({
							alt: service.dummy_alt,
							src: service.path_prefix + service.dummy_img
						}).click(onclick));
			}
		};
		return onclick;
	}

	// display info-overlays a tiny bit delayed
	function enterHelpInfo () {
		var $info_wrapper = $(this);
		if ($info_wrapper.hasClass('info_off')) return;
		var timeout_id = window.setTimeout(function () {
			$info_wrapper.addClass('display');
			$info_wrapper.removeData('timeout_id');
		}, 500);
		$info_wrapper.data('timeout_id', timeout_id);
	}

	function leaveHelpInfo () {
		var $info_wrapper = $(this);
		var timeout_id = $info_wrapper.data('timeout_id');
		if (timeout_id !== undefined) {
			window.clearTimeout(timeout_id);
		}
		$info_wrapper.removeClass('display');
	}

	function permCheckChangeHandler (options) {
		return function () {
			var $input = $(this);
			if ($input.is(':checked')) {
				options.set_perma_option($input.attr('data-service'), options);
				$input.parent().addClass('checked');
			} else {
				options.del_perma_option($input.attr('data-service'), options);
				$input.parent().removeClass('checked');
			}
		};
	}

	function enterSettingsInfo () {
		var $settings = $(this);
		var timeout_id = window.setTimeout(function () {
			$settings.find('.settings_info_menu').removeClass('off').addClass('on');
			$settings.removeData('timeout_id');
		}, 500);
		$settings.data('timeout_id', timeout_id);
	}
	
	function leaveSettingsInfo () {
		var $settings = $(this);
		var timeout_id = $settings.data('timeout_id');
		if (timeout_id !== undefined) {
			window.clearTimeout(timeout_id);
		}
		$settings.find('.settings_info_menu').removeClass('on').addClass('off');
	}

	function setPermaOption (service_name, options) {
		$.cookie('socialSharePrivacy_'+service_name, 'perma_on', options.cookie_expires, options.cookie_path, options.cookie_domain);
	}
	
	function delPermaOption (service_name, options) {
		$.cookie('socialSharePrivacy_'+service_name, null, -1, options.cookie_path, options.cookie_domain);
	}

	function getPermaOption (service_name, options) {
		return !!options.get_perma_options(options)[service_name];
	}
	
	function getPermaOptions (options) {
		var cookies = $.cookie();
		var permas = {};
		for (var name in cookies) {
			var match = /^socialSharePrivacy_(.+)$/.exec(name);
			if (match) {
				permas[match[1]] = cookies[name] === 'perma_on';
			}
		}
		return permas;
	}


	// extend jquery with our plugin function
	function socialSharePrivacy (settings) {

		// overwrite default values with user settings
		var options = $.extend(true, {}, socialSharePrivacy.settings, settings);
		var order = options.order || [];

		var any_on = false;
		var any_perm = false;
		var any_unsafe = false;
		var unordered = [];
		for (var service_name in options.services) {
			var service = options.services[service_name];
			if (service.status === 'on') {
				any_on = true;
				if ($.inArray(service_name, order) === -1) {
					unordered.push(service_name);
				}
				if (service.privacy !== 'safe') {
					any_unsafe = true;
					if (service.perma_option === 'on') {
						any_perm = true;
					}
				}
			}
			if (!('language' in service)) {
				service.language = options.language;
			}
			if (!('path_prefix' in service)) {
				service.path_prefix = options.path_prefix;
			}
		}
		unordered.sort();
		order = order.concat(unordered);

		// check if at least one service is activated
		if (!any_on) {
			return;
		}

		// insert stylesheet into document and prepend target element
		if (options.css_path) {
			var css_path = (options.path_prefix||"") + options.css_path;
			// IE fix (needed for IE < 9 - but done for all IE versions)
			if (document.createStyleSheet) {
				document.createStyleSheet(css_path);
			} else if ($(document.head).find('link[href="'+options.css_path+'"]').length === 0) {
				$(document.head).append($('<link rel="stylesheet" type="text/css" />').attr('href', css_path));
			}
		}

		// get stored perma options
		var permas;
		if (options.perma_option === 'on' && any_perm) {
			if (options.get_perma_options) {
				permas = options.get_perma_options(options);
			}
			else {
				permas = {};
				for (var service_name in options.services) {
					permas[service_name] = options.get_perma_option(service_name, options);
				}
			}
		}

		return this.each(function () {
			var $context = $('<ul class="social_share_privacy_area"></ul>')
			
			// canonical uri that will be shared
			var uri = options.uri;
			if (typeof uri === 'function') {
				uri = uri.call(this, options);
			}

			for (var i = 0; i < order.length; ++ i) {
				var service_name = order[i];
				var service = options.services[service_name];

				if (service && service.status === 'on') {
					var class_name = service.class_name || service_name;
					var button_class = service.button_class || service_name;
					var $help_info;

					if (service.privacy === 'safe') {
						$help_info = $('<li class="help_info"><span class="info">' +
							service.txt_info + '</span><div class="dummy_btn"></div></li>').addClass(class_name);
						$help_info.find('.dummy_btn').
							addClass(button_class).
							append(service.button.call(this,service,uri,options));
					}
					else {
						$help_info = $('<li class="help_info"><span class="info">' +
							service.txt_info + '</span><span class="switch off">' + service.txt_off +
							'</span><div class="dummy_btn"></div></li>').addClass(class_name);
						$help_info.find('.dummy_btn').
							addClass(button_class).
							append($('<img/>').addClass(button_class+'_privacy_dummy privacy_dummy').
								attr({
									alt: service.dummy_alt,
									src: service.path_prefix + service.dummy_img
								}));
					
						$help_info.find('.dummy_btn img.privacy_dummy, span.switch').click(
							buttonClickHandler(service, button_class, uri, options));
					}
					$context.append($help_info);
				}
			}
			
			//
			// append Info/Settings-area
			//
			if (any_unsafe) {
				var $settings_info = $('<li class="settings_info"><div class="settings_info_menu off perma_option_off"><a>' +
					'<span class="help_info icon"><span class="info">' + options.txt_help + '</span></span></a></div></li>');
				var $info_link = $settings_info.find('> .settings_info_menu > a').attr('href', options.info_link);
				if (options.info_link_target) {
					$info_link.attr("target",options.info_link_target);
				}
				$context.append($settings_info);

				$context.find('.help_info').on('mouseenter', enterHelpInfo).on('mouseleave', leaveHelpInfo);

				// menu for permanently enabling of service buttons
				if (options.perma_option === 'on' && any_perm) {

					// define container
					var $container_settings_info = $context.find('li.settings_info');

					// remove class that fomrats the i-icon, because perma-options are shown
					var $settings_info_menu = $container_settings_info.find('.settings_info_menu');
					$settings_info_menu.removeClass('perma_option_off');

					// append perma-options-icon (.settings) and form (hidden)
					$settings_info_menu.append(
						'<span class="settings">' + options.txt_settings + '</span><form><fieldset><legend>' +
						options.settings_perma + '</legend></fieldset></form>');


					// write services with <input> and <label> and checked state from cookie
					var $fieldset = $settings_info_menu.find('form fieldset');
					for (var i = 0; i < order.length; ++ i) {
						var service_name = order[i];
						var service = options.services[service_name];

						if (service && service.status === 'on' && service.perma_option === 'on' && service.privacy !== 'safe') {
							var class_name = service.class_name || service_name;
							var perma = permas[service_name];
							var $field = $('<label><input type="checkbox"' + (perma ? ' checked="checked"/>' : '/>') +
								service.display_name + '</label>');
							$field.find('input').attr('data-service', service_name);
							$fieldset.append($field);

							// enable services when cookie set and refresh cookie
							if (perma) {
								$context.find('li.'+class_name+' span.switch').click();
								options.set_perma_option(service_name, options);
							}
						}
					}

					// indicate clickable setings gear
					$container_settings_info.find('span.settings').css('cursor', 'pointer');

					// show settings menu on hover
					$container_settings_info.on('mouseenter', enterSettingsInfo).on('mouseleave', leaveSettingsInfo);

					// interaction for <input> to enable services permanently (cookie will be set or deleted)
					$container_settings_info.find('fieldset input').on('change', permCheckChangeHandler(options));
				}
			}
			
			$(this).prepend($context);
		});
	};

	// expose helper functions:
	socialSharePrivacy.absurl   = absurl;
	socialSharePrivacy.getTitle = getTitle;

	socialSharePrivacy.settings = {
		'services'          : {},
		// TODO: translate heise article into english
		'info_link'         : 'http://www.heise.de/ct/artikel/2-Klicks-fuer-mehr-Datenschutz-1333879.html',
		'txt_settings'      : 'Settings',
		'txt_help'          : 'If you activate these fields via click, data will be sent to a third party (Facebook, Twitter, Google, ...) and stored there. For more details click <em>i</em>.',
		'settings_perma'    : 'Permanently enable share buttons:',
		'set_perma_option'  : setPermaOption,
		'del_perma_option'  : delPermaOption,
		'get_perma_options' : getPermaOptions,
		'get_perma_option'  : getPermaOption,
		'perma_option'      : $.cookie ? 'on' : 'off',
		'cookie_path'       : '/',
		'cookie_domain'     : document.location.hostname,
		'cookie_expires'    : 365,
		'css_path'          : 'socialshareprivacy/socialshareprivacy.css',
		'uri'               : getURI,
		'path_prefix'       : '',
		'language'          : 'en'
	};

	$.fn.socialSharePrivacy = socialSharePrivacy;
}(jQuery));
