import { REMOVE_USER, USER } from "./userType";


export const getUser = (user) => {
	return {
		type: USER,
		payload: user,
	};
};

export const removeUser = () => {
	return {
		type: REMOVE_USER,
		payload: "",
	};
};