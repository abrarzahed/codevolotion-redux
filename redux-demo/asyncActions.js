// fetch
const axios = require("axios");

const { default: produce } = require("immer");
const { createStore, applyMiddleware } = require("redux");
const { createLogger } = require("redux-logger");
const { default: thunkMiddleware } = require("redux-thunk");

// API
const api = "https://jsonplaceholder.typicode.com/users";

// logger middleware instance
const logger = createLogger();

// initial state
const initialState = {
  loading: false,
  users: [],
  error: "",
};

// action types
const FETCH_USERS_REQUESTED = "fetch_user_requested";
const FETCH_USERS_SUCCEEDED = "fetch_user_succeeded";
const FETCH_USERS_ERROR = "fetch_users_error";

// actions creator
const fetchUserRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
};

const fetchUsersError = (error) => {
  return {
    type: FETCH_USERS_ERROR,
    payload: error,
  };
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return produce(state, (draft) => {
        draft.loading = true;
      });

    case FETCH_USERS_SUCCEEDED:
      return produce(state, (draft) => {
        draft.users = action.payload;
        draft.loading = false;
      });

    case FETCH_USERS_ERROR:
      return produce(state, (draft) => {
        draft.error = action.payload;
        draft.loading = false;
      });

    default:
      return state;
  }
};

/* 
  COMMENT: helper thunk functions
*/

const fetchUsers = async (dispatch) => {
  dispatch(fetchUserRequest());

  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      const users = res.data;
      dispatch(fetchUsersSuccess(users));
    })
    .catch((error) => {
      dispatch(fetchUsersError(error.message));
    });
};

// store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

// store subscription
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers);
