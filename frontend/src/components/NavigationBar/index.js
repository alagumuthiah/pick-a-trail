import './NavigationBar.css';
import { Link } from 'react-router-dom';

export default function NavigationBar() {
    return (

        <div className="header__section">
            <a href="/"><img src="all-trails-logo.jpeg" alt="trails_logo" width="100px" height="100px" /></a>

            <Link className="link--navbar" to="/explore">
                <h3>Explore</h3>
            </Link>

            <Link className="link--navbar" to="/community">
                <h3>Community</h3>
            </Link>

            <Link className="link--navbar" to="/signup">
                <h3>Saved</h3>
            </Link>

            <Link className="link--navbar" to="/login">
                <h3>Login</h3>
            </Link>

            {/* <Button size="medium" color="primary" variant="contained" onClick={handleLogOut} >Logout</Button>
            :
            <Link to="/login">
                <Button size="medium" color="primary" variant="contained">Login</Button>
            </Link>} */}

        </div>
    )
}
