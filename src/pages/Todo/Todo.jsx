import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../../redux/token/tokenAction';
import { removeUser } from '../../redux/users/userAction';
import logoutimg from '../../images/logout.png';
import editimg from '../../images/draw.png';
import deleteimg from '../../images/delete.png';
import moreimg from '../../images/more.png';
import userimg from '../../images/user.png';
import axios from 'axios';
import {
	todosData,
	todosError,
	todosLoad,
} from '../../redux/todos/todosAction';
import { Loader } from '../../components/Loader';
import { useNavigate } from 'react-router-dom';

export const Todo = () => {
	const userdata = useSelector((state) => state.user);
	const todoContent = useSelector((state) => state.todos.data);
	const todoTextRef = useRef();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogOut = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		dispatch(removeToken());
		dispatch(removeUser());
		navigate('/');
	};

	const handleFormSubmit = (evt) => {
		evt.preventDefault();
		if (todoTextRef.current.value == '') {
			alert('Input cannot be empty !');
		} else {
			axios
				.post('http://localhost:8080/todos', {
					todo_text: todoTextRef.current.value,
					isDone: false,
				})
				.then((res) => {
					if (res.status === 201) {
						todoTextRef.current.value = '';
						getTodos();
					}
				})
				.catch((error) => console.log(error));
		}
	};

	const handleDeleteTodo = (id) => {
		axios
			.delete('http://localhost:8080/todos/' + id)
			.then((res) => {
				if (res.status === 200) {
					getTodos();
				}
			})
			.catch((error) => console.log(error));
	};

	const handleIsDoneTodo = (id, todo, checked) => {
		axios
			.put('http://localhost:8080/todos/' + id, {
				isDone: !checked,
				todo_text: todo,
			})
			.then((res) => {
				if (res.status === 200) {
					getTodos();
				}
			})
			.catch((error) => console.log(error));
	};

	const handleEditTodo = (id, todo) => {
		const editTodo = prompt(todoTextRef.current.value, todo);
		axios
			.put('http://localhost:8080/todos/' + id, {
				todo_text: editTodo,
			})
			.then((res) => {
				if (res.status === 200) {
					getTodos();
				}
			})
			.catch((error) => console.log(error));
	};

	const getTodos = () => {
		dispatch(todosLoad());
		axios
			.get('http://localhost:8080/todos')
			.then((res) => {
				const todos = res.data;
				dispatch(todosData(todos));
			})
			.catch((error) => dispatch(todosError(error.message)));
	};

	

	useEffect(() => {
		getTodos();
	}, []);
	console.log(todoContent);

	return (
		<div className='w-75 mx-auto mt-4 p-2'>
			<div className='container position-relative '>
				<div className='w-100 mb-5 mx-auto d-flex align-items-center justify-content-between shadow px-4 p-3 rounded-5'>
					<div className='dropdown '>
						<button
							className='btn btn-secondary btn-outline-none shadow-none  dropdown-toggle bg-transparent border-0 d-flex align-items-center '
							type='button'
							data-bs-toggle='dropdown'
							aria-expanded='false'>
							<img
								className='d-block'
								src={userimg}
								alt='userimg'
								width='50px'
								heigh='50px'
							/>
							<p className=' fs-6 m-0 text-capitalize  ms-2 text-primary'>
								{userdata.user.first_name}
							</p>
							<p className=' fs-6 m-0 text-capitalize  ms-2 text-primary'>
								{userdata.user.last_name}
							</p>
						</button>
						<ul className='dropdown-menu'>
							<li>
								<button
									className='dropdown-item'>
									Edit Profile
								</button>
							</li>

							<li>
								<button
									onClick={handleLogOut}
									className='dropdown-item text-danger'>
									Log Out
								</button>
							</li>
						</ul>
					</div>
					<button
						className='d-flex align-items-center bg-transparent border-0 rounded-4 border-danger p-2 '
						onClick={handleLogOut}>
						<p className='m-0 me-2 fs-6  text-danger'>Log Out</p>
						<img src={logoutimg} alt='logoutimg' width='25px' heigh='25px' />
					</button>
				</div>
				<div className='mt-3   w-75 shadow p-3 py-3 mx-auto rounded-5'>
					<h2 className='text-center mb-4 '> TO-DO </h2>
					<form
						onSubmit={(e) => handleFormSubmit(e)}
						className='input-group w-50 mx-auto mb-5 '>
						<input
							ref={todoTextRef}
							type='text'
							className='form-control rounded-4  p-2 px-3  '
							placeholder='Write new todo...'
						/>
						<button
							type='submit'
							className='ms-2 btn btn-primary rounded-4 p-2 px-3 shadow-sm '>
							ADD
						</button>
					</form>

					{todoContent.length ? (
						<ul>
							{todoContent.map((item) => (
								<li
									key={item.id}
									className=' shadow p-2 ps-3 rounded-5 mb-4 w-75 d-flex align-items-center justify-content-between mx-auto'>
									<div className='d-flex align-items-center justify-content-between '>
										<input
											onClick={() =>
												handleIsDoneTodo(item.id, item.todo_text, item.isDone)
											}
											className='form-check-input mt-0 '
											type='checkbox'
											defaultValue
											defaultChecked={item.isDone}
											aria-label='Checkbox for following text input '
										/>
										<p
											className={
												item.isDone
													? 'text-decoration-line-through fs-5 m-0 ms-2 text-capitalize opacity-50'
													: 'm-0 ms-2 text-capitalize  fs-5'
											}>
											{item.todo_text}
										</p>
									</div>
									<div className=''>
										<div className='dropdown '>
											<button
												className='btn btn-secondary btn-outline-none shadow-none  dropdown-toggle bg-transparent border-0 d-flex align-items-center '
												type='button'
												data-bs-toggle='dropdown'
												aria-expanded='false'>
												<img
													className='d-block'
													src={moreimg}
													alt='userimg'
													width='30px'
													heigh='30px'
												/>
											</button>
											<ol className='dropdown-menu w-50 p-3'>
												<li className=' mb-2  d-flex justify-content-center align-items-center'>
													<button
														className=' disabled w-100 p-2  shadow-sm rounded  bg-transparent border-0 d-flex justify-content-center align-items-center '
														onClick={() =>
															handleEditTodo(item.id, item.todo_text)
														}>
														<span className='me-2 text-warning'> EDIT</span>
														<img
															src={editimg}
															alt='edit img logo'
															width='20px'
														/>
													</button>
												</li>
												<li className='  d-flex justify-content-center align-items-center'>
													<button
														onClick={() => handleDeleteTodo(item.id)}
														className=' disabled w-100 p-2  shadow-sm rounded  bg-transparent border-0 d-flex justify-content-center align-items-center  '>
														<span className='me-2 text-danger'> DELETE</span>
														<img
															src={deleteimg}
															alt='edit img logo'
															width='20px'
														/>
													</button>
												</li>
											</ol>
										</div>
									</div>
								</li>
							))}
						</ul>
					) : (
						<Loader />
					)}
				</div>
			</div>
		</div>
	);
};
