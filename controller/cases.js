const axios = require('axios');

exports.getTotalCases = async(req,res,next)=>{
    
    let response = '';
    try {
        response = await axios.get('https://covid-19-data.p.rapidapi.com/totals',{
              query : {
                  "format": "json" 
              },
              headers:{
                  "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
                  "x-rapidapi-key": "d01500ec10msh2db30e544d60018p1e16edjsne36926f3948e"
              }
        });
    } catch (error) {
        console.error(error);
    }
    let {confirmed,recovered,critical,deaths} = response.data[0];
    const totalDetail = response.data[0]
    res.render('index',{pageTitle:"Welcome",totalDetail : totalDetail});
}

exports.getCountryList = async(req,res,next) => {

    let response = '';
    try {
        response = await axios.get('https://covid-193.p.rapidapi.com/countries',{
                headers:{
                    "x-rapidapi-host": "covid-193.p.rapidapi.com",
	                "x-rapidapi-key": "d01500ec10msh2db30e544d60018p1e16edjsne36926f3948e"
                }
            });
    } catch (error) {
        console.error(error);
    }
    const countriesName = response.data.response;
    res.render('country',{pageTitle:"Country Wise", countryNames : countriesName});
};

exports.getCountryDetails = async(req,res,next)=>{
    const countryName = req.body.country;
    let todayDate = new Date().toISOString().slice(0,10);
    
    let response = '';
    try {
        response = await axios.get('https://covid-193.p.rapidapi.com/history',{
            headers:{
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "d01500ec10msh2db30e544d60018p1e16edjsne36926f3948e"
              },  
            params : {
                "country": countryName,
                "day": todayDate, 
              },
              
        });
    } catch (error) {
        console.error(error);
    }
    const count = Number(response.data.results);
    const data = response.data.response;
    const {cases,deaths,tests} = data[count-1];
    res.render('getDetails',{
        pageTitle: `${countryName} Data`,
        cases : cases,
        deaths : deaths,
        tests : tests,
        todayDate: todayDate,
        countryName: countryName
    });
};

exports.getAllCountriesData = async(req,res,next) =>{
   
    let response = '';
    try {
        response = await axios.get('https://covid-193.p.rapidapi.com/statistics',{
            headers:{
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "d01500ec10msh2db30e544d60018p1e16edjsne36926f3948e"
              }
        });
    } catch (error) {
        console.error(error);
    }
    const countryList = response.data.response;

    res.render('countriesData',{
        pageTitle : "All Countries Cases",
        countryList : countryList,
    });
} 