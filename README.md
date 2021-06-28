# README

![visitors](https://visitor-badge.laobi.icu/badge?page_id=vtu.IoTclient)

This repository contains my final project for course *B/S Arch Software Design*. The project is an IoT platform website, consisting of a **MQTT server** receiving info from (simulated) devices, a **MySQL server** storing data, an **Express Node.js** backend, a **React** with **Material UI** frontend (using the template [material-dashboard-react](https://github.com/creativetimofficial/material-dashboard-react)).

## Demo

Pages' screen shots look like these:

![](assets/demo_home.png)

![](assets/demo_dashboard.png)

![](assets/demo_devices.png)

![](assets/demo_device_detail.png)

![](assets/demo_messages1.png)

![](assets/demo_messages2.png)

![](assets/demo_message_detail.png)

![](assets/demo_maps.png)

![](assets/demo_account.png)

![](assets/demo_login.png)

![](assets/demo_register.png)

---

## Quick Setup

### Frontend & Backend

First install dependency with:
```bash
# Under the root directory of the repository
npm i # if failed, use `npm i --force` instead
cd server && npm i && cd ..
```

Start both the frontend and the backend concurrently (in development mode) with:
```bash
# Under the root directory of the repository
npm run whole
```

By default, the frontend runs at localhost:3000, and the backend runs at localhost:3001.

You can customize the **backend port (default 3001)** by altering

1. First,  `src/utils/config.json`:

```json
{
    "backend_host": "http://localhost:3001" # replace the 3001 with any port you like
}
```

2. Then `server/bin/www` at lines:

```js
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3001'); # here! replace 3001 with any port you like
app.set('port', port);
```

You can customize the **frontend port (default 3000)** by altering `node_modules/react-scripts/scripts/start.js` at lines:

```js
// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
```

(This is not recommended, it's troublesome during migration.)

Now with `npm run whole`, you should see the home page now :). But it's not done yet! You should also set up the MySQL database, the [EMQX Enterprise](https://www.emqx.cn/products/enterprise) MQTT server, and the simulated IoT client devices for the whole website to work.

### MySQL Server (8.0+)

You can set up your MySQL server anywhere you like, even not at localhost.

First create a database named `mqtt`:

```mysql
create database mqtt;
use mqtt;
```

Then set up some necessary tables in MySQL: 

```mysql
# Table mqtt_client is only for EMQX server to write, and nodejs server to read
# Check https://docs.emqx.cn/enterprise/v4.3/backend/backend_mysql.html#mysql-设备在线状态表 for more detail
CREATE TABLE `mqtt_client` (   `id` int(11) unsigned NOT NULL AUTO_INCREMENT,   `clientid` varchar(64) DEFAULT NULL,   `state` varchar(3) DEFAULT NULL,   `node` varchar(64) DEFAULT NULL,   `online_at` datetime DEFAULT NULL,   `offline_at` datetime DEFAULT NULL,   `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,   PRIMARY KEY (`id`),   KEY `mqtt_client_idx` (`clientid`),   UNIQUE KEY `mqtt_client_key` (`clientid`),   INDEX topic_index(`id`, `clientid`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8MB4;

# The following 3 tables are for nodejs server to read and write
create table account(
	user_name varchar(30) primary key,
	password_hash varchar(64),
	email varchar(64) unique,
	phone_number varchar(64));

create table device_info(
	clientid varchar(64),
	device_name varchar(64),
	user_name varchar(64),
	primary key (clientid, user_name),
	foreign key (clientid) references mqtt_client(clientid),
 	foreign key (user_name) references account(user_name));

create table message(
  msgid int unsigned primary key auto_increment,
  alert bit,
  clientid varchar(64),
  info varchar(256),
  lat numeric(20, 14),
  lng numeric(20, 14),
  timestamp timestamp,
  value int,
	foreign key (clientid) references mqtt_client(clientid)
);
```

Then set up your MySQL account info at `server/utils/mysql_config.json` (create it if not exist!):

```json
{
    "host"     : "YOUR MYSQL HOST",
    "user"     : "YOUR USER NAME",
    "password" : "PASSWORD",
    "database" : "mqtt",
    "port"     : YOUR MYSQL PORT
}
```

### EMQX Server

Follow the [EMQX official guide](https://docs.emqx.cn/enterprise/v4.3/#开始使用) to set up your EMQX **Enterprise** server. I recommend you to install EMQX Enterprise via its zip file [here](https://www.emqx.cn/downloads#enterprise), not package management tools like `apt`. After activating it through a free trial license, you can start the MQTT server via

```bash
[PATH TO EMQX ENTERPRISE]/bin/emqx start
```



Most importantly, remember to enable the `emqx_backend_mysql` plugin to let the MQTT server store device info into the `mqtt` database (check [here](https://docs.emqx.cn/enterprise/v4.3/backend/backend_mysql.html) to see the full steps and detail). For me, I set up the MySQL server account info at `[PATH TO EMQX ENTERPRISE]/etc/plugins/emqx_backend_mysql.conf`. Then, enable **emqx_backend_mysql** at EMQX dashboard page `[YOUR MQTT HOST]:18083/#/plugins` with a mouse click. If you have set up the MySQL account, **mqtt** database and several necessary tables previously, it should be working!

Then set up your MQTT config at `server/utils/mqtt_config.json` (create it if not exist!):

```json
{
    "host": "YOUR MQTT HOST" # e.g. `mqtt://localhost`
}
```

Now run `npm run whole` again, the IoT platform should be fully activated. If anything go wrong, check the backend terminal or frontend console for debug info.

### IoT Client

Still, you have no devices. Now we manually simulate some. The IoT client devices are simulated by code, lying under `./iotclient`, which are provided by my teacher, [Hu Xiaojun](https://person.zju.edu.cn/huxiaojun#0). Follow the README of it to create some "devices":

1. Compile the code with
```bash
mvn clean package
```

2. Run
- Put `iot.properties` at the same directory of `iotclient-1.0.0.jar`.
- Alter `iot.properties` to configure device number and related info.
- Run with
```bash
java -jar iotclient-1.0.0.jar
```
- The simulated clients will automatically subscribe to the specified MQTT server, and keep sending some randomized messages.

## Release Version

It's quite necessary to build the frontend into a **release** version through `npm run build`. But before that, you may need to alter the configure file `src/utils/config.json`:

```json
{
    "backend_host": "http://localhost:3001"
}
```

The `backend_host` is where you deploy the backend `./server/` though `node (server/)bin/www`. For example, the below config means that you're have deployed the backend at `123.123.123.123:8000`. (The default backend is at port 3001, you can alter `server/bin/www` to change it like any other Express app!)

```json
{
    "backend_host": "http://123.123.123.123:8000"
}
```

> Remember to keep the `http` tag!

Then, generate release version frontend through:

```bash
npm run build
```

The generated static files should be at `./build/`. Now, feel free to deploy the static frontend via servers like Nginx, etc. When you are using those other servers, remember to redirect any error uri to `build/index.html`, and the frontend router would automatically re-render the single page frontend :).

