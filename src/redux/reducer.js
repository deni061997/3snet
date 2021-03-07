import axios from 'axios'

const initialState = {
  items: [],
  currentPage: 1,
  loading: false,
  status: 'all',
  count: 10,
  userCount: 1
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload
      }
    case 'SET_ITEMS_START':
      return {
        ...state,
        loading: true
      }
    case 'SET_ITEMS_SUCCEED':
      return {
        ...state,
        loading: false,
        items: action.payload
      }
    case 'SET_CURRENT_STATUS':
      return {
        ...state,
        status: action.payload
      }
    case 'SET_CURRENT_COUNT':
      return {
        ...state,
        count: action.payload
      }
    case 'SET_USER_COUNT':
      return {
        ...state,
        userCount: action.payload
      }
    default:
      return state;
  }
}

export default reducer;

export const fetchData = (page, limit, userCount) => async (dispatch) => {
  dispatch({ type: 'SET_ITEMS_START' })
  const { data } = await axios.get(`https://white3snet.com/list.php/data?page=${page}&limit=${limit}&userCount=${userCount}`)
  dispatch({ type: 'SET_ITEMS_SUCCEED', payload: data.data })
}

export const setPage = (page) => {
  return { type: 'SET_CURRENT_PAGE', payload: page }
}

export const setStatus = (status) => {
  return { type: 'SET_CURRENT_STATUS', payload: status }
}

export const setCount = (count) => {
  return { type: 'SET_CURRENT_COUNT', payload: count }
}

export const setUserCount = (userCount) => {
  return { type: 'SET_USER_COUNT', payload: userCount }
}
