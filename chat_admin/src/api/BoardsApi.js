import http from './http';

export async function getBoards(){
    return http.get('boards');
}

export async function getBoardDetail(index){
    return http.get('boards/'+index);
}