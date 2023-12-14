
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../store/session";
import { useNavigate } from "react-router-dom";

//firstName, lastName, userName, email, password
export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        if (sessionUser) {
            navigate("/");
        }
    }, [sessionUser]);

    const handleSignup = (event) => {
        event.preventDefault();
        const payload = {
            firstName,
            lastName,
            userName,
            email,
            password
        }
        console.log(payload);
        dispatch(signUpUser(payload))
            .catch(async (res) => {
                console.log('error');
                console.log(res);
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            })
    }
    return (

        <div className="container">
            <h2>Sign up today to start planning your next adventure</h2>
            <form className="form" onSubmit={handleSignup}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div>
                    <label htmlFor="firstname">FirstName</label>
                    <input
                        name="firstname"
                        type="text"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="lastname">LastName</label>
                    <input
                        name="lastname"
                        type="text"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="username">UserName</label>
                    <input
                        name="username"
                        type="text"
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>

    )
}
