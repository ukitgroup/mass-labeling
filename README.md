# Mass Labeling

[![version](https://img.shields.io/badge/version-2.0.2-brightgreen.svg)](https://github.com/ukitgroup/mass-labeling/tree/v2.0.2)
[![License](https://img.shields.io/badge/License-Apache%202.0-brightgreen.svg)](https://opensource.org/licenses/Apache-2.0)
[![node](https://img.shields.io/badge/node-v10.1.0-brightgreen.svg)](https://nodejs.org/)
[![mongodb](https://img.shields.io/badge/mongodb-v3.6.3-brightgreen.svg)](https://mongodb.com/)

## Description

__Mass Labeling__ is an open source project for data assessment. It maybe used for assess data for 
classification tasks. 

### Advantages
The main advantages of this project are
- easy to deploy,
- easy to manage,
- data is not distributed,
- no need to collect results.
 
Last two advantages are worth describing in details. 

#### Case "private data".
If one decided to use any proprietary online data 
assessment service, then he should transfer his data to a server belonging to the service. Sometimes it 
is not comfortable, but sometimes it is impossible due to the privacy of the data. In this case, you need 
to host assessment tool on your own server.
    
#### Case "offline tool".
If one decided to use offline data assessment tool, then he should distribute data between assessors. So, 
each of them gets full dataset, which is valuable for you or your company. Also, after assessment job is 
done the new problem will occur. You will need to collect all the labels and merge them into one dataset.

So, if you wish to hold all the data and labels on your server all together, then mass-labeling is the 
right choice for you. 

 
## Technogical stack

- node.js
- mongodb

## Installation
Installation is described in this [guide](docs/install)

## User guide
Look throw the [user guide](docs/user_guide) which describes basic user and administrator operations.  

## License
[Apache License 2.0](LICENSE)

