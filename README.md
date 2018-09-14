# Mass Labeling

[![version](https://img.shields.io/badge/version-2.0.2-brightgreen.svg)](https://github.com/ukitgroup/mass-labeling/tree/v2.0.2)
[![License](https://img.shields.io/badge/License-Apache%202.0-brightgreen.svg)](https://opensource.org/licenses/Apache-2.0)
[![node](https://img.shields.io/badge/node-v10.1.0-brightgreen.svg)](https://nodejs.org/)
[![mongodb](https://img.shields.io/badge/mongodb-v3.6.3-brightgreen.svg)](https://mongodb.com/)

## Description

__Mass Labeling__ is an open source project for data assessment. It may be used to assess data for 
classification tasks. 

### Advantages

The main advantages of this project are:
- easy to deploy,
- easy to manage,
- data is not distributed,
- no need to manually collect results.
 
The last two advantages are worth describing in detail. 

#### "Private data" case

If you decide to use any proprietary online data 
assessment service, then you should transfer your data to a server belonging to the service. Sometimes it 
is not comfortable, and sometimes it is not even possible due to the privacy rights to the data. In this case, you need 
to host an assessment tool on your own server.
    
#### "Offline tool" case

If you decide to use an offline data assessment tool, then you should distribute data between assessors. So, 
each of them gets a whole dataset, which is valuable for you or your company. Also, after the assessment job is 
done the new problem occurs. You will need to collect all the labels and merge them into one dataset.

So, if you wish to keep all the data and labels on your server together, then mass-labeling is the 
right choice for you. 

#### Useful features

__Mass Labeling__ has 
- built-in slider mechanism to look throw labeled data,
- statistics to measure assessors work quality,
- multilanguage support. 

## Technogical stack

- node.js
- mongodb

## Installation

Installation is described in this [guide](docs/install)

## User guide

See the [user guide](docs/user_guide) which describes the basic user and administrator operations.
  
## Contribution

This project was separated from the family of internal projects. So, some variables in the code may be confusing. 
The refactoring is welcome.  

## License

[Apache License 2.0](LICENSE)
