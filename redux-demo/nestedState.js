const { default: produce } = require("immer");
const { createStore, bindActionCreators } = require("redux");

const STREET_UPDATED = "street_updated";

// action creators
const streetUpdated = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

// state and reducer
const initialState = {
  name: "Abrar Hussen Zahed",
  address: {
    street: "123 Main street",
    city: "Sylhet",
    country: "BD",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      // normal way
      /*
        return {
          ...state,
          address: {
            ...state.address,
            street: action.payload,
          },
        };
        */

      // by using immer
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });

    default:
      return state;
  }
};

// store / state
const store = createStore(reducer);
console.log("Initial State: ", store.getState());

// store subscription
const storeUnsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// actions binding
const actions = bindActionCreators({ streetUpdated }, store.dispatch);

// dispatch binned actions
actions.streetUpdated("333 Sun way");

// unsubscribe store
storeUnsubscribe();
