ZIP=$(shell which zip)
YARN=$(shell which yarn)
AWS=$(shell which aws)
ARG=

.PHONY: zip install test zut/ts build

install:
	$(YARN) install

zip:
	cd ./dist/src && $(ZIP) -r zut.zip ./ && mv ./zut.zip ../../

test: install
	$(YARN) test

zut/ts: install
	$(YARN) run zut/ts ${ARG}

build: install
	$(YARN) build

deploy: build zip
	$(AWS) s3 mv zut.zip s3://zut
