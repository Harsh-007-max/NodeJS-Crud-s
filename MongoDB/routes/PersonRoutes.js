const express = require("express");
const PersonModel = require("../models/PersonModel");
const router = express.Router();

//--------GetALL--------
const getAllPerson = async (req, res) => {
  console.log("GetAll")
  const Persons = await PersonModel.find({}).sort({ PersonID: 1 });
  res.status(200).send(Persons);
}
//--------GetByID--------
const getByPersonID = async (req, res) => {
  try{
    console.log("GetByID")
    const Person = await PersonModel.findOne({ PersonID: req.params.id })
    res.status(200).send(Person);
  }catch(error){
    console.log(error)
    res.status(500).send("Insertnal Server Error");
  }}
//--------add new person--------
const addNewPerson = async (req, res) => {
  const PersonData = req.body;
  console.log("add new Person")
  console.log("Person Data",PersonData)
  const lastPerson = await PersonModel.find({}).sort({ PersonID: -1 }).limit(1);
  if (lastPerson.length > 0) {
    PersonData.PersonID = lastPerson[0].PersonID + 1;
  } else {
    PersonData.PersonID = 1;
  }
  const NewPerson = await PersonModel.create(PersonData);
  res.status(200).send(NewPerson);
}
//--------update Person--------
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
//----------delete Person by id----------
const deleteByPersonID = async (req, res) => {
  console.log(`delete person ${req.params.id}`)
  const PersonID = Number(req.params.id);
  const Person = await PersonModel.findOne({ PersonID: PersonID })
  console.log(`${Person.Name} deleted successfully`)
  const response = await PersonModel.deleteOne({PersonID:PersonID});
  res.status(200).send(response);
}

//--------routes--------
router.get("/",getAllPerson);
router.get("/:id",getByPersonID);
router.post("/",addNewPerson);
router.put("/:id",updatePerson);
router.delete("/:id",deleteByPersonID);

module.exports = router;
