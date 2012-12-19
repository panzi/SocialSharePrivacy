#!/bin/bash

mkdir -p dist/scripts
mkdir -p dist/stylesheets

# Here you can configure which services to include in the build
services="buffer,delicious,disqus,facebook,flattr,gplus,linkedin,mail,pinterest,reddit,stumbleupon,tumblr,twitter,xing"

eval java -jar build/closure-compiler/compiler.jar \
	scripts/jquery.socialshareprivacy.js \
	scripts/jquery.socialshareprivacy.localstorage.js \
	scripts/jquery.socialshareprivacy.{$services}.js \
	> dist/scripts/jquery.socialshareprivacy.min.js

eval java -jar build/closure-compiler/compiler.jar \
	scripts/de/jquery.socialshareprivacy.js \
	scripts/de/jquery.socialshareprivacy.{$services}.js \
	> dist/scripts/jquery.socialshareprivacy.de.min.js

eval java -jar build/closure-compiler/compiler.jar \
	scripts/fr/jquery.socialshareprivacy.js \
	scripts/fr/jquery.socialshareprivacy.{$services}.js \
	> dist/scripts/jquery.socialshareprivacy.fr.min.js

java -jar build/yui-compressor/yuicompressor-2.4.8pre.jar \
	stylesheets/*.css \
	> dist/stylesheets/jquery.socialshareprivacy.css

cp -r images dist/