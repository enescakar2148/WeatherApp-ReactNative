const getAPI = (lat, lon) => {
    return "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&lang=tr&units=metric&appid=54937b3c66e38f104e47fee6dec7b503";
}
export default getAPI;
