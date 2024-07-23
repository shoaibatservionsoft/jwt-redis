
const express = require('express');
const mongoose = require('mongoose');

const fs = require('fs');
const http = require('http');
const cors = require('cors');

const pkgJSON = require('./package.json');

const config = require('./config');

const router = require('./routes/routes');

const Redis = require('./utils/redis')
const colors = require('colors');

let port = process.env.PORT || config["app.port"];



const app = express();
const server = http.createServer(app);




/**
 * This function will add all middlewares for the routes
 */
const addRouteMiddlewares = () => {
  app.use('/images', express.static('src/assets/images'))
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}

const addErrorMiddleware = () => {
  app.use((_, res) => {
    const pageNotFoundError = `<h1 style="color: black; text-align:center;">404</h1>
                                <h2 style="color: red; text-align:center;">
                                  <i>Not found!</i>
                                </h2>`;

    res.status(404).send(pageNotFoundError);
  });
}

/**
 * This function will include all routes to the application
 */
const registerRoutes = () => {

  app.get('/', (_, res) => {
    const welcomPage = `<h1 style="color: black; text-align:center;">Welcome to Next Chat Backend!</h1>`;
    res.send(welcomPage);
  });
  
  app.get('/images/:imageName', (req, res) => {
    const filePath = `${config['file.path.base']}/${req.params.imageName}`;
    try {
      const file = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.end(file, 'base64');
    } catch (error) {
      if (error.errno && error.errno == -2) {
        console.log(colors.red(`Image not found at ${filePath}`));
        generateResponse(res, 404, "Image not found");
        return;
      }

      generateResponse(res, 500, "Oops! Something went wrong!");
    }
  });
  
  app.use(config['app.route.base'], router);
}

/**
 * This function will attempt to connect to the mongodb
 * 
 * @returns Promise in case of database connection success or failure
 */

const setupDatabase = () => {
  var connStr;
  if (config['db.driver'] == 'mongodb+srv')
      connStr = `${config['db.driver']}://${config['db.username']}:${config['db.password']}@${config['db.address']}/${config['db.name']}?retryWrites=true&w=majority`
  else
      connStr = `${config['db.driver']}://${config['db.address']}:${config['db.port']}/${config['db.name']}`

  mongoose.connect(connStr, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true
  });
  
  return new Promise((resolve, reject) => {
    mongoose.connection
    .once('open', () => {
      console.log(colors.green('> Database connected successfully...'));
      console.log('-----------------------------------------');
      resolve();
    })
    .on('error', (error) => {
      console.error('connection error:', error);
      reject(error);
    });
  });
}

/**
 * This function will start the already setup express app
 * 
 * @returns Promise in case of server connection success or failure
 */
const startApp = () => {
  return new Promise((resolve, reject) => {
    server.listen(port, () => {
      console.log(colors.bgCyan.black(`${config['environment']} Server Started On Port: ${port}`));
      console.log(`${(new Date()).toLocaleString()}`);
      console.log(`=========================================`);
      resolve();
    })
    .on('error', (error) => {
      console.log(`Can't connect to server!`);
      reject(error);
    });
  });
}


/**
 * Initialize the application from here
 */

const init = async () => {


  console.log(colors.yellow(`Welcome to ${pkgJSON['name'].toUpperCase()}`));
  console.log(colors.yellow(`Version: ${pkgJSON['version']}`));
  console.log(colors.yellow(`Description: ${pkgJSON['description']}`));
  console.log(`-----------------------------------------`);

  
  addRouteMiddlewares();
  registerRoutes();
  addErrorMiddleware();
  await Redis.createInstance();
  await setupDatabase();
  // await RMQ.createInstance();

  await startApp();

}







init();
