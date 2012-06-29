Social Share Privacy
====================

(This document is work in progress.)

Social Share Privacy is a jQuery plugin that lets you add social share buttons
to your website that don't allow the social sites to track your users. The buttons
are first disabled and a user needs to click them to enable them. So in order to
e.g. like a site on facebook with these social share buttons a user needs to click
tow times. But in return for this extra click a user can only be tracked be this
third party sites when he decides to enable the buttons. Using the settings menu
a user can also permanently enable a social share button.

Supported share services:

 * Facebook
 * Twitter
 * Google+
 * Flattr
 * Pinterest
 * reddit
 * Tumblr
 * email

Note that Tumblr and email are just normal links and thus always enabled.

This is a fork of socialSharePrivacy by Heise. In this fork the service support
was made extensible, some services where added and some bugs fixed.

The original can be found here:
http://www.heise.de/extras/socialshareprivacy/

Dependencies
------------

 * jQuery: http://jquery.com/
 * jQuery cookies plugin (optional): https://github.com/panzi/jQuery-Cookies

The jQuery cookies plugin is needed in order to enable services permanently.
However, you can plug in you own replacement to store this options differently
(e.g. via ajax in the user profile or in the browsers local store). For an
example that stores the perma options in HTML5 local storage instead of cookies
see the file
[jquery.socialshareprivacy.localstorage.js](jquery.socialshareprivacy.localstorage.js).

How to use
----------

	<html>
	<head>
	…
	<script type="text/javascript" src="jquery.js"></script> 
	<script type="text/javascript" src="jquery.socialshareprivacy.js"></script>
	<script type="text/javascript" src="jquery.socialshareprivacy.facebook.js"></script>
	<script type="text/javascript" src="jquery.socialshareprivacy.twitter.js"></script>
	<script type="text/javascript" src="jquery.socialshareprivacy.gplus.js"></script>
	<script type="text/javascript" src="jquery.socialshareprivacy.flattr.js"></script>
	<script type="text/javascript" src="jquery.socialshareprivacy.pinterest.js"></script>
	<script type="text/javascript" src="jquery.socialshareprivacy.reddit.js"></script>
	<script type="text/javascript" src="jquery.socialshareprivacy.tumblr.js"></script>
	<script type="text/javascript" src="jquery.socialshareprivacy.mail.js"></script>
	<script type="text/javascript">
	$(document).ready(function () {
		$('#socialshareprivacy').socialSharePrivacy();
	});
	</script>
	…
	</head>
	<body>
	…
	<div id="socialshareprivacy"></div>
	…
	</body>
	</html>

You only need to include the JavaScript files of the services you want to use.

Options
-------

### Global Options

<table>
<thead>
	<tr>
		<th>Option</th>
		<th>Default Value</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>info_link</td>
		<td>http://www.heise.de/ct/artikel/2-Klicks-fuer-mehr-Datenschutz-1333879.html</td>
		<td>The link of the <em>i</em>-icon that links users to more information about this.</td>
	</tr>
	<tr>
		<td>info_link_target</td>
		<td></td>
		<td>The target attribute of the info link. Possible values are "_blank",
		"_self", "_parent", "_top" or a frame name.</td>
	</tr>
	<tr>
		<td>txt_settings</td>
		<td>Settings</td>
		<td>The text of the settings icon.</td>
	</tr>
	<tr>
		<td>txt_help</td>
		<td>[Text]</td>
		<td>Tooltip text of the settings menu.</td>
	</tr>
	<tr>
		<td>settings_perma</td>
		<td>[Text]</td>
		<td>Headline of the settings menu.</td>
	</tr>
	<tr>
		<td>layout</td>
		<td>line</td>
		<td>Possible values: "line" or "box"</td>
	</tr>
	<tr>
		<td>set_perma_option</td>
		<td>function (service_name, settings)</td>
		<td></td>
	</tr>
	<tr>
		<td>del_perma_option</td>
		<td>function (service_name, settings)</td>
		<td></td>
	</tr>
	<tr>
		<td>get_perma_options</td>
		<td>function (settings)</td>
		<td></td>
	</tr>
	<tr>
		<td>get_perma_option</td>
		<td>function (service_name, settings)</td>
		<td>Only one of the two functions get_perma_options and get_perma_option
		need to be implemented. In that case the respective other needs to be set to
		null.</td>
	</tr>
	<tr>
		<td>perma_option</td>
		<td>on (if the jQuery cookies plugin is installed)</td>
		<td>Possible values: "on" and "off"</td>
	</tr>
	<tr>
		<td>cookie_path</td>
		<td>/</td>
		<td></td>
	</tr>
	<tr>
		<td>cookie_domain</td>
		<td>document.location.hostname</td>
		<td></td>
	</tr>
	<tr>
		<td>cookie_expires</td>
		<td>365</td>
		<td>Days until the cookie expires.</td>
	</tr>
	<tr>
		<td>path_prefix</td>
		<td></td>
		<td>Prefix to all paths (css_path, dummy_line_img, dummy_box_img)</td>
	</tr>
	<tr>
		<td>css_path</td>
		<td>socialshareprivacy/socialshareprivacy.css</td>
		<td></td>
	</tr>
	<tr>
		<td>language</td>
		<td>en</td>
		<td></td>
	</tr>
	<tr>
		<td>uri</td>
		<td>location.href or the value of the link element with the rel attribute "canonical"</td>
		<td>URI of the thing to share that is passed on to the share services.</td>
	</tr>
	<tr>
		<td>title</td>
		<td></td>
		<td>The title to pass to any share service that want's one.</td>
	</tr>
	<tr>
		<td>description</td>
		<td></td>
		<td>The description to pass to any share service that want's one.</td>
	</tr>
	<tr>
		<td>image</td>
		<td></td>
		<td>Image URL to pass to any share service that want's one.</td>
	</tr>
	<tr>
		<td>embed</td>
		<td></td>
		<td>HTML embed code to pass to any share service that want's one.</td>
	</tr>
