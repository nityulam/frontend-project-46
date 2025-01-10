install:
	npm ci

publish:
	чтобы опубликовать свой пакет (твоя программа) в каталог npm, нужно вызвать команду npm publish. Но т к мы не хотим публиковать твой пакет "по-настоящему", мы вызываем данную команду с помощью флага  --dry-run
	npm publish --dry-run

test:
	npm test

lint:
	npx eslint .

.PHONY: test