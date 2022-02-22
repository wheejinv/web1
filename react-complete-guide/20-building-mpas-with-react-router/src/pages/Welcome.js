import {Link, Route, Routes} from "react-router-dom";
import WelcomeSub from "./WelcomeSub";

const Welcome = () => {
	return (
		<section>
			<h1>The Welcome Page</h1>
			<Link to={'new-user'}>gogo</Link>
			<Routes>
				<Route path="new-user" element={<WelcomeSub />}/>
			</Routes>
		</section>
	)
};

export default Welcome;
