import {convertStringToNumber} from "./convertStringToNumber";

export const calcRecovered = (cases, active_cases, total_recovered)=> {
        let new_Recovered = convertStringToNumber(cases) - convertStringToNumber(active_cases) - convertStringToNumber(total_recovered)
        if(convertStringToNumber(total_recovered) < new_Recovered) {
            return new_Recovered
        }else {
            return 0
        }
    }