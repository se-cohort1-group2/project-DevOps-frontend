import style from "./Page.module.css"; 

import { useContext, useState } from "react"; 
import { Link, Navigate, useNavigate } from "react-router-dom"; 

import LoginContext from "../context/LoginContext"; 
import localAPI from "../api/localAPI"; 

import VisibilityOn from "../images/VisibilityOn.svg"; 
import VisibilityOff from "../images/VisibilityOff.svg"; 

const blankRegisterForm = {
    name: "",
    phone: "",
    email: "",
    password: "",
}

function LoginRegisterPage() {

    const LoginCtx = useContext(LoginContext); 

    const navigate = useNavigate(); 

    const [RegisterForm, setRegisterForm] = useState(blankRegisterForm); 
    const [ShowPassword, setShowPassword] = useState(false); 

    const toggleVisibility = () => {
        ShowPassword ? setShowPassword(false) : setShowPassword(true)
    }

    const handleInput = (e) => {
        setRegisterForm((prevState) => {
            return {
                ...prevState, 
                [e.target.name]: e.target.value, 
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        await createUser(RegisterForm); 
    }

    const createUser = async (RegisterData) => {
        try {
            const response = await localAPI.post(`/users/register`, RegisterData)
            console.log("Account successfully created!", response.data)
            window.alert("Account successfully created for " + RegisterForm.email)
            window.alert("You will now be redirected to the login page.")
            navigate("/login"); 
        } catch (error) {
            console.log(error.message)
            console.log("Sorry, a user with this email already exists.")
            window.alert("Sorry, a user with this email already exists.")
        }
    }

    if (!LoginCtx.isLoggedIn) {
    return (
        <>
        <div className={style.subtitle}>Sign up for a new account</div>
        <form onSubmit={handleSubmit}>
        <table className={style.FormTable}>
            <tbody>
                <tr>
                    <th>Name:</th>
                    <td>
                        <input value={RegisterForm.name} name="name" type="text" placeholder="John Doe" onChange={(e) => handleInput(e, "name")}/>
                    </td>
                </tr>
                <tr>
                    <th>Phone:</th>
                    <td>
                        <input value={RegisterForm.phone} name="phone" type="tel" placeholder="+65 81234567" onChange={(e) => handleInput(e, "phone")}/>
                    </td>
                </tr>
                <tr>
                    <th>Email:</th>
                    <td>
                        <input value={RegisterForm.email} name="email" type="email" required placeholder="johndoe@example.com" onChange={(e) => handleInput(e, "email")}/>
                    </td>
                </tr>
                <tr>
                    <th>Password:</th>
                    <td>
                        <input value={RegisterForm.password} name="password" type={ShowPassword ? "text" : "password"} required placeholder="********" onChange={(e) => handleInput(e, "password")}/>
                        {ShowPassword ?
                        <img onClick={toggleVisibility} className={style.VisibilityOnOff} alt="VisibilityOn" src={VisibilityOn}/>
                        :
                        <img onClick={toggleVisibility} className={style.VisibilityOnOff} alt="VisibilityOff" src={VisibilityOff}/>
                        }
                    </td>
                </tr>
                <tr>
                    <th></th>
                    <td>
                        <input value="Register" type="submit"/>
                    </td>
                </tr>
            </tbody>
        </table>
        </form>
        <p>Already have an account? <Link to="/login">Sign in here</Link></p>
        </>
    )
    }

    if (LoginCtx.isLoggedIn) {
    return (
        <>
        <Navigate to={`/account`} replace={true}/>
        </>
    )
    }
}

export default LoginRegisterPage; 