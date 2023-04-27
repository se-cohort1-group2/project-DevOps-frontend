import TableTickets from "./TableTickets"; 

function ShowTicketsByUser({ TicketsList, showID }) {

    // eslint-disable-next-line
    const filteredTickets = TicketsList.filter(x => x.userEntity.id == showID)

    return (
        <>
            {filteredTickets.length > 0 && <TableTickets list={filteredTickets}/>}
            {filteredTickets.length < 1 && <></>}
        </>
    )
}

export default ShowTicketsByUser; 