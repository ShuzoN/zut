ZIP=$(shell which zip)
YARN=$(shell which yarn)

.PHONY: zip install test zut build

install: 
	$(YARN) install

zip: 
	$(ZIP) -r zut.zip .

test: install
	$(YARN) test

zut: install
	$(YARN) run zut ${ARG}

zut/ts: install
	$(YARN) run zut/ts ${ARG}

build: install
	$(YARN) build

