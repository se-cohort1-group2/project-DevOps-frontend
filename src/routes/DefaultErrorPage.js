import style from "./Page.module.css"; 

import { Link } from "react-router-dom"; 

function DefaultErrorPage() {
    return (
        <>
            <div style={{textAlign: "center", margin: "50px 0 0 0"}}>
                <h1>Error</h1>
                <p> Page not found</p>
                <Link to="/" className={style.BackLink}>
                    <span className={style.BackArrow}>🡄</span>
                    <span className={style.BackText}>&nbsp;Back</span>
                </Link>
            </div>
        </>
    )
}

export default DefaultErrorPage; 