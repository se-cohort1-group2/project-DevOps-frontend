import style from "./Page.module.css"; 

import { useEffect } from "react"; 

import TableTickets from "../components/TableTickets"; 

function ViewTickets({ getTickets, TicketsList }) {

    useEffect(() => {
        getTickets(); 
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className={style.page}>
                <div className={style.title}>View all Tickets</div>
                {TicketsList && <TableTickets list={TicketsList}/>}
            </div>
        </>
    )
}

export default ViewTickets; 