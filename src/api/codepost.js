import request from "@/utils/request";

export function createcodePost(data) {
    return request({
        url: '/codepost/create',
        method: 'post',
        data: data
    })
}
