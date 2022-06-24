import axios from 'axios';
import Swal from 'sweetalert2';
import base_url from '../helper/base_url';

const url = base_url + '/users';


export const register = (data) => {
    return (dispatch) => {
        // Loading
        dispatch({
            type: "REGISTER",
            payload: {
                status: 'loading',
                data: 'Loading'
            }
        })

        // Success
        axios({
            method: 'POST',
            url: url + '/register',
            data: data
        })
            .then(async response => {
                await Swal.fire(
                    'Success!',
                    'You have been registered!',
                    'success'
                )
                dispatch({
                    type: "REGISTER",
                    payload: {
                        status: 'data',
                        data: response.data
                    }
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                })
                dispatch({
                    type: "REGISTER",
                    payload: {
                        status: 'error',
                        data: error.message
                    }
                });
            });
    }
}

export const login = (data) => {
    return (dispatch) => {
        // Loading
        dispatch({
            type: "LOGIN",
            payload: {
                status: 'loading',
                data: 'Loading'
            }
        })

        // Success
        axios({
            method: 'POST',
            url: url + '/login',
            data: data
        })
            .then(response => {
                // localStorage.setItem('id',response.data.UserId);
                localStorage.setItem('type', response.data.type);
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('image', response.data.image);
                dispatch({
                    type: "LOGIN",
                    payload: {
                        status: 'data',
                        data: response.data
                    }
                });
            })
            .catch(error => {
                // Error
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                })
                dispatch({
                    type: "LOGIN",
                    payload: {
                        status: 'error',
                        data: error.message
                    }
                });
            });
    }
}


export const getUser = (username) => {
    return (dispatch) => {
        // Loading
        dispatch({
            type: "GET_USER",
            payload: {
                status: 'loading',
                data: 'Loading'
            }
        })

        // Success
        axios({
            method: 'GET',
            url: url + "/" + username,

            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(response => {
                dispatch({
                    type: "GET_USER",
                    payload: {
                        status: 'data',
                        data: response.data
                    }
                });
            })
            .catch(error => {
                // Error
                dispatch({
                    type: "GET_USER",
                    payload: {
                        status: 'error',
                        data: error.message
                    }
                });
            });
    }
}

export const updateUser = (data) => {
    return (dispatch) => {
        // Loading
        dispatch({
            type: "UPDATE_USER",
            payload: {
                status: 'loading',
                data: 'Loading'
            }
        })

        // Success
        axios({
            method: 'PUT',
            url: url,
            data: data,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(response => {
                Swal.fire(
                    'Success!',
                    'Your profile has been updated!',
                    'success'
                )
                dispatch({
                    type: "UPDATE_USER",
                    payload: {
                        status: 'data',
                        data: response.data
                    }
                });
            })
            .catch(error => {
                // Error
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                })
                dispatch({
                    type: "UPDATE_USER",
                    payload: {
                        status: 'error',
                        data: error.message
                    }
                });
            });
    }
}

export const clear = () => {
    return async (dispatch) => {
        // Loading
        dispatch({
            type: "CLEAR",
            payload: {
                status: '',
                data: ''
            }
        })
    }
}