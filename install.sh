#!/bin/sh

echo "install client"
cd client/users-permissions-app
npm install

echo "install server"
cd ../../node-server
npm install