</tbody>
</table>

### Common Service Options

<table>
<thead>
	<tr>
		<th>Option</th>
		<th>Default Value</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>status</td>
		<td>on</td>
		<td>Possible values: "on" and "off"</td>
	</tr>
	<tr>
		<td>class_name</td>
		<td></td>
		<td>The HTML class of the share button wrapper. Per default it is the key of the
		service as it is registered in jQuery.fn.socialSharePrivacy.settings.services.</td>
	</tr>
	<tr>
		<td>button_class</td>
		<td></td>
		<td>HTML class of the share button. Per default the same as class_name.</td>
	</tr>
	<tr>
		<td>dummy_line_img</td>
		<td></td>
		<td>Placeholder image for deactivated button in "line" layout.</td>
	</tr>
	<tr>
		<td>dummy_box_img</td>
		<td></td>
		<td>Placeholder image for deactivated button in "box" layout.</td>
	</tr>
	<tr>
		<td>dummy_alt</td>
		<td>[Text]</td>
		<td>Alt text of the placeholder image.</td>
	</tr>
	<tr>
		<td>txt_info</td>
		<td>[Text]</td>
		<td>Help text for deactivated button.</td>
	</tr>
	<tr>
		<td>txt_off</td>
		<td>[Text]</td>
		<td>Status text if button is deactivated.</td>
	</tr>
	<tr>
		<td>txt_on</td>
		<td>[Text]</td>
		<td>Status text if button is activated.</td>
	</tr>
	<tr>
		<td>perma_option</td>
		<td>on</td>
		<td>Specifies whether the perma option shall be alowed for a certain service.<br/>
		Possible values: "on" and "off"</td>
	</tr>
	<tr>
		<td>display_name</td>
		<td>[Text]</td>
		<td>Name of the service.</td>
	</tr>
	<tr>
		<td>referrer_track</td>
		<td></td>
		<td>A string that is appended to the URI for this service, so you can track from
		where your users are coming.</td>
	</tr>
	<tr>
		<td>language</td>
		<td></td>
		<td>Override the global language just for this service.</td>
	</tr>
</tbody>
</table>

### Facebook Options

Note that facebook only supports certain languages and requires the region suffix (e.g.
"en\_US"). The facebook service ensures that only supported language strings are sent
to facebook, because otherwise it fails to render anything.

<table>
<thead>
	<tr>
		<th>Option</th>
		<th>Default Value</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>action</td>
		<td>like</td>
		<td></td>
	</tr>
	<tr>
		<td>colorscheme</td>
		<td>light</td>
		<td></td>
	</tr>
</tbody>
</table>

### Flattr Options

