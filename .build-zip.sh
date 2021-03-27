#!/bin/sh

cd $(dirname $0)

for d in output/*/; do
	cd "$d"
	theme=$(basename $d)
	zip -r "../$theme.zip" *
	cd - > /dev/null
done
