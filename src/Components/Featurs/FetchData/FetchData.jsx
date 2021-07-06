import React,{useState,useEffect, useRef} from 'react';
import './FetchData.css';
function FetchData() {
  const [city,setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [counter,setCounter] = useState(0);
  const [temp,setTemp] = useState(false);
  const [resultFilter,setResultFilter] = useState([]);
  const [checkWeather,setCheckWeather] = useState(false);
  
  const inputRef = useRef();
  const apiKey = "64fd34f49cad7e7ef6f22286e7aaf394"
  const api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const citiesApi = "https://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&appid=64fd34f49cad7e7ef6f22286e7aaf394";

  const cityName = useRef();

  function getApi(randomApi,citiesApi){
  fetch(randomApi).then(city => city.json()).then(res => setCity(res));
  fetch(citiesApi).then(city => city.json()).then(res => setCities(res.list));
  filterCities()
  }

  useEffect(() => getApi(api,citiesApi),[])
  
  console.log(city);
  console.log(cities);



  function filterCities(){
   const keyWord = inputRef.current.value;
   setCity(inputRef.current.value)
   const array = cities.filter((item) => {
   if(keyWord.length > 0){
   return item.name.substring(0,keyWord.length).toLowerCase() === keyWord.toLowerCase(); 
   }     
 })
    setResultFilter(array);
  }

 
    return (
        <div className="container">
          
        <input ref={inputRef}  onChange={()=>{filterCities()}}  type="text" name="" id="" />
        <span></span>
         <div className="autoComplition">
          {
            resultFilter && resultFilter.map((keyWord,key)=> {
                  
               return <ul  className="keyWordlist">
                            <h3 ref={cityName} onClick={()=> setTemp(!temp)}  key={key}>{keyWord.name}</h3>
                            {temp ? <h5>temp:{keyWord.main.temp}</h5> : <></>}
                     </ul> 
            }) 
          }

         </div>

        </div>
    );
}

export default FetchData;