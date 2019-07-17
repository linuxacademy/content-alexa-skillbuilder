#!/bin/sh
yum update -y
yum -y install git 
curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
yum -y install nodejs
sudo npm install -g ask-cli