Social Share Privacy
====================

Social Share Privacy is a jQuery plugin that lets you add social share buttons
to your website that don't allow the social sites to track your users. The buttons
are first disabled and a user needs to click them to enable them. So in order to
e.g. like a site on facebook with these social share buttons a user needs to click
two times. But in return for this extra click a user can only be tracked be this
third party sites when he decides to enable the buttons. Using the settings menu
a user can also permanently enable a social share button.

Supported share services:

 * [Buffer](#buffer-options-buffer)
 * [Delicious](#delicious-options-delicious)
 * [Disqus](#disqus-options-disqus)
 * [EMail](#email-options-mail)
 * [Facebook Like/Recommend](#facebook-like-recommend-options-facebook)
 * [Facebook Share](#facebook-share-options-fbshare)
 * [Flattr](#flattr-options-flattr)
 * [Google+](#google-options-gplus)
 * [Hacker News](#hacker-news-options-hackernews)
 * [Linked in](#linked-in-options-linkedin)
 * [Pinterest](#pinterest-options-pinterest)
 * [reddit](#reddit-options-reddit)
 * [Stumble Upon](#stumble-upon-options-stumbleupon)
 * [Tumblr](#tumblr-options-tumblr)
 * [Twitter](#twitter-options-twitter)
 * [XING](#xing-options-xing)

Note that Tumblr and email are just normal links and thus always enabled.

This is a fork of socialSharePrivacy by Heise. In this fork the service support
was made extensible, some services where added and some bugs fixed. It has some
incompatible changes, though (consolidated option names, use of the boolean values
`true` and `false` instead of the strings `"on"` and `"off"` etc.).

The original can be found here:
[http://www.heise.de/extras/socialshareprivacy/](http://www.heise.de/extras/socialshareprivacy/)

The Delicious support was heavily inspired by the delicious button jQuery plugin:
[http://code.google.com/p/delicious-button/](http://code.google.com/p/delicious-button/)  
The style for this button was atually copied and only slightly adapted from this plugin.

Overview
--------

 * [Dependencies](#dependencies)
 * [How to use](#how-to-use)
 * [Methods](#methods)
 * [Events](#events)
 * [Options](#options)
  * [Global Options](#global-options)
  * [Common Service Options](#common-service-options)
 * [Custom Services](#custom-services)
 * [Helper Functions](#helper-functions-jqueryfnsocialshareprivacy)
 * [Build.sh](#buildsh)
 * [Known Issues](#known-issues)
 * [License](#license)

<span id="dependencies">Dependencies</span>
-------------------------------------------

 * [jQuery](http://jquery.com/)
 * [jQuery cookies plugin](https://github.com/panzi/jQuery-Cookies) (optional)
 * [uglifyjs](https://npmjs.org/package/uglify-js) (for [build.sh](#buildsh))
 * [uglifycss](https://npmjs.org/package/uglifycss) (for [build.sh](#buildsh))

The jQuery cookies plugin is needed in order to enable services permanently.
However, you can plug in you own replacement to store this options differently
(e.g. via ajax in the user profile or in the browsers local store). For an
example that stores the perma options in HTML5 local storage instead of cookies
see the file
[localstorage.js](https://github.com/panzi/SocialSharePrivacy/blob/master/javascripts/localstorage.js).

<span id="how-to-use">How to use</span>
----------------------------------------

```html
<html>
<head>
…
<script type="text/javascript" src="jquery.js"></script> 
<script type="text/javascript" src="jquery.socialshareprivacy.min.js"></script>
<script type="text/javascript">
$(document).ready(function () {
	$('.share').socialSharePrivacy();
});
</script>
…
</head>
<body>
…
<div class="share"></div>
…
</body>
</html>
```

You only need to include the JavaScript files of the services you want to use. I
recommend to pack all needed files into one using a JavaScript packer/compressor.
The included [pack.sh](#packsh) script can do that for you, if you've got
[uglifyjs](https://npmjs.org/package/uglify-js) and [uglifycss](https://npmjs.org/package/uglifycss)
installed.

However, for your convenience I provide these precompiled versions of the scripts:

 * [jquery.socialshareprivacy.min.js](http://panzi.github.io/SocialSharePrivacy/javascripts/jquery.socialshareprivacy.min.js) <sup>1</sup>
 * [jquery.socialshareprivacy.min.autoload.js](http://panzi.github.io/SocialSharePrivacy/javascripts/jquery.socialshareprivacy.min.autoload.js) <sup>2</sup>
 * [jquery.socialshareprivacy.min.de.js](http://panzi.github.io/SocialSharePrivacy/javascripts/jquery.socialshareprivacy.min.de.js) <sup>3</sup>
 * [jquery.socialshareprivacy.min.es.js](http://panzi.github.io/SocialSharePrivacy/javascripts/jquery.socialshareprivacy.min.es.js) <sup>3</sup>
 * [jquery.socialshareprivacy.min.fr.js](http://panzi.github.io/SocialSharePrivacy/javascripts/jquery.socialshareprivacy.min.fr.js) <sup>3</sup>
 * [jquery.socialshareprivacy.min.it.js](http://panzi.github.io/SocialSharePrivacy/javascripts/jquery.socialshareprivacy.min.it.js) <sup>3</sup>
 * [jquery.socialshareprivacy.min.nl.js](http://panzi.github.io/SocialSharePrivacy/javascripts/jquery.socialshareprivacy.min.nl.js) <sup>3</sup>
 * [jquery.socialshareprivacy.min.pl.js](http://panzi.github.io/SocialSharePrivacy/javascripts/jquery.socialshareprivacy.min.pl.js) <sup>3</sup>
 * [jquery.socialshareprivacy.min.pt.js](http://panzi.github.io/SocialSharePrivacy/javascripts/jquery.socialshareprivacy.min.pt.js) <sup>3</sup>
 * [jquery.socialshareprivacy.min.ru.js](http://panzi.github.io/SocialSharePrivacy/javascripts/jquery.socialshareprivacy.min.ru.js) <sup>3</sup>
 * [jquery.socialshareprivacy.min.css](http://panzi.github.io/SocialSharePrivacy/stylesheets/jquery.socialshareprivacy.min.css)

1 This file contains all JavaScripts except the `jquery.socialshareprivacy.localstorage.js` module and the translations.  
2 This file contains the same as 1, but it also automatically initializes elements with the attribute `data-social-share-privacy="true"` set.  
3 These files contain only translation strings and have to be included in addition to `jquery.socialshareprivacy.min.js`.

You can also asynchronously load the buttons if you use the `jquery.socialshareprivacy.min.autoload.js` script:

```html
<html>
<head>
…
<script type="text/javascript" src="jquery.js"></script>
…
</head>
<body>
…
<div data-social-share-privacy="true"></div>
…
<div data-social-share-privacy="true"></div>
…
<script type="text/javascript">
(function () {
	var s = document.createElement('script');
    var t = document.getElementsByTagName('script')[0];

	s.type = 'text/javascript';
	s.async = true;
	s.src = 'jquery.socialshareprivacy.min.autoload.js';
	
    t.parentNode.insertBefore(s, t);
})();
</script>
</body>
</html>
```

<span id="methods">Methods</span>
---------------------------------

### socialSharePrivacy

```javascript
.socialSharePrivacy([options])
```

Add social share buttons to all elements in the set. Returns `this`.

### destroy

```javascript
.socialSharePrivacy("destroy")
```
Remove all social share buttons. This will return all elements in the set back
to their pre-init state. Returns `this`.

### disable

```javascript
.socialSharePrivacy("disable", [service_name])
```

Disable the named service or disable all services if no `service_name` is given.
Returns `this`.

### disabled

```javascript
.socialSharePrivacy("disabled", [service_name])
```

Returns `true` if the given service is disabled, `false` otherwise. If
`service_name` is not given then it will return an object that maps
service names to their disabled-value.

### enable

```javascript
.socialSharePrivacy("enable", [service_name])
```

Enable the named service or enable all services if no `service_name` is given.
Returns `this`.

### enabled

```javascript
.socialSharePrivacy("enabled", [service_name])
```

Returns `true` if the given service is enabled, `false` otherwise. If
`service_name` is not given then it will return an object that maps
service names to their enabled-value.

### option

```javascript
.socialSharePrivacy("option", option_name, [value])
```

Get or set an option. If no `value` is specified it will act as a getter.
Returns `this` when acting as setter.

### options

```javascript
.socialSharePrivacy("options", [options])
```

Get or set all options. If no `options` are specified it will act as a getter.
Returns `this` when acting as setter.

### toggle

```javascript
.socialSharePrivacy("toggle", [service_name])
```

Toggle the named service or toggle all services if no `service_name` is given.
Returns `this`.

<span id="events">Events</span>
-------------------------------

### socialshareprivacy:create

This event is emitted after the `socialSharePrivacy` method created a Social
Share privacy widget. The event object will have an `options` attribute holding
the option object of the initialized widget.

### socialshareprivacy:destroy

This event is emitted before a Social Share Privacy widget is destroyed.

### socialshareprivacy:disable

This event is emitted after a certain service was disabled. The event object
will have a `serviceName` property, holding the name of the service that was
disabled, and an `isClick` property, wich is `true` if a click by a user caused
this event (`false` if it was disabled via JavaScript).

### socialshareprivacy:enable

This event is emitted after a certain service was enabled. The event object
will have a `serviceName` property, holding the name of the service that was
enabled, and an `isClick` property, wich is `true` if a click by a user caused
this event (`false` if it was enabled via JavaScript).

<span id="options">Options</span>
---------------------------------

Options can be set globally via `$.fn.socialSharePrivacy.settings`, via an
options object passed to the `socialSharePrivacy` function or via `data-*`
attributes of the share element. If options are defined in more than one way
the `data-*` attributes will overwrite the options from the passed options
object and the options from passed options object will overwrite the
globally defined options.

### `data-*` attributes

In order to pass the options as `data-*` attributes simply prepend `data-` to
all option names. For the language option you can also use the standard `lang`
attribute. If you want to set an option of an service just use a `data-*`
attribute that includes dots (`.`) as if it where a JavaScript property
expression:

```html
<div class="share"
	lang="de"
	data-uri="http://example.com/"
	data-image="http://example.com/image.png"
	data-services.tumblr.type="photo"
	data-order="facebook twitter tumblr"></div>
```

If you want you can combine all options of a service and pass a JSON string as
attribute value:

```html
<div class="share"
	lang="de"
	data-uri="http://example.com/"
	data-image="http://example.com/image.png"
	data-services.tumblr='{"type":"photo"}'
	data-order="facebook twitter tumblr"></div>
```

You can also do this for all services:

```html
<div class="share"
	lang="de"
	data-uri="http://example.com/"
	data-image="http://example.com/image.png"
	data-services='{"tumblr":{"type":"photo"}}'
	data-order="facebook twitter tumblr"></div>
```

Or even all options at once:

```html
<div class="share"
	data-options='{
		"language" : "de",
		"uri"      : "http://example.com/",
		"image"    : "http://example.com/image.png",
		"services" : {
			"tumblr" : {
				"type" : "photo"
			}
		},
		"order"    : ["facebook", "twitter", "tumblr"]
	}'></div>
```

Actually these aren't JSON objects but JavaScript expressions. This way
you can pass JavaScript code that will evaluate the option values when the
`socialSharePrivacy` function is called. You can even pass a whole new
service implementation inline, if you want:

```html
<div class="share"
	data-options="{
		language : document.documentElement.lang,
		title    : document.title,
		services : {
			my_inline_service : {
				status         : true,
				dummy_line_img : 'dummy.png',
				dummy_alt      : 'DISABLED',
				display_name   : 'My Inline Service',
				txt_info       : 'Click to enable.',
				perma_option   : true,
				button         : function (options, uri, settings) {
					return $('<div>ENABLED</div>');
				}
			}
		}
	}"></div>
```

The main advantage of using the `data-*` attributes is, that you can easily
render several *different* share elements on your webserver and then initialize
them with one single JavaScript function call (no need for uniqe element IDs
and separate JavaScript calls for each element).

**NOTE:** When passing service options via `data-*` attributes all option
values (except the common service options) are treated as strings. If you
need to pass values of other types (numbers, booleans, arrays or functions)
you need to use the JavaScript object syntax.

### <span id="global-options">Global Options</span>

Set these options like this:

```javascript
$.fn.socialSharePrivacy.settings.title = "Title of the thing to share.";
…
```

Or like this:

```html
<script type="application/x-social-share-privacy-settings">
{
	path_prefix: "/socialshareprivacy",
	css_path:    "socialshareprivacy.css",
	…
}
</script>
```

The version using `script` tags uses again JavaScript expressions to enable
inline service definitions.

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
<td><a href="http://panzi.github.io/SocialSharePrivacy/">http://panzi.github.io/SocialSharePrivacy/</a></td>
<td>The link of the <em>i</em>-icon that links users to more information about this.</td>
</tr>
<tr>
<td>info_link_target</td>
<td></td>
<td>The target attribute of the info link. Possible values are <code>_blank</code>,
<code>_self</code>, <code>_parent</code>, <code>_top</code> or a frame name.</td>
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
<td>Possible values: <code>line</code> or <code>box</code></td>
</tr>
<tr>
<td>set_perma_option</td>
<td>function (service_name, settings)</td>
<td>Function that stores the perma setting of the service specified by service_name.</td>
</tr>
<tr>
<td>del_perma_option</td>
<td>function (service_name, settings)</td>
<td>Function that removes the perma setting of the service specified by service_name.</td>
</tr>
<tr>
<td>get_perma_options</td>
<td>function (settings)</td>
<td>Function that gets the perma setting of all services in an object where the keys are
the service names and the values are boolean. Services that are missing are assumed as
false.</td>
</tr>
<tr>
<td>get_perma_option</td>
<td>function (service_name, settings)</td>
<td>Function that gets the perma setting of the service specified by service_name.
Returns a boolean value.<br/>
<br/>
Only one of the two functions get_perma_options and get_perma_option
need to be implemented. In that case the respective other needs to be set to
null.</td>
</tr>
<tr>
<td>perma_option</td>
<td>true (if the jQuery cookies plugin is installed)</td>
<td>Give users the posibility to permanently enable services. (Boolean)</td>
</tr>
<tr>
<td>cookie_path</td>
<td>/</td>
<td></td>
</tr>
<tr>
<td>cookie_domain</td>
<td><code>document.location.hostname</code></td>
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
<td>[Function]</td>
<td>URI of the thing to share that is passed on to the share services. The default function
uses the value of the first <code>link</code> element with the <code>rel</code> attribute
<code>canonical</code> or the first <code>meta</code> element with the <code>property</code>
attribute <code>og:url</code> it can find or <code>location.href</code> if there are no such
elements. (Function or string)</td>
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
<tr>
<td>ignore_fragment</td>
<td>true</td>
<td>Ignore the <code>#fragment</code> part of the url. (Boolean)</td>
</tr>
</tbody>
</table>

### <span id="common-service-options">Common Service Options</span>

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
<td>true</td>
<td>Enable/disable this service. (Boolean)</td>
</tr>
<tr>
<td>class_name</td>
<td>[service specific]</td>
<td>The HTML class of the share button wrapper. Per default it is the key of the
service as it is registered in <code>jQuery.fn.socialSharePrivacy.settings.services</code>.</td>
</tr>
<tr>
<td>button_class</td>
<td></td>
<td>HTML class of the share button. Per default the same as class_name.</td>
</tr>
<tr>
<td>dummy_line_img</td>
<td></td>
<td>Placeholder image for deactivated button in <code>line</code> layout.</td>
</tr>
<tr>
<td>dummy_box_img</td>
<td></td>
<td>Placeholder image for deactivated button in <code>box</code> layout.</td>
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
<td>true</td>
<td>Give users the posibility to permanently enable this service.<br/>
(Boolean)</td>
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
<tr>
<td>path_prefix</td>
<td></td>
<td>Override the global <code>path_prefix</code> just for this service.</td>
</tr>
</tbody>
</table>

### <span id="buffer-options-buffer">Buffer Options</span> (`buffer`)

See also: [official documentation](http://bufferapp.com/extras/button)

Example:

```javascript
$(document).ready(function () {
	$('#share').socialSharePrivacy({
		services: {
			buffer: {
				text : 'Some descriptive text...'
			}
		}
	});
});
```

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
<td><a href="#gettitleoptions-uri-settings">jQuery.fn.socialSharePrivacy.getTitle</a></td>
<td>Tweet text (excluding the URL). It will be truncated to 120 characters, leaving
place for 20 characters for the shortened URL. (Function or string)</td>
</tr>
<tr>
<td>via</td>
<td></td>
<td>Twitter username (without the leading <code>@</code>). (Function or string)</td>
</tr>
<tr>
<td>picture</td>
<td><a href="#getimageoptions-uri-settings">jQuery.fn.socialSharePrivacy.getImage</a></td>
<td>URL of image that represents the thing to share. (Function or string)</td>
</tr>
</tbody>
</table>


### <span id="delicious-options-delicious">Delicious Options</span> (`delicious`)

See also: [official documentation](http://delicious.com/tools)

Example:

```javascript
$(document).ready(function () {
	$('#share').socialSharePrivacy({
		services: {
			delicious: {
				title : 'Bookmark title'
			}
		}
	});
});
```

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
<td><a href="#gettitleoptions-uri-settings">jQuery.fn.socialSharePrivacy.getTitle</a></td>
<td>Title of the new bookmark. (Function or string)</td>
</tr>
</tbody>
</table>

### <span id="disqus-options-disqus">Disqus Options</span> (`disqus`)

See also: [official documentation](http://socialshareprivacy.disqus.com/admin/universal/)

**WARNING:** This is a hack. Using this Disqus button will break any usage of the comment
count code as shown on the linked page above. This button does of course not interfere
with the main Disqus widget.

Example:

```javascript
$(document).ready(function () {
	$('#share').socialSharePrivacy({
		services: {
			disqus: {
				shortname : 'myforumshortname',
				count     : 'reactions'
			}
		}
	});
});
```

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
<td>shortname</td>
<td></td>
<td>Your Disqus forum shortname. If an empty string is given it tries to use
<code>window.disqus_shortname</code>. (String)</td>
</tr>
<tr>
<td>count</td>
<td>comments</td>
<td>What count to show.<br/>
Possible values: <code>comments</code> or <code>reactions</code></td>
</tr>
<tr>
<td>onclick</td>
<td></td>
<td>Function to call when the Disqus button was clicked. (Function or String)</td>
</tr>
</tbody>
</table>

### <span id="email-options-mail">EMail Options</span> (`mail`)

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
<td><a href="#gettitleoptions-uri-settings">jQuery.fn.socialSharePrivacy.getTitle</a></td>
<td>Subject of the new email. (Function or string)</td>
</tr>
<tr>
<td>body</td>
<td>[Function]</td>
<td>Body of the new email. (Function or string)</td>
</tr>
</tbody>
</table>

### <span id="facebook-like-recommend-options-facebook">Facebook Like/Recommend Options</span> (`facebook`)

Note that facebook only supports certain languages and requires the region suffix (e.g.
`en_US`). The facebook service ensures that only supported language strings are sent
to facebook, because otherwise facebook fails to render anything.

See also: [official documentation](https://developers.facebook.com/docs/reference/plugins/like/)

Example:

```javascript
$(document).ready(function () {
	$('#share').socialSharePrivacy({
		services: {
			facebook: {
				action      : 'recommend',
				colorscheme : 'dark'
			}
		}
	});
});
```

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
<td>Possible values: <code>like</code> or <code>recommend</code></td>
</tr>
<tr>
<td>colorscheme</td>
<td>light</td>
<td>Possible values: <code>light</code> or <code>dark</code></td>
</tr>
<tr>
<td>font</td>
<td></td>
<td>Possible values: <code>arial</code>, <code>lucida grande</code>, <code>segoe ui</code>, <code>tahoma</code>,
<code>trebuchet ms</code> or <code>verdana</code></td>
</tr>
</tbody>
</table>

### <span id="facebook-share-options-facebook">Facebook Share Options</span> (`fbshare`)

There are no Facebook Share specific options.

See also: [official documentation](https://developers.facebook.com/docs/plugins/share/)

### <span id="flattr-options-flattr">Flattr Options</span> (`flattr`)

See also: [official documentation](http://developers.flattr.net/button/)

Example:
```javascript
$(document).ready(function () {
	$('#share').socialSharePrivacy({
		services: {
			flattr: {
				uid      : 'yourflattrid',
				category : 'Text'
			}
		}
	});
});
```

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
<td><a href="#gettitleoptions-uri-settings">jQuery.fn.socialSharePrivacy.getTitle</a></td>
<td>Title of the thing to share. (Function or string)</td>
</tr>
<tr>
<td>description</td>
<td><a href="#getdescriptionoptions-uri-settings">jQuery.fn.socialSharePrivacy.getDescription</a></td>
<td>Description of the thing to share. (Function or string)</td>
</tr>
<tr>
<td>uid</td>
<td></td>
<td>Flattr username.</td>
</tr>
<tr>
<td>category</td>
<td></td>
<td>Possible values: <code>text</code>, <code>images</code>, <code>video</code>, <code>audio</code>,
<code>software</code>, <code>people</code> or <code>rest</code></td>
</tr>
<tr>
<td>tags</td>
<td></td>
<td>Multiple tags are seperated by a comma <code>,</code>. Only alpha characters are supported in tags.</td>
</tr>
<tr>
<td>popout</td>
<td></td>
<td>When set to <code>0</code> no popout will appear when the Flattr button is hovered.</td>
</tr>
<tr>
<td>hidden</td>
<td></td>
<td>When set to <code>1</code> your content will not be publicly listed on Flattr.</td>
</tr>
</tbody>
</table>

### <span id="google-options-gplus">Google+ Options</span> (`gplus`)

There are no Google+ specific options.

See also: [official documentation](http://www.google.com/webmasters/+1/button/)

### <span id="hacker-news-options-hackernews">Hacker News Options</span> (`hackernews`)

See also: [HNSearch API documentation](http://www.hnsearch.com/api)

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
<td><a href="#gettitleoptions-uri-settings">jQuery.fn.socialSharePrivacy.getTitle</a></td>
<td>Title of the news to share. (Function or string)</td>
</tr>
</tbody>
</table>

### <span id="pinterest-options-pinterest">Pinterest Options</span> (`pinterest`)

See also: [official documentation](http://business.pinterest.com/widget-builder/#do_pin_it_button)

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
<td><a href="#gettitleoptions-uri-settings">jQuery.fn.socialSharePrivacy.getTitle</a></td>
<td>Title of the thing to share. (Function or string)</td>
</tr>
<tr>
<td>description</td>
<td><a href="#getdescriptionoptions-uri-settings">jQuery.fn.socialSharePrivacy.getDescription</a></td>
<td>Description of the thing to share. (Function or string)</td>
</tr>
<tr>
<td>media</td>
<td><a href="#getimageoptions-uri-settings">jQuery.fn.socialSharePrivacy.getImage</a></td>
<td>URL of image that represents the thing to share. (Function or string)</td>
</tr>
</tbody>
</table>

### <span id="linked-in-options-linkedin">Linked in Options</span> (`linkedin`)

See also: [official documentation](http://developer.linkedin.com/share-plugin)

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
<td>onsuccess</td>
<td></td>
<td>Name of a callback function that shall invoked when the link was successfully shared.
The shared url will be passed as a parameter. (String)</td>
</tr>
<tr>
<td>onerror</td>
<td></td>
<td>Name of a callback function that shall invoked if link sharing failed.
The shared url will be passed as a parameter. (String)</td>
</tr>
<tr>
<td>showzero</td>
<td>false</td>
<td>Even show count and no placeholder if there are zero shares. (Boolean)</td>
</tr>
</tbody>
</table>

### <span id="reddit-options-reddit">Reddit Options</span> (`reddit`)

See also: [official documentation](http://www.reddit.com/buttons/)

Example:

```javascript
$(document).ready(function () {
	$('#share').socialSharePrivacy({
		services: {
			reddit: {
				newwindow : false,
				bgcolor   : '#ffff00'
			}
		}
	});
});
```

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
<td><a href="#gettitleoptions-uri-settings">jQuery.fn.socialSharePrivacy.getTitle</a></td>
<td>Title of the thing to share. (Function or string)</td>
</tr>
<tr>
<td>target</td>
<td></td>
<td>A cummunity to target.</td>
</tr>
<tr>
<td>newwindow</td>
<td>1</td>
<td>Opens reddit in a new window when set to <code>1</code>. Set this option to an empty string or
anything that evaluates to false to open reddit in the same window.</td>
</tr>
<tr>
<td>bgcolor</td>
<td>transparent</td>
<td>HTML color.</td>
</tr>
<tr>
<td>bordercolor</td>
<td></td>
<td>HTML color.</td>
</tr>
</tbody>
</table>

### <span id="stumble-upon-options-stumbleupon">Stumble Upon Options</span> (`stumbleupon`)

There are no Stumble Upon specific options.

See also: [official documentation](http://www.stumbleupon.com/dt/badges/create)

### <span id="tumblr-options-tumblr">Tumblr Options</span> (`tumblr`)

See also: [official documentation](http://www.tumblr.com/docs/en/buttons)

Example:

```javascript
$(document).ready(function () {
	$('#share').socialSharePrivacy({
		services: {
			tumblr: {
				type  : 'photo',
				photo : 'http://example.com/example.png'
			}
		}
	});
});
```

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
<td>Possible values: <code>link</code>, <code>quote</code>, <code>photo</code> or <code>video</code></td>
</tr>
<tr>
<td>name</td>
<td><a href="#gettitleoptions-uri-settings">jQuery.fn.socialSharePrivacy.getTitle</a></td>
<td>Title of the thing to share. (Function or string)<br/>
<br/>
This option is only defined for the type <code>link</code>.</td>
</tr>
<tr>
<td>description</td>
<td><a href="#getdescriptionoptions-uri-settings">jQuery.fn.socialSharePrivacy.getDescription</a></td>
<td>Description of the thing to share. (Function or string)<br/>
<br/>
This option is only defined for the type <code>link</code>.</td>
</tr>
<tr>
<td>quote</td>
<td>[Function]</td>
<td>Quote to share. (Function or string)<br/>
<br/>
This option is only defined for the type <code>quote</code>.</td>
</tr>
<tr>
<td>photo</td>
<td><a href="#getimageoptions-uri-settings">jQuery.fn.socialSharePrivacy.getImage</a></td>
<td>Image URL of the thing to share. (Function or string)<br/>
<br/>
This option is only defined for the type <code>photo</code>.</td>
</tr>
<tr>
<td>clickthrou</td>
<td>[Function]</td>
<td>The URL to where you get when you click the image. Per default it's the
shared URI including the referrer_track. (Function or string)<br/>
<br/>
This option is only defined for the type <code>photo</code>.</td>
</tr>
<tr>
<td>embed</td>
<td><a href="#getembedoptions-uri-settings">jQuery.fn.socialSharePrivacy.getEmbed</a></td>
<td>Embed code of the thing to share. (Function or string)<br/>
<br/>
This option is only defined for the type <code>video</code>.</td>
</tr>
<tr>
<td>caption</td>
<td><a href="#getdescriptionoptions-uri-settings">jQuery.fn.socialSharePrivacy.getDescription</a></td>
<td>Caption of the thing to share. (Function or string)<br/>
<br/>
This option is only defined for the types <code>photo</code> and <code>video</code>.</td>
</tr>
</tbody>
</table>

### <span id="twitter-options-twitter">Twitter Options</span> (`twitter`)

See also: [official documentation](https://twitter.com/about/resources/buttons#tweet)

Example:

```javascript
$(document).ready(function () {
	$('#share').socialSharePrivacy({
		services: {
			twitter: {
				hashtags : 'win'
			}
		}
	});
});
```

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
<td><a href="#gettitleoptions-uri-settings">jQuery.fn.socialSharePrivacy.getTitle</a></td>
<td>Tweet text (excluding the URL). It will be truncated to 120 characters, leaving
place for 20 characters for the shortened URL. (Function or string)</td>
</tr>
<tr>
<td>via</td>
<td></td>
<td>Twitter username (without the leading <code>@</code>).</td>
</tr>
<tr>
<td>related</td>
<td></td>
<td>Twitter username (without the leading <code>@</code>).</td>
</tr>
<tr>
<td>hashtags</td>
<td></td>
<td>Hashtag to add to the tweet (without the leading <code>#</code>).</td>
</tr>
<tr>
<td>dnt</td>
<td>true</td>
<td>Do not tailor.</td>
</tr>
</tbody>
</table>

### <span id="xing-options-xing">XING Options</span> (`xing`)

There are no XING specific options.

Note that the view counter will not work unless the XING button is enabled by the
user.

See also: [official documentation](https://www.xing.com/app/share?op=button_builder)

<span id="custom-services">Custom Services</span>
-------------------------------------------------

```javascript
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
```

### <span id="helper-functions-jqueryfnsocialshareprivacy">Helper Functions</span> (`jQuery.fn.socialSharePrivacy.*`)

Some helper functions that might be handy to use in your custom service.

#### <span id="absurlurl--baseurl">absurl(url [, baseurl])</span>

Build an absolute url using a base url.
The provided base url has to be a valid absolute url. It will not be validated!
If no base url is given the documents base url/location is used.
Schemes that behave other than http might not work.
This function tries to support `file:`-urls, but might fail in some cases.
`email:`-urls aren't supported at all (don't make sense anyway).

#### <span id="abbreviatetexttext-length">abbreviateText(text, length)</span>

Abbreviate at last blank before length and add `"\u2026"` (…, horizontal ellipsis).
The length is the number of UTF-8 encoded bytes, not the number of unicode code
points, because twitters 140 "characters" are actually bytes.

#### <span id="escapehtmltext">escapeHtml(text)</span>

Escapes text so it can be used safely in HTML strings.

<table>
<thead>
<tr>
<th>Character</th>
<th>Replacement</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>&lt;</code></td>
<td><code>&amp;lt;</code></td>
</tr>
<tr>
<td><code>&gt;</code></td>
<td><code>&amp;gt;</code></td>
</tr>
<tr>
<td><code>&amp;</code></td>
<td><code>&amp;amp;</code></td>
</tr>
<tr>
<td><code>"</code></td>
<td><code>&amp;quot;</code></td>
</tr>
<tr>
<td><code>'</code></td>
<td><code>&amp;#39;</code></td>
</tr>
</tbody>
</table>

#### <span id="formatnumber-number">formatNumber(number)</span>

Format a number to be displayed in a typical number bubble. It will
abbreviate numbers bigger than 9999 using the `K` suffix, rounding the
number to the closest thousand and it inserts thousands delimeter
characters.

Example:

```javascript
$.fn.socialSharePrivacy.formatNumber(1234)    => "1,234"
$.fn.socialSharePrivacy.formatNumber(12345)   => "12K"
$.fn.socialSharePrivacy.formatNumber(1234567) => "1,235K"
```

#### <span id="gettitleoptions-uri-settings">getTitle(options, uri, settings)</span>

Lookup title of shared thing in several places:

 * `settings.title`, which may be a string or a function with the same parameters.
 * `$('meta[name="DC.title"]').attr('content') + ' - ' + $('meta[name="DC.creator"]').attr('content')`
 * `$('meta[name="DC.title"]').attr('content')`
 * `$('meta[property="og:title"]').attr('content')`
 * `$('title').text()`

The element of the share button is passed as `this`.

#### <span id="getimageoptions-uri-settings">getImage(options, uri, settings)</span>

Lookup image URL of shared thing in several places:

 * `settings.image`, which may be a string or a function with the same parameters.
 * `$('meta[property="image"], meta[property="og:image"], meta[property="og:image:url"], ' +`<br/>
   `'meta[name="twitter:image"], link[rel="image_src"], itemscope *[itemprop="image"]').`<br/>
   `first().attr('content'` / `'src'` / `'href')`
 * `$('img').filter(':visible').filter(function () { return $(this).parents('.social_share_privacy_area').length === 0; })`,
   using the image with the biggest area.
 * `$('link[rel~="shortcut"][rel~="icon"]').attr('href')`
 * `'http://www.google.com/s2/favicons?'+$.param({domain:location.hostname})`

The element of the share button is passed as `this`.

#### <span id="getembedoptions-uri-settings">getEmbed(options, uri, settings)</span>

Lookup image URL of shared thing in several places:

 * `settings.embed`, which may be a string or a function with the same parameters.

If there is no embed code found it will construct it's own embed code. For this it
first searches for a meta element with the name `twitter:player` and use it's
content as the `src` of an iframe element. If meta tags with the names
`twitter:player:width` and `twitter:player:height` are found they are used for the
width and height attributes of the iframe. If no `twitter:player` meta elements is
found the url of the current page will be used as the iframe `src`
(`uri + options.referrer_track`).

The element of the share button is passed as `this`.

#### <span id="getdescriptionoptions-uri-settings">getDescription(options, uri, settings)</span>

Lookup description of shared thing in several places:

 * `settings.description`, which may be a string or a function with the same parameters.
 * `$('meta[name="twitter:description"]').attr('content')`
 * `$('meta[itemprop="description"]').attr('content')`
 * `$('meta[name="description"]').attr('content')`
 * `$('article, p').first().text()`
 * `$('body').text()`

If not defined in `settings.description` the found text is truncated at 3500 bytes.

The element of the share button is passed as `this`.

<span id="buildsh">Build.sh</span>
----------------------------------

You can use `build.sh` to pack the modules and languages you want. This requires
[uglifyjs](https://npmjs.org/package/uglify-js) and
[uglifycss](https://npmjs.org/package/uglifycss) to be installed.

Example:

```sh
./build.sh -m twitter,facebook,gplus -l de,fr
```

This generates these files:

```
build/jquery.socialshareprivacy.min.js
build/jquery.socialshareprivacy.min.autoload.js
build/jquery.socialshareprivacy.min.de.js
build/jquery.socialshareprivacy.min.fr.js
build/jquery.socialshareprivacy.min.css
```

These files then contain only the JavaScript/CSS code for Twitter, Facebook and Google+.
`jquery.socialshareprivacy.min.de.js` and `jquery.socialshareprivacy.min.fr.js` only
contain translation strings, so you need to include them after `jquery.socialshareprivacy.min.js`
in your HTML document.

### Usage

	Usage:
	 ./build.sh [options]
	
	Options:
	 -h              Print this help message.
	 -m <modules>    Comma separated list of JavaScript modules to pack. Possible values:
	                     all, none, buffer, delicious, disqus, facebook, flattr,
	                     gplus, hackernews, linkedin, mail, pinterest, reddit,
	                     stumbleupon, tumblr, twitter, xing
	                 default: all
	
	 -l <languages>  Comma separated list of languages to pack. Possible values:
	                     all, none, de, es, fr, nl, pl, pt, ru
	                 default: all
	
	 -a <enabled>    Autoload. Possible values: on, off (default: on)
	 -c <enabled>    Pack stylesheets. Possible values: on, off (default: on)
	 -i <enabled>    Pack images. Possible values: on, off (default: on)
	 -p <path>       Prefix to stylesheet and dummy image paths. (empty per default)
	 -s <path>       Stylesheet path in the generated JavaScript file.
	                 default: stylesheets/jquery.socialshareprivacy.min.css
	 -o <directory>  Output directory. (default: build)

<span id="known-issues">Known Issues</span>
-------------------------------------------

In Internet Explorer <= 8 the Disqus widget doesn't work the first time you enable it.
You have to disable and then enable it again. I could not figure out what might cause
this.

It is recommended to declare a compatibility mode of Internet Explorer >= 9. E.g. add
this to the head of your HTML documents:

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
```

Internet Explorer <= 7 is not supported.

<span id="license">License</span>
---------------------------------

Most of this plugin is licensed under the [MIT license](http://www.opensource.org/licenses/mit-license.php):

Copyright (c) 2012 Mathias Panzenböck  
Copyright (c) 2011 Hilko Holweg, Sebastian Hilbig, Nicolas Heiringhoff,
Juergen Schmidt, Heise Zeitschriften Verlag GmbH & Co. KG, http://www.heise.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

The file `stylesheets/jquery.socialshareprivacy.delicious.css` is licensed under
the Apache License, Version 2.0:

Copyright (c) 2012 Mathias Panzenböck  
Copyright (c) 2010 [Mike @ moretechtips.net]

Licensed under the Apache License, Version 2.0 (the "License");  
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

> [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
