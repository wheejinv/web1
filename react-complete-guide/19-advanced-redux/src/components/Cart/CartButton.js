import classes from './CartButton.module.css';
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../store/ui-slice";

const CartButton = (props) => {
	const dispatch = useDispatch();

	const cartState = useSelector(state => state.cart)

	const toggleCartHandler = e => {
		dispatch(uiActions.toggleCart());
	}

  return (
    <button onClick={toggleCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartState.totalQuantity}</span>
    </button>
  );
};

export default CartButton;
