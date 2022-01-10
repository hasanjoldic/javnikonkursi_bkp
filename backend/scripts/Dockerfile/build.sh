#!/bin/bash

if [ "${ENV}" = "dev-server" ];
  then npm run build:watch;
  else npm run build;
fi