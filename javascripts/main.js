$.fn.socialSharePrivacy.settings.order = ['facebook','twitter','gplus','disqus','stumbleupon','delicious','reddit','pinterest','tumblr','linkedin','buffer','xing','mail'];
$.fn.socialSharePrivacy.settings.services.flattr.status = false;
var disqus_shortname = 'socialshareprivacy';
var disqus_url = $.fn.socialSharePrivacy.settings.uri($.fn.socialSharePrivacy.settings);
$(document).ready(function () {
	$('#share').socialSharePrivacy({
		layout:'box',
		services: {
			disqus: {
				shortname: disqus_shortname,
				onclick: function () {
					$('#comments-button').click();
				}
			}
		}
	});
	$('#comments-button').click(function () {
		$.getScript('http://' + disqus_shortname + '.disqus.com/embed.js');
		$(this).remove();
	});
});
