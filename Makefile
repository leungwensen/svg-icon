# grouped tasks
make:
	make install
	make compile
	make test
all:
	make preinstall
	make
	make publish

# tasks
preinstall:
	npm  install -g cnpm --registry=http://registry.npm.taobao.org
install:
	cnpm install
	npm  install
compile:
test:
publish:
	npm publish
	cnpm sync svg-icon
server:
