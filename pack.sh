#!/bin/bash

modules=all-services
css=on
stylefile=stylesheets/jquery.socialshareprivacy.min.css
langs=all
builddir=build
allmodules=`ls scripts/jquery.socialshareprivacy.*.js|sed 's/scripts\/jquery\.socialshareprivacy\.\(.*\)\.js/\1/'`
alllangs=`ls -d scripts/??|xargs -n 1 basename`

while getopts ":m:s:c:l:o:h" opt; do
	case $opt in
		m)
			modules="$OPTARG"
			;;
		c)
			css="$OPTARG"
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
			echo " ./pack.sh [options]"
			echo
			echo "Options:"
			echo " -h              Print this help message."
			echo " -m <modules>    Comma separated list of JavaScript modules to pack. Possible values:"
			echo all all-services none $allmodules|sed 's/ /, /g'|fmt -60|xargs -n 1 -d '\n' echo "                    "
			echo "                 'all-services' includes all social share services but not the"
			echo "                 jquery.socialshareprivacy.localstorage.js module."
			echo "                 default: all-services"
			echo
			echo " -l <languages>  Comma separated list of languages to pack. Possible values:"
			echo all none $alllangs|sed 's/ /, /g'|fmt -60|xargs -n 1 -d '\n' echo "                    "
			echo "                 default: all"
			echo
			echo " -c <enabled>    Pack stylesheets. Possible values: on, off (default: on)"
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
elif [ "$modules" = "all-services" ]; then
	modules=`echo -n $allmodules|tr ' ' '\n'|sed /localstorage/d|tr '\n' ','`
elif [ "$modules" = "" ]; then
	modules="none"
fi

if [ "$langs" = "all" ]; then
	langs="$alllangs"
elif [ "$langs" = "" ]; then
	langs="none"
fi

mkdir -p "$builddir" || exit 1

files="scripts/jquery.socialshareprivacy.js"
if [ "$modules" != "none" ]; then
	files="$files `eval echo scripts/jquery.socialshareprivacy.{$modules}.js`"
fi

uglifyjs $files \
	--compress=warnings=false \
	| replace stylesheets/jquery.socialshareprivacy.css "$stylefile" \
	> "$builddir/jquery.socialshareprivacy.min.js" || exit 1
echo "created $builddir/jquery.socialshareprivacy.min.js"

if [ "$langs" != "none" ]; then
	for lang in $langs; do
		files="scripts/$lang/jquery.socialshareprivacy.js"
		if [ "$modules" != "none" ]; then
			files="$files `eval ls scripts/$lang/jquery.socialshareprivacy.{$modules}.js 2>/dev/null`"
		fi
		uglifyjs $files \
			--compress=warnings=false \
			--output="$builddir/jquery.socialshareprivacy.min.$lang.js" || exit 1
		echo "created $builddir/jquery.socialshareprivacy.min.$lang.js"
	done
fi

if [ "$css" = "on" ]; then
	files="stylesheets/jquery.socialshareprivacy.common.css"
	if [ "$modules" != "none" ]; then
		files="$files `eval ls stylesheets/jquery.socialshareprivacy.{$modules}.css 2>/dev/null`"
	fi
	uglifycss $files > "$builddir/jquery.socialshareprivacy.min.css" || exit 1
	echo "created $builddir/jquery.socialshareprivacy.min.css"
fi
