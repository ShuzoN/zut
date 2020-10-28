ZIP=$(shell which zip)
YARN=$(shell which yarn)

.PHONY: zip install

install: 
	$(YARN) install

zip: 
	$(ZIP) -r zut.zip . 
