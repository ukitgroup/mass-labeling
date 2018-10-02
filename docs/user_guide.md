# User guide


## Introduction

This guide shows the possibilities of the __Mass Labeling__ tool and clarifies the usage of some features.   

## Main function

The main function of the __Mass Labeling__ tool is to offer a service for labeling the data placed on the data owner's server 
by a group of assessors. It also has the web interface to control the progress and a CLI command to export the results.

## Functions by roles 

There are two roles in the __Mass Labeling__ tool — an [administrator](administrator_role) and an [assessor](assessor_role). 
The main objectives of an administrator is to create labeling tasks and manage them. The main objective of an assessor 
is to label images in the given tasks. Let's have a closer look at these roles.

### Administrator role

An administrator can manage users and tasks, control the labeling progress and manipulate data. This section describes the 
[Administrator interface](administrator_interface) and provides information on how to [create](create_assessment_task_workflow) 
a new assessment task, [monitor](monitor_the_labeling_progress) the progress and 
[obtain](obtain_results) the assessment results. Please feel free to skip sections and proceed to reading those that interest you most.

#### Administrator interface

In the upper left side of the administrator interface you can find menu items for the current assessment task: 
_Mass labeling_ aka Home, _Statistics_, _Guide_. In the upper right side of the administrator interface you can find 
general-purpose menu items like: a language switcher, account email, _Settings_ and exit button.
 
##### Current task interface

Clicking on the _Mass labeling_ menu item redirects you to the homepage which allows an administrator to take part in the assessment 
process and view images which were labeled as broken by assessors.

Clicking on the _Statistics_ menu item allows you to choose the statistics report from the list: views count, anomalies 
among all users, anomalies for a single user. Descriptions of these reports could be found on the corresponding pages.
  
Clicking on the _Instruction_ menu item opens a new browser tab with the instruction description for the current task. 

Let's consider some interface elements in detail.
 
###### Broken images

This is an additional feature which some administrators can ignore. __Mass Labeling__ assumes that an assessor labels an 
image as broken when an image seems to be not present in this dataset. For example, when an image is not shown 
or isn't relevant (you see a cat in a dataset for cars).  

If an administrator confirms that an image is broken then this image will not be shown to assessors in the future. If 
an administrator decides that an image is ok then all assessors that try to label it as broken will get a message notifying  
that the image is ok. 
 
###### Label images

This interface is the same as the assessor's labeling interface.

##### General interface

The functionality of the language switcher and the exit button is obvious. If you need to use a language other than English or 
Russian, please read the [multilanguage support guide](./multilanguage). 

Clicking on the _Settings_ menu item opens the settings interface which needs some description. 

The settings are divided into three categories, each has its own tab in the settings interface. They are 
[Users](users_settings), [Assessment](assessment_settings) and [System](system_settings) settings.

###### Users settings

This settings category allows an administrator to: 
- add users, 
- change their email, password, status and role,
- generate and open a slider which shows labels set by the user. 

When an administrator adds a user he/she should enter an email, password, status and role. The same 
information could be added by clicking on the _Edit_ button in the list of users.
  
Sliders allow an administrator to look through the data labeled by a certain user. To use a slider, an administrator needs to 
generate it by clicking on the _Generate slider_ button in the list of users. The system will ask which task the slider 
should be generated for. The slider's information generated for the chosen task will be saved in the database and after 
clicking on the _Open slider_ button, an administrator can open the slider for a certain task. 

Sliders are not updated automatically. It means that an administrator needs to generate a slider again if the user labeled more 
data. 
   
Sliders provide the following info: a labeled image, rates (classes) which an assessor chosed for it, assessor's average rate,
model rate, error. Here an assessor's average rate is calculated as an average for all rates given by all assessors, a model rates 
is a number which was uploaded into the database using the import procedure (see the [CLI import guide](cli/import)) and it is 
implied that it corresponds to some ML model, and an error is a difference between an assessor's average rate and model rate. If 
an image model rate equals 0, both the error and model rate values would be displayed as '-'. 

A slider contains only images which were labeled by a chosen user. Each image can be associated with not more than 
one model rate. So, the re-import of the rates will update those rates.    

###### Assessment settings

This settings category allows an administrator to:
- add new assessment tasks,
- change assessment task parameters, i.e. user views limit, random/deterministic way of showing images, datasets 
included in the task, change the task description and assessor guide (see the 
[Create the assessment task workflow](create_the_assessment_task_workflow)),
- activate a task, i.e. set some task as current.

###### System settings

This settings category allows an administrator to:
- set system logging parameters, such as logger verbosity level,
- data locations, such as the db url and the storage folder for images,
- authentication parameters, such as cookie expiration time, cookie salt value,
- cli import default paths, such as the default datasets archive path and the path to the JSON file with default model rates.

#### Create the assessment task workflow

An administrator can manage the user's access and visibility of datasets. It makes it possible to run and manage tasks 
one by one, yet there is no option to manage concurrent assessment tasks. The steps to start a new task are as follows:     

1. [Provide data](provide_data) for assessment.
1. Create an assessment [task](create_task). 
1. [Manage the user's access](manage_users).

After setting up a new task, assessors can start the labeling process and an administrator can 
[monitor](monitor_the_labelling_progress) their progress. 

#### Provide data

At the moment, importing datasets is possible only by using CLI. For more info, please read the corresponding section in 
the [CLI import guide](cli/import). After the dataset was imported into the __Mass Labeling__ tool, it is registered 
in the DB and can't be removed using the application. But an administrator can exclude it from the list of active 
datasets related to the task (see the [manage datasets](manage_datasets) section).

#### Create task

Creating a task involves the following:
1. Specifying the total [number of views](number_of_views) an assessor should do.  
1. Writing the task [description](task_description) (optional).
1. [Managing](manage_datasets) the datasets accessibility.
1. [Editing](edit_guide) assessment guide (optional).

##### Number of views

If an administrator unselects the _show randomly_ checkbox the upper limit of views for each user is equal to the number of images 
in all chosen datasets.

If an administrator selects the _show randomly_ checkbox then the upper limit of views per user could be set to any 
positive number or be unlimited (specify 0 for this). Let's consider an example. An administrator wants to show 1,000 images to 
assessors. Also an administrator wants to verify their opinions by showing each image 3 times. In this case a good choice
will be to set _show randomly_ and set the views limit to 3,000 views per user.

#### Task description

The task description can help an administrator to distinguish the tasks. This parameter is shown in the task list only. 
This is not mandatory but could be a useful feature.

##### Manage datasets

An administrator can mark the datasets which are active for this task. All images belonging to datasets from the list of active
datasets are shown to assessors. And vice versa, images from datasets not included into this list are not shown 
to assessors.
 
##### Edit guide

An administrator can provide instructions in the HTML format for each task. Assessors can click on the _Guide_ link to 
read them during their work. This is not mandatory but could be a useful feature. 
   
A language switcher doesn't impact the text of the guide. So, if you need to have the guide in different 
languages you can write all versions in one guide.

#### Manage users

It is possible to manage users using CLI. For more information on how to
create users, please read the corresponding section in the [CLI user guide](cli/user).

__*Note*__. CLI is the only option for creating the first administrator, 
that's why this step is obligatory to start using the __Mass Labeling__ application. 

Another way to add users into __Mass Labeling__ is to use the administrator interface in the running application. 
Choose the _Users_ tab in the _Settings_ menu to add users and manage their access. The users setting menu is described in 
[this](users_settings) section. 

#### Monitor the labeling progress

An administrator can click the _Statistics_ menu item and select one of the three options: _Views_, 
_Anomalies among users_ and _Individual anomalies_. Click _Views_ to see how many labels each assessor assigned. 
Click on _Anomalies among users_ or _Individual anomalies_ to view how many outliers were done by each assessor.

After assessors have completed the labeling task, an administrator can [obtain the results](obtain_results). 

#### Obtain results

As of now, this operation could be done only using CLI. Read the corresponding section in 
the [CLI export guide](cli/export).
 
### Assessor role

Assessors can label images provided to them and monitor their own progress. 

#### Assessor interface

The assessor interface is a subset of the [administrator interface](administrator_interface). In the upper left
side of the assessor interface you can find menu items for current assessment task: 
_Mass labeling_ aka Home, _Guide_. In the upper right side of the assessor interface you can find 
general-purpose menu items like: a language switcher, account email and exit button.

##### Label images

###### General information

When an assessor presses the _Get task_ button, __Mass Labeling__ will redirect him/her to the labeling interface. It will 
show images and wait for assessors to respond to them. In the upper right part of the screen you can see two additional 
elements: the help button and progress info.

To understand how to label images, read about [controls](controls) in the corresponding section. Also, an assessor can review the
task instructions in the guide by clicking on the corresponding link in the upper left part of the interface.  

###### Controls

The following list describes the keys which assessors can use during their work: 
 * 1-9, 0: sets the label for the current image;
 * Enter: confirms the label and requests the next image;
 * Backspace: returns to the previous image, which allows an assessor to change the label. This button could be pressed 
 multiple times, which leads to the cancellations of all labels for the last images.
 
## FAQ

Q: How can I start the new labeling task with a different dataset?
A: Now it is possible to select datasets which are active for the labeling process. Let's assume assessors have 
labeled all images from the dataset `A`. An administrator can import the new dataset `B` and set only this dataset as 
active in a new task. It means that images of the dataset `A` will not be shown to assessors. Please read the 
corresponding section [manage datasets](manage_datasets) for more info.

Q: Is there a way to assess images for binary classification problem?
A: Now it is possible to give a rate to each image from 1 to 10 and it is hardcoded. So, you can use numbers 1 and 2 to 
assess your dataset between two classes, but you can't perform an assessment task for 11 classes or 11 rate ranking problem.
As of now, the number 10 is hardcoded but it seems easy to make it a __Mass Labeling__ system parameter. 
