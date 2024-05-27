import React, { useEffect, useState } from 'react';
import './Register.scss';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../services/userService';
function Register(props) {
    // validate props
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhonenumber] = useState('');

    // check props validation
    const defaultValidInput = {
        isValidUsername: true,
        isValidEmail: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
        isValidPhonenumber: true,
    };
    const [objValidInput, setObjectValidInput] = useState(defaultValidInput);

    let history = useHistory();
    const handleLogin = () => {
        history.push('/login');
    };

    useEffect(() => {
        // axios.get('http://localhost:8080/api/v1/test-api').then((data) => {
        //     console.log('check data =>>> ', data);
        // });
    }, []);

    const isValidInputs = () => {
        setObjectValidInput(defaultValidInput);

        if (!username) {
            setObjectValidInput({
                ...defaultValidInput,
                isValidUsername: false,
            });
            return false;
        }
        if (!email) {
            toast.error('email is required');
            setObjectValidInput({
                ...defaultValidInput,
                isValidEmail: false,
            });

            return false;
        }

        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            toast.error('Your email is incorrect');
            setObjectValidInput({
                ...defaultValidInput,
                isValidEmail: false,
            });
            return false;
        }

        if (!password) {
            toast.error('password is required');
            setObjectValidInput({
                ...defaultValidInput,
                isValidPassword: false,
            });

            return false;
        }

        if (password !== confirmPassword) {
            toast.error('Your password is incorrect');
            setObjectValidInput({
                ...defaultValidInput,
                isValidConfirmPassword: false,
            });

            return false;
        }
        if (!phone) {
            toast.error('phone is required');
            setObjectValidInput({
                ...defaultValidInput,
                isValidPhonenumber: false,
            });

            return false;
        }

        // const regexPhoneNumberInVietNam =
        //     /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        // if (!regexPhoneNumberInVietNam.test(phone)) {
        //     toast.error('Your phone number is not in Vietnam');
        //     setObjectValidInput({
        //         ...defaultValidInput,
        //         isValidPhonenumber: false,
        //     });

        //     return false;
        // }

        return true;
    };

    const handleRegister = async () => {
        let check = isValidInputs();
        if (check === true) {
            let response = await registerNewUser(username, email, password, phone);
            let serverData = response.data;
            if (serverData.EC === '0') {
                toast.success('successfully registered');
                history.push('/login');
            } else {
                toast.error('error registering');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="container">
                <div className="row px-sm-0 px-3">
                    <div className="content-left col-12 col-sm-7 d-none d-sm-block">
                        <div className="brand">facebook</div>
                        <div className="detail">
                            <div className="title">Sign up for Facebook</div>
                            <div className="sub-title">
                                <div>Facebook helps you connect and share with the people in your life.</div>
                            </div>
                        </div>
                    </div>

                    <div className="content-right col-12  col-sm-5 py-3 red col-5 d-flex gap-3 flex-column">
                        <div className="brand d-sm-none">facebook</div>
                        <input
                            type="text"
                            class={objValidInput.isValidUsername ? 'form-control ' : 'form-control is-invalid'}
                            placeholder="Username"
                            value={username}
                            onChange={(even) => setUsername(even.target.value)}
                        />
                        <input
                            type="email"
                            class={objValidInput.isValidEmail ? 'form-control ' : 'form-control is-invalid'}
                            placeholder="Email address"
                            value={email}
                            onChange={(even) => setEmail(even.target.value)}
                        />
                        <input
                            type="password"
                            class={objValidInput.isValidPassword ? 'form-control ' : 'form-control is-invalid'}
                            placeholder="Password"
                            value={password}
                            onChange={(even) => setPassword(even.target.value)}
                        />
                        <input
                            type="password"
                            class={objValidInput.isValidConfirmPassword ? 'form-control ' : 'form-control is-invalid'}
                            placeholder="Re-enter Password"
                            value={confirmPassword}
                            onChange={(even) => setConfirmPassword(even.target.value)}
                        />
                        <input
                            type="text"
                            class={objValidInput.isValidPhonenumber ? 'form-control ' : 'form-control is-invalid'}
                            placeholder="Phone number"
                            value={phone}
                            onChange={(even) => setPhonenumber(even.target.value)}
                        />

                        <button type="button" class="btn btn-primary" onClick={handleRegister}>
                            Register
                        </button>
                        <hr />
                        <div className="text-center">
                            <span>Already've an account. </span>
                            <button type="submit" class="btn btn-success" onClick={handleLogin}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
