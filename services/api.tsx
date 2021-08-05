import { UserType } from '../interfaces/interfaces';
class apiWorker{
    baseDir : string;
    constructor(){
        this.baseDir = 'http://localhost:8888/api';
    }
    async getUsers() : Promise<[UserType]>{
        return await fetch(`${this.baseDir}/users`)
        .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        })
    }
    async getUser(id : string) : Promise<UserType>{
        return await fetch(`${this.baseDir}/user/${id}`)
        .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        })
    }
    async filterUsers(request : string) : Promise<[UserType]> {
        return await fetch(`${this.baseDir}/users-filter?${request}`)
        .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        })
    }
}

export { apiWorker };