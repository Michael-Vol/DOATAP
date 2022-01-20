import * as types from '../types';
import axios from 'axios';

export const submitNewApplication = (data) => async (dispatch) => {
	const formData = new FormData();
	for (let key in data) {
		if (key === 'attachments') {
			Object.keys(data[key]).forEach((category) => {
				formData.append(key, data[key][category]);
			});
		} else {
			formData.append(key, data[key]);
		}
	}
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};
	try {
		dispatch({ type: types.SUBMIT_NEW_APPLICATION_REQUEST });
		const response = await axios.post('/applications/create', formData, config);
		dispatch({ type: types.SUBMIT_NEW_APPLICATION_SUCCESS, payload: response.data });
	} catch (error) {
		dispatch({ type: types.SUBMIT_NEW_APPLICATION_FAILURE, payload: error.response.data });
	}
};

export const getAllApplications = () => async (dispatch) => {
	try {
		dispatch({ type: types.GET_ALL_APPLICATIONS_REQUEST });
		const response = await axios.get('/applications');
		dispatch({ type: types.GET_ALL_APPLICATIONS_SUCCESS, payload: response.data });
	} catch (error) {
		dispatch({ type: types.GET_ALL_APPLICATIONS_FAILURE, payload: error.response.data });
	}
};

export const getApplication = (id) => async (dispatch) => {
	try {
		dispatch({ type: types.FETCH_APPLICATION_REQUEST });
		const response = await axios.get(`/applications/${id}`);
		dispatch({ type: types.FETCH_APPLICATION_SUCCESS, payload: response.data });
	} catch (error) {
		dispatch({ type: types.FETCH_APPLICATION_FAILURE, payload: error.response.data });
	}
};
