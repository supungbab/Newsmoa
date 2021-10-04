import http from './http';

//전체 뉴스 기사를 불러온다
export async function getBoards(val){
    return http.get('boards', {params: { category: val }});
}
//클릭한 index 값의 뉴스 기사만 불러온다.
export async function getBoardDetail(index){
    return http.get('boards/'+index);
}
//선택한 index의 댓글 수를 불러온다.
export async function getComment(index){
    return http.get('boards/'+index+'/comment')
}
//선택한 index의 기사 댓글들을 불러온다.
export async function getCommentDetail(index){
    return http.get('boards/'+index+'/commentDetail')
}
//유저가 쓴 댓글들을 불러온다.
export async function getCommentUser(user){
    return http.get('boards/commentUser/'+user)
}
//댓글을 백엔드 서버에 post 형식으로 전송한다. 이때 보안 토큰을 보내 해킹을 방지한다.
export async function postComment(index, comment, token){
    return http.post('boards/'+index+'/comment', comment, { headers: { 'x-access-token': token } })
}
//선택한 index의 좋아요 수를 불러온다.
export async function getLike(index){
    return http.get('boards/'+index+'/like')
}
//선택한 index의 좋아요 한 유저들을 불러온다.
export async function getLikeDetail(index){
    return http.get('boards/'+index+'/likeDetail')
}
//유저가 누른 좋아요를 불러온다.
export async function getLikeUser(user){
    return http.get('boards/likeUser/'+user)
}
//좋아요를 백엔드에 전송한다.
export async function putLike(index, likeData, token){
    return http.put('boards/'+index+'/like', likeData, { headers: { 'x-access-token': token } })
}