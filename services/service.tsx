import { IFilter } from "../interfaces/interfaces";

class Services {
    filterToRequest = (filter : IFilter) : string => Object.entries(filter).map(e => {
        return e[1] ? `${e.join('=')}&` : ''
    }).join('');   
}

export { Services };