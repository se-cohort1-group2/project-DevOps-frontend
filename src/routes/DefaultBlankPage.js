import style from "./Page.module.css"; 

import { Outlet } from "react-router-dom"; 

function DefaultBlankPage() {
    return (
        <>
            <div className={style.page}>
                <Outlet/>
            </div>
        </>
    )
}

export default DefaultBlankPage; 