import axios from "axios";




export const getPlacesData = async (type,sw, ne) => {
    try{
        //request
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY
          }
        }); // deconstructed response from API for App (restaurant data)

        return data;
    } catch (error){
        console.log(error)
    }
}

export const getWeatherData = async (lat, lng) => {
  try {
      const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
        params: { lon:lng, lat: lat},
        headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_WEATHER_API_KEY,
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
        }
      });
      return data;
    } catch (error) {
        console.log(error)
  }
}