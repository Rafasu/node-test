// Use of node.js to connect to 
//Formula to change from Kelvin to Celsius: 0 K − 273.15 = -273.1 °C
//Formula to change from Farenheit to Celsius: (°F − 32) × 5/9 = 0 °C

//Require https module
const https = require('https');
//Require http module
const http  = require("http");

function printError(error){
    console.error(error.message);
}

function printWeather(cityName, weather){
    const message = `The weather in ${cityName} is ${(weather-273.15)} C`;
    console.log(message);
};


function getWeather(cityName, countryCode){
    try{
        const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&APPID=d6e0f4b9c353eeec9d13a03a131acd34`, 
        response =>{
            //Response it's ok.
            if(response.statusCode === 200){
                let body = "";
                
                //Read the data. 
                response.on('data', data =>{
                    body += data.toString();
                });

                response.on('end', () =>{
                    //Another data. 
                    try{
                        // Parse the data
                        const weather = JSON.parse(body);                            
                        // Print the data
                        printWeather(cityName, weather.main.temp);

                    }catch(error){
                        printError(error);
                    }

                });

            }
            else{
                const message = `There was an error getting the city ${cityName} (${http.STATUS_CODES[response.statusCode]})`;
                const statusCodeError = new Error(message);
                printError(statusCodeError);
            }

        });
    }catch(error){
        printError(error);
    }

}

const city = process.argv.slice(2,3);
const countryCode = process.argv.slice(3,4);
getWeather(city, countryCode);
