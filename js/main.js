const elDiv = document.querySelector(".data-js");
const elForm = document.querySelector(".form-js");
const elInput = document.querySelector(".input-js");
const elSearch = document.querySelector(".search-js");
const API_KEY = "e88430bd85b725b18990c2f2a713556b";
const getdata = async (city) => {
    elSearch.setAttribute("class", "spinner-border text-info");
    elSearch.innerHTML = "";
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
    elSearch.setAttribute("class", "");
    elSearch.innerHTML = "Search";
    if(res.status === 404){
        elInput.setAttribute("placeholder", "Shahar topilmadi");
        elInput.classList.add("wrong");
    }else{
        elInput.setAttribute("placeholder", "Shahar kiritining");
        elInput.classList.remove("wrong");

    }
    if (!res.ok) throw new Error("Something went wrong");
    return res.json();
}
let id = 0;
function weatherUI(data) {
    const divbody = document.createElement("div");
    divbody.setAttribute("class", "text-white bg-primary rounded p-5 d-flex justify-content-between mt-4");
    divbody.innerHTML = `
    <div>
    <h1>${data.name}<sup class="badge bg-secondary">${data.sys.country}
    </sup></h1>
    <h2>Harorat: ${data.main.temp}&degC</h2>
    </div>
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    `
    elDiv.appendChild(divbody);

        console.log(data);

}

elForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityname = elInput.value.trim();
    getdata(cityname).then(data => weatherUI(data));
    elForm.reset()
})