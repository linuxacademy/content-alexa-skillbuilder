# Alexa Skill Builder Events Lab with Linux Academy
<img src="https://app.linuxacademy.com/assets/img/generic-course-banner.png" />

## Preparing for the Lab

### About
This readme assumes you have your developer environment ready to go and that you have some familiarity with CLI (command line interface) tools, [AWS](https://aws.amazon.com/), and the [ASK Developer portal](https://developer.amazon.com/alexa-skills-kit?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Content&sc_detail=hello-world-nodejs-V2_CLI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Content_hello-world-nodejs-V2_CLI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs).

Or you can use the Linux Academy lab environment [notes here](https://github.com/linuxacademy/content-alexa-skillbuilder/blob/intentsLab/instructions/intentLab.md#note-using-ec2-instance-and-linux-academy-lab-environment-avoiding-cost-of-doing-lab).

### Pre-Requisites

* Node.js (> v8)
* Register for an [AWS account](https://aws.amazon.com/).
* Register for an [Amazon Developer account](https://developer.amazon.com?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Content&sc_detail=hello-world-nodejs-V2_CLI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Content_hello-world-nodejs-V2_CLI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs).
* Install and initialize the [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Content&sc_detail=hello-world-nodejs-V2_CLI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Content_hello-world-nodejs-V2_CLI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs).

* The following steps assume you have [configured your AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) and are working in your own environment. If you wish to use the lab environment, use the EC2 instance created for you when you launch the lab on Linux Academy. (See the "Using Linux Academy Lab Environment" section below.)

## Getting Started

This Proactive events API lab will allow you you send notifications to teach you how to send notifications to your skills users alexa devices. The user will hear a chime sound that indicates a notification has arrived. The user can say, "Alexa, read my notifications and hera the details. 
The lab demonstrates you how to setup the skill called events lab and scripts that generate the notfictions. 

### Setup 

Navigate to [Alexa Skill Builder](https://github.com/linuxacademy/content-alexa-skillbuilder) and navigate to the eventsLab branch and download the Setup.sh, files.txt, AlexaSkillbuilder.yaml files from the sam directory. 
These file contains a script that can do most of the work for setting up the lab. The instructions here will outline whats being done. 

1. Step one is to create an s3 bucket for storing the lambda code ```aws s3 mb s3://alexaskillbuilder```
2. Clone the Branch ``` git clone --single-branch --branch $PROJECT_NAME https://github.com/linuxacademy/content-alexa-skillbuilder.git $PROJECT_NAME ```
3. cd to the project 
4. Zip the files ```zip -j  $PROJECT_NAME -@ < ../files.txt`` the files.text file contains the list of source code. 
   1.  ```lambda/custom/index.js```
   2.  ```lambda/custom/constants.js```
   3.  ```lambda/custom/helpers.js```
   4.  ```lambda/custom/interceptors.js```
   5.  ```lambda/custom/schedule.txt```
   6.  ```lambda/custom/package.json ```
5. Install node modules 
    1. ```cd lambda/custom``` 
    2. ```npm install```
6. Add library files to zip 
    1. ```zip -u -r  $PROJECT_NAME  lambda/custom/node_modules/```
7. copy files to s3 ```aws s3 cp $PROJECT_NAME.zip s3://alexaskillbuilder/```
8. Modify Location of code for Cloud formation Script.  This adds the location of the lambda code to the cloud formation script
    1. ```sed -i '.bak' "s/CHANGEME/s3:\/\/alexaskillbuilder\/$PROJECT_NAME.zip/g" alexaskillbuilder.yaml ```
9. Create Cloud formation script 
    1. ```aws cloudformation deploy --template-file ./alexaskillbuilder.yaml --stack-name $PROJECT_NAME --parameter-overrides ProjectName=$PROJECT_NAME  --capabilities CAPABILITY_IAM ```
10. Get ARN from stack
    1. ```aws cloudformation describe-stacks --stack-name $PROJECT_NAME --output text```
    2. ```ARN=$(aws cloudformation describe-stacks --stack-name $PROJECT_NAME --query "Stacks[0].Outputs[?OutputKey=='AlexaSkillFunctionARN'].OutputValue" --output text 2>&1)```
    3. ```STACK_STATUS=$(aws cloudformation describe-stacks --stack-name $PROJECT_NAME --query "Stacks[0].StackStatus" --output text 2>&1)```
11.  Add ARN to skill.json This replaces the URI with the field with 
     1. ```sed -i '.bak' "s/\"uri\":.*/ \"uri\": \"$ARN\"/g" $PROJECT_NAME/skill.json ```

Note: 
1. Once you understand this script you can execute it and it will create the lab the skill and update everything but the script files that push the notifications to the skill. 

You can get the data you need by running 
1. ``` ask simulate -l en-US -t "open events lab" >> output.txt ```
and ```cat output.txt | grep userId```

Once this is done past it into the media.js and order.js

you will also need to navigate to the devloper portal build tab and click permissions. 
At the bottom of the Permissions page, locate and copy the two Skill Messaging Client credentials, Client Id and Client Secret.

open order.js and locate the three settings for clientID, clientSecret, and userId1.
Replace these values with the values you copied in the previous steps.

Open media.js and locate the two settings for clientID and clientSecret.
Replace these values with the values you copied in the previous steps. 

### Running Lab
run node order.js you will see a yellow light on your echo device! Say "Alexa, Notifications"

run node media.js this will send a notification from the schedule.txt locate the next future event, and send it out multicast notification. 

## Using Linux Academy Lab Environment
### Using EC2 Instance and Linux Academy Lab Environment (Avoiding Cost of Doing Lab)

1. Open an SSH client, and connect to your instance using the IP address provided in the lab:

    ```
    ssh cloud_user@IP_ADDRESS
    ```

    Use the password provided for the EC2 instance when prompted. The AWS CLI is configured for you, so this step is *not* required.

2. Initialize the ASK CLI:

    ```
    ask init --no-browser
    ```

    Select `yes` to indicate that you want to host your skill's back-end in AWS Lambda.

    Clone the lab branch, and mirror as described in the details above:

    ```
    git clone --single-branch --branch eventsLab https://github.com/linuxacademy/content-alexa-skillbuilder.git eventsLab
    cd eventsLab/sam/
    chmod +x ./Setup.sh 
    ./Setup.sh 
    ```

3. Deploy the skill into the lab environment:

    ```
    ask deploy
    ```
4. Modify Skill.jon, media.js order.js as defined above. 


* For this labs, Alexa-hosted is not an option, as we will be using features not currently offered in the Alexa Developer Console at this time.

**Caution:**

If you use the Linux Academy lab environment, your skill will not have an endpoint when the lab ends, and any modifications made during the lab will be lost. It is advised that you clone the repo into your own account if you want to save any changes you have made.

You should clean up when the lab is done by deleting the lab skill in your Alexa Developer Console. This can be done with the ASK CLI or by logging in to the Alexa Developer Console. Here are the [ASK CLI instructions](https://developer.amazon.com/docs/smapi/ask-cli-command-reference.html#delete-skill-subcommand).

If you want to retain access to the lab and its endpoint, clone the repo and deploy it in your own AWS environment.

---
**Warning:**

If you launch the lab inside of Linux Academy using the IP address link, you will have difficulty copying and pasting the `ask init` token. If you want to use Linux Academy to connect via SSH, use the instant terminal and you will be able to copy and paste. Here are the [instructions and notes](https://support.linuxacademy.com/hc/en-us/articles/360026736411-How-do-I-Copy-and-Paste-in-Hands-On-Labs-).

---


### Creating Events and handling them
In this AWS hands-on lab, we will use a fully working Alexa skill and create an skill that receives a notifications event using the web interface and command line. The skill will use Lambda with Node.js. 

By the end of the lab, you will understand how to setup a custom skill to recieve an event and understand the the requirements for setting up a skill to recieve an event within AWS. This lab will guide you through the skill and event creation and handling the event in code. This lab will also walk you through viewing the logs and understanding the JSON response after the skill execution. 
In this lab we will use proactive events and use a media-content event. 
The skill used will be a [Media Content Event](https://developer.amazon.com/docs/smapi/schemas-for-proactive-events.html#media-content)