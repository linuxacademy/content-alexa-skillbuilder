# Alexa Skill Builder Prebuilt Model Smart Home Switch Lab with Linux Academy
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
    git clone --single-branch --branch SmartDeviceLab https://github.com/linuxacademy/content-alexa-skillbuilder.git
    git checkout intentsLab
    ```

2.  **Create repo for your own project**. (Here are [instructions for creating a repo](https://help.github.com/en/articles/create-a-repo).)
    **The Commands Below are for my REPO please Change to the one you crated DO NOT JUST COPY AND PAST** 
    * Mirror lab branch and checkout:

    ```
    git push --mirror https://github.com/AiwarriorLA/SmartDeviceLab.git
    git remote set-url origin https://github.com/AiwarriorLA/SmartDeviceLab.git
    ```
3.  **Change working directory**.
    * Remove clone:
    ```
    cd ../
    rm -rf content-alexa-skillbuilder
    ```
    * Make new directory for lab:
    ```
    mkdir SmartDevice
    cd SmartDevice
    git clone https://github.com/AiwarriorLA/SmartDeviceLab.git .
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
     ask new --url https://github.com/AiwarriorLA/SmartDeviceLab.git  --skill-name SmartDeviceLab
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
    git clone --single-branch --branch SmartDeviceLab https://github.com/linuxacademy/content-alexa-skillbuilder.git
    ```

3. Deploy the skill into the lab environment:

    ```
    ask deploy
    ```
    when you run ask deploy the output should look similar to the following
    
    -------------------- Create Skill Project --------------------
    ```Skill Id: amzn1.ask.skill.XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX 
    Skill deployment finished.
    [Warn]: No runtime and handler settings found for alexaUsage "smartHome/default" when creating Lambda function. CLI will use "nodejs8.10" and "index.handler" as the Runtime and Handler to create Lambda. You can update the runtime and handler for the target Lambda in the project config and deploy again if you want to set differently.
    Lambda deployment finished.
    Lambda function(s) created:
    [Lambda ARN] arn:aws:lambda:us-east-1:XXXXXXXXX:function:SmartHomeLab
    [Info]: No in-skill product to be deployed.
    [Warn]: Skill api domain "smartHome" can not be enabled. Skipping the enablement.
    ```
    You can ignore the enable warning Smart Home skills cannot be enabled prior to account linking


* Your lab is now configured with the endpoint set to the Linux Academy lab AWS environment. You can log in to to see the Lambda code with the information provided in the lab. The deploy above creates a skill in your developer account with an endpoint in the Linux Academy AWS environment.


* For this lab, Alexa-hosted is not an option, as we will be using features not currently offered in the Alexa Developer Console at this time.

**Caution:**

If you use the Linux Academy lab environment, your skill will not have an endpoint when the lab ends, and any modifications made during the lab will be lost. It is advised that you clone the repo into your own account if you want to save any changes you have made.

You should clean up when the lab is done by deleting the lab skill in your Alexa Developer Console. This can be done with the ASK CLI or by logging in to the Alexa Developer Console. Here are the [ASK CLI instructions](https://developer.amazon.com/docs/smapi/ask-cli-command-reference.html#delete-skill-subcommand).

If you want to retain access to the lab and its endpoint, clone the repo and deploy it in your own AWS environment.

---
**Warning:**

If you launch the lab inside of Linux Academy using the IP address link, you will have difficulty copying and pasting the `ask init` token. If you want to use Linux Academy to connect via SSH, use the instant terminal and you will be able to copy and paste. Here are the [instructions and notes](https://support.linuxacademy.com/hc/en-us/articles/360026736411-How-do-I-Copy-and-Paste-in-Hands-On-Labs-).

---
## Setup For Smart Home SKill 

The values required for configuration of Smart Device Skill

[Authorization URI]
https://[your-cognito-domain]/oauth2/authorize?response_type=code&client_id=[your-client-id]&redirect_uri=https://pitangui.amazon.com/api/skill/link/[vendor-id-amazon-gives-you]&state=STATE

[Access Token URI]
https://[your-cognito-domain]/oauth2/token?state=STATE

[Client ID]
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

[Client Secret]
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

[Alexa Skill Application ID]
amzn1.ask.skill.XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX

[AWS Lambda ARN]
arn:aws:lambda:us-east-1:XXXXXXXXXXXX:function:SmartHomeLab

[Client Authentication Scheme]
Credentials in request body

[scope]
email
phone
openid
aws.cognito.signin.user.admin
profile

[Redirect URLs]
https://pitangui.amazon.com/api/skill/link/[vendor-id-amazon-gives-you]
https://layla.amazon.com/api/skill/link/[vendor-id-amazon-gives-you]
https://alexa.amazon.co.jp/api/skill/link/[vendor-id-amazon-gives-you]

**Warnning**
In the Developer Console, under the Permissions section from the Build tab, **do not** enable access to "Send Alexa Events" the implementation for cognito will not handled the AcceptGrant directive account linking will not occur with cognito if this is enabled. 


## Cognito Configuration
1. Create AWS Cognito user pool and setup OAuth
2. Login to AWS Management console and navigate to Cognito service
3. Select “Manage your user pools” and click “Create a user pool”
4. Enter a pool name and select “Review defaults”.
5. Select Choose username attributes
6. Select email as required
7. Select Policies and Configure polices for passwords
8. Create User Pool by selecting create under review
9. Navigate to “General Settings > App clients” and select “Add an app client”
10. Provide "App client name" be sure to allow OAuth Scopes at a minimum you will need email
11. Copy App Client ID, App client secret and save for latter
12. Configure Domain name and copy and save for latter
13. Use app client name, domain, and client secreat to configure skill 

## Setup Account linking 
1. Use developer console to copy values from the Setup information collected or use Ask cli

or 

1. ask-cli api --skill-id amzn1.ask.skill.XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX create-account-linking

Provide the following when prompted: 

Authorization URL: https://[your-cognito-domain]/oauth2/authorize?response_type=code&client_id=[your-client-id]&redirect_uri=https://pitangui.amazon.com/api/skill/link/[vendor-id-amazon-gives-you]&state=STATE

Client ID: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

Scopes: email,phone,openid,aws.cognito.signin.user.admin,profile

Domains: 

For code grant choose: AUTH_CODE

Access Token URL: https://[your-cognito-domain]/oauth2/token?state=STATE

Client Secret: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

Client Authentication Scheme: REQUEST_BODY_CREDENTIALS

Default Token Expiration Time In Seconds: 

Allow users to enable skill without account linking - NO


## Cognito Configure App Client Settings

1. Enable Cognito user pools isn app client settings 
2. Update Call back Urls. 
3. Set Allowed Authscopes
4. Select Authoriztion Code Grant and Implicit Code Grant. (if your not using Cognito you may use Authorization Code Grant select both for now)

## Optional adding custom features
You can add custom features by following the documentation provided [here](https://developer.amazon.com/docs/smarthome/add-custom-voice-interaction-to-a-smart-home-skill-using-ask-cli.html)

## Validating Lambda Code 

1. On the function page for SmartHomeLab, select the Select a test event.. dropdown from the top menu of the function and click Configure test events.
2. In the dialog that opens, leave Create new test event selected and leave the default template.
3. For the Event name enter: directiveDiscovery.
4. Copy and paste the contents of the JSON below replacing its contents.
5. Click Create.

```
{
    "directive": {
        "header": {
            "namespace": "Alexa.Discovery",
            "name": "Discover",
            "payloadVersion": "3",
            "messageId": "1bd5d003-31b9-476f-ad03-71d471922820"
        },
        "payload": {
            "scope": {
                "type": "BearerToken",
                "token": "access-token-from-skill"
            }
        }
    }
}
```
6. Run the test and review the Execution Results. 

## Test on Alexa
1. Go to https://alexa.amazon.com, login with your developer account, and select Skills from the left menu.
2. Click Your Skills from the top right of the section.
3. On the Your Skills page, select the DEV SKILLS tab.
4. Click the SmartHomeLab skill.
5. On the SmartHomeLab, click Enable in the top right and authenticate with your Amazon developer account. 
6. If you are already signed in, you will be presented with a dialog asking to “Click 'Allow' to sign in to Smart Home Lab”.
7. On success, you should be presented with a window that reads “Smart Home Lab” has been successfully linked.
8. When redirected back to the Skill page, you will be prompted Discover Devices. Click Discover Devices.
9. A new “Sample Switch” with the description of “Lambda Endpoint for Smart Device Lab” will be available in your Devices list.
## Test in devloper console
1. This can only be done after the skill is linked you your account via the alexa app or web site. 
2. Open the simulator and give the invocation Alexa Turn on sample switch
3. The response should be ok indicating success. 

## Test on hardware. 
1. You can test on the actual hardware linked to your account my saying the invocation command "Alexa, turn on sample switch" 
## View Annotated Source Code

Alexa Skill Builder has [ALexa Response Annotated source code](https://linuxacademy.github.io/content-alexa-skillbuilder/docs/PrebuiltModels/smarthome/alexa/skills/smarthome/AlexaResponse.html) using Docco. This provides an in-depth look at the source code to help you understand the lab.

Alexa Skill Builder has [Lambda Handler Annotated source code](https://linuxacademy.github.io/content-alexa-skillbuilder/docs/PrebuiltModels/smarthome/index.html) using Docco. This provides an in-depth look at the source code to help you understand the lab.


