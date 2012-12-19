mkdir -p dist/scripts
mkdir -p dist/stylesheets

java -jar build/closure-compiler/compiler.jar \
	scripts/jquery.socialshareprivacy.js \
	scripts/jquery.socialshareprivacy.*.js \
	> dist/scripts/jquery.socialshareprivacy.min.js

java -jar build/closure-compiler/compiler.jar \
	scripts/de/jquery.socialshareprivacy.js \
	scripts/de/jquery.socialshareprivacy.*.js \
	> dist/scripts/jquery.socialshareprivacy.de.min.js

java -jar build/closure-compiler/compiler.jar \
	scripts/fr/jquery.socialshareprivacy.js \
	scripts/fr/jquery.socialshareprivacy.*.js \
	> dist/scripts/jquery.socialshareprivacy.fr.min.js

java -jar build/yui-compressor/yuicompressor-2.4.8pre.jar \
	stylesheets/*.css \
	> dist/stylesheets/jquery.socialshareprivacy.css

cp -r images dist/