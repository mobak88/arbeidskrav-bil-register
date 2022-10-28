import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value = {{ auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext; 
//The code makes it possible to make sure the children of the Routes with AuthContext
// will be protected by unathorized access, perfect for different roles. 
// In our assignment its only admin, but this can be expanded easily. 