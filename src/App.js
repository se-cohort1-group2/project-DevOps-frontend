import "./App.css"; 

import { useContext, useState, useEffect } from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 

import LoginContext from "./context/LoginContext"; 
import localAPI from "./api/localAPI"; 

import DefaultErrorPage from "./routes/DefaultErrorPage"; 
import DefaultMainPage from "./routes/DefaultMainPage"; 
import DefaultHomePage from "./routes/DefaultHomePage"; 
import DefaultBlankPage from "./routes/DefaultBlankPage"; 

import PageConcerts from "./routes/PageConcerts"; 
import PageConcertByID from "./routes/PageConcertByID"; 

import ViewUsers from "./routes/ViewUsers"; 
import ViewConcerts from "./routes/ViewConcerts"; 
import ViewTickets from "./routes/ViewTickets"; 
import ViewSeats from "./routes/ViewSeats"; 

import ViewByIDUser from "./routes/ViewByIDUser"; 
import ViewByIDConcert from "./routes/ViewByIDConcert"; 

import LoginPage from "./routes/LoginPage"; 
import LoginRegisterPage from "./routes/LoginRegisterPage"; 

import AccountPage from "./routes/AccountPage"; 

function App() {

    const LoginCtx = useContext(LoginContext); 

    const [ConcertsHistoryList, setConcertsHistoryList] = useState([]); 
    const [ConcertsList, setConcertsList] = useState([]); 
    const [SeatsList, setSeatsList] = useState([]); 
    const [TicketsList, setTicketsList] = useState([]); 
    const [UsersList, setUsersList] = useState([]); 

    const getConcertsHistory = async() => {
        try {
            const response = await localAPI.get("/concerts/history")
            setConcertsHistoryList(response.data)
            console.log("ConcertsHistoryList", response.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const getConcerts = async() => {
        try {
            const response = await localAPI.get("/concerts")
            setConcertsList(response.data)
            console.log("ConcertsList", response.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const getSeats = async() => {
        try {
            const config = {
                headers: {
                    "user-id": LoginCtx.userID, 
                    "token": LoginCtx.token
                }
            }
            const response = await localAPI.get("/seats", config)
            setSeatsList(response.data)
            console.log("SeatsList", response.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const getTickets = async() => {
        try {
            const config = {
                headers: {
                    "user-id": LoginCtx.userID, 
                    "token": LoginCtx.token
                }
            }
            const response = await localAPI.get("/tickets", config)
            setTicketsList(response.data)
            console.log("TicketsList", response.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const getUsers = async() => {
        try {
            const config = {
                headers: {
                    "user-id": LoginCtx.userID, 
                    "token": LoginCtx.token
                }
            }
            const response = await localAPI.get("/users", config)
            setUsersList(response.data)
            console.log("UsersList", response.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getConcertsHistory(); 
        getConcerts(); 
        getSeats(); 
        getTickets(); 
        getUsers(); 
        // eslint-disable-next-line
    }, [])

    return (
        <>
        <BrowserRouter>
        <Routes>

            <Route element={<DefaultMainPage/>}>
                <Route path="*" element={<DefaultErrorPage/>}/>
            </Route>

            <Route path="/" element={<DefaultMainPage/>}>
                <Route index element={<DefaultHomePage/>}/>

                <Route path="/concerts" element={<DefaultBlankPage/>}>
                    <Route index element={<PageConcerts ConcertsList={ConcertsList} titleText={"Upcoming Concerts"}/>}/>
                    <Route path="history" element={<PageConcerts ConcertsList={ConcertsHistoryList} titleText={"Past Concerts & Upcoming Concerts"}/>}/>
                    <Route path=":ConcertID/buy" element={<PageConcertByID ConcertsList={ConcertsHistoryList} SeatsList={SeatsList} TicketsList={TicketsList} getTickets={getTickets}/>}/>
                </Route>

                <Route path="/admin" element={<DefaultBlankPage/>}>
                    <Route path="users" element={<ViewUsers getUsers={getUsers} UsersList={UsersList}/>}/>
                    <Route path="concerts" element={<ViewConcerts getConcertsHistory={getConcertsHistory} ConcertsList={ConcertsHistoryList}/>}/>
                    <Route path="tickets" element={<ViewTickets getTickets={getTickets} TicketsList={TicketsList}/>}/>
                    <Route path="seats" element={<ViewSeats getSeats={getSeats} SeatsList={SeatsList}/>}/>
                    <Route index element={<DefaultErrorPage/>}/>
                    <Route path="users/:UserID" element={<ViewByIDUser getUsers={getUsers} UsersList={UsersList} TicketsList={TicketsList}/>}/>
                    <Route path="concerts/:ConcertID" element={<ViewByIDConcert ConcertsList={ConcertsHistoryList} TicketsList={TicketsList}/>}/>
                </Route>

                <Route path="/login" element={<DefaultBlankPage/>}>
                    <Route index element={<LoginPage/>}/>
                    <Route path="register" element={<LoginRegisterPage/>}/>
                </Route>

                <Route path="/account" element={<AccountPage getUsers={getUsers} UsersList={UsersList} getTickets={getTickets} TicketsList={TicketsList} getSeats={getSeats}/>}/>
            </Route>

        </Routes>
        </BrowserRouter>
        </>
    )
}

export default App; 