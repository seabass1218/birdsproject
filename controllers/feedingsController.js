const Feeding = require('../models/feeding');
const Animal = require('../models/animal');
const Food = require('../models/food');
const Medicine = require('../models/medicine');
const excel = require('exceljs');

exports.get_index = async function(req, res) {
  const feedings = await Feeding.find({}).sort({dateTime: 'desc'});

  res.render('feedings/index', {data: feedings});
};

exports.get_export = async function(req, res) {
  const feedings = await Feeding.find({}).sort({dateTime: 'desc'});

  res.render('feedings/export', {data: feedings});
};

exports.get_export_submit = async function(req, res) {
  let {startDate, endDate} = req.query;

  const feedings = await Feeding.find({
    dateTime: 
    { $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
      $lt: new Date(new Date(endDate).setHours(23, 59, 59))
    }
  }).sort({dateTime: 'desc'});

  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet('Feedings');
  worksheet.columns = [
    {header: 'Date', key: 'dateTime', width: 20},
    {header: 'Species', key: 'animalSpecies', width: 10},
    {header: 'Nickname', key: 'animalNickName', width: 10},
    {header: 'Food', key: 'food', width: 10},
    {header: 'Medicine', key: 'medicine', width: 10},
    {header: 'Goal Weight', key: 'goalWeightOfAnimal', width: 10},
    {header: 'Actual Weight', key: 'actualWeightOfAnimal', width: 10},
    {header: 'Amount Fed', key: 'amountOfFoodFed', width: 10},
    {header: 'Leftover Food', key: 'leftoverFood', width: 10},
    {header: 'Weather Conditions', key: 'weatherConditions', width: 20},
    {header: 'Comments', key: 'comments', width: 50},
  ];

  worksheet.addRows(feedings);

  res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  );
  res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + 'feedings.xlsx',
  );
  return workbook.xlsx.write(res).then(function() {
    res.status(200).end();
  });
};

exports.get_create = async function(req, res) {
  const animals = await Animal.find({enabled: true});
  const foods = await Food.find({});
  const medicines = await Medicine.find({});

  res.render('feedings/create',
      {animals: animals, foods: foods, medicines: medicines});
};

exports.post_create = async function(req, res) {
  const animal = await Animal.findOne({_id: req.body.animalId});

  const newfeeding = new Feeding({
    animalSpecies: animal.species,
    animalNickName: animal.nickName,
    food: req.body.food,
    medicine: req.body.medicine,
    goalWeightOfAnimal: req.body.goalWeightOfAnimal,
    actualWeightOfAnimal: req.body.actualWeightOfAnimal,
    amountOfFoodFed: req.body.amountOfFood,
    leftoverFood: req.body.leftoverFood,
    comments: req.body.comments,
    weatherConditions: req.body.weatherConditions,
    dateTime: req.body.date,
    keeperName: res.locals.user.firstName + ' ' + res.locals.user.lastName,
  });

  newfeeding.save(function(err) {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/feedings');
    }
  });
};



exports.get_update = async function(req, res) {
  const animals = await Animal.find({enabled: true});
  const foods = await Food.find({});
  const medicines = await Medicine.find({});
  
  Feeding.findOne({_id: req.query.id}, function(err, feedings) {
    if (err) {
      // handle error
    } else {
      res.render('feedings/update', {data: feedings, animals: animals, foods: foods, medicines: medicines});
    }
  });
};

exports.post_update = function(req, res) {
  const updateData = {
    date: req.body.date,
    food: req.body.food,
    medicine: req.body.medicine,
    goalWeightOfAnimal: req.body.goalWeightOfAnimal,
    actualWeightOfAnimal: req.body.actualWeightOfAnimal,
    amountOfFoodFed: req.body.amountOfFood,
    leftoverFood: req.body.leftoverFood,
    comments: req.body.comments
  };

  Feeding.findOneAndUpdate({_id: req.body.id}, updateData, function(err, data) {
    if (err) {
      // handle error
      console.log(err);
    } else {
      res.redirect('/feedings');
    }
  });
};

exports.get_delete = function(req, res) {
  Feeding.findOneAndDelete({_id: req.query.id}, function(err) {
    if (err) {
      // handle error
      console.log(err);
    } else {
      res.redirect('/feedings');
    }
  });
};