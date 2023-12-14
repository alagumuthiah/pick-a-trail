// import { baseUrl } from '../../utils/baseUrl';
//import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSessionUser } from '../../store/session';

export default function Login() {

    // const googlePage = () => {
    //     window.open(`${baseUrl}/auth/google`, "_self");
    // }

    // const githubPage = () => {
    //     window.open(`${baseUrl}/auth/github`, "_self");
    // }

    // const facebookPage = () => {
    //     window.open(`${baseUrl}/auth/facebook`, "_self");
    // }
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionUser) {
            navigate("/");
        }
    }, [sessionUser]);

    const handleLogin = (event) => {
        console.log('handle Login');
        setErrors([]); //check for validation and update errors
        event.preventDefault();
        const payload = {
            credential,
            password
        }
        console.log(payload);
        dispatch(setSessionUser(payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            })

    }
    return (
        <div className="container">
            <h2>Login and Start Exploring</h2>
            <form className="form" onSubmit={handleLogin}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div>
                    <label htmlFor="credential">UserName / Email</label>
                    <input
                        name="credential"
                        type="text"
                        value={credential}
                        onChange={(event) => setCredential(event.target.value)} />
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
                    <button type="submit">Login</button>
                </div>
            </form>
            <hr></hr>
            <button>Google</button>
            <button>Github</button>
            <button>Facebook</button>
            <hr>
            </hr>
            <h4>Don't have an account? <a href="/signup">Sign Up</a> </h4>
        </div>



    )
}
