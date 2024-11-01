# Install necessary dependencies
```shell
npm i express nodemon dotenv
```

# Create new command to start the server
In scripts section add new entry under "test" command
```json
"start":"nodemon index.js"
```

# Start development server using
```shell
npm start
```

# In mongoConnectDB.js add following
```js
const mongoose = require("mongoose");
const connectMongoDB = url => {
  return mongoose.connect(url);
}
module.exports = connectMongoDB;
```

# In index.js write the following code
```js
const express = require("express");
const app = express();
const connectMongoDB = require("./mongoConnectDB");
const PersonRoutes = require("./routes/PersonRoutes");
require("dotenv").config()

const PORT = process.env.PORT || 8000;

const connectionString = process.env.DB_URL;

connectMongoDB(connectionString).then(console.log("Connected to mongodb")).catch(err=>console.error(`error ${err}`))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(PersonRoutes);

app.listen(PORT,function(){console.log(`Listning on port ${PORT}`)})
```

# create a router
```js
const express = require("express");
const PersonModel = require("../models/PersonModel");
const router = express.Router();
```

## get all persons
```js
const getAllPerson = async (req, res) => {
  console.log("GetAll")
  const Persons = await PersonModel.find({}).sort({ PersonID: 1 });
  res.status(200).send(Persons);
}
```
### get all persons
![get_all_persons](https://github.com/Harsh-007-max/NodeJS-Crud-s/blob/main/MongoDB/images/getall_persons.png)

## get by PersonID
```js
const getByPersonID = async (req, res) => {
  try{
    console.log("GetByID")
    const Person = await PersonModel.findOne({ PersonID: req.params.id })
    res.status(200).send(Person);
  }catch(error){
    console.log(error)
    res.status(500).send("Insertnal Server Error");
  }}
```
### get by PersonID
![get_by_personid](https://github.com/user-attachments/assets/002eb12d-b643-4cab-9062-f39ac47a05d9)

## add new Person
```js
const addNewPerson = async (req, res) => {
  const PersonData = req.body;
  console.log("add new Person")
  const lastPerson = await PersonModel.find({}).sort({ PersonID: -1 }).limit(1);
  if (lastPerson.length > 0) {
    PersonData.PersonID = lastPerson[0].PersonID + 1;
  } else {
    PersonData.PersonID = 1;
  }
  const NewPerson = await PersonModel.create(PersonData);
  res.status(200).send(NewPerson);
}
```
### add new person
![add_new_person](https://github.com/user-attachments/assets/162f5a4d-aa41-436e-917b-5cf9e9c2967a)

## update by PersonID
```js
const updatePerson = async (req, res) => {
  console.log("update existing person")
  const PersonID = req.params.id;
  const UpdatedPersonData = req.body;
  const UpdatedPerson = await PersonModel.updateOne({ PersonID: PersonID }, {
    Name: UpdatedPersonData.Name,
    Description: UpdatedPersonData.Description,
    gender: UpdatedPersonData.gender,
  });
  res.status(200).send(UpdatedPerson);
}
```
### update by PersonID
![update_by_personid](https://github.com/user-attachments/assets/686fbb9a-abb7-4d93-a236-e68866e899bd)

## delete by PersonID
```js
const deleteByPersonID = async (req, res) => {
  console.log("delete person")
  const PersonID = req.params.id;
  const response = await PersonModel.deleteOne({PersonID:PersonID});
  res.status(200).send(response);
}
```
### delete by PersonID
![delete_by_personid](https://github.com/user-attachments/assets/3551947d-33dd-42e0-acff-42d7ce66ea45)

## finally add all routes and excport the module
```js
router.get("/",getAllPerson);
router.get("/:id",getByPersonID);
router.post("/",addNewPerson);
router.put("/:id",updatePerson);
router.delete("/:id",deleteByPersonID);

module.exports = router;
```

