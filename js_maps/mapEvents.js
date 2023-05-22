import { previewFirstCountries, countries_ar } from "./mapManege.js";

export const declareEvents = (replaceCountry) => {
    let home = document.querySelector(`#id_home`);
    home.addEventListener("click", () => {
        previewFirstCountries(countries_ar);
    })
    let usa = document.querySelector(`#id_usa`);
    usa.addEventListener("click", () => {
        replaceCountry("USA");
    })
    let israel = document.querySelector(`#id_israel`);
    israel.addEventListener("click", () => {
        console.log(israel.innerHTML);
        replaceCountry(israel.innerHTML);
    })

    let thailand = document.querySelector(`#id_thailand`);
    thailand.addEventListener("click", () => {
        replaceCountry(thailand.innerHTML);
    })

    let france = document.querySelector(`#id_france`);
    france.addEventListener("click", () => {
        replaceCountry(france.innerHTML);
    })

    let id_input = document.querySelector("#id_input");
    let id_form = document.querySelector("#id_form")
    id_form.addEventListener("submit", (e) => {
        e.preventDefault()
        console.log(id_input.value);
        replaceCountry(id_input.value);

    })
}
