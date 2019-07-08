#!/usr/bin/env bash
PROJECT_NAME="eventslab"

echo "Checking S3 bucket exists..."                                                                                                                                                                                                           
BUCKET_EXISTS=true    
BUCKET_NAME=alexaskillbuilder                                                                                                                                                                                                                  
S3_CHECK=$(aws s3 ls "s3://${BUCKET_NAME}" 2>&1)                                                                                                                                                                                                                                                                                                                                     
if [ $? != 0 ]                                                                                                                                                                                                                                
then                                                                                                                                                                                                                                          
  NO_BUCKET_CHECK=$(echo $S3_CHECK | grep -c 'NoSuchBucket')                                                                                                                                                                                     
  if [ $NO_BUCKET_CHECK = 1 ]; then                                                                                                                                                                                                              
    echo "Bucket does not exist" 
    aws s3 mb s3://alexaskillbuilder                                                                                                                                                                                                
    BUCKET_EXISTS=false                                                                                                                                                                                                                       
  else                                                                                                                                                                                                                                        
    echo "Error checking S3 Bucket"                                                                                                                                                                                                           
    echo "$S3_CHECK"                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  fi 
else                                                                                                                                                                                                                                         
  echo "Bucket exists"
fi  
                

git clone --single-branch --branch intentsLab https://github.com/linuxacademy/content-alexa-skillbuilder.git $PROJECT_NAME
cd $PROJECT_NAME/
zip -j  $PROJECT_NAME -@ < ../files.txt
cd lambda/custom
npm install 
cd ../../
zip -u -r  $PROJECT_NAME  lambda/custom/node_modules/
aws s3 cp $PROJECT_NAME.zip s3://alexaskillbuilder/
cd ../
sed -i '.bak' "s/CHANGEME/s3:\/\/alexaskillbuilder\/$PROJECT_NAME.zip/g" alexaskillbuilder.yaml 
aws cloudformation deploy --template-file ./alexaskillbuilder.yaml --stack-name $PROJECT_NAME --parameter-overrides ProjectName=$PROJECT_NAME  --capabilities CAPABILITY_IAM
aws cloudformation describe-stacks --stack-name intentslab --output text
ARN=$(aws cloudformation describe-stacks --stack-name $PROJECT_NAME --query "Stacks[0].Outputs[?OutputKey=='AlexaSkillFunctionARN'].OutputValue" --output text 2>&1)
STACK_STATUS=$(aws cloudformation describe-stacks --stack-name $PROJECT_NAME --query "Stacks[0].StackStatus" --output text 2>&1)

if [ $STACK_STATUS = "CREATE_COMPLETE"  ]; then                                                                                                                                                                                                              
    echo "Stack Created"  
    sed -i '.bak' "s/\"uri\":.*/ \"uri\": \"$ARN\"/g" $PROJECT_NAME/skill.json                                                                                                                                                                                                     
  else                                                                                                                                                                                                                                        
    echo "Stack Failed Check log"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
fi 





