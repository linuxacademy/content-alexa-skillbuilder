#!/bin/bash

git checkout master
docco lambda/custom/index.js
git add docs/*
git stash 
git checkout gh-pages 
git stash apply 
git commit -am "Updating docs"
git push
git stash drop
