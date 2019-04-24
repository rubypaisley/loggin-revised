import { createStore, applyMiddleware, combineReducers } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios';



const SET_USER = "SET_USER";

const setUserAC = (user) => {
  return {
    type: SET_USER,
    user
  }
}


const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}

export const login = (userInfo) => {
  return dispatch => {
    return axios.post('/auth', userInfo)
      .then(res => res.data)
      .then(user => dispatch(setUserAC(user)))
  }
}

export const sessionLogin = () => {
  return dispatch => {
    return axios.get('/auth')
      .then(res => res.data)
      .then(user => dispatch(setUserAC(user)))
      .then(() => console.log('session login'))
  }
}

export const logout = () => {
  return dispatch => {
    return axios.delete('/auth')
      .then(() => dispatch(setUserAC({})))
  }
}

const reducer = combineReducers({
  user: userReducer
});

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware))
