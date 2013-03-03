$.fn.socialSharePrivacy.settings.order = ['flattr','facebook','twitter','gplus','disqus','stumbleupon','delicious','reddit','pinterest','tumblr','linkedin','buffer','xing','mail'];
var disqus_shortname = 'socialshareprivacy';
var disqus_url = $.fn.socialSharePrivacy.settings.uri($.fn.socialSharePrivacy.settings);

$.extend(true, $.fn.socialSharePrivacy.settings, {
	layout:'box',
	services: {
		disqus: {
			shortname: disqus_shortname,
			onclick: function () {
				$('#comments-button').click();
			}
		},
		flattr: {
			uid: 'panzi'
		}
	}
});

$(document).ready(function () {
	$('#comments-button').click(function () {
		$.getScript('http://' + disqus_shortname + '.disqus.com/embed.js');
		$(this).remove();
	});
	var services = $.fn.socialSharePrivacy.settings.services;
	var $select = $('#service-select ul');
	for (var service_name in services) {
		var $service = $('<li><label class="checkbox-label"></label></li>');
		var $input = $('<input type="checkbox" checked="checked"/>');


		$input.attr({
			value: service_name,
			id:    'select-'+service_name
		}).change(updateEmbedCode);

		$service.find('label').attr('for', 'select-'+service_name).text(' '+services[service_name].display_name).prepend($input);

		$select.append($service);
	}

	updateEmbedCode();
});

var HTML_CHAR_MAP = {"<": "&lt;",">": "&gt;","&": "&amp;","'": "&#39;"};
function escapeSQuotAttr(s){
	return s.replace(/[<>&']/g, function(ch){ return HTML_CHAR_MAP[ch]; });
}

function updateEmbedCode () {
	var options = {
		path_prefix: 'http://panzi.github.com/SocialSharePrivacy/',
		layout: $('#layout').val()
	};
	var cookies = $('#cookies').is(':checked');
	var async = $('#async').is(':checked');
	var jquery = $('#jquery').is(':checked');
	var flattr = true;
	var disqus = true;
	var flattr_uid = $('#flattr-uid').val();
	var disqus_shortname = $('#disqus-shortname').val();
	var $unchecked = $('#service-select ul input[type=checkbox]:not(:checked)');
	if ($unchecked.length > 0) {
		options.services = {};
		for (var i = 0; i < $unchecked.length; ++ i) {
			options.services[$unchecked[i].value] = {status: false};
		}
		if ('flattr' in options.services) {
			flattr = false;
		}
		if ('disqus' in options.services) {
			disqus = false;
		}
	}

	$('#flattr-uid').prop('disabled', !flattr);
	$('#disqus-shortname').prop('disabled', !disqus);

	if (flattr && flattr_uid) {
		if (!options.services) options.services = {};
		options.services.flattr = {uid: flattr_uid};
	}
	
	if (disqus && disqus_shortname) {
		if (!options.services) options.services = {};
		options.services.disqus = {shortname: disqus_shortname};
	}

	if (async) {
		var head_code = [];

		if (!jquery) {
			head_code.push('<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>');
		}

		if (cookies) {
			head_code.push('<script type="text/javascript" src="http://panzi.github.com/SocialSharePrivacy/javascripts/jquery.cookies.js"></script>');
		}

		head_code = head_code.join('\n');
		$('#head-code').val(head_code);
		$('#head-code, label[for="head-code"]')[head_code ? 'show' : 'hide']();
		
		$('#share-code').val(
			"<div data-social-share-privacy='true' data-options='"+escapeSQuotAttr(JSON.stringify(options))+"'></div>");


		$('#foot-code').val(
			"<script type=\"text/javascript\">(function () {"+
			"var s = document.createElement('script');"+
			"var t = document.getElementsByTagName('script')[0];"+
			"s.type = 'text/javascript';"+
			"s.async = true;"+
			"s.src = 'http://panzi.github.com/SocialSharePrivacy/javascripts/jquery.socialshareprivacy.min.autoload.js';"+
			"t.parentNode.insertBefore(s, t);"+
			"})();"+
			"</script>").show();
		$('label[for="foot-code"]').show();
	}
	else {
		$('#head-code').val(
			(jquery ? '' : '<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>\n')+
			(cookies ? '<script type="text/javascript" src="http://panzi.github.com/SocialSharePrivacy/javascripts/jquery.cookies.js"></script>\n' : '')+
			'<script type="text/javascript" src="http://panzi.github.com/SocialSharePrivacy/javascripts/jquery.socialshareprivacy.min.autoload.js"></script>\n'+
			'<script type="text/javascript">jQuery.extend(true,jQuery.fn.socialSharePrivacy.settings,'+escapeSQuotAttr(JSON.stringify(options))+');</script>').show();
		$('label[for="head-code"]').show();
		
		$('#share-code').val(
			"<div data-social-share-privacy='true'></div>");

		$('#foot-code, label[for="foot-code"]').hide();
	}

	options.perma_option = cookies;
	options.css_path = null;
	$("#share").socialSharePrivacy("destroy").css("position", options.layout === "line" ? "static" : "absolute").socialSharePrivacy(options);
}
