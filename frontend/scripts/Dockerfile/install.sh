#!/bin/bash

if [ ${ENV} = "development" ];
  then npm install;
  else npm ci;
fi