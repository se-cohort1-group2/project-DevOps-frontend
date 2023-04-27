import style from "./Page.module.css"; 

import { useEffect } from "react"; 

import TableUsers from "../components/TableUsers"; 

function ViewUsers({ getUsers, UsersList }) {

    useEffect(() => {
        getUsers(); 
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className={style.page}>
                <div className={style.title}>View all Users</div>
                {UsersList && <TableUsers list={UsersList}/>}
            </div>
        </>
    )
}

export default ViewUsers; 