# 🤖 Pentary
Quendls connection to the Discord world! 

Helps user with a FAQ based command system to find everything they need/are looking for.

 ## 🤷 Why?
If the docs aren't enough, you can still ask us anything on our [Discord Server]()
<hr>


### 🧏‍♂️ For Developers 
The pentary client is written in TypeScript, NodeJS.
For the database we are using a NoSQL Database called MongoDB with the Mongoose NodeJS wrapper. 
Docker is available and ready to use, scroll down to learn more ...

-> For hosting we highly recommend a Linux machine (Ubuntu, Debian, ...)

#### Setup:
- Node V16+
- NPM V8.3+
- Docker
- MongoDB

`.env` file
```md
# The bot token
TOKEN=

# Bot configuration
CLIENT_ID=
GUILD_ID=
OWNER=
NODE_ENV=development

MONGODB_TOKEN=mongodb://localhost:27017/yolo

# Email client
SERVICE=smtp.gmail.com
USER=
PASS=
TO=

# Logging
ADMIN_CHANNEL=

```

`installing` dependencies
```
npm i
```

`up && running` in dev mode
```
npm run dev
```

`building` for production
```
npm run build
```

### Docker commands (Production)

```
$ docker build . -t <username/projectname>

$ docker run -p 4040:8080 -d <username/projectname>
```

```
$ docker ps 

$ docker images

$ docker container ls 

$ docker logs <container id>
```

```
$ docker image rm -f <username/projectname>

$ docker kill <container id>
```

> How do actions work?

Once a new change is pushed to the repo, github will automatically try to build the new changes with the TypeScript compiler. 
If everything passes, a ✅ is displayed, if there are any errors, it will display ❌.
