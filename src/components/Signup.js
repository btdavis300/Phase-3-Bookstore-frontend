import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

function Signup() {
  const [details, setDetails] = useState({ name: "", email: "", password: "", retype_password: "" });
  const [error, setError] = useState("")
  let history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    if (details.password === details.retype_password) {
      fetch("http://localhost:9292/users/new_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: details.name,
          email: details.email,
          password: details.password,
        }),
      })
      history.push('/login')
    } else {
      setError("Password Does Not Match");
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-inner">
        <div className="header">
          <h2>SignUp</h2>
        </div>
        {(error != "") ? (<div className="error">{error}</div>) : ""}
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" id="name" onChange={e => setDetails({ ...details, name: e.target.value })} value={details.name} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" id="email" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
        </div>
        <div className="form-group">
          <label htmlFor="retype_password">Retype-Password: </label>
          <input type="password" name="retype_password" id="retype_password" onChange={e => setDetails({ ...details, retype_password: e.target.value })} value={details.retype_password} />
        </div>
        <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
        < input type="submit" value="SIGNUP" />
      </div>
    </form>
  )
}

export default Signup