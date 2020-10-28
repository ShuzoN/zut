ZIP=$(shell which zip)

.PHONY: zip

zip: 
	$(ZIP) -r zut.zip . 
