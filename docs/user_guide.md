# User guide

## Introduction

This guide has to show possibiliies of the __Mass Labeling__ tool and clarify usage of some features.
While this guide is written in English, unfortunately, application interface is written in Russian and 
not translated into English yet.   

## Main function

The main function of the __Mass Labeling__ tool is to provide a service to label data placed on the data owner server 
by a group of assessors. It also has an interface to control the progress and an interface to export the results.


## Functions by roles 

There are two roles in the __Mass Labeling__. They are an administrator and an assessor. The main objectives for the 
administrator is to create labeling tasks and manage them. The main objective for assessor is to label images in the 
given tasks. Let's consider this roles.

### Administrator role

Administrator can manage users and tasks, control the labelling progress and manipulate data.  

#### Start new assessment task

There is still no entity like _assessment task_ in the __Mass Labeling__. But administrator can manage access and 
manage visibility of datasets. It gives the oportuninty to manage tasks sequentily, but there is no possibility to 
manage concurrent assessment tasks. The steps to start a new task a the following:     

1. [Provide data](provide_data) for assessment.
1. [Manage datasets](manage_datasets) accessibility.
1. [Manage users access](manage_users).

After setting up a new task assessors can start labeling process and administrator can 
[monitor](monitor_labelling_progress) their progress. 

#### Provide data

As for now, importing datasets is possible only using `cli`. Read the corresponding section in 
the [cli import guide](cli/import). After dataset was imported into __Mass Labeling__ it is registered 
in DB and can't be removed using application. But administrator can exclude it from active datasets list.

#### Manage datasets

Administrator can select which datasets are active. All images belonging to datasets from active datasets 
list are shown to the assessors. And vice a versa images from datasets not included into this list are not shown 
to the assessors.

To manage the list of active datasets administrator should change `config.sites.allowedDatasets.default`
variable in `config/index.js` file. The empty list means all imported datasets are active.

#### Manage users

It is possible to manage users using `cli`. To create the first administrator it is the only option and
thats why this step is obligatory to start using the __Mass Labeling__ application. Read the corresponding section in 
the [cli user guide](cli/user) on how to create users. 

The other way to add users into __Mass Labeling__ is to use administrator interface in the running application. 
Choose `Users` in the upper menu to manage access of users. The following list shows administrator's actions 
in the `Users` section.
* Add user by clicking on the `Add user` button.
* Change user's login (e-mail), password, status and role by clicking on the `Change` button in the `Actions` column.
Particularly, this interface allows administrator to manage users access by changing their status.
* Look throw the data labeled by certain user by clicking on the `Generate slider` and `Open slider` buttons 
in the `Actions` column.

#### Monitor labelling progress

Administrator can press 'Statistics' menu item and select one of three options: 'Progress', 
'Outliers' and 'Local outliers'. Pick 'Progress' to look how much labels each assessor made. 
Pick 'Outliers' to verify how much outliers produced each assessor. Pick 'Outliers' to 
verify how much outliers produced each assessor.

After assessors completed the labelling task administrator can [receive the results](receive_results). 

#### Receive results

As for now, this operation could be done only using `cli`. Read the corresponding section in 
the [cli export guide](cli/export).
 
### Assessor role

Assessor can label the given images and monitor his own progress. 

#### Controls

__Mass Labeling__ application has built-in instructions page. It also describes controls.
The following list describes keys which can assessor can use during his work: 
 * 1-10: sets label for the image viewed.
 * Enter: confirms label and requests the next image.
 * Backspace: returns to the previous image, which allows assessor to change label. This button could be pressed 
 multiple times, which leads to cancellations of all labels for the last images.
 
## FAQ

Q: When application interface will support multiple languages including English?  
A: We hope soon :)

Q: How can I start new assessment task with different dataset?
A: Now it is possible to select datasets which are active for labeling process. Let's assume assessors have 
labeled all images from dataset `A`. Administrator can import new dataset `B` and set only this dataset active. It 
means that dataset `A` images will not be shown to assessors.
