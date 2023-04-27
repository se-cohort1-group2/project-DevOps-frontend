import style from "./Page.module.css"; 

import { useParams, Link } from "react-router-dom"; 

import DisplayUser from "../components/DisplayUser"; 
import ShowTicketsByUser from "../components/ShowTicketsByUser"; 

function ViewByIDUser({ getUsers, UsersList, TicketsList }) {

    const {UserID} = useParams(); 

    return (
        <>
        <div className={style.page}>
            <div className={style.title}>View User by ID</div>
            <DisplayUser getUsers={getUsers} UsersList={UsersList} displayID={UserID}/>
            <br/>
            <Link to="/admin/users" className={style.BackLink}>
                <span className={style.BackArrow}>🡄</span>
                <span className={style.BackText}>&nbsp;Back</span>
            </Link>
            <br/><br/><br/>
            <ShowTicketsByUser TicketsList={TicketsList} showID={UserID}/>
        </div>
        </>
    )
}

export default ViewByIDUser; 