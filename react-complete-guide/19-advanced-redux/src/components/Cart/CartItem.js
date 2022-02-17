import classes from './CartItem.module.css';
import {useDispatch} from "react-redux";
import {cartActions} from "../../store/cart-slice";

const CartItem = (props) => {
  const { title, quantity, total, price, id } = props.item;

	const dispatch = useDispatch();

	const addItemHandler = e => {
		// 이미 아이템이 있는 상태에서 증가시키는거라 두개만 필요하긴 한데 흠;
		dispatch(cartActions.addItemToCart({
			id,
			price,
		}))
	}

	const removeItemHandler = e => {
		dispatch(cartActions.removeItemFromCart(id))
	}

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
