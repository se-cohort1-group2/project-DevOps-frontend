import style from "./Table.module.css"; 

import { NavLink } from "react-router-dom"; 

function displayDay(x) {
    return new Date(x).toLocaleString("en-SG", {
        weekday: "long", 
    })
}
function displayDate(x) {
    return new Date(x).toLocaleString("en-SG", {
        day: "numeric", 
        month: "short", 
        year: "numeric", 
    })
}
function displayTime(x) {
    return new Date(x).toLocaleString("en-SG", {
        hour: "numeric", 
        minute: "2-digit", 
    })
}

function pastConcert(x) {
    let currentDate = new Date(); 
    let concertDate = new Date(x); 
    if (concertDate < currentDate) {
        return true; 
    } else {
        return false; 
    }
}

function DisplayAllConcerts({ ConcertsList }) {
    return (
        <>
            <table className={style.ConcertsTable}>
                <tbody>
                    {ConcertsList && ConcertsList.map((item) => (
                    <tr key={item.id}>
                        <td className={style.ConcertsTableDateTime}>
                            {displayDay(item.concertDate)}
                            <br/>
                            {displayDate(item.concertDate)}
                            <br/>
                            {displayTime(item.concertDate)}
                        </td>
                        <td className={style.ConcertsTableArtistVenue}>
                            <b>{item.artist}</b>
                            <br/>
                            {item.concertVenue}
                        </td>
                        <td>
                            {
                            pastConcert(item.concertDate)
                            ?
                            <></>
                            :
                            <NavLink to={`/concerts/${item.id}/buy`}>
                                <button>BUY TICKETS</button>
                            </NavLink>
                            }
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <br/><br/>
        </>
    )
}

export default DisplayAllConcerts; 