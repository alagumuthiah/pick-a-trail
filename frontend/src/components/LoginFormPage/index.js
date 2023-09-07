import { baseUrl } from '../../utils/baseUrl';
import { Link } from 'react-router-dom';

export default function Login() {

    const googlePage = () => {
        window.open(`${baseUrl}/auth/google`, "_self");
    }

    const githubPage = () => {
        window.open(`${baseUrl}/auth/github`, "_self");
    }

    const facebookPage = () => {
        window.open(`${baseUrl}/auth/facebook`, "_self");
    }
    return (
        <div className="login__form">
            <h2>Login</h2>
            <br />
            <br />
            <br />
            <button onClick={googlePage}>Google</button>
            <button onClick={githubPage}>Github</button>
            <button onClick={facebookPage}>Facebook</button>
        </div>

    )
}
