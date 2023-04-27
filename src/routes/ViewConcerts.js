import style from "./Page.module.css"; 

import { useEffect } from "react"; 

import TableConcerts from "../components/TableConcerts"; 

function ViewConcerts({ getConcertsHistory, ConcertsList }) {

    useEffect(() => {
        getConcertsHistory(); 
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className={style.page}>
                <div className={style.title}>View all Concerts</div>
                {ConcertsList && <TableConcerts list={ConcertsList}/>}
            </div>
        </>
    )
}

export default ViewConcerts; 