import axios from 'axios';
import UserType from '../types/User'


const base: string = 'https://cae-bookstore.herokuapp.com/';

const userEndpoint: string = '/user';
const questionsEndpoint:string ='/questions';

type APIResponse<T> = {
    error?: string,
    data?: T
}

type TokenType = {
    token: string,
    tokenExpiration: string
}

const apiClientNoAuth = () => axios.create({baseURL: base});
const apiClientBasicAuth = (username:string, password:string) => axios.create({
    baseURL: base,
    headers: {Authorization: btoa(`${username}:${password}`)}
})
const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: base,
    headers: {Authorization: 'Bearer' + token}
})

async function getAllQuestions(): Promise<APIResponse<UserType[]>> {
    let error;
    let data;
    try{
        const response = await apiClientNoAuth().get(questionsEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else{
            error = 'Something went wrong'
        }
    }
    return{error,data}
}

async function getMe(token:string):Promise<APIResponse<UserType>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).get(userEndpoint + '/me');
        data = response.data
    } catch (err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong.'
        }
    }
    return {error, data}
}