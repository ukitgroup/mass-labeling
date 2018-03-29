# Export CLI


## export:answers

Экспорт оценок.

### Запуск

`bin/cli export:answers <аргументы> | npx bunyan`

#### Аргументы

* `--dataset` - название датасета. По умолчанию: все датасеты.
* `--out` - путь к файлу с оценками. По умолчанию: `data/export/answers.json`.

#### Файл конфигурации

`conf/app.js`

```
cli/export/answers{
    "datasets"  : [str],
    "out"       : str,
}
```

#### Файл с оценками

Файл в формате `json` состоит из массива элементов `item`. Структура:

```
item{
    "url"       : str,
    "dataset"   : str,
    "answers"   : [answer],
}

answer{
    "answer"    : int,
    "user"      : str,
}
```
