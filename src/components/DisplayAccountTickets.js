import style from "./Table.module.css"; 

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

function DisplayAccountTickets({ TicketsList, displayID }) {

    // eslint-disable-next-line
    const filteredTickets = TicketsList.filter(x => x.userEntity.id == displayID)

    return (
        <>
            {filteredTickets.length > 0 &&
            <>
            <table className={style.AccountTickets}>
                <thead>
                    <tr>
                        <th>Concert Info</th>
                        <th>Seat Info</th>
                        <th>Ticket Info</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTickets.map((item) => (
                    <tr key={item.ticketId}>
                        <td>
                            <b>{item.concertEntity.artist}</b>
                            <br/>
                            • {formatDate(item.concertEntity.concertDate)}
                            <br/>
                            • {item.concertEntity.concertVenue}
                        </td>
                        <td>
                            Seat {item.seatEntity.seatId}
                        </td>
                        <td>
                            Cat {item.seatEntity.seatCategory}
                            <br/>
                            ${item.seatEntity.ticketPrice}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <br/><br/>
            </>
            }
            {filteredTickets.length < 1 && <><br/><br/><center>You have not purchased any tickets.</center></>}
        </>
    )
}

export default DisplayAccountTickets; 