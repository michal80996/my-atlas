import { shortTofullCountry } from "./mapManege.js";

export default class CountryClass {
    constructor(_parent, _item, _replaceCountry, _shortTofullCountry) {
        this.parent = _parent;
        this.name = _item.name.common ? _item.name.common : "none";
        this.flag = _item.flags.svg ? _item.flags.svg : "none";
        this.pop = _item.population ? `${(Math.floor((_item.population / 1000000) * 100) / 100).toLocaleString()}M` : "none";
        this.realPop = _item.population ? _item.population : "none";
        this.capital = _item.capital ? _item.capital : "none";
        this.map = _item.latlng ? _item.latlng : "none";
        this.languages = _item.languages ? Object.values(_item.languages).join() : "none";
        this.region = _item.region ? _item.region : "none";
        this.coin = _item.currencies ? Object.keys(_item.currencies) : "none";
        this.coinDescription = _item.currencies ? Object.values(_item.currencies)[0].name : "none";
        this.borders = _item.borders ? _item.borders : "none";
        this.replaceCountry = _replaceCountry;
    }

    //render for all information
    render() {

        if (this.realPop < 1000000) {
            this.pop = `${(Math.floor((this.realPop / 10000) * 10)).toLocaleString()}K`
        }
        if (this.realPop < 100000) {
            this.pop = `${(Math.floor((this.realPop / 100) * 100)).toLocaleString()}`
        }
        let div = document.createElement("div");
        let parent = document.querySelector(".cardCountry");
        parent.classList = "cardCountry container w-lg-50";
        parent.id = "singlCard";
        parent.append(div);

        div.innerHTML = `<div class ="mx-auto p-4 border bg-light shadow overflow-hidden"
        data-aos="fade-up"
        data-aos-duration="2000"> 
        <img src="${this.flag}" alt="${this.name}" class="w-50 float-end ms-4">
        <h2>${this.name}</h2>
        <div>POP: ${this.pop} </div>
        <div>Capital: ${this.capital}</div>
        <div>Languages: ${this.languages}</div>
        <div class="mt-3 "><strong>States with borders:</strong><br>
        <div class="borders_div"></div> 
        </div>
        <iframe class="mt-4 col-12" height="350"
         src="https://maps.google.com/maps?q=${this.map[0]},${this.map[1]}&z=7&ie=UTF8&iwloc=&output=embed" 
         frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ></iframe>
         </div>
       `

        let borders_div = div.querySelector(".borders_div");
        console.log(this.borders);
        if (this.borders != "none") {
            let i = 0;
            this.borders.forEach(async (item) => {
                if (item == "PSE") {
                    i++;
                } else {
                    let fullName = await shortTofullCountry(item);
                    let a = document.createElement("a");
                    if (i < this.borders.length - 1) {
                        a.innerHTML = fullName + " , "
                    }
                    else {
                        a.innerHTML = fullName + "."
                    }
                    i++;
                    a.style = "color: green; cursor: pointer; "
                    borders_div.append(a);
                    a.addEventListener("click", () => {
                        console.log(item);
                        this.replaceCountry(fullName);
                    })
                }
            })
        } else {
            borders_div.innerHTML = "none";
        }
    }

    //render for base information
    previewRender() {
        let div = document.createElement("div");
        let parent = document.querySelector(this.parent);
        parent.append(div);
        parent.classList = "cardCountry row row-cols-1 row-cols-sm-3 g-4"
        div.classList = " text-center";

        div.innerHTML = `
        <div class="moreInfo card h-100 border bg-light shadow overflow-hidden"
        data-aos="zoom-in-down" 
        data-aos-duration="2000">
            <img src="${this.flag}" class="card-img-top" alt="${this.name}">
            <div class="card-body">
                <h5 class="card-title"> ${this.name}</h5>
            </div>
        </div>
        `

        div.querySelector(".moreInfo").addEventListener("click", () => {
            document.querySelector(".cardCountry").innerHTML = "";
            this.render();
        });
    }
}

