build:
	node .build.js
	NODE_ENV=production webpack

dev:
	mkdir -p /tmp/share
	npx concurrently \
		"ghfs -l 8001 -r /tmp/share -A -U --global-mkdir --global-delete" \
		"PORT=8000 UPSTREAM_PORT=8001 node dev-server.js"
