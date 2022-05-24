import React, { useState } from "react"
import axios from "axios"

const Main = () => {

    const [registerState, setRegisterState] = useState({
        first_name: "",
        last_name: "",
        email: "",
        user_name: "",
        password: "",
        stream_link: "",
        confirmPassword: ""
    })
    const [errorState, setErrorState] = useState({})

    const [loginState, setLoginState] = useState({
        email: "",
        password: ""
    })

    const getAllGamers = () => {
        axios.get("http://localhost:8000/api/gamers", { withCredentials: true })
            .then(res => console.log(res))
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                    console.log("UNAUTHORIZED")
                }
                else if (err.response.status === 400) {
                    console.log("BAD REQUEST")
                }
            })
    }

    const registerSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/gamers/register", registerState, { withCredentials: true })
            .then(res => console.log(res))
            .catch(err => {
                console.log(err.response.data)
                const { errors } = err.response.data;
                console.log(errors)
                const errObj = {}

                for (const [key, value] of Object.entries(errors)) {
                    console.log(errors[key])
                    errObj[key] = value;
                }
                setErrorState(errObj)
            })
    }

    const loginSubmit = e => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/gamers/login", loginState, { withCredentials: true })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const registerChangeHandler = e => {
        setRegisterState({
            ...registerState,
            [e.target.name]: e.target.value
        })
    }

    const loginChangeHandler = e => {
        setLoginState({
            ...loginState,
            [e.target.name]: e.target.value
        })
    }

    return (
        <fieldset>
            <legend>Main.jsx</legend>
            <h1>Register</h1>
            <form onSubmit={registerSubmit}>
                <p>
                    First Name:
                    <input name="first_name" type="text" onChange={registerChangeHandler} />
                    {(errorState.first_name) ? <small className="ml-1 text-danger font-weight-bold">WRONG</small> : null}
                </p>
                <p>
                    Last Name:
                    <input name="last_name" type="text" onChange={registerChangeHandler} />
                    {(errorState.last_name) ? <small className="ml-1 text-danger font-weight-bold">WRONG</small> : null}
                </p>
                <p>
                    Email:
                    <input name="email" type="text" onChange={registerChangeHandler} />
                    {(errorState.email) ? <small className="ml-1 text-danger font-weight-bold">WRONG</small> : null}
                    {(errorState.duplicate) ? <small className="ml-1 text-danger font-weight-bold">EMAIL EXISTS</small> : null}
                </p>
                <p>
                    User Name:
                    <input name="user_name" type="text" onChange={registerChangeHandler} />
                    {(errorState.user_name) ? <small className="ml-1 text-danger font-weight-bold">WRONG</small> : null}
                    {(errorState.duplicate) ? <small className="ml-1 text-danger font-weight-bold">USER NAME EXISTS</small> : null}
                </p>
                <p>
                    Stream Link:
                    <input name="stream_link" type="text" onChange={registerChangeHandler} />
                    {(errorState.stream_link) ? <small className="ml-1 text-danger font-weight-bold">WRONG</small> : null}
                </p>
                <p>
                    Password:
                    <input name="password" type="text" onChange={registerChangeHandler} />
                    {(errorState.password) ? <small className="ml-1 text-danger font-weight-bold">WRONG</small> : null}
                </p>
                <p>
                    Confirm Password:
                    <input name="confirmPassword" type="text" onChange={registerChangeHandler} />
                    {(errorState.confirmPassword) ? <small className="ml-1 text-danger font-weight-bold">WRONG</small> : null}
                </p>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <h1>Login</h1>
            <form onSubmit={loginSubmit}>
                <p>
                    Email:
                    <input name="email" type="text" onChange={loginChangeHandler} />
                </p>
                <p>
                    Password:
                    <input name="password" type="text" onChange={loginChangeHandler} />
                </p>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <button onClick={getAllGamers}>GET ALL GAMERS</button>
        </fieldset>
    )
}

export default Main