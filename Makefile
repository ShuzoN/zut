ZIP=$(shell which zip)
YARN=$(shell which yarn)
AWS=$(shell which aws)
ARG=

.PHONY: zip install test zut zut/ts build

install:
	$(YARN) install

zip:
	$(ZIP) -r zut.zip ./dist/src

test: install
	$(YARN) test

zut: install
	$(YARN) run zut ${ARG}

zut/ts: install
	$(YARN) run zut/ts ${ARG}

build: install
	$(YARN) build

deploy: build zip
	$(AWS) s3 mv zut.zip s3://zut
