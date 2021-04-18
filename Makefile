zip: all
	sh .build-zip.sh

all: \
	theme-default \
	theme-default-enhanced

theme-default:
	make -C src/default/

theme-default-enhanced:
	make -C src/default-enhanced/

clean:
	rm -rf output
