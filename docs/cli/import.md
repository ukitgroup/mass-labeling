# Import CLI


## import:dataset

Импорт датасета.

### Запуск

`bin/cli import:dataset <аргументы> | npx bunyan`

#### Аргументы

* `--in` - путь к файлу датасета. По умолчанию: `data/import/dataset.zip`.

#### Файл конфигурации

`conf/app.js`

```
cli/import/dataset{
	"in"        : str,
}
```

#### Файл датасета

Файл является `zip` архивом. Структура:

* `screenshots`
	* `0123456789abcdef01234567.jpg`
	* ...
* `out.json`

#### out.json

Файл `out.json` состоит из массива элементов `item`. Структура:

```
item{
	"url"           : str,      // "http://site.com"
	"dataset"       : str,      // "my_dataset"
	"screenshot"    : str,      // "screenshots/0123456789abcdef01234567.jpg"
}
```
