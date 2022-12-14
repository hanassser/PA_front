import request from '@/utils/request'

// subscribe
export function follow(id) {
  return request(({
    url: `/relationship/subscribe/${id}`,
    method: 'get'
  }))
}

// stop subscribe
export function unFollow(id) {
  return request(({
    url: `/relationship/unsubscribe/${id}`,
    method: 'get'
  }))
}

// valide if subscribed
export function hasFollow(topicUserId) {
  return request(({
    url: `/relationship/validate/${topicUserId}`,
    method: 'get'
  }))
}

// return all followers name array
export function getAllFollowersArray(id){
  return request(({
    url:`/relationship/followers/${id}`,
    method:'get',
    params: {
      id: id,
    }
  }))
}

// return all followers name array
export function getAllFollowsArray(id){
  return request(({
    url:`/codepost/follows`,
    method:'get',
    params: {
      userId: id,
    }
  }))
}
