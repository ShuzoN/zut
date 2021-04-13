ZIP=$(shell which zip)
YARN=$(shell which yarn)

.PHONY: zip install test

install: 
	$(YARN) install

zip: 
	$(ZIP) -r zut.zip .

test: install
	 $(YARN) test
