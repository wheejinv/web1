import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import {useRouter} from "next/router";

function MeetupItem(props) {
	const router = useRouter();

	const showDetailHandler = e => {
		// push 함수: 새 페이지를 페이지 더미로 보낸다. 동등하게 링크 컴포넌트를 이용함.
		router.push(`/${props.id}`);
	}

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
					{/*Link 컴포넌트로 해도 되지만 프로그래밍으로 내비게이션 하는 방법*/}
          <button onClick={showDetailHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
