export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const signupRequest = () => ({
  type: SIGNUP_REQUEST
});

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const signupSuccess = () => ({
  type: SIGNUP_SUCCESS
});

export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const signupError= (error) => ({
  type: SIGNUP_ERROR,
  error
});

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const signupRequest = () => ({
  type: SIGNUP_REQUEST
});


export const signup=(name, username, password) => dispatch => {

}