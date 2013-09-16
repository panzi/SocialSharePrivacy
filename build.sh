#!/bin/bash

modules=all
autoload=on
css=on
img=on
pathprefix=
stylefile=stylesheets/jquery.socialshareprivacy.min.css
langs=all
builddir=build
allmodules=`ls javascripts/modules/*.js|sed 's/javascripts\/modules\/\(.*\)\.js/\1/'`
alllangs=`ls -d javascripts/locale/??|xargs -n 1 basename`

while getopts ":m:a:s:p:c:i:l:o:h" opt; do
	case $opt in
		m)
			modules="$OPTARG"
			;;
		a)
			autoload="$OPTARG"
			;;
		c)
			css="$OPTARG"
			;;
		i)
			img="$OPTARG"
			;;
		p)
			pathprefix="$OPTARG"
			;;
		s)
			stylefile="$OPTARG"
			;;
		l)
			langs="`echo "$OPTARG"|tr ',' ' '`"
			;;
		o)
			builddir="$OPTARG"
			;;
		h)
			echo "Usage:"
			echo " ./build.sh [options]"
			echo
			echo "Options:"
			echo " -h              Print this help message."
			echo " -m <modules>    Comma separated list of JavaScript modules to pack. Possible values:"
			echo all none $allmodules|sed 's/ /, /g'|fmt -60|xargs -n 1 -d '\n' echo "                    "
			echo "                 default: all"
			echo
			echo " -l <languages>  Comma separated list of languages to pack. Possible values:"
			echo all none $alllangs|sed 's/ /, /g'|fmt -60|xargs -n 1 -d '\n' echo "                    "
			echo "                 default: all"
			echo
			echo " -a <enabled>    Autoload. Possible values: on, off (default: on)"
			echo " -c <enabled>    Pack stylesheets. Possible values: on, off (default: on)"
			echo " -i <enabled>    Pack images. Possible values: on, off (default: on)"
			echo " -p <path>       Prefix to stylesheet and dummy image paths. (empty per default)"
			echo " -s <path>       Stylesheet path in the generated JavaScript file."
			echo "                 default: stylesheets/jquery.socialshareprivacy.min.css"
			echo " -o <directory>  Output directory. (default: build)"
			echo
			exit
			;;
		\?)
			echo "Invalid option: -$OPTARG" >&2
			echo "See -h for a list of available options." >&2
			exit 1
			;;
	esac
done

if [ "$modules" = "all" ]; then
	modules=`echo -n $allmodules|tr ' ' ','`
elif [ "$modules" = "" ]; then
	modules="none"
fi

if [ "$langs" = "all" ]; then
	langs="$alllangs"
elif [ "$langs" = "" ]; then
	langs="none"
fi

mkdir -p "$builddir/javascripts" || exit 1

files="javascripts/socialshareprivacy.js"
if [ "$modules" != "none" ]; then
	files="$files `eval echo javascripts/modules/{$modules}.js`"
fi
files="$files javascripts/settings.js"

uglifyjs $files \
	--compress=warnings=false \
	| sed -e "s|path_prefix:\"\"|path_prefix:\"$pathprefix\"|g" \
	| sed -e "s|stylesheets/socialshareprivacy.css|$stylefile|g" \
	> "$builddir/javascripts/jquery.socialshareprivacy.min.js" || exit 1
echo "created $builddir/javascripts/jquery.socialshareprivacy.min.js"


if [ "$autoload" = "on" ]; then
	uglifyjs $files javascripts/autoload.js \
		--compress=warnings=false \
		| sed -e "s|path_prefix:\"\"|path_prefix:\"$pathprefix\"|g" \
		| sed -e "s|stylesheets/socialshareprivacy.css|$stylefile|g" \
		> "$builddir/javascripts/jquery.socialshareprivacy.min.autoload.js" || exit 1
	echo "created $builddir/javascripts/jquery.socialshareprivacy.min.autoload.js"
fi

if [ "$langs" != "none" ]; then
	for lang in $langs; do
		files="javascripts/locale/$lang/socialshareprivacy.js"
		if [ "$modules" != "none" ]; then
			files="$files `eval ls javascripts/locale/$lang/modules/{$modules}.js 2>/dev/null`"
		fi
		node join-trans.js $files | uglifyjs \
			--compress=warnings=false \
			--output="$builddir/javascripts/jquery.socialshareprivacy.min.$lang.js" || exit 1
		echo "created $builddir/javascripts/jquery.socialshareprivacy.min.$lang.js"
	done
fi

if [ "$img" = "on" ]; then
	mkdir -p "$builddir/images" || exit 1
	files="`eval ls images/socialshareprivacy_* images/settings.png images/{dummy_,}{box_,}{$modules}.* 2>/dev/null`"
	if [ "$files" != "" ]; then
		cp $files "$builddir/images" || exit 1
		echo "copied images to $builddir/images"
	fi

	if [ "$langs" != "none" ]; then
		for lang in $langs; do
			if [ -d "images/$lang" ]; then
				mkdir -p "$builddir/images/$lang" || exit 1
				files="`eval ls images/$lang/{dummy_,}{box_,}{$modules}.* 2>/dev/null`"
				if [ "$files" != "" ]; then
					cp $files "$builddir/images/$lang" || exit 1
					echo "copied images to $builddir/images/$lang"
				fi
			fi
		done
	fi
fi

if [ "$css" = "on" ]; then
	styledir="`dirname "$builddir/$stylefile"`"
	mkdir -p "$styledir" || exit 1
	files="stylesheets/common.css"
	if [ "$modules" != "none" ]; then
		files="$files `eval ls stylesheets/modules/{$modules}.css 2>/dev/null`"
	fi
	uglifycss $files > "$builddir/$stylefile" || exit 1
	echo "created $builddir/$stylefile"
fi
