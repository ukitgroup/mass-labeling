# Import CLI


## Dataset import

### Run command

`bin/cli import:dataset <arguments> | npx bunyan`

#### Arguments

* `--in` - path to the zipped dataset file. Default: `data/import/dataset.zip`.

#### Configuration file

`conf/app.js`

```
cli/import/dataset{
    "in"        : str,
}
```

#### Input file

Input file is a `zip` archive file, which contains the following:

* `screenshots`
    * `0123456789abcdef01234567.jpg`
    * ...
* `out.json`

`screenshots` folder contains JPEG-images which are going to be shown to assessors. `out.json` file
consists of array of `item`. Each of each satisfies the following format:

```
item{
    "url"           : str,      // "http://site.com"
    "dataset"       : str,      // "my_dataset"
    "screenshot"    : str,      // "screenshots/0123456789abcdef01234567.jpg"
}
```
