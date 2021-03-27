# ghfs-theme

Theme packages for GHFS(go-http-file-server).

## Attention
Repository branches are unstable and will be squashed/rebased at any time.

## Build
Go into theme directory:
```sh
cd src/<theme>
```

Generate theme contents:
```sh
make
```

Outputs can be found under `output/<theme>/`

## Usage
```sh
ghfs --theme <theme-package.zip>
ghfs --theme-dir <theme-dir>	# recommend for debug only
```

## Theme list

### Default
![default theme](doc/img/ghfs.gif)

Same as built in theme from GHFS. With template and asset files minified.
