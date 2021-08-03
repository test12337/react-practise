export interface UserType {
    id : string,
    username : string,
    password : string,
    auth_key : string,
    access_token : string,
    datetime : string,
}
export interface IFilter {
    id : string,
    username : string,
    start_dt : string,
    finish_dt : string
}
const UserTemplate = {
    id : '', 
    username : '', 
    password : '', 
    auth_key : '', 
    access_token : '', 
    datetime : '',
}

export { UserTemplate };