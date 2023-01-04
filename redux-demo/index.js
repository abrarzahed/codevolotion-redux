const { createStore, bindActionCreators, combineReducers } = require("redux");

const CAKE_ORDERED = "CAKE_ORDERED";
const RESTOCK_CAKE = "CAKE_RESTOCK";

const ICE_CREAM_ORDER = "ice_cream_ordered";
const RESTOCK_ICE_CREAM = "ice_cream_restored";

const orderCake = () => {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
};

const restockCake = (num) => {
  return {
    type: RESTOCK_CAKE,
    payload: num,
  };
};

const orderIceCream = () => {
  return {
    type: ICE_CREAM_ORDER,
    quantity: 1,
  };
};

const restockIceCream = (num) => {
  return {
    type: RESTOCK_ICE_CREAM,
    payload: num,
  };
};

// cake state and reducer
const initialCakeState = {
  numOfCake: 10,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCake: state.numOfCake - action.quantity,
      };

    case RESTOCK_CAKE:
      return {
        ...state,
        numOfCake: state.numOfCake + action.payload,
      };

    default:
      return state;
  }
};

// ice cream state and reducer
const initialIceCreamState = {
  numOfIceCream: 20,
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICE_CREAM_ORDER:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - action.quantity,
      };

    case RESTOCK_ICE_CREAM:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream + action.payload,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cakes: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer);

// console.log("initial state: ", store.getState());
const storeUnsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream();
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(5);

storeUnsubscribe();
