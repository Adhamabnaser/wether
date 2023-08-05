let mylocation = document.querySelector('.location')
let search = document.getElementById('search')
let temp_num = document.querySelector('.temp-num')
let logo_wether = document.querySelector('.logo-wether')
let custom_text = document.querySelector('.custom-text')
let logo_wether_two = document.querySelector('.logo-wether-two')
let temp_num_two = document.querySelector('.temp-num-two')
console.log(temp_num_two)
async function test () 
{
    let file =await fetch(`http://api.weatherapi.com/v1/forecast.json?key=418a647fac9e4fa7836173650232202&q=${search.value}&days=3&aqi=no&alerts=no`) 
    file = await file.json()
    return file
}

let dayWether = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let monthWether = ["January","February","March","April","May","June","July","August","September","October","November","December"];


// function display1 (response){
    
//     console.log(response)
//     if(response.error)
//     {
//         console.log('error')
//     }
//     else
//     {
//         mylocation.innerHTML = response.location.name

//     }
// }

function displaySecondWether(locationWether,currentWether)
{
   
        if(currentWether != null)
        {
            let wetherDate = new Date(currentWether.last_updated)
            let firstWether = `
            <div class="col-4">
            <div class="d-flex justify-content-between text-white py-1 ">
            <p class="text-white-50 fs-6">${dayWether[wetherDate.getDay()]}</p>
            <p class="text-white-50 fs-6">${wetherDate.getDate() + monthWether[wetherDate.getMonth()]}</p>
          </div>
          <div class="me-5" >
          <div class="location text-white-50 fs-6 p-2">${locationWether.name}</div>
          <div class="temperature d-flex">
            <div class="temp-num text-white fw-bold">
            ${currentWether.temp_c}<sup>o</sup>c
            </div>
            <div class="temp-logo p-4 m-2 logo-wether w-100">
            <img src= https:${currentWether.condition.icon} class=" logo-image" />
            </div>
           
          </div>
          <div>
          <p class="custom-text">${currentWether.condition.text}</p>
          </div>
          <div class="d-flex text-white-50">
                <span class="pe-3">
                  <img src="img/icon-umberella.png">
                  20%
                </span>
                <span class="px-3">
                  <img src="img/icon-wind.png">
                  18km/h
                </span>
                <span class="px-3">
                  <img src="img/icon-compass.png">
                  East
                </span>
                
              </div>

          
          </div>
           
            </div>
            `
     
            document.querySelector('#forecast').innerHTML = firstWether;
     
        }
  
}


// function display2 (response){
    
 
    
//     temp_num.innerHTML=`${response.current.temp_c}<sup>o</sup>c`

   
// }

// function display3 (response){

//     logo_wether.innerHTML=`<img src= https:${response.current.condition.icon} class=" logo-image" />`
    
// }
// function display4(response)
// {
//     custom_text.innerHTML = response.current.condition.text
// }
// function display5(response)
// {
//     logo_wether_two.innerHTML=`<img src= https:${response.forecast.forecastday[0].day.condition.icon} class=" logo-image" />`
// }
// function displayOtherWeather(forecastdayArr)
// { 
//     let store = '';

//     for (let i = 0; i < forecastdayArr.length; i++) {
         
//         store += `${forecastdayArr[i].day.maxtemp_c}<sup>o</sup>C</div>`
        
//     }
//     temp_num_two.innerHTML = store;

// }

function displayOtherWeather(forecastdayArr)
{
    let store = "";

    for (let i = 1; i < forecastdayArr.length; i++) {
        
        store = `
    
        <div class="col-4">
       
        <div class="content-info text-center">
          <div class="text-center text-white py-1">
            <p>${dayWether[new Date(forecastdayArr[i].date).getDay()]}</p>
            
          </div>
          <div class="content-info text-center mt-3">
            <div class="second_wether">
              <div class=" img-fluid mb-4">
                <img src="https:${forecastdayArr[i].day.condition.icon}">

              </div>
            <div class=" text-white fw-bolder fs-3">
            ${forecastdayArr[i].day.maxtemp_c}<sup>o</sup>c 
            </div>

            <div class=" text-white-50  fs-6 mb-3">
            ${forecastdayArr[i].day.mintemp_c}<sup>o</sup> 
             </div>
             <div>
              <p class="custom-text">${forecastdayArr[i].day.condition.text}</p>
            </div>

          </div>

       
       
        
        </div>
      </div>
  </div> 
        
        `
        document.querySelector("#forecast").innerHTML += store
        
    }
}


async function fetchAndDisplay()
{
    let response = await test();
    // display1(response)
    // display2(response)
    // display3(response)
    // display4(response)
    // display5(response)
    // displayOtherWeather(response.forecast.forecastday)
    displaySecondWether(response.location, response.current);
    displayOtherWeather(response.forecast.forecastday)
}

search.addEventListener('input',fetchAndDisplay)