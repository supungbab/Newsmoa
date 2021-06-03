import http from './http';

export async function store(user) {
    return http.post('users/signup', user)
}