import request from "@/utils/request";

export function updatecodePost(data) {
    return request({
        url: '/codepost/update',
        method: 'post',
        data: data
    })
}

export function createcodePost(data) {
    return request({
        url: '/codepost/create',
        method: 'post',
        data: data
    })
}

export function getListBefore(codePostId) {
    return request(({
        url: '/codepost/listbefore',
        method: 'get',
        params: { codePostId: codePostId }
    }))
}

export function getListAfter(codePostId) {
    return request(({
        url: '/codepost/listafter',
        method: 'get',
        params: { codePostId: codePostId }
    }))
}

export function getListCodePostUser(pageNo, size, tab) {
    return request(({
        url: '/codepost/list4user',
        method: 'get',
        params: { pageNo: pageNo, size: size, tab: tab }
    }))
}

export function getListFriendsCodePost(pageNo, size, tab) {
    return request(({
        url: '/codepost/listfriendscp',
        method: 'get',
        params: { pageNo: pageNo, size: size, tab: tab }
    }))
}



export function getListContribCodePostUser(pageNo, size, tab) {
    return request(({
        url: '/codepost/listcontrib4user',
        method: 'get',
        params: {pageNo: pageNo, size: size, tab: tab}
    }))
}

export function getListOriginalCodePostUser(pageNo, size, tab) {
    return request(({
        url: '/codepost/listog4user',
        method: 'get',
        params: { pageNo: pageNo, size: size, tab: tab }
    }))
}


// get codepost by id
export function getCodePost(id) {
    return request({
        url: `/codepost`,
        method: 'get',
        params: {
            id: id,
        }
    })
}

// get codepost list
export function getCodePostList(pageNo, size, tab) {
    return request(({
        url: '/codepost/list',
        method: 'get',
        params: { pageNo: pageNo, size: size, tab: tab }
    }))
}









