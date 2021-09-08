import { createContext, useState, useEffect } from "react";
import {useRouter} from 'next/router'
import { API_URL } from "@/config/index";


const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    return (
        // <AuthContext.Provider value={{ user, error, register, login, logout }}>
        <AuthContext.Provider value={{ user, error }}>
          {children}
        </AuthContext.Provider>
      )
}

export default AuthContext;