let countries = []
const countryListElement = document.getElementById("country-list")
const countryInputElement = document.getElementById("country-input")
const countryName = document.getElementById("country-name")
const countryListDisplay = document.getElementById("country-list")
const btnSubmit = document.getElementById("btn-submit")
const selectedCountry = document.getElementById("selected-country")
function fetchCountries(){
    fetch("https://restcountries.com/v3.1/all")
    .then(res=> res.json())
    .then((data)=>{
        countries = data.map((x) => x.name.common)
        countries.sort()
        loadData(countries, countryListElement)
    })
}
function loadData(data,element){
    if (data){
        element.innerHTML = ""
        let innerElement = ""
        data.forEach((item)=>{
            innerElement += `
            <li id="country-name">${item}</li>
            `
        })
        element.innerHTML = innerElement
    }
}

function filterData(data, searchText){
    return data.filter(x => x.toLowerCase().includes(searchText.toLowerCase()))
}

fetchCountries()
countryInputElement.addEventListener("input",function(){
    countryListDisplay.style.display = "block"
    const filteredData = filterData(countries,countryInputElement.value)
    loadData(filteredData, countryListElement)
})
//
countryListElement.addEventListener("click",()=>selectCountry(event)) 

function selectCountry(event){
    countryInputElement.value=event.target.innerText
    countryListDisplay.style.display = "none"
}
countryListDisplay.addEventListener("mouseleave",()=>{
    countryListDisplay.style.display = "none"
})
btnSubmit.addEventListener("click",()=>{
    selectedCountry.innerText = countryInputElement.value
})
