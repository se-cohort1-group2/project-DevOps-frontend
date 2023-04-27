//import style from "./Page.module.css"; 

import DisplayAllConcerts from "../components/DisplayAllConcerts"; 

function PageConcerts({ ConcertsList, titleText }) {

    return (
        <>
            <div style={{ fontSize: "1.45rem", margin: "2.2em 0 0 0" }}>{titleText}</div>
            <br/>
            {ConcertsList && <DisplayAllConcerts ConcertsList={ConcertsList}/>}
        </>
    )
}

export default PageConcerts; 