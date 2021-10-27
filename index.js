const express = require("express");
const { PORT } = require("./config");
const databaseConfig = require("./config/database");
const expressConfig = require("./config/express");
const port = process.env.PORT || PORT;
const routesConfig= require('./config/routes')
start();
async function start() {
  const app = express();
  await databaseConfig(app);
  expressConfig(app);
  routesConfig(app);
 app.get('/', (req, res)=>{
   
  res.send('HELLO')})
  app.listen(port, () => {
   console.log(`Server is listening on port ${port}`);
  });
}
