import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Todo } from './pages/Todo/Todo';
import { getToken } from './redux/token/tokenAction';
import { getUser } from './redux/users/userAction';

function App() {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token.token);

	useEffect(() => {
		dispatch(getToken(localStorage.getItem('token')));
		dispatch(getUser(JSON.parse(localStorage.getItem('user'))));
	}, []);

	if (token) {
		return (
			<>
				<Routes>
					<Route path='/' element={<Todo />} />
				</Routes>
			</>
		);
	} 
		return (
			<>
				<Routes>
					<Route path='/register' element={<Register />} />
					<Route path='/' element={<Login />} />
				</Routes>
			</>
		);
	
}

export default App;
