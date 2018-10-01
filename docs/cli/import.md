# Import CLI

If you use __Mass Labeling__ within the docker container, don't forget to put data inside the container. 
It can be done using the `data` folder, which is mounted to the container by default. 
The import command should be run inside the container.

## Import dataset

### Run command

`bin/cli import:dataset <arguments> | npx bunyan`

#### Arguments

* `--in` - path to the zipped dataset file. Default: `data/import/dataset.zip`. And the default could be 
changed under the _System_ tab in the _Setting_ menu.

An input file is a zip archive file which contains the following:

* `screenshots`
    * `0123456789abcdef01234567.jpg`
    * ...
* `description.json`

`screenshots` folder contains JPEG images which are going to be shown to the assessors. `description.json` file
consists of the `item` array. Each `item` satisfies the following format:

```
{
    "url"           : str,      // "http://site.com"
    "dataset"       : str,      // "my_dataset"
    "screenshot"    : str,      // "screenshots/0123456789abcdef01234567.jpg"
}
```

## Import rates

You can import rates from outside (sources other than __Mass Labeling__) to use them in sliders (see the slider description 
in the [user guide](../user_guide.md)).  

### Run command

`bin/cli import:modelRates <arguments> | npx bunyan`

#### Arguments

* `--in` - path to the file with rates. Default: `data/import/modelRates.json`. And the default could be 
changed under the _System_ tab in the _Setting_ menu.

An input file is a `json` file which contains the `item` array. Each `item` satisfies the following format:

```
{
    "id"            : str       // "http://indastro.ru/en",
    "score"         : int       // 1
}
```

 
