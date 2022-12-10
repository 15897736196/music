import query from "../query";

export function getUserPlayList(uid: string) {
     return query({
        method: 'get',
        url: '/user/playlist',
        params: { uid }
    })
}