import './NavigationBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/session';
import { useState } from 'react';

export default function NavigationBar() {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedLink, setSelectedLink] = useState(null);
    const activeLink = {
        color: '#ACCC7F'
    }

    const linkStyle = {
        color: 'white'
    }

    const handleLogOut = (event) => {
        event.preventDefault();
        dispatch(logoutUser());
        setSelectedLink("/explore");
        navigate("/explore");
    }

    const loadProfile = () => {
        navigate("/members/" + sessionUser.firstName + '-' + sessionUser.lastName, { state: { id: sessionUser.id } });
    }

    return (

        <div className="header__section">
            <a href="/"><img src="  all-trails-logo.jpeg" alt="trails_logo" width="100px" height="100px" /></a>

            <Link className="link--navbar" to="/explore"
                style={selectedLink === '/explore' ? activeLink : linkStyle}
                onClick={() => setSelectedLink('/explore')}>
                <h3>Explore</h3>
            </Link>

            <Link className="link--navbar" to="/community"
                style={selectedLink === '/community' ? activeLink : linkStyle}
                onClick={() => setSelectedLink('/community')}>
                <h3>Community</h3>
            </Link>

            <Link className="link--navbar" to="/saved"
                style={selectedLink === '/saved' ? activeLink : linkStyle}
                onClick={() => setSelectedLink('/saved')}>
                <h3>Saved</h3>
            </Link>

            {sessionUser &&
                <button onClick={loadProfile}>{sessionUser.firstName} {sessionUser.lastName}</button>
            }
            {sessionUser ?
                <Link className="link--navbar" to="/logout">
                    <div onClick={handleLogOut} style={linkStyle}>Logout</div>
                </Link>
                :
                <Link className="link--navbar" to="/login"
                    style={selectedLink === '/login' ? activeLink : linkStyle}
                    onClick={() => setSelectedLink('/login')}>
                    <h3>Login</h3>
                </Link>
            }

        </div>
    )
}
