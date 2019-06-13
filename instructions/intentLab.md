# content-alexa-skillbuilder Intent Lab
# Build The Linux Academy Lab Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

## Setup with ASK CLI

### About
This readme assumes you have your developer environment ready to go and that you have some familiarity with CLI (Command Line Interface) Tools, [AWS](https://aws.amazon.com/), and the [ASK Developer Portal](https://developer.amazon.com/alexa-skills-kit?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Content&sc_detail=hello-world-nodejs-V2_CLI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Content_hello-world-nodejs-V2_CLI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs). 

Or you use the Linux Academy Lab Environment 

### Pre-requisites

* Node.js (> v8)
* Register for an [AWS Account](https://aws.amazon.com/)
* Register for an [Amazon Developer Account](https://developer.amazon.com?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Content&sc_detail=hello-world-nodejs-V2_CLI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Content_hello-world-nodejs-V2_CLI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs)
* Install and initialize the [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Content&sc_detail=hello-world-nodejs-V2_CLI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Content_hello-world-nodejs-V2_CLI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs)

* The following steps assume you have configured your AWS CLI [AWS CLI Instructions](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) and are working in your own envirnment if you wish to use the lab environment use the EC2 Instance created for you when you launch the lab on Linux Academy. [EC2 Envrionment](# Note Using EC2 Instance and LA Lab Environment (avoiding Cost of doing lab))

### Getting Started

### Optional mirror lab branch for creating your environment for lab
---
### Details

1. **Clone** Lab Branch and checkout 

```
git clone --single-branch --branch intentsLab https://github.com/linuxacademy/content-alexa-skillbuilder.git
git checkout intentsLab
```
 1.  **Create Repo for your own project** [Instructions for creating repo](https://help.github.com/en/articles/create-a-repo)

    * **Mirror** Lab Branch and checkout 
    ```
    git push --mirror https://github.com/AiwarriorLA/LaIntentsLab.git
    git remote set-url origin https://github.com/AiwarriorLA/LaIntentsLab.git
    ```
2.  **Change working director** 
    * remove clone 
    ```
    cd ../
    rm -rf content-alexa-skillbuilder
    ```
    * Make new dir for lab
    ```
    mkdir LabIntents
    cd LabIntents 
    git clone https://github.com/AiwarriorLA/LaIntentsLab.git .
    ```
    * Deploy in your own AWS Env
    ```
    ask deploy
    ``` 


3. Or use **Ask CLI** 
    * Navigate to working dir in my case its called labs
    ``` mkdir labs ```
    * Use Ask CLI to create Alexa Skill 
    ```
     ask new --url https://github.com/AiwarriorLA/LaIntentsLab.git  --skill-name LaLabIntents
    ```
    * Deploy in your own AWS Env
    ```
    ask deploy
    ``` 
---

### Note Using EC2 Instance and LA Lab Environment (avoiding Cost of doing lab)

Open an SSH client. 
Connect to your instance using the IP provided in the lab
```ssh  cloud_user@<IP_ADDRESS>```
use password provided for the ec2 instance when prompted. 
The AWS CLI is configured for you so this step is **not** required 
Initilize the ask cli 
```
ask init --no-browser
```
 select yes you want to host your skill's backend in AWS Lamda

 clone the lab branch and mirror as described in the details above

 ```git clone --single-branch --branch intentsLab https://github.com/linuxacademy/content-alexa-skillbuilder.git```

 Deploy the skill into the lab envrionment 

```ask deploy```

Your lab is now configured with the endpoint set to the Linux Academy Lab AWS Envrionment
you can log in to to see the lambda code with the information provided in the lab. 
The deploy above creates a skill in your developer account with an enpoint in the Linux Academy AWS Envrionment. 

If you which to use Alexa Hosted envrionment you can create a skill and select Alexa hosted Instructions are [Here](https://developer.amazon.com/docs/hosted-skills/build-a-skill-end-to-end-using-an-alexa-hosted-skill.html)

If you are using Alexa Hosted and you want to follow along in the Lab Video you will need to copy the JSON for interaction model into the skill you create and the lambda code into the index.js and you will then have all the required components to follow along. 

For some labs Alexa Hosted is not an options as we will be using features not currently offered in the ALexa Developer console at this time. 

**Caution** 
If you use Linux Academy Lab Enviornment your skill will not have and endpoint when the lab ends and any modifications made during the lab will be lost. 
it is advised you clone the repo into your own account if you want to save any changes you have made. 

You should clean up when the lab is done by deleting the Lab Skill in your Alexa Developement Console 
this can be done with the ask cli or by logging into the Alexa Developer console Ask CLI Instructions [Here](https://developer.amazon.com/docs/smapi/ask-cli-command-reference.html#delete-skill-subcommand)

If you want to retain access to the lab and its endpoint clone the repo and deploy in your own AWS Envrionment. 

**Warning** 

**Warning** 

If you lauch the lab inside of Linux Academy using the IP address link you will have difficulty copy and pasting the ask init token if you want to use the linux Academt to ssh use the instant terminal and you will be able to copy and past. The instructions and notes are [Here](https://support.linuxacademy.com/hc/en-us/articles/360026736411-How-do-I-Copy-and-Paste-in-Hands-On-Labs-)

### Testing

1. To test, the skill needs to be enabled.  From the developer console, open your skill and click the Test tab.  Ensure the skill is available for testing in Development.

2. Simulate verbal interaction with your skill through the command line (this might take a few moments) using the following example:

	```bash
	 ask simulate -l en-US -t "start linux academy lab"

	 ✓ Simulation created for simulation id: 4a7a9ed8-94b2-40c0-b3bd-fb63d9887fa7
	◡ Waiting for simulation response{
	  "status": "SUCCESSFUL",
	  ...
	 ```

3. Once the "Test" switch is enabled, your skill can be tested on devices associated with the developer account as well. Speak to Alexa from any enabled device, from your browser at [echosim.io](https://echosim.io/welcome), or through your Amazon Mobile App and say :

	```text
	Alexa, start linux academy lab
	```
## Customization

1. ```./skill.json```

   Change the skill name, example phrase, icons, testing instructions etc ...

   Remember than many information are locale-specific and must be changed for each locale (e.g. en-US, en-GB, de-DE, etc.)

   See the Skill [Manifest Documentation](https://developer.amazon.com/docs/smapi/skill-manifest.html?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Survey&sc_detail=hello-world-nodejs-V2_CLI-3&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Survey_hello-world-nodejs-V2_CLI-3_Convert_WW_beginnersdevs&sc_segment=beginnersdevs) for more information.

2. ```./lambda/custom/index.js```

   Modify messages, and data from the source code to customize the skill.

3. ```./models/*.json```

	Change the model definition to replace the invocation name and the sample phrase for each intent.  Repeat the operation for each locale you are planning to support.

4. Remember to re-deploy your skill and Lambda function for your changes to take effect.

	```bash
	ask deploy
	```
## Anotated Source Code 

Alexa Skill Builder has annotaed source code using Docco this provides and indepth look at the source code to help you understan the lab. 
[View the Annotated source code](https://linuxacademy.github.io/content-alexa-skillbuilder/docs/lambda/custom/)

