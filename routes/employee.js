const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function(req, res) {

  const rawData = fs.readFileSync('./db.json');
  const employees = JSON.parse(rawData).employees;

  res.status(200).send(employees);

});

module.exports = router;
