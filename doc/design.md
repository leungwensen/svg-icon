# svg-icon api design

## data flow

### fetch&compile flow

```graph-LR
external-icons((external icons)) --> | separator | internal-icons(internal icons)
internal-icons --> | compiler  | svg-sprite((svg sprites))
```

### scan&render flow

```graph-LR
raw-html((raw html)) --> | scanner  | icons-used(icons used)
icons-used --> | compiler | svg-sprite(svg sprites)
svg-sprite --> | renderer | rendered-html((rendered html))
```

## cli command

```graph-LR
svg-icon((svg-icon)) --> separate
separate -->|"--format"|separated-files
separate -->|"--output"|separated-files
separate -->|"input"|separated-files
```

### svg-icon separate --format <format> --output <outputRoot> inputFile1, inputFile2, ...

separate files from existing files

### svg-icon compile --config <configFile> iconName1, iconName2, ... > sprite.svg

compile icons into a svg sprite file

### svg-icon render --share --output <outputRoot> 1.html, 2.html, ...

