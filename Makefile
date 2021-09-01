define GetValueFromJson
$(shell node -p '\
    const getVal = (key = "", obj = {}) => {
          const currKey = key.split(".")[0];
          const val = obj[currKey];
          if(typeof val !== "object") return val;
          const nextKey = key.split(".").slice(1).join(".");
          return getVal(nextKey, val);
    }; \
    getVal(`$(1)`.replace(" ", ""), require("./package.json")); \
')
endef

VERSION = $(call GetValueFromJson, version)
CURRENT_DIR = $(shell pwd)

test-get-version:	
	@echo "version on package.json: $(VERSION)"
	
# expose 4000 port
build-image-node:
	docker build .  -t  chasqui2-front-node:$(VERSION)

# expose 80 port
build-image-nginx:
	docker build . -f Dockerfile.nginx  -t  chasqui2-front-nginx:$(VERSION)

# Scan and fix security vulnerabilities on docker images
# Ref https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/ 
# 7. Find and fix security vulnerabilities in your Node.js docker image
test-install-deps:
	npm install -g snyk
	snyk auth

test-snyk-node:
	snyk container test chasqui2-front-nginx:$(VERSION) --file=Dockerfile

test-snyk-nginx:
	snyk container test chasqui2-front-nginx:$(VERSION) --file=Dockerfile.nginx
