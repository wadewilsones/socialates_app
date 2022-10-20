// Import dependencies
const express = require("express");
const app = express();
require('dotenv').config();


const routePaths = require("./routes/authen");

app.use("/", routePaths);

//Start web server
const port = process.env.PORT;
app.listen(port, ()=> {console.log(`Host on ${port}`)})

