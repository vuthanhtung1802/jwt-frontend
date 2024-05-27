import React, { useEffect, useState } from 'react';
import './Login.scss';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../../services/userService';
const Login = (props) => {
    let history = useHistory();

    const [valueLogin, setValueLogin] = useState('');
    const [password, setPassword] = useState('');
    const defaultObjValidInput = {
        isValidLogin: true,
        isValidPassword: true,
    };
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

    const handleClickNewAccount = () => {
        history.push('/register');
    };

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput);
        if (!valueLogin) {
            setObjValidInput({ ...defaultObjValidInput, isValidLogin: false });
            toast.error('Please enter your Email or phone number');
            return;
        }
        if (!password) {
            setObjValidInput({
                ...defaultObjValidInput,
                isValidPassword: false,
            });
            toast.error('Please enter your password');
            return;
        }

        //call service API
        let response = await loginUser(valueLogin, password);

        if (response.data && response.data.EC === '0') {
            toast.success('successfully logged in');
            let data = {
                isAuthenticated: true,
                token: 'fake token',
            };
            sessionStorage.setItem('account', JSON.stringify(data));
            history.push('/users');
            window.location.reload();
        } else {
            toast.error('error logging in');
        }
    };

    const handleEnter = (even) => {
        if (even.key === 'Enter') {
            handleLogin();
        }
    };

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (session) {
            history.push('/');
            window.location.reload();
        }
    });
    return (
        <div className="login-container">
            <div className="container">
                <div className="row px-sm-0 px-3">
                    <div className="content-left col-12 col-sm-7 d-none d-sm-block">
                        <div className="brand">facebook</div>
                        <div className="detail">
                            <div className="title">Log in to Facebook</div>
                            <div className="sub-title">
                                <div>
                                    Facebook helps you connect and share with
                                    the people in your life.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content-right col-12  col-sm-5 py-3 red col-5 d-flex gap-3 flex-column">
                        <div className="brand d-sm-none">facebook</div>
                        <input
                            type="email"
                            class={
                                objValidInput.isValidLogin
                                    ? 'form-control'
                                    : 'form-control is-invalid'
                            }
                            placeholder="Email address or phone number"
                            value={valueLogin}
                            onChange={(even) => {
                                setValueLogin(even.target.value);
                            }}
                        />
                        <input
                            type="password"
                            class={
                                objValidInput.isValidPassword
                                    ? 'form-control'
                                    : 'form-control is-invalid'
                            }
                            placeholder="Password"
                            value={password}
                            onChange={(even) => {
                                setPassword(even.target.value);
                            }}
                            onKeyDown={handleEnter}
                        />
                        <button
                            type="submit"
                            class="btn btn-primary"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                        <hr />
                        <div className="text-center">
                            <button
                                type="submit"
                                class="btn btn-success"
                                onClick={handleClickNewAccount}
                            >
                                Create a new account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
