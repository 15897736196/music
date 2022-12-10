import query from "../query";

export async function getLoginKey() {
    return query({
        method: 'get',
        url: '/login/qr/key/'+'&t='+new Date().getTime()
    })
}
export async function login(key: string) {
    return query({
        method: 'get',
        url: '/login/qr/create/'+'&t='+new Date().getTime(),
        params: { key, qrimg: 'true' }
    })
}

export async function checkqr(data: string) {
    return query({
        method: 'get',
        url: '/login/qr/check/'+'&t='+new Date().getTime(),
        params: { key: data }
    })
}

export async function getLoginStatus() {
    return query({
        method: 'get',
        url: '/login/status',
    })
}
export async function getUserMsg() {
    return query({
        method: 'get',
        url: '/user/account',
    })
}