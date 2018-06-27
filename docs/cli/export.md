# Export CLI


## Rate export

### Run command

`bin/cli export:answers <arguments> | npx bunyan`

#### Arguments

* `--dataset` - dataset name. If not specified all datasets will be exported.
* `--out` - file to export data. Default: `data/export/answers.json`.

#### Configuration file

`conf/app.js`

```
cli/export/answers{
    "datasets"  : [str],
    "out"       : str,
}
```

#### Output file description

The output json-file contains the array of items. Each item satisfies the following format:

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
