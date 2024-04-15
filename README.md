Live APP LINK : https://weather-forecaste-n9dg68sw0-abdulbasit2733s-projects.vercel.app/
To run the project after cloning it from GitHub to your local machine, follow these steps:

Prerequisites
Node.js (>= 14.x)
npm (Node Package Manager)

1. git clone https://github.com/AbdulBasit2733/weather-forecaste.git
2. cd weather-forecast
3. npm install

4. Create a .env file in the root directory: Used In Weather Component
   then add your api key of https://openweathermap.org/current
   NOTE use <VITE_VARIABLE_NAME = API KEY> for securing your key in env file.

5. use this OpenSoftData Api URL https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=1000&facet=country_code&facet=admin1_code&facet=admin2_code&facet=timezone&refine.population>=1000 for getting all the data,
   This API USED In Home Component

6. Start the development server: npm run dev
