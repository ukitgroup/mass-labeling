# User guide

## Introduction

This guide shows the possibilities of the __Mass Labeling__ tool and clarifies the usage of some features.
Although this guide is written in English, unfortunately, the application interface has Russian texts and is not available in English yet.   

## Main function

The main function of the __Mass Labeling__ tool is to offer a service for labeling the data placed on the data owner's server 
by a group of assessors. It also has an web-interface to control the progress and a CLI to export the results.

## Functions by roles 

There are two roles in the __Mass Labeling__ tool — an administrator and an assessor. The main objectives of the 
administrator is to create labeling tasks and manage them. The main objective of the assessor is to label images in the 
given tasks. Let's have a closer look at these roles.

### Administrator role

An administrator can manage users and tasks, control the labelling progress and manipulate data.  

#### Start new assessment task

There is still no entity like _assessment task_ in the __Mass Labeling__ tool. But an administrator can manage access and 
manage visibility of datasets. It makes it possible to manage tasks one by one, but there is no option to 
manage concurrent assessment tasks. The steps to start a new task are as follows:     

1. [Provide data](provide_data) for assessment.
1. [Manage datasets'](manage_datasets) accessibility.
1. [Manage users' access](manage_users).

After setting up a new task, assessors can start labeling the process and an administrator can 
[monitor](monitor_labelling_progress) their progress. 

#### Provide data

At the moment, importing datasets is possible only by using CLI. For more info, please read the corresponding section in 
the [CLI import guide](cli/import). After the dataset was imported into the __Mass Labeling__ tool, it is registered 
in the DB and can't be removed using the application. But an administrator can exclude it from the list of active datasets.

#### Manage datasets

An administrator can mark the datasets that are active. All images belonging to datasets from the active datasets 
list are shown to the assessors. And vice versa, images from datasets not included into this list are not shown 
to the assessors.

To manage the list of active datasets, an administrator should change the `config.sites.allowedDatasets.default`
variable in the `config/index.js` file. The empty list means that all imported datasets are active.

#### Manage users

It is possible to manage users using CLI. The CLI is the only option creating the first administrator, 
that's why step is obligatory to start using the __Mass Labeling__ application. For more information on how to
create users, please read the corresponding section in the [CLI user guide](cli/user). 

Another way to add users into __Mass Labeling__ is to use the administrator interface in the running application. 
Choose `Users` in the top menu to manage access of users. The following list shows administrator's actions 
in the `Users` section.
* Add user by clicking on the `Add user` button.
* Change user's login (e-mail), password, status and role by clicking on the `Change` button in the `Actions` column.
Particularly, this interface allows an administrator to manage users access by changing their statuses.
* Look through the data labeled by a certain user by clicking on the `Generate slider` and `Open slider` buttons 
in the `Actions` column.

#### Monitor the labelling progress

An administrator can click the 'Statistics' menu item and select one of the three options: 'Progress', 
'Outliers' and 'Local outliers'. Click 'Progress' to see how many labels each assessor put. 
Click 'Outliers' to check how many outliers were done by each assessor.

After assessors have completed the labelling task, an administrator can [obtain the results](obtain_results). 

#### Obtain results

As for now, this operation could be done only using CLI. Read the corresponding section in 
the [CLI export guide](cli/export).
 
### Assessor role

Assessors can label images provided to them and monitor their own progress. 

#### Controls

The __Mass Labeling__ application has a built-in instructions page. It also provides descriptions of controls.
The following list describes the keys which assessors can use during their work: 
 * 1-10: sets the label for the image viewed;
 * Enter: confirms the label and requests the next image;
 * Backspace: returns to the previous image, which allows an assessor to change the label. This button could be pressed 
 multiple times, which leads to the cancellations of all labels for the last images.
 
## FAQ

Q: When will your application interface support multiple languages including English?  
A: Other languages including English are coming soon :)

Q: How can I start the new assessment task with a different dataset?
A: Now it is possible to select datasets which are active for the labeling process. Let's assume assessors have 
labeled all images from the dataset `A`. An administrator can import the new dataset `B` and set only this dataset as active. It 
means that the dataset `A` 's images will not be shown to assessors. Please read the corresponding section 
[manage datasets](manage_datasets) for more info.
