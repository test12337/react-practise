import { IFilter } from "../interfaces/interfaces";

class Services {
    filterToRequest = (filter : IFilter) : string => Object.entries(filter).map((e, i, a) => {
        return e[1] ? e.join('=') + (i === a.length - 1 ? '' : '&') : '';
    }).join('');
    dateToNumber = (date : string) => Number(date.replace(/-/gim, ''));
}

export { Services };