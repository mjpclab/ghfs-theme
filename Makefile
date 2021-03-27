zip: all
	sh .build-zip.sh

all: \
	theme-default

theme-default:
	make -C src/default/

clean:
	rm -rf output
