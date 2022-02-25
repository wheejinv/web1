import React, {Suspense} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

// React.lazy 에서 전달하는 이 함수는 이 NewQuote 컴포넌트가 필요할 때 React에 의해 실행됨.
const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Comments = React.lazy(() => import('./components/comments/Comments'));
const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));

// { } 들어가면 동작안함 주의 - 아마 return 까지 붙여야하는듯
// https://stackoverflow.com/questions/65183174/uncaught-undefined-error-when-using-react-lazy/66281145#66281145?newreg=dd27bff0a5c64c779053efe5e9393e58
// const MyComponent = React.lazy(() => {
// 	import('./scenes/MyComponent')
// )};

function App() {
	return (
		<Layout>
			<Suspense fallback={<div className="centered"><LoadingSpinner/></div>}>
				<Routes>
					<Route path="/" element={<Navigate to="/quotes"/>}/>
					<Route path="/quotes" element={<AllQuotes/>}/>
					<Route path="/quotes/:quoteId" element={<QuoteDetail/>}>
						<Route path="comments" element={<Comments/>}/>
					</Route>
					<Route path="/new-quote" element={<NewQuote/>}/>
					<Route path="*" element={<NotFound/>}/>
				</Routes>
			</Suspense>
		</Layout>
	);
}

export default App;
