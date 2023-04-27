import { createContext, useState } from "react"; 

const LoginContext = createContext({
    isLoggedIn: false, 
    setIsLoggedIn: () => {}, 
    userID: "", 
    setUserID: () => {}, 
    token: "", 
    setToken: () => {}, 
})

export function LoginContextProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [userID, setUserID] = useState(""); 
    const [token, setToken] = useState(""); 

    const handleLogin = (status, userID, token) => {
        setIsLoggedIn(status); 
        setUserID(userID); 
        setToken(token)
    }

    const context = {
        isLoggedIn: isLoggedIn, 
        userID: userID, 
        token: token, 
        handleLogin: handleLogin, 
    }

    return (
        <LoginContext.Provider value={context}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContext; 