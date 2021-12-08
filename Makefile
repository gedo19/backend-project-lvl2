install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage 