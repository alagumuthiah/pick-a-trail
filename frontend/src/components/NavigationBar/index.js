import './NavigationBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/session';

export default function NavigationBar() {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = (event) => {
        event.preventDefault();
        dispatch(logoutUser());
        navigate("/explore");
    }

    const loadProfile = () => {
        console.log('Load Profile');
        navigate("/members/" + sessionUser.firstName + '-' + sessionUser.lastName);
    }

    return (

        <div className="header__section">
            <a href="/"><img src="  all-trails-logo.jpeg" alt="trails_logo" width="100px" height="100px" /></a>

            <Link className="link--navbar" to="/explore">
                <h3>Explore</h3>
            </Link>

            <Link className="link--navbar" to="/community">
                <h3>Community</h3>
            </Link>

            <Link className="link--navbar" to="/saved">
                <h3>Saved</h3>
            </Link>

            {sessionUser &&
                <button onClick={loadProfile}>{sessionUser.firstName} {sessionUser.lastName}</button>
            }
            {sessionUser ?
                <Link className="link--navbar" to="/logout">
                    <div onClick={handleLogOut}>Logout</div>
                </Link>
                :
                <Link className="link--navbar" to="/login">
                    <h3>Login</h3>
                </Link>
            }

        </div>
    )
}
