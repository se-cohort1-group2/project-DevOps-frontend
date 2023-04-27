import style from "./Table.module.css"; 

import { useContext, useState } from "react"; 
import { useNavigate, Link } from "react-router-dom"; 

import LoginContext from "../context/LoginContext"; 
import localAPI from "../api/localAPI"; 

function DisplayConcertSeats({ ConcertID, SeatsList, TicketsList, getTickets }) {

    const LoginCtx = useContext(LoginContext); 

    const navigate = useNavigate(); 

    const [SelectedSeats, setSelectedSeats] = useState([]); 

    let newObject = {}; 
    for (const x of SeatsList) {
        if (!newObject[x.seatCategory]) {
            newObject[x.seatCategory] = []; 
        }
        newObject[x.seatCategory].push(x); 
    }
    let newArray = Object.values(newObject); 

    // eslint-disable-next-line
    const concertTickets = TicketsList.filter(x => x.concertEntity.id == ConcertID)

    function checkIfAvailable(x) {
        for (let i = 0; i < concertTickets.length; i++) {
            if (x === concertTickets[i].seatEntity.seatId) {
                return <span className={style.UnavailableSeat}>{x}</span>; 
            }
        }
        return <span className={style.AvailableSeat} onClick={toggleSelection}>{x}</span>; 
    }

    const toggleSelection = (e) => {
        const foundSeat = SelectedSeats.find(({ seat_id }) => seat_id === e.target.innerHTML)
        if (typeof foundSeat !== "object") {
            const newSeat = {
                "seat_id": e.target.innerHTML, 
                "concert_id": ConcertID
            }
            const newList = [...SelectedSeats, newSeat]
            setSelectedSeats(newList)
            e.target.classList.add(`${style.selection}`); 
        } else {
            const newList = SelectedSeats.filter(({ seat_id }) => seat_id !== e.target.innerHTML)
            setSelectedSeats(newList)
            e.target.classList.remove(`${style.selection}`); 
        }
    }

    const PurchaseTickets = async (PurchaseData) => {
        try {
            const config = {
                headers: {
                    "user-id": LoginCtx.userID, 
                    "token": LoginCtx.token
                }
            }
            const response = await localAPI.post(`/tickets`, PurchaseData, config)
            console.log("Purchase successful!", response.data)
            window.alert("Purchase successful!")
            window.alert("You will now be redirected to your account page.")
            navigate(`/account`); 
        } catch (error) {
            console.log(error.message)
            console.log("Unable to purchase tickets, selected seat(s) not available.")
            window.alert("Unable to purchase tickets, selected seat(s) not available.")
            window.alert("You will now be redirected back to the events page.")
            navigate(`/concerts`); 
        }
    }

    const ConfirmPurchase = async () => {
        if (SelectedSeats.length > 0) {
            await PurchaseTickets(SelectedSeats); 
            getTickets(); 
        } else {
            console.log("No seats selected")
            window.alert("No seats selected")
        }
    }

    if (LoginCtx.isLoggedIn) {
    return (
        <>
            <div className={style.stage}>STAGE</div>
            <table className={style.SeatsTable}>
                <tbody>
                    {newArray.map((i) => (
                    <tr key={i.seatCategory}>
                        {i.map((x) => (
                        <td key={x.seatId}>{checkIfAvailable(x.seatId)}</td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            {SelectedSeats.length > 0 &&
            <>
            <table className={style.SelectedSeats}>
                <tbody>
                    <tr>
                        <td>You have selected the following seat(s): </td>
                        {SelectedSeats && SelectedSeats.map((z) => (
                        <td key={z.seat_id} className={style.SelectedSeat}>{z.seat_id}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <br/><br/>
            <button className={style.PurchaseBtn} onClick={ConfirmPurchase}>Confirm Purchase</button>
            <br/>
            </>
            }
        </>
    )
    }

    if (!LoginCtx.isLoggedIn) {
    return (
        <>
            <br/><br/>
            <Link to="/login">
                <button className={style.PurchaseBtn}>Login to buy tickets</button>
            </Link>
            <br/><br/>
        </>
    )
    }
}

export default DisplayConcertSeats; 