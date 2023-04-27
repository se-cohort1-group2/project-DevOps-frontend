import TableTickets from "./TableTickets"; 

function ShowTicketsByConcert({ TicketsList, showID }) {

    // eslint-disable-next-line
    const filteredTickets = TicketsList.filter(x => x.concertEntity.id == showID)

    return (
        <>
            {filteredTickets.length > 0 && <TableTickets list={filteredTickets}/>}
            {filteredTickets.length < 1 && <></>}
        </>
    )
}

export default ShowTicketsByConcert; 