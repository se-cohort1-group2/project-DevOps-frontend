import style from "./Table.module.css"; 

import DisplayConcertSeats from "./DisplayConcertSeats"; 

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

function DisplayConcert({ ConcertID, ConcertsList, SeatsList, TicketsList, getTickets }) {

    // eslint-disable-next-line
    const concert = ConcertsList.find(({ id }) => id == ConcertID); 

    return (
        <>
        {concert && 
            <>
            <br/>
            <div className={style.concertTitle}>{concert.artist}</div>
            <table className={style.concertDetails}>
                <tbody>
                    <tr>
                        <td>
                            Date: {formatDate(concert.concertDate)}
                            <br/>
                            Venue: {concert.concertVenue}
                        </td>
                    </tr>
                </tbody>
            </table>
            <DisplayConcertSeats ConcertID={ConcertID} SeatsList={SeatsList} TicketsList={TicketsList} getTickets={getTickets}/>
            <br/>
            </>
        }
        </>
    )
}

export default DisplayConcert; 