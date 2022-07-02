#!/bin/bash
title "Pentary Setup"
echo "Welcome to the Pentary Dev Setup. You will be asked to introduce several information, please answer them as good as possible."

echo "Please introduce your Discord Bot Token:"
read BOT_TOKEN

echo "Please indicate your main client ID (where commands will be created)."
read CLIENT_ID

echo "Please indicate your main guild ID (where commands will be deployed during development)."
read GUILD_ID

echo "Please enter the Bot Owner (Discord UserID)"
read OWNER_ID

echo "Please enter the Bot state (development, production)"
read NODE_ENV

echo "Please provide your MongoDB connection URI."
read MONGO_TOKEN

echo "For emails, provide your service (gmail, hotmail ...)"
read SERVICE

echo "For emails, provide your email where emails are being sent from"
read USER

echo "For emails, provide your emails passoword"
read PASS

echo "For emails, provide the receiver (another email from you)"
read TO

echo "For logging, please provide the channel ID for admin logs"
read ADMIN_CHANNEL

echo "TOKEN=$BOT_TOKEN
CLIENT_ID=$CLIENT_ID
GUILD_ID=$MAIN_GUILD_ID
OWNER=$OWNER_ID
NODE_ENV=$NODE_ENV
MONGODB_TOKEN=$MONGODB_TOKEN
SERVICE=$SERVICE
USER=$USER
PASS=$PASS
TO=$PASS
ADMIN_CHANNEL=$ADMIN_CHANNEL" > ./.env

echo "Done."