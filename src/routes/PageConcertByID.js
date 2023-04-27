import style from "./Page.module.css"; 

import { useParams, Link } from "react-router-dom"; 

import DisplayConcert from "../components/DisplayConcert"; 

function PageConcertByID({ ConcertsList, SeatsList, TicketsList, getTickets }) {

    const {ConcertID} = useParams(); 

    return (
        <>
            <DisplayConcert ConcertID={ConcertID} ConcertsList={ConcertsList} SeatsList={SeatsList} TicketsList={TicketsList} getTickets={getTickets}/>
            <Link to="/concerts" className={style.BackLink}>
                <span className={style.BackArrow}>🡄</span>
                <span className={style.BackText}>&nbsp;Back</span>
            </Link>
        </>
    )
}

export default PageConcertByID; 