import style from "./Page.module.css"; 

import { useEffect } from "react"; 

import TableSeats from "../components/TableSeats"; 

function ViewSeats({ getSeats, SeatsList }) {

    useEffect(() => {
        getSeats(); 
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className={style.page}>
                <div className={style.title}>View all Seats</div>
                {SeatsList && <TableSeats list={SeatsList}/>}
            </div>
        </>
    )
}

export default ViewSeats; 