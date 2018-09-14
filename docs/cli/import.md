# Import CLI

If you use __Mass Labeling__ within docker container, don't forget to put data inside the container. 
It can be done using `data` folder which is mounted to the container by default. 
Import command should be run inside the container.

## Dataset import

### Run command

`bin/cli import:dataset <arguments> | npx bunyan`

#### Arguments

* `--in` - path to the zipped dataset file. Default: `data/import/dataset.zip`. And default could be 
changed on _System_ tab of _Setting_ menu.

Input file is a `zip` archive file, which contains the following:

* `screenshots`
    * `0123456789abcdef01234567.jpg`
    * ...
* `description.json`

`screenshots` folder contains JPEG-images which are going to be shown to the assessors. `description.json` file
consists of the `item` array. Each `item` satisfies the following format:

```
{
    "url"           : str,      // "http://site.com"
    "dataset"       : str,      // "my_dataset"
    "screenshot"    : str,      // "screenshots/0123456789abcdef01234567.jpg"
}
```

## Rates import

You can import rates from outside the __Mass Labeling__ to use it in sliders (see slider description 
in [user guide](../user_guide)).  

### Run command

`bin/cli import:modelRates <arguments> | npx bunyan`

#### Arguments

* `--in` - the path of the file with rates. Default: `data/import/modelRates.json`. And default could be 
changed on _System_ tab of _Setting_ menu.

Input file is a `json` file, which contains the `item` array. Each `item` satisfies the following format:

```
{
    "id"            : str       // "http://indastro.ru/en",
    "score"         : int       // 1
}
```

 
