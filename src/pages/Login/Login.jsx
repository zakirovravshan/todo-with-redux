import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../../redux/token/tokenAction';
import { getUser } from '../../redux/users/userAction';
import { Register } from '../Register/Register';

export const Login = () => {
	const dispatch = useDispatch();
	const [error, setError] = useState();
	const navigate = useNavigate()

	const nameRef = useRef();
	const lastRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	const handlesubmit = (evt) => {
		evt.preventDefault();
		console.log(emailRef.current.value);
		console.log(passwordRef.current.value);

		axios
			.post('http://localhost:8080/login', {
				password: passwordRef.current.value,
				email: emailRef.current.value,
			})
			.then((res) => {
				if (res.status === 200) {
					localStorage.setItem('token', res.data.accessToken);
					localStorage.setItem('user', JSON.stringify(res.data.user));
					dispatch(getToken(res.data.accessToken));
					dispatch(getUser(res.data.user));
				}
			})
			.catch((error) => setError(error.response.data));
		navigate('/');
	};

	return (
		<div className='p-3 w-25 mt-5 rounded mx-auto shadow'>
			<h2 className='h2 mb-4'> Login</h2>
			<p>
				You dont have an account ? <Link to='/register'> Register</Link>
			</p>
			<form className=' ' onSubmit={(evt) => handlesubmit(evt)}>
				<div className='form-group mb-4'>
					<input
						ref={emailRef}
						type='email'
						className='form-control'
						id='exampleInputEmail1'
						aria-describedby='emailHelp'
						placeholder='Email'
					/>
				</div>
				<div className='form-group mb-4'>
					<input
						ref={passwordRef}
						type='password'
						className='form-control'
						id='exampleInputEmail1'
						aria-describedby='emailHelp'
						placeholder='Password'
					/>
				</div>

				<p className='text-danger'>{error} </p>
				<button type='submit' className='btn btn-primary'>
					Submit
				</button>
			</form>
		</div>
	);
};
