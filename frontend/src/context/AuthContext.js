import {createContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext(undefined)

export default AuthContext

export const AuthProvider = ({children}) => {
    console.log('Update token called!')
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()
        console.log('Form data:', e.target.email.value, e.target.password.value);
        let response = await fetch('http://localhost:8000/token/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email': e.target.email.value, 'password': e.target.password.value})
        })
        let data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        } else {
            alert("Something went wrong!")
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('login')
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        setUser: setUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    useEffect(() => {

        if (authTokens){
            setUser(jwtDecode(authTokens.access))
        }
        setLoading(false)

    }, [authTokens, loading]);


    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}