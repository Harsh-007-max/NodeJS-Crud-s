const express = require("express");
const app = express();
// const mongoose = require("mongoose");
const connectMongoDB = require("./mongoConnectDB");
const Person = require("./models/PersonModel");
const PersonRoutes = require("./routes/PersonRoutes");
require("dotenv").config()

const PORT = process.env.PORT || 8000;

const connectionString = process.env.DB_URL;

connectMongoDB(connectionString).then(console.log("Connected to mongodb")).catch(err=>console.error(`error ${err}`))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(PersonRoutes);

app.listen(PORT,function(){console.log(`Listning on port ${PORT}`)})
