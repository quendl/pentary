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

Discord setup:

`.env` file
```
TOKEN= 

CLIENT_ID=
GUILD_ID=
OWNER= 

MONGODB_TOKEN=
NODE_ENV=development
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

> How do actions work?

Once a new change is pushed to the repo, github will automatically try to build the new changes with the TypeScript compiler. 
If everything passes, a ✅ is displayed, if there are any errors, it will display ❌.
