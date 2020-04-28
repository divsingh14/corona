const express = require('express');
const path = require('path');
const router = express.Router();
const caseController = require('../controller/cases');

router.get('/',caseController.getTotalCases);
router.get('/country',caseController.getCountryList);
router.post('/getdetails',caseController.getCountryDetails);
router.get('/history',caseController.getAllCountriesData);

module.exports = router;