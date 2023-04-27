import style from "./Page.module.css"; 
import style2 from "../components/Table.module.css"; 

import { useContext } from "react"; 
import { Link } from "react-router-dom"; 

import LoginContext from "../context/LoginContext"; 

function DefaultHomePage() {

    const LoginCtx = useContext(LoginContext); 

    if (!LoginCtx.isLoggedIn) {
    return (
        <>
            <div className={style.page}>
                <div style={{ fontSize: "1.75rem", margin: "2.2em 0 0 0", fontWeight: "bold" }}>Home</div>
                <br/><br/>
                <Link to="/login">
                    <button className={style2.PurchaseBtn}>Login</button>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/login/register">
                    <button className={style2.PurchaseBtn}>Register</button>
                </Link>
            </div>
        </>
    )
    }

    if (LoginCtx.isLoggedIn) {
    return (
        <>
            <div className={style.page}>
                <div style={{ fontSize: "1.75rem", margin: "2.2em 0 0 0", fontWeight: "bold" }}>Home</div>
                <br/><br/>
                <Link to="/account">
                    <button className={style2.PurchaseBtn}>View your account</button>
                </Link>
            </div>
        </>
    )
    }
}

export default DefaultHomePage; 