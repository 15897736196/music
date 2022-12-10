import axios from "axios";

interface queryMsg {
    method: string,
    url: string,
    data?: any,
    params?: object
}
interface adminBackData {
    code: number,
    data: any,
    message: string,
    cookie?: string,
    account: object
}

// const queryFn : function({}: queryMsg): Promise<adminBackData>

export default async function ({ method, url, data, params }: queryMsg): Promise<adminBackData> {
    let cookie: string | null = localStorage.getItem('cookie')
    let encodeCookie: string = ''
    if (cookie) {
        encodeCookie = encodeURIComponent(cookie)
    }
    let body = {
        baseURL: 'http://localhost:3000',
        method,
        url,
        data,
        params
    }
    if (['get', 'GET'].includes(method)) {
        body.url = body.url + '?cookie=' + encodeCookie
    } else if (['post', 'POST'].includes(method)) {
        body.data.cookie = encodeCookie
    }
    const result :adminBackData = await axios(body)
    return getData(result)
}

function getData(axiosData: adminBackData) {
    const { data } = axiosData
    return data
}