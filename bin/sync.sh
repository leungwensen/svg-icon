#!/usr/bin/env bash

echo -e "icon set to sync: \c"
read ICON_SET
echo -e "icon set: $ICON_SET\n"

./bin/extract/${ICON_SET}.js  && ./bin/export/${ICON_SET}.sh

