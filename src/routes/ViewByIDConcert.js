import style from "./Page.module.css"; 

import { useParams, Link } from "react-router-dom"; 

import ShowTicketsByConcert from "../components/ShowTicketsByConcert"; 

function formatDate(x) {
    return new Date(x).toLocaleString("en-SG", {
        weekday: "short", 
        day: "numeric", 
        month: "short", 
        year: "numeric", 
        hour: "numeric", 
        minute: "2-digit", 
    })
}

function ViewByIDConcert({ ConcertsList, TicketsList }) {

    const {ConcertID} = useParams(); 

    // eslint-disable-next-line
    const concert = ConcertsList.find(({ id }) => id == ConcertID); 

    return (
        <>
        <div className={style.page}>
            <div className={style.title}>View Concert by ID</div>
            {concert && 
                <>
                <table className={style.MiniTable}>
                    <tbody>
                        <tr>
                            <th>Concert ID:</th>
                            <td>{concert.id}</td>
                        </tr>
                        <tr>
                            <th>Artist:</th>
                            <td>{concert.artist}</td>
                        </tr>
                        <tr>
                            <th>Concert Date & Time:</th>
                            <td>{formatDate(concert.concertDate)}</td>
                        </tr>
                        <tr>
                            <th>Concert Venue:</th>
                            <td>{concert.concertVenue}</td>
                        </tr>
                    </tbody>
                </table>
                </>
            }
            <br/>
            <Link to="/admin/concerts" className={style.BackLink}>
                <span className={style.BackArrow}>🡄</span>
                <span className={style.BackText}>&nbsp;Back</span>
            </Link>
            <br/><br/><br/>
            <ShowTicketsByConcert TicketsList={TicketsList} showID={ConcertID}/>
        </div>
        </>
    )
}

export default ViewByIDConcert; 