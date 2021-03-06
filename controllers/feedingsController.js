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

  let feedings = await Feeding.find({
    dateTime: 
    { $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
      $lte: new Date(new Date(endDate).setHours(23, 59, 59))
    }
  }).sort({dateTime: 'desc'});

  // fix timezones -- convert to central 
  let displayFeedings = [];
  for (let i=0; i<feedings.length; i++) {
    displayFeedings.push({
      displayDate: feedings[i].dateTime.toLocaleString("en-US", {timeZone: 'America/Chicago'}),
      animalSpecies: feedings[i].animalSpecies,
      animalNickName: feedings[i].animalNickName,
      food: feedings[i].food,
      medicine: feedings[i].medicine,
      goalWeightOfAnimal: feedings[i].goalWeightOfAnimal,
      actualWeightOfAnimal: feedings[i].actualWeightOfAnimal,
      amountOfFoodFed: feedings[i].amountOfFoodFed,
      leftoverFood: feedings[i].leftoverFood,
      weatherConditions: feedings[i].weatherConditions,
      comments: feedings[i].comments
    })
  }

  console.log (displayFeedings);

  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet('Feedings');
  worksheet.columns = [
    {header: 'Date', key: 'displayDate', width: 25},
    {header: 'Species', key: 'animalSpecies', width: 10},
    {header: 'Nickname', key: 'animalNickName', width: 10},
    {header: 'Food', key: 'food', width: 10},
    {header: 'Medicine', key: 'medicine', width: 10},
    {header: 'Goal Weight', key: 'goalWeightOfAnimal', width: 12},
    {header: 'Actual Weight', key: 'actualWeightOfAnimal', width: 15},
    {header: 'Amount Fed', key: 'amountOfFoodFed', width: 12},
    {header: 'Leftover Food', key: 'leftoverFood', width: 13},
    {header: 'Weather Conditions', key: 'weatherConditions', width: 20},
    {header: 'Comments', key: 'comments', width: 50},
  ];

  worksheet.addRows(displayFeedings);

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

exports.post_update = async function(req, res) {
  const animal = await Animal.findOne({_id: req.body.animalId});

  const updateData = {
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