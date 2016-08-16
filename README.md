svg-icon
========

An ultimate svg icons collection DONE RIGHT, with **over 10,000 SVG icons** out of the box.

## [Homepage][homepage]

## Download

You can download as many SVG icons as you need in [homepage][homepage], or download the whole collection via `npm`:

```shell
npm install svg-icon --save
```

## custom element

files:

```
dist/
    ├── svg-icon-element.js
    └── svg-icon-element.css
```

usage:

```
<svg-icon url="http://leungwensen.github.io/svg-icon/dist/sprite/symbol/logos.svg" type="si-logos-javascript"></svg-icon>
```

limitation:

* [Can I use custom elements?](http://caniuse.com/#search=custom%20elements)
* [webcomponentsjs](https://github.com/webcomponents/webcomponentsjs)

## use it locally

```shell
# clone the project
git clone https://github.com/leungwensen/svg-icon.git
# install dependencies
cd svg-icon
npm i
# startup a local server
gulp
```

## SVG icon collections

name | id prefix | source | supported
----|----|----|----
ant-design       | ant-            | http://ant.design/#/components/icon                | yes
bootstrap        | bootstrap-      | https://github.com/twbs/bootstrap                  | yes
devicons         | dev-            | https://github.com/vorillaz/devicons               | yes
elusive-iconfont | elusive-        | https://github.com/reduxframework/elusive-iconfont | yes
entypo           | entypo-         | https://github.com/danielbruce/entypo              | yes
evil-icons       | evil-           | https://github.com/outpunk/evil-icons              | yes
flag-icon        | flag-           | https://github.com/lipis/flag-icon-css             | yes
flat-ui          | flat-           | https://github.com/designmodo/Flat-UI              | yes
font-awesome     | awesome-        | https://github.com/FortAwesome/Font-Awesome        | yes
foundation       | foundation-     | https://github.com/zurb/foundation-icon-fonts      | yes
game-icons       | game-           | https://github.com/game-icons/icons                | yes
geomicons-open   | geom-           | https://github.com/jxnblk/geomicons-open           | yes
icomoon-free     | icomoon-        | https://github.com/Keyamoon/IcoMoon-Free           | yes
ioncons          | ionic-          | https://github.com/driftyco/ionicons               | yes
maki             | maki-           | https://github.com/mapbox/maki                     | yes
map-icons        | map-            | https://github.com/scottdejonge/map-icons          | yes
material-design  | material-       | https://github.com/google/material-design-icons    | yes
metro-ui-css     | metro-          | https://github.com/olton/Metro-UI-CSS              | yes
mfglabs-iconset  | mfglabs-        | https://github.com/MfgLabs/mfglabs-iconset         | yes
octicons         | oct-            | https://github.com/primer/octicons                 | yes
open-iconic      | open-           | https://github.com/iconic/open-iconic              | yes
payment-font     | payment-        | https://github.com/vendocrat/PaymentFont           | yes
payment-webfont  | payment-web-    | https://github.com/orlandotm/payment-webfont       | yes
semantic-ui      | (oct-/awesome-) | https://github.com/Semantic-Org/Semantic-UI/       | yes
simple-icons     | simple-         | https://github.com/danleech/simple-icons           | yes
subway           | subway-         | https://github.com/mariuszostrowski/subway         | yes
typicons         | typcn-          | https://github.com/stephenhutchings/typicons.font  | yes
weather-icons    | weather-        | https://github.com/erikflowers/weather-icons       | yes
windows-icons    | windows-        | https://github.com/Templarian/WindowsIcons         | yes
zero             | zero-           | src/zero                                           | yes
zocial           | zocial-         | https://github.com/smcllns/css-social-buttons      | yes
logos(svg porn)  | logos-          | http://svgporn.com                                 | yes

Need more? Please leave an [issue][issues] or a [pull request][pull-requests].

## Build your own collection

### 1. Install `svg-icon` via `npm`:

```shell
npm install svg-icon -g
```

### 2. Define a collection file (JSON format, [demo](https://github.com/leungwensen/svg-icon/blob/master/src/collection/zfinder.json))

### 3. Build it:

```shell
svg-icon build --source $path/to/icons.json --target $path/to/dest --name wow
```

Now you have a SVG sprite file and a demo page.

```
$path/to/dest/wow/
    ├── index.html
    └── svg-symbols.svg
```

## Contribute

### How did you collect all these SVG icons?

There are basically two kinds of icon collections, ones with SVG source files, and others with only icon fonts.

* Those with SVG source files: I simply copy the icons to the dest folder, optimise them, trim the pads around every icon, and build an SVG sprite file from them.
* Those with icon fonts: I need to separate every icon from a combined SVG font file(locating, transforming, etc.), optimise them, trim them, and build an SVG sprite.

So the data flow is like:

```
Sources(SVG icons/icon fonts) ---separating/copying---> SVG icons ---optimising---> mid products(dist/svg/*) ---trimming---> final products(dist/trimmed-svg/*) ---building---> SVG sprite
```

### Is the contributing toolchain ready for me?

Yes, and no.

The collection of 10,000+ SVG icons is mostly collected by nodejs scripts(check out these folders for details `bin/`, `gulp` and `lib` ). But I still have to write some code when I want to add icons from a new vendor into this project, because of the uncertainty of icon collections.

If you are familiar with nodejs and SVG, and interested in making this collection more useful, please leave a [PR][pull-requests]. Feel free to contact me if you have any question.

Of course, the quickest way to add your favorite icons here is to leave an [issue][issues], and let me do the rest for you ;-).

## References

### Projects inspired `svg-icon`
 
* [evil-icons](https://github.com/outpunk/evil-icons)
* [Font-Awesome-SVG-PNG](https://github.com/encharm/Font-Awesome-SVG-PNG)

### Projects powered `svg-icon`

* [svgo](https://github.com/svg/svgo): transforming and optimizing SVG icons would be impossible without this awesome project.
* [vinyl-fs](https://github.com/gulpjs/vinyl-fs): `gulp` and `vinyl-fs` helped me to process large amount of files without any pain.
* [phantomjs](http://phantomjs.org/): it is the answer of lots of problems.
* [a lot more](https://github.com/leungwensen/svg-icon/blob/master/package.json#L22)

## [Known issues][issues]

[homepage]: http://leungwensen.github.io/svg-icon/ "homepage"
[issues]: https://github.com/leungwensen/svg-icon/issues "issues"
[pull-requests]: https://github.com/leungwensen/svg-icon/pulls "pull requests"