<table>
<thead>
	<tr>
		<th>Option</th>
		<th>Default Value</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>title</td>
		<td>jQuery.fn.socialSharePrivacy.getTitle</td>
		<td></td>
	</tr>
	<tr>
		<td>description</td>
		<td>jQuery.fn.socialSharePrivacy.getDescription</td>
		<td></td>
	</tr>
	<tr>
		<td>uid</td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>category</td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>tags</td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>popout</td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>hidden</td>
		<td></td>
		<td></td>
	</tr>
</tbody>
</table>

### Google+ Options

N/A

### Mail Options

<table>
<thead>
	<tr>
		<th>Option</th>
		<th>Default Value</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>subject</td>
		<td>jQuery.fn.socialSharePrivacy.getTitle</td>
		<td></td>
	</tr>
	<tr>
		<td>body</td>
		<td>[Function]</td>
		<td></td>
	</tr>
</tbody>
</table>

### Pinterest Options

<table>
<thead>
	<tr>
		<th>Option</th>
		<th>Default Value</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>title</td>
		<td>jQuery.fn.socialSharePrivacy.getTitle</td>
		<td></td>
	</tr>
	<tr>
		<td>description</td>
		<td>jQuery.fn.socialSharePrivacy.getDescription</td>
		<td></td>
	</tr>
	<tr>
		<td>media</td>
		<td>jQuery.fn.socialSharePrivacy.getImage</td>
		<td></td>
	</tr>
</tbody>
</table>

### Reddit Options

<table>
<thead>
	<tr>
		<th>Option</th>
		<th>Default Value</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>title</td>
		<td>jQuery.fn.socialSharePrivacy.getTitle</td>
		<td></td>
	</tr>
	<tr>
		<td>target</td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>newwindow</td>
		<td>1</td>
		<td></td>
	</tr>
	<tr>
		<td>bgcolor</td>
		<td>transparent</td>
		<td></td>
	</tr>
	<tr>
		<td>bordercolor</td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>css</td>
		<td></td>
		<td></td>
	</tr>
</tbody>
</table>

### Tumblr Options

<table>
<thead>
	<tr>
		<th>Option</th>
		<th>Default Value</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>type</td>
		<td>link</td>
		<td></td>
	</tr>
	<tr>
		<td>name</td>
		<td>jQuery.fn.socialSharePrivacy.getTitle</td>
		<td></td>
	</tr>
	<tr>
		<td>description</td>
		<td>jQuery.fn.socialSharePrivacy.getDescription</td>
		<td></td>
	</tr>
	<tr>
		<td>quote</td>
		<td>[Function]</td>
		<td></td>
	</tr>
	<tr>
		<td>photo</td>
		<td>jQuery.fn.socialSharePrivacy.getImage</td>
		<td></td>
	</tr>
	<tr>
		<td>embed</td>
		<td>jQuery.fn.socialSharePrivacy.getEmbed</td>
		<td></td>
	</tr>
	<tr>
		<td>caption</td>
		<td>jQuery.fn.socialSharePrivacy.getDescription</td>
		<td></td>
	</tr>
</tbody>
</table>

### Twitter Options

https://twitter.com/about/resources/buttons#tweet

<table>
<thead>
	<tr>
		<th>Option</th>
		<th>Default Value</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>text</td>
		<td>jQuery.fn.socialSharePrivacy.getTitle</td>
		<td></td>
	</tr>
	<tr>
		<td>via</td>
		<td></td>
		<td>Twitter user name.</td>
	</tr>
	<tr>
		<td>related</td>
		<td></td>
		<td>Twitter user name.</td>
	</tr>
	<tr>
		<td>hashtags</td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>dnt</td>
		<td>true</td>
		<td>Do not tailor.</td>
	</tr>
</tbody>
</table>

Custom Services
---------------

	(function ($, undefined) {
		$.fn.socialSharePrivacy.settings.services.myservice = {
			/* default values for common service options... */
			'button': function (options, uri, settings) {
				return $('<iframe scrolling="no" frameborder="0" allowtransparency="true"></iframe>').attr(
					'src', 'http://myservice.example/?' + $.param({
						url: uri + options.referrer_track
					});
			}
		};
	})(jQuery);

### jQuery.fn.socialSharePrivacy.*

Some helper functions that might be handy to use in your custom service.

 * absurl(url [, baseurl])
 * abbreviateText(text, length)
 * escapeHtml(text)
 * .getTitle(options, uri, settings)
 * .getImage(options, uri, settings)
 * .getEmbed(options, uri, settings)
 * .getDescription(options, uri, settings)
