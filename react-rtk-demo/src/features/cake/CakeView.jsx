import { useDispatch, useSelector } from "react-redux";
import { ordered, restocked } from "./cakeSlice";

export default function CakeView() {
  const cakes = useSelector((state) => state.cake.numOfCake);
  const dispatch = useDispatch();
  const handleCakeOrder = () => {
    dispatch(ordered());
  };

  const handleRestockCake = (value) => {
    dispatch(restocked(value));
  };
  return (
    <div className="">
      <h2>Number of Cakes - {cakes} </h2>
      <button onClick={handleCakeOrder}>Order Cake</button>
      <button onClick={() => handleRestockCake(5)}>Restock Cake</button>
    </div>
  );
}
