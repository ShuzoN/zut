ZIP=$(shell which zip)
YARN=$(shell which yarn)

.PHONY: zip install test zut

install: 
	$(YARN) install

zip: 
	$(ZIP) -r zut.zip .

test: install
	 $(YARN) test

zut: install
	 $(YARN) run zut ${ARG}

build: install
	$(YARN) build
