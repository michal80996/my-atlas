import CountryClass from "./countryClass.js";

export let countries_ar = [];
const firstCountries = ["united states", "israel", "thailand", "france"]

//Bring the countries in the first time
export const doApi = async () => {
    try {
        document.querySelector("#id_notFound").style.display = "none";
        let myUrl = `https://restcountries.com/v3.1/all`;
        let obj = await fetch(myUrl);
        let data = await obj.json();

        data = data.filter(item => item.name.common != "Palestine");
        data.forEach(country => {
            countries_ar.push(country)
        });
        countries_ar = _.sortBy(countries_ar, "name.common");
        console.log(countries_ar);
        previewFirstCountries(countries_ar);
        createSelectBox();

    } catch (error) {
        document.querySelector("#id_notFound").style.display = "block";
    }
}

// Displays the first countries
export const previewFirstCountries = (countries_ar) => {
    const filteredNames = countries_ar.filter(obj => firstCountries.includes(obj.name.common.toLowerCase()
        || obj.cca3.toLowerCase()));

    document.querySelector(".cardCountry").innerHTML = "";

    if (filteredNames) {
        filteredNames.forEach(item => {
            const tempCountry = new CountryClass(".cardCountry", item, replaceCountry);
            tempCountry.previewRender();
        })
    } else {
        document.querySelector("#id_notFound").style.display = "block";
    }
}

//Displays the user's selection
export const replaceCountry = (_countryName) => {
    console.log(_countryName);

    let theCountry = countries_ar.filter(item =>
        item.name.common.toLowerCase().includes(_countryName.toLowerCase())
        || item.cca3.toLowerCase().includes(_countryName.toLowerCase())
    );
    console.log(theCountry);

    document.querySelector(".cardCountry").innerHTML = "";
    document.querySelector("#id_notFound").style.display = "none";

    if (theCountry.length > 1) {
        theCountry.forEach(item => {
            const tempCountry = new CountryClass(".cardCountry", item, replaceCountry);
            tempCountry.previewRender();
        })

    } else if (theCountry.length == 1) {
        const tempCountry = new CountryClass(".cardCountry", theCountry[0], replaceCountry);
        tempCountry.render();
    } else {
        document.querySelector("#id_notFound").style.display = "block";
    }
}

//Display by code country
export const shortTofullCountry = async (codeCountry) => {
    let url = `https://restcountries.com/v3.1/alpha/${codeCountry}`;
    let resp = await fetch(url);
    let data = await resp.json();
    return data[0].name.common;
}

//initilize the select box for all countries
export const createSelectBox = () => {
    let parent = document.querySelector("#id_allCountries");

    countries_ar.forEach(country => {
        let li = document.createElement("li");
        parent.append(li);
        li.innerHTML = `
        <a id="id_coutry" class="dropdown-item" href="#">${country.name.common}</a>
        `
    })

    const id_allCountries = document.querySelectorAll('#id_coutry')
    id_allCountries.forEach((name) => {
        name.addEventListener('click', (event) => {
            event.preventDefault();
            replaceCountry(name.textContent);
        });
    });
}
