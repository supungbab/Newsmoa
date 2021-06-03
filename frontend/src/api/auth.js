import http from './http';

export async function login(id,pw){
    return http.post('users/signin',{
        id,
        pw
    })
}