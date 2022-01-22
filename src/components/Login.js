import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setcredentials] = useState({email: "", password: ""});
    const host = "http://localhost:5000";
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email : credentials.email, password: credentials.password})
        })
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token', json.authToken);
            props.showAlert("LoggedIn Successfully", "success");
            history.push("/");
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }
    const handleChange = (e)=>  {
        setcredentials({...credentials, [e.target.name]: e.target.value})
        
    }

    return <>
        <form onSubmit={handleSubmit}>
            <div className="mb-3 my-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={handleChange} aria-describedby="email" />
                <div id="email" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </>
};

export default Login;
