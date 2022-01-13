#!/bin/bash

if [ "${ENV}" = "dev-server" ];
  then yarn build:watch;
  else yarn build;
fi