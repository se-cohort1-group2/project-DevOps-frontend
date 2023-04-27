import style from "./Page.module.css"; 

import { useContext, useEffect } from "react"; 
import { Link } from "react-router-dom"; 

import LoginContext from "../context/LoginContext"; 

import DisplayUser from "../components/DisplayUser"; 
import DisplayAccountTickets from "../components/DisplayAccountTickets"; 

function AccountPage({ getUsers, UsersList, getTickets, TicketsList, getSeats }) {

    const LoginCtx = useContext(LoginContext); 

    useEffect(() => {
        getUsers(); 
        getTickets(); 
        getSeats(); 
        // eslint-disable-next-line
    }, [])

    if (LoginCtx.isLoggedIn) {
    return (
        <>
        <br/><br/>
        <div className={style.AccountContainer}>
            <div className={style.AccountCard}>
                <div className={style.AccountHeader}>Your Profile</div>
                <div className={style.AccountContent}><DisplayUser getUsers={getUsers} UsersList={UsersList} displayID={LoginCtx.userID}/></div>
            </div>
            <div className={style.AccountCard}>
                <div className={style.AccountHeader}>Your Tickets</div>
                <div className={style.AccountContent}><DisplayAccountTickets TicketsList={TicketsList} displayID={LoginCtx.userID}/></div>
            </div>
        </div>
        <br/><br/>
        </>
    )
    }

    if (!LoginCtx.isLoggedIn) {
    return (
        <>
        <div className={style.page}>
            <div className={style.subtitle}>You are not logged in, please login <Link to="/login">here</Link></div>
        </div>
        </>
    )
    }
}

export default AccountPage; 