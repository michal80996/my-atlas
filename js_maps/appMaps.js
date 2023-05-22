import { doApi, replaceCountry } from "./mapManege.js";
import { declareEvents } from "./mapEvents.js";


const init = () => {
     doApi();
     declareEvents(replaceCountry);
}

init();