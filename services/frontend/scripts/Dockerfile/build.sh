#!/bin/bash

if [ ${ENV} = "development" ];
  then npm run build:dev;
  else npm run build;
fi