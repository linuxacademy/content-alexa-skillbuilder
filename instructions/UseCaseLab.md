# Alexa Skill Builder Use Cases Lab with Linux Academy
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

Here are optional steps for creating your own environment by mirroring the lab branch for creating your development environment for the lab.

### Details
---
1. **Clone lab branch and checkout**.

    ```
    git clone --single-branch --branch intentsLab https://github.com/linuxacademy/content-alexa-skillbuilder.git
    git checkout intentsLab
    ```

2.  **Create repo for your own project**. (Here are [instructions for creating a repo](https://help.github.com/en/articles/create-a-repo).)
    **The Commands Below are for my REPO please Change to the one you crated DO NOT JUST COPY AND PAST** 
    * Mirror lab branch and checkout:

    ```
    git push --mirror https://github.com/AiwarriorLA/LaIntentsLab.git
    git remote set-url origin https://github.com/AiwarriorLA/LaIntentsLab.git
    ```
3.  **Change working directory**.
    * Remove clone:
    ```
    cd ../
    rm -rf content-alexa-skillbuilder
    ```
    * Make new directory for lab:
    ```
    mkdir LabIntents
    cd LabIntents
    git clone https://github.com/AiwarriorLA/LaIntentsLab.git .
    ```
    * Deploy in your own AWS environment:

    ```
    ask deploy
    ```


4. **Or use ASK CLI**.
    * Navigate to working directory — in my case, it's called `labs`:

    ```
    mkdir labs
    cd labs
    ```

    * Use ASK CLI to create Alexa skill:

    ```
     ask new --url https://github.com/AiwarriorLA/LaIntentsLab.git  --skill-name LaLabIntents
    ```

    * Deploy in your own AWS environment:

    ```
    ask deploy
    ```
---

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
    git clone --single-branch --branch intentsLab https://github.com/linuxacademy/content-alexa-skillbuilder.git
    ```

3. Deploy the skill into the lab environment:

    ```
    ask deploy
    ```

* Your lab is now configured with the endpoint set to the Linux Academy lab AWS environment. You can log in to to see the Lambda code with the information provided in the lab. The deploy above creates a skill in your developer account with an endpoint in the Linux Academy AWS environment.

* If you wish to use Alexa-hosted environment, you can create a skill and select **Alexa-hosted**. Instructions are [here](https://developer.amazon.com/docs/hosted-skills/build-a-skill-end-to-end-using-an-alexa-hosted-skill.html).

* If you are using Alexa-hosted and you want to follow along in the lab video, you will need to copy the JSON for the interaction model into the skill you create and the Lambda code into the `index.js` file. You will then have all the required components to follow along.

* For some labs, Alexa-hosted is not an option, as we will be using features not currently offered in the Alexa Developer Console at this time.

**Caution:**

If you use the Linux Academy lab environment, your skill will not have an endpoint when the lab ends, and any modifications made during the lab will be lost. It is advised that you clone the repo into your own account if you want to save any changes you have made.

You should clean up when the lab is done by deleting the lab skill in your Alexa Developer Console. This can be done with the ASK CLI or by logging in to the Alexa Developer Console. Here are the [ASK CLI instructions](https://developer.amazon.com/docs/smapi/ask-cli-command-reference.html#delete-skill-subcommand).

If you want to retain access to the lab and its endpoint, clone the repo and deploy it in your own AWS environment.

---
**Warning:**

If you launch the lab inside of Linux Academy using the IP address link, you will have difficulty copying and pasting the `ask init` token. If you want to use Linux Academy to connect via SSH, use the instant terminal and you will be able to copy and paste. Here are the [instructions and notes](https://support.linuxacademy.com/hc/en-us/articles/360026736411-How-do-I-Copy-and-Paste-in-Hands-On-Labs-).

---

### Test That Everything Is Set Up

1. To test, the skill needs to be enabled. From the developer console, open your skill and click the **Test** tab. Ensure the skill is available for testing in development.

2. Or simulate verbal interaction with your skill through the command line (this might take a few moments) using the following example:

	```bash
	 ask simulate -l en-US -t "start linux academy lab"

	 ✓ Simulation created for simulation id: 4a7a9ed8-94b2-40c0-b3bd-fb63d9887fa7
	◡ Waiting for simulation response{
	  "status": "SUCCESSFUL",
	  ...
	 ```

3. Once the "Test" switch is enabled, your skill can be tested on devices associated with the developer account as well. Speak to Alexa from any enabled device, from your browser at [echosim.io](https://echosim.io/welcome), or through your Amazon mobile app, and say:

	```text
	Alexa, start linux academy lab
	```
## To Modify the Skill Details by Changing the `skill.json` File

1. `./skill.json`

   Change the skill name, example phrase, icons, testing instructions etc.

   Remember that a lot of information is locale-specific and must be changed for each locale (e.g., en-US, en-GB, de-DE, etc.).

   See the [skill manifest documentation](https://developer.amazon.com/docs/smapi/skill-manifest.html?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Survey&sc_detail=hello-world-nodejs-V2_CLI-3&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Survey_hello-world-nodejs-V2_CLI-3_Convert_WW_beginnersdevs&sc_segment=beginnersdevs) for more information.

2. `./lambda/custom/index.js`

   Modify messages and data from the source code to customize the skill.

3. `./models/*.json`

	Change the model definition to replace the invocation name and the sample phrase for each intent. Repeat the operation for each locale you are planning to support.

4. Remember to re-deploy your skill and Lambda function for your changes to take effect.

	```bash
	ask deploy
	```

## View Annotated Source Code

Alexa Skill Builder has [annotated source code](https://linuxacademy.github.io/content-alexa-skillbuilder/docs/lambda/custom/) using Docco. This provides an in-depth look at the source code to help you understand the lab.


## Using prebuilt models a use case for Alexa 

In this AWS hands-on lab, we will use a fully working Alexa skill using the lists prebuilt model on the command line. The skill will use Lambda with Node.js. 

By the end of the lab, you will understand how to create a prebuilt model skill and understand its execution within AWS. This lab will guide you through the creation and configuration process and updating the code. This lab will also walk you through viewing the logs and understanding the JSON response after the intent execution. 

We will build a list prebuilt model and discuss other prebuilt models caveots. 
The skill used will be a [lists skill](https://developer.amazon.com/docs/smapi/steps-to-create-a-list-skill.html)
at the end of this lab you will have a better understanding of using the cli to create a skill using a prebuilt model. 

