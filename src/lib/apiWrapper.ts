import axios from 'axios';
import UserType from '../types/User'
import LoginType from '../types/Login'
import QuestionType from '../types/Question';


const base: string = 'https://cae-bookstore.herokuapp.com';

const userEndpoint: string = '/user';
const loginEndpoint: string = '/login';
const questionsEndpoint:string ='/question/all';
const UserQuestionsEndpoint:string ='/question';

type APIResponse<T> = {
    error?: string,
    data?: T
}

const apiClientNoAuth = () => axios.create({baseURL: base});
const apiClientBasicAuth = (name:string, password:string) => axios.create({
    baseURL: base,
    headers: {
        Authorization: 'Basic ' + btoa(`${name}:${password}`)
}
})

const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: base,
    headers: {
        Authorization: `Bearer ${token}`
    }
})

async function getAllQuestions(): Promise<APIResponse<QuestionType[]>> {
    let error;
    let data;
    try{
        const response = await apiClientNoAuth().get(questionsEndpoint);
        data = response.data.questions
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else{
            error = 'Something went wrong'
        }
    }
    return{error,data}
}

async function getUserQuestions(token:string): Promise<APIResponse<QuestionType[]>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).get(UserQuestionsEndpoint);
        data = response.data.questions
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else{
            error = 'Something went wrong'
        }
    }
    return{error,data}
}

async function createQuestion(token:string): Promise<APIResponse<QuestionType[]>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).post(UserQuestionsEndpoint);
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

async function getQuestionById(postId:string):Promise<APIResponse<QuestionType>> {
    let error;
    let data;
    try{
        const response = await apiClientNoAuth().get(UserQuestionsEndpoint + '/' + postId);
        data = response.data;
    } catch(err){
        if(axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong';
        }
    }
    return {error, data}
}

async function editQuestionById(token:string, postId:string|number, editedQuestionData:QuestionType): Promise<APIResponse<QuestionType>>{
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).put(UserQuestionsEndpoint + '/' + postId, editedQuestionData);
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error,data}
}

async function deleteQuestionById(token:string, postId:string|number): Promise<APIResponse<QuestionType>>{
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).delete(UserQuestionsEndpoint + '/' + postId);
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error,data}
}


async function register(newUserData:Partial<UserType>):Promise<APIResponse<UserType>> {
    let error;
    let data;
    try{
        const response = await apiClientNoAuth().post(userEndpoint, newUserData)
        data = response.data
        console.log('here is the response data:', data)
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function login(name:string, password:string):Promise<APIResponse<LoginType>> {
    let error;
    let data;
    try{
        const response = await apiClientBasicAuth(name, password).get(loginEndpoint)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function editUser(UserData:Partial<UserType>, token:string):Promise<APIResponse<UserType>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).put(userEndpoint, UserData)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function deleteUser(token:string):Promise<APIResponse<UserType>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).delete(userEndpoint)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

export {
    getAllQuestions,
    getUserQuestions,
    createQuestion,
    getQuestionById,
    editQuestionById,
    deleteQuestionById,
    register,
    login,
    editUser,
    deleteUser,
}
