import axios from 'axios';
const registerNewUser = (username, email, password, phone) => {
    return axios.post('http://localhost:8080/api/v1/register', {
        username,
        email,
        password,
        phone,
    });
};

const loginUser = (valueLogin, password) => {
    return axios.post('http://localhost:8080/api/v1/login', {
        valueLogin,
        password,
    });
};
export { registerNewUser, loginUser };
