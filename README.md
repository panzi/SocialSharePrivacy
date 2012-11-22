Social Share Privacy
====================

Social Share Privacy is a jQuery plugin that lets you add social share buttons
to your website that don't allow the social sites to track your users. The buttons
are first disabled and a user needs to click them to enable them. So in order to
e.g. like a site on facebook with these social share buttons a user needs to click
tow times. But in return for this extra click a user can only be tracked be this
third party sites when he decides to enable the buttons. Using the settings menu
a user can also permanently enable a social share button.

Supported share services:

 * [Buffer](#buffer-options-buffer)
 * [Disqus](#disqus-options-disqus)
 * [EMail](#email-options-mail)
 * [Facebook](#facebook-options-facebook)
 * [Flattr](#flattr-options-flattr)
 * [Google+](#google-options-gplus)
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
incompatible changes, though (consolidated option names).

The original can be found here:
[http://www.heise.de/extras/socialshareprivacy/](http://www.heise.de/extras/socialshareprivacy/)

Dependencies
------------

 * jQuery: [http://jquery.com/](http://jquery.com/)
 * jQuery cookies plugin (optional): [https://github.com/panzi/jQuery-Cookies](https://github.com/panzi/jQuery-Cookies)

The jQuery cookies plugin is needed in order to enable services permanently.
However, you can plug in you own replacement to store this options differently
(e.g. via ajax in the user profile or in the browsers local store). For an
example that stores the perma options in HTML5 local storage instead of cookies
see the file
[jquery.socialshareprivacy.localstorage.js](https://github.com/panzi/SocialSharePrivacy/blob/master/jquery.socialshareprivacy.localstorage.js).

How to use
----------

```html
<html>
<head>
…
<script type="text/javascript" src="jquery.js"></script> 
<script type="text/javascript" src="jquery.socialshareprivacy.js"></script>
<script type="text/javascript" src="jquery.socialshareprivacy.buffer.js"></script>
<script type="text/javascript" src="jquery.socialshareprivacy.disqus.js"></script>
<script type="text/javascript" src="jquery.socialshareprivacy.facebook.js"></script>
<script type="text/javascript" src="jquery.socialshareprivacy.flattr.js"></script>
<script type="text/javascript" src="jquery.socialshareprivacy.gplus.js"></script>
<script type="text/javascript" src="jquery.socialshareprivacy.linkedin.js"></script>
<script type="text/javascript" src="jquery.socialshareprivacy.mail.js"></script>
<script type="text/javascript" src="jquery.socialshareprivacy.pinterest.js"></script>
<script type="text/javascript" src="jquery.socialshareprivacy.reddit.js"></script>
<script type="text/javascript" src="jquery.socialshareprivacy.stumbleupon.js"></script>
<script type="text/javascript" src="jquery.socialshareprivacy.tumblr.js"></script>
<script type="text/javascript" src="jquery.socialshareprivacy.twitter.js"></script>
<script type="text/javascript" src="jquery.socialshareprivacy.xing.js"></script>
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
reccomend to pack all needed files into one using a JavaScript packer/compressor.

Methods
-------

### socialSharePrivacy

**Signature:**
```javascript
.socialSharePrivacy([options])
```

Add social share buttons to all elements in the set.

### destroy

**Signature:**
```javascript
.socialSharePrivacy("destroy")
```
Remove all social share buttons. This will return all elements in the set back
to their pre-init state.

### disable

**Signature:**
```javascript
.socialSharePrivacy("disable", [service_name])
```

Disable the named service or disable all services if no `service_name` is given.

### enable

**Signature:**
```javascript
.socialSharePrivacy("enable", [service_name])
```

Enable the named service or enable all services if no `service_name` is given.

### option

**Signature:**
```javascript
.socialSharePrivacy("option", option_name, [value])
```

Get or set an option. If no `value` is specified it will act as a getter.

### options

**Signature:**
```javascript
.socialSharePrivacy("options", [options])
```

Get or set all options. If no `options` are specified it will act as a getter.

### toggle

**Signature:**
```javascript
.socialSharePrivacy("toggle", [service_name])
```

Toggle the named service or toggle all services if no `service_name` is given.

Options
-------

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
				button         : function (options, uri, serrings) {
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
need to pass values of other types (numbers, booleans, lists or functions)
you need to use the JavaScript object syntax.

### Global Options

Set these options like this:

```javascript
$.fn.socialSharePrivacy.settings.title = "Title of the thing to share.";
…
```

Or like this:

```javascript
$.extend($.fn.socialSharePrivacy.settings, {
	path_prefix: "/socialshareprivacy",
	css_path:    "socialshareprivacy.css",
	…
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
<td>info_link</td>
<td><a href="http://panzi.github.com/SocialSharePrivacy/">http://panzi.github.com/SocialSharePrivacy/</a></td>
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
<td>Your Disqus forum shortname. (String)</td>
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

### <span id="facebook-options-facebook">Facebook Options</span> (`facebook`)

Note that facebook only supports certain languages and requires the region suffix (e.g.
`en_US`). The facebook service ensures that only supported language strings are sent
to facebook, because otherwise facebook fails to render anything.

See also: [official documentation](http://developers.facebook.com/docs/reference/plugins/like/)

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
<td>Possible values: <code>Text</code>, <code>Images</code>, <code>Video</code>, <code>Software</code>, <code>People</code> or
<code>Other</code></td>
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

### <span id="pinterest-options-pinterest">Pinterest Options</span> (`pinterest`)

See also: [official documentation](http://pinterest.com/about/goodies/#button_for_web_sites)

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

Custom Services
---------------

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

### Helper Functions (`jQuery.fn.socialSharePrivacy.*`)

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
