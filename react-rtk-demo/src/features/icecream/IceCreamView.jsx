import { useDispatch, useSelector } from "react-redux";
import { ordered, restocked } from "./iceCreamSlice";

export default function IceCreamView() {
  const iceCreams = useSelector((state) => state.iceCream.numOfIceCream);
  const dispatch = useDispatch();
  const handleOrderIceCream = () => {
    dispatch(ordered());
  };
  const handleRestockIceCream = (value) => {
    dispatch(restocked(value));
  };

  return (
    <div className="">
      <h2>Number of Ice-cream - {iceCreams}</h2>
      <button onClick={handleOrderIceCream}>Order Ice-cream</button>
      <button onClick={() => handleRestockIceCream(5)}>
        Restock Ice-cream
      </button>
    </div>
  );
}
