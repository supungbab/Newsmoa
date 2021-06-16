import http from './http';

export async function store(user) {
    return http.post('users/signup', user)
}

export async function auth(token){
    return http.get('users/me',{ headers: { 'x-access-token': token } })
}