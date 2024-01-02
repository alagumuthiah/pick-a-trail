import './UserProfile.css';

import { NavLink, Outlet } from 'react-router-dom';

const UserProfile = () => {
    return (
        <div className="profile-page">
            <h2>User Profile</h2>
            <div className="container">
                <div className="profile-section">
                    <h2>FirstName  LastName</h2>
                    <h3>Location</h3>
                    <h3>Member since</h3>
                    <h4>Followers | Following</h4>
                    <h4>List</h4>
                </div>
                <div className="detail-section">
                    <NavLink className="link-tags" to="feed">Feed</NavLink>
                    <NavLink className="link-tags">Photos</NavLink>
                    <NavLink className="link-tags">Reviews</NavLink>
                    <NavLink className="link-tags">Activities</NavLink>
                    <NavLink
                        className="link-tags">Completed</NavLink>
                    <Outlet />
                </div>


            </div>
        </div >
    )
}

export default UserProfile;
