import http from './http';

export async function getBoards(val){
    return http.get('boards', {params: { category: val }});
}

export async function getBoardDetail(index){
    return http.get('boards/'+index);
}

export async function getComment(index){
    return http.get('boards/'+index+'/comment')
}

export async function getCommentDetail(index){
    return http.get('boards/'+index+'/commentDetail')
}

export async function postComment(index, comment,token){
    return http.post('boards/'+index+'/comment', comment, { headers: { 'x-access-token': token } })
}

export async function getLike(index){
    return http.get('boards/'+index+'/like')
}

export async function getLikeDetail(index){
    return http.get('boards/'+index+'/likeDetail')
}

export async function putLike(index, like){
    return http.put('boards/'+index+'/like', like)
}