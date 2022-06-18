# 🤖 Pentary
Glups connection to the Discord world! 

Helps user with a FAQ based command system to find everything they need

 ## 🤷 Why?
If the docs aren't enough, you can still ask us anything on our [Discord Server]()
<hr>

### 🧏‍♂️ Developer Setup

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

Server setup (gonna be rewritten soon):

- Download [Erlang](https://www.erlang.org/downloads)
```
$ cd server
```
```
$ erl
```
```
$ c(api).
```
```
$ inets:start().
```
```
$ api:start().
```
