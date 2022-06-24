import { csrfFetch } from './csrf';

const ADD = 'user/ADD';
const REMOVE = 'user/REMOVE';


const setSessionUser = (user) => {
  return {
    type: ADD,
    user
  }
};

const removeSessionUser = () => {
  return {
    type: REMOVE
  }
};

export const login = (user) => async dispatch => {
  const { credential, password } = user
  const response = await csrfFetch('/api/session',
    {method:'POST',
    body: JSON.stringify({
      credential,
      password
    })
  });

    const data = await response.json();
    dispatch(setSessionUser(data.user));
    return response;
}

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setSessionUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setSessionUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  })

    dispatch(removeSessionUser());
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD:
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    ;
    case REMOVE:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
}

export default sessionReducer;
