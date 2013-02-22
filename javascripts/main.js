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
		var $service = $('<li><label></label></li>');
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

var escapeHtml = $.fn.socialSharePrivacy.escapeHtml;

function updateEmbedCode () {
	var options = {
		path_prefix: 'http://panzi.github.com/SocialSharePrivacy/',
		layout: $('#layout').val()
	};
	var cookies = $('#cookies').is(':checked');
	var $unchecked = $('#service-select ul input[type=checkbox]:not(:checked)');
	if ($unchecked.length > 0) {
		options.services = {};
		for (var i = 0; i < $unchecked.length; ++ i) {
			options.services[$unchecked[i].value] = {status: false};
		}
	}
	$('#code').val(
		(cookies ? '<script type="text/javascript" src="http://panzi.github.com/SocialSharePrivacy/javascripts/jquery.cookies.js"></script>\n' : '')+
		'<script type="text/javascript" src="http://panzi.github.com/SocialSharePrivacy/javascripts/jquery.socialshareprivacy.min.js"></script>\n'+
		'\n'+
		'<div class="social-share-privacy" data-options="'+escapeHtml(JSON.stringify(options))+'"></div>\n'+
		'<script type="text/javascript">jQuery(".social-share-privacy").socialSharePrivacy();</script>');

	options.perma_option = cookies;
	options.css_path = null;
	$("#share").socialSharePrivacy("destroy").css("position", options.layout === "line" ? "static" : "absolute").socialSharePrivacy(options);
}
