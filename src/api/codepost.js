import request from "@/utils/request";

export function createcodePost(data) {
    return request({
        url: '/codepost/create',
        method: 'post',
        data: data
    })
}

export function getListCodePostUser(pageNo, size, tab) {
    return request(({
        url: '/codepost/list4user',
        method: 'get',
        params: { pageNo: pageNo, size: size, tab: tab }
    }))
}
