# User guide


## Introduction

This guide shows the possibilities of the __Mass Labeling__ tool and clarifies the usage of some features.   

## Main function

The main function of the __Mass Labeling__ tool is to offer a service for labeling the data placed on the data owner's server 
by a group of assessors. It also has an web-interface to control the progress and a CLI to export the results.

## Functions by roles 

There are two roles in the __Mass Labeling__ tool — an [administrator](administrator_role) and an [assessor](assessor_role). 
The main objectives of the administrator is to create labeling tasks and manage them. The main objective of the assessor 
is to label images in the given tasks. Let's have a closer look at these roles.

### Administrator role

An administrator can manage users and tasks, control the labelling progress and manipulate data. This section describes 
[Administrator interface](administrator_interface) and provides information on how to [create](create_assessment_task_workflow) 
new assessment task, [monitor](monitor_the_labeling_progress)  the progress and 
[obtain](obtain_results) assessment results. Please feel free to skip reading sections which you are not 
interested in.  
  
#### Administrator interface

In the upper left side of administrator interface you can find menu items for current assessment task: 
_Mass labeling_ aka Home, _Statistics_, _Instructions_. In the upper right side of administrator interface you can find 
general purpose menu items like: language switcher, account e-mail, _Settings_ and exit button.
 
##### Current task interface

Clicking on _Mass labeling_ menu item redirects you to home page which allows administrator to take part in assessment 
process and check images which were labeled as broken by assessors.

Clicking on _Statistics_ menu item allows you to choose the statistics report from the list: views count, anomalies 
for all users, anomalies for single user. Descriptions of those reports could be found on corresponding pages.
  
Clicking on _Instruction_ menu item opens a new browser tab with instruction description for current task. 

Let's consider some interface elements in details.
 
###### Broken images

It is additional functionality which some administrators can ignore. __Mass Labeling__ assumes that assessor label 
image as broken when image seems to be present in this dataset. For example, image is not shown 
or you see cat in cars dataset.  

If administrator confirms that image is broken then this image will not be shown to assessors in the future. If 
administrator decides that image is ok then all assessors which try to label it as broken will get information message 
which says that image is ok. 
 
###### Label images

This interface is the same as assessors labeling interface.

##### General purpose interface

The functionality of the language switcher and the exit button is obvious. Clicking on _Settings_ menu item opens 
settings interface which needs some description. 

Settings are divided into three categories each of which has it's own tab in settings interface. They are 
[Users](users_settings), [Assessment](assessment_settings) and [System](system_settings) settings.

###### Users settings

This settings category allows administrator to 
- add users, 
- change their e-mail, password, status and role,
- generate and open a slider which shows labels set by the user. 

When administrators adds user he/she should enter information such as e-mail, password, status and role. The same 
information could be changed user is added by clicking on _Change_ button in users list.
  
Sliders allows administrator to look through the data labeled by a certain user. To use slider administrator needs to 
generate it by clicking on the _Generate slider_ button in the users list. System will ask which task the slider 
should be generated for. Sliders information generated for chosen task would be saved in database and after 
clicking on _Open slider_ button administrator can select slider for which task to use. 

Sliders are not updated automatically. It means that administrator needs to generate slider again if user labeled more 
data. 
   
Sliders provide the following info: labeled image, rates (classes) which assessor chosed for it, mean assessors rate,
model rate, error. Here mean assessors rate is a calculated as mean over all rates used by all assessors, model rate 
is a number which was uploaded into database using import procedure (see [CLI import guide](cli/import)) and it is 
implied that it is corresponds to some ML model, error is a difference between mean assessors rate and model rate. If 
image model rate equals to 0, both error and model rate values would be displayed as '-'. 

Slider contains only images which were labeled by a chosen user. Each image can be associated with not more than 
one model rate. So, rates re-import will update those rates.    

###### Assessment settings

This settings category allows administrator to
- add new assessment tasks,
- change assessment task parameters, i.e. user views limit, random/deterministic way of showing images, datasets 
included in task, change task description and assessor instructions (see 
[Create assessment task workflow](create_assessment_task_workflow)),
- activate task, i.e. set some task as current.

###### System settings

This settings category allows administrator to
- set system logging parameters, such as logger name and logger verbosity level,
- data locations, such as db url and images storage folder
- authentication parameters, such as cookies expiration time, cookie salt value,
- cli import default paths, such as default datasets archive path and default model rates json-file path.

#### Create assessment task workflow

An administrator can manage users access and manage visibility of datasets. It makes it possible to run and manage tasks 
one by one, but there is no option to manage concurrent assessment tasks. The steps to start a new task are as follows:     

1. [Provide data](provide_data) for assessment.
1. Create assessment [task](create_task). 
1. [Manage users access](manage_users).

After setting up a new task, assessors can start labeling the process and an administrator can 
[monitor](monitor_the_labelling_progress) their progress. 

#### Provide data

At the moment, importing datasets is possible only by using CLI. For more info, please read the corresponding section in 
the [CLI import guide](cli/import). After the dataset was imported into the __Mass Labeling__ tool, it is registered 
in the DB and can't be removed using the application. But an administrator can exclude it from the list of active 
datasets related to task (see [manage datasets](manage_datasets) section).

#### Create task

Creating a task involves the following:
1. Specifying total [number of views](number_of_views) assessor should make.  
1. Writing task [description](task_description) (optional).
1. [Managing](manage_datasets) datasets accessibility.
1. [Editing](edit_instructions) assessment task instructions (optional).

##### Number of views

If administrator unchecks _show randomly_ checkbox the upper limit of views for each user is equal to number of images 
in all selected datasets.

If administrator checks _show randomly_ checkbox then the upper limit of views per user could be set to any 
positive number or unlimited specifying 0. Let's consider an example. Administrator wants to show 1000 images to 
assessors. Also administrator wants to verify their opinions by showing each image 3 times in average. Then good choice
will be to set _show randomly_ and specify views limit as 3000 views per user.

#### Task description

The task description can help administrator to distinguish tasks. This parameter is shown in task list only. 
This is not mandatory but could be a useful feature.

##### Manage datasets

An administrator can mark the datasets which are active for this task. All images belonging to datasets from the active
datasets list are shown to the assessors. And vice versa, images from datasets not included into this list are not shown 
to the assessors.
 
##### Edit instructions

Administrator can provide instructions in html format to each task. Assessors can click on _Instructions_ hyperlink to 
read them during their work. This is not mandatory but could be a useful feature.    

#### Manage users

It is possible to manage users using CLI. The CLI is the only option creating the first administrator, 
that's why step is obligatory to start using the __Mass Labeling__ application. For more information on how to
create users, please read the corresponding section in the [CLI user guide](cli/user). 

Another way to add users into __Mass Labeling__ is to use the administrator interface in the running application. 
Choose _Users_ tab in the _Settings_ menu to manage access of users. Users setting menu is described in 
[this](users_settings) section. 

#### Monitor the labelling progress

An administrator can click the _Statistics_ menu item and select one of the three options: _Views_, 
_Anomalies between users_ and _Individual anomalies_. Click _Views_ to see how many labels each assessor put. 
Click on _Anomalies between users_ or _Individual anomalies_ to check how many outliers were done by each assessor.

After assessors have completed the labelling task, an administrator can [obtain the results](obtain_results). 

#### Obtain results

As for now, this operation could be done only using CLI. Read the corresponding section in 
the [CLI export guide](cli/export).
 
### Assessor role

Assessors can label images provided to them and monitor their own progress. 

#### Assessor interface

Actually, assessor interface is a subset of the [administrator interface](administrator_interface).  In the upper left
side of administrator interface you can find menu items for current assessment task: 
_Mass labeling_ aka Home, _Instructions_. In the upper right side of administrator interface you can find 
general purpose menu items like: language switcher, account e-mail and exit button.

##### Label images

###### General information

When assessor presses _Get task_ button, __Mass Labeling_ will redirects him/her to the labeling interface. It will 
shows images and waits for assessors response on them. In the upper right part of the screen you can see two additional 
elements: controls help button and progress info.

To understand how to label images read about [controls](controls) in corresponding section. Also, assessor can remind 
task instructions clicking on the corresponding hyperlink in the upper left part of the interface.  

###### Controls

The following list describes the keys which assessors can use during their work: 
 * 1-10: sets the label for the image viewed;
 * Enter: confirms the label and requests the next image;
 * Backspace: returns to the previous image, which allows an assessor to change the label. This button could be pressed 
 multiple times, which leads to the cancellations of all labels for the last images.
 
## FAQ

Q: How can I start the new labeling task with a different dataset?
A: Now it is possible to select datasets which are active for the labeling process. Let's assume assessors have 
labeled all images from the dataset `A`. An administrator can import the new dataset `B` and set only this dataset as 
active in a new task. It means that the dataset `A` 's images will not be shown to assessors. Please read the 
corresponding section [manage datasets](manage_datasets) for more info.

Q: Is there a way to assess images for binary classification problem?
A: Now it is possible to rate each image from 1 to 10 and it is hardcoded. So, you can use numbers 1 and 2 to 
assess your dataset onto two classes, but you can't make assessment task for 11 classes or 11 rates ranking problem.
As for now number 10 is hardcoded but it seems easy to make it a __Mass Labeling__ system parameter. 
