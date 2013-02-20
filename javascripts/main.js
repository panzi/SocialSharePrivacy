$.fn.socialSharePrivacy.settings.order = ['flattr','facebook','twitter','gplus','disqus','stumbleupon','delicious','reddit','pinterest','tumblr','linkedin','buffer','xing','mail'];
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
			},
			flattr: {
				uid: 'panzi'
			}
		}
	});
	$('#comments-button').click(function () {
		$.getScript('http://' + disqus_shortname + '.disqus.com/embed.js');
		$(this).remove();
	});
});
