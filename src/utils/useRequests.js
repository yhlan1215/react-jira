import axios from './Axios'

//----------------------------------------------------------
// Auth
//----------------------------------------------------------

const login = async (username, password) => {
  const { data } = await axios.request({
    url: '/auth',
    method: 'post',
    auth: {
      username,
      password
    }
  })
  return data
}

export const useAuth = () => ({ login })

//----------------------------------------------------------
// Project
//----------------------------------------------------------
const getProjects = async () => {
  const { data } = await axios.request({
    url: '/projects',
    method: 'get'
  })
  return data
}

const getProject = async (id) => {
  const { data } = await axios.request({
    url: `/projects/${id}`,
    method: 'get'
  })
  return data
}

const putProject = async (id, payload) => {
  const { data } = await axios.request({
    url: `/projects/${id}`,
    method: 'put',
    data: payload
  })
  return data
}

const postProject = async (payload) => {
  const { data } = await axios.request({
    url: '/projects',
    method: 'post',
    data: payload
  })
  return data
}

const deleteProject = async (id) => {
  const { data } = await axios.request({
    url: `/projects/${id}`,
    method: 'delete'
  })
  return data
}

export const useProject = () => ({ getProjects, getProject, putProject, postProject, deleteProject })

//----------------------------------------------------------
// User
//----------------------------------------------------------
const getUsers = async () => {
  const { data } = await axios.request({
    url: '/jiraUsers',
    method: 'get'
  })
  return data
}

const getUser = async (id) => {
  const { data } = await axios.request({
    url: `/jiraUsers/${id}`,
    method: 'get'
  })
  return data
}

const putUser = async (id, payload) => {
  const { data } = await axios.request({
    url: `/jiraUsers/${id}`,
    method: 'put',
    data: payload
  })
  return data
}

const postUser = async (payload) => {
  const { data } = await axios.request({
    url: '/jiraUsers',
    method: 'post',
    data: payload
  })
  return data
}

const deleteUser = async (id) => {
  const { data } = await axios.request({
    url: `/jiraUsers/${id}`,
    method: 'delete'
  })
  return data
}

export const useUser = () => ({ getUsers, getUser, putUser, postUser, deleteUser })

//----------------------------------------------------------
// Kanban
//----------------------------------------------------------
const getKanbans = async (projectId) => {
  const { data } = await axios.request({
    url: `/kanbans${projectId ? `?projectId=${projectId}` : ''}`,
    method: 'get'
  })
  return data
}

const getKanban = async (id) => {
  const { data } = await axios.request({
    url: `/kanbans/${id}`,
    method: 'get'
  })
  return data
}

const putKanban = async (id, payload) => {
  const { data } = await axios.request({
    url: `/kanbans/${id}`,
    method: 'put',
    data: payload
  })
  return data
}

const postKanban = async (payload) => {
  const { data } = await axios.request({
    url: '/kanbans',
    method: 'post',
    data: payload
  })
  return data
}

const deleteKanban = async (id) => {
  const { data } = await axios.request({
    url: `/kanbans/${id}`,
    method: 'delete'
  })
  return data
}

export const useKanban = () => ({ getKanbans, getKanban, putKanban, postKanban, deleteKanban })

//----------------------------------------------------------
// Tasks
//----------------------------------------------------------
const getTasks = async (projectId, kanbanId) => {
  let url = '/tasks'
  if (projectId) {
    url += `?projectId=${projectId}`
  }
  if (kanbanId) {
    url += `?kanbanId=${kanbanId}`
  }
  const { data } = await axios.request({
    url,
    method: 'get'
  })
  return data
}

const getTask = async (id) => {
  const { data } = await axios.request({
    url: `/tasks/${id}`,
    method: 'get'
  })
  return data
}

const putTask = async (id, payload) => {
  const { data } = await axios.request({
    url: `/tasks/${id}`,
    method: 'put',
    data: payload
  })
  return data
}

const postTask = async (payload) => {
  const { data } = await axios.request({
    url: '/tasks',
    method: 'post',
    data: payload
  })
  return data
}

const deleteTask = async (id) => {
  const { data } = await axios.request({
    url: `/tasks/${id}`,
    method: 'delete'
  })
  return data
}

export const useTask = () => ({ getTasks, getTask, putTask, postTask, deleteTask })

// //----------------------------------------------------------
// // Epic
// //----------------------------------------------------------
// const getEpics = async () => {
//   const { data } = await axios.request({
//     url: '/epics',
//     method: 'get'
//   })
//   return data
// }
// const getEpic = async (id) => {
//   const { data } = await axios.request({
//     url: `/epics/${id}`,
//     method: 'get'
//   })
//   return data
// }

// const getEpicsUiList = async (projectIds, milestoneIds, states) => {
//   let url = '/epics/ui/list'

//   const queryStrings = []
//   queryStrings.push(`projectId=${projectIds.join(',')}`)
//   queryStrings.push(`milestoneId=${milestoneIds.join(',')}`)
//   queryStrings.push(`state=${states.join(',')}`)

//   queryStrings.length > 0 && (url += `?${queryStrings.join('&')}`)

//   const { data } = await axios.request({
//     url,
//     method: 'get'
//   })
//   return data
// }

// const postEpic = async (payload) => {
//   const { data } = await axios.request({
//     url: '/epics',
//     method: 'post',
//     data: payload
//   })
//   return data
// }

// const putEpic = async (id, payload) => {
//   const { data } = await axios.request({
//     url: `/epics/${id}`,
//     method: 'put',
//     data: payload
//   })
//   return data
// }

// export const useEpic = () => ({ getEpics, getEpicsUiList, postEpic, putEpic, getEpic })
