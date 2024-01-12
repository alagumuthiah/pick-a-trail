import './UserProfile.css';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, setUserReviews, setCompletedList, setActivitiesList, setSavedList } from '../../store/userProfile';

//generic component for display data using the current user/ any user in the community
//use Effect runs only when navigating through community, it doesn't navigate when the button is clicked from navigation bar
const UserProfile = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const userInfo = useSelector((state) => state.userProfile.user);
    const location = useLocation();
    const userId = location.state?.id;
    const [activeTab, setActiveTab] = useState(2);
    const activeLinkStyle = {
        'background-color': '#569d0f',
        'font-weight': 'bold',
        'text-decoration': 'underline'
    }

    const linkStyle = {
        'color': 'white'
    }
    useEffect(() => {
        //to set the userInfo in the store
        dispatch(setUserInfo(userId))
            .catch(async (res) => {
                console.log(res);
            });

        //to set the reviews given by the selected user in the store
        dispatch(setUserReviews(userId))
            .catch(async (res) => {
                console.log('ERROR');
                console.log(res);
            });

        //to set the reviews given by the selected user in the store
        dispatch(setCompletedList(userId))
            .catch(async (res) => {
                console.log('ERROR');
                console.log(res);
            });

        //to set the activities by the selected user in the store
        dispatch(setActivitiesList(userId))
            .catch(async (res) => {
                console.log('ERROR');
                console.log(res);
            });
        //to set the list saved by the selected user in the store
        dispatch(setSavedList(userId))
            .catch(async (res) => {
                console.log('ERROR');
                console.log(res);
            });
        return () => {
            console.log("Clean up function");
        }
    }, []);

    return (
        <div className="profile-page">
            <h2>User Profile</h2>
            <div className="container">
                <div className="profile-section">
                    {currentUser !== null && currentUser?.id === userInfo?.id && <button>Edit</button>}
                    <h2>{userInfo?.firstName}  {userInfo?.lastName}</h2>
                    <h3>Location</h3>
                    <h3>Member since</h3>
                    <h4>Followers | Following</h4>
                    <NavLink className="link-tags" to="list"
                        onClick={() => setActiveTab(1)}
                        style={activeTab === 1 ? activeLinkStyle : linkStyle}>List</NavLink>
                </div>
                <div className="detail-section">
                    <NavLink className="link-tags" to="feed"
                        onClick={() => setActiveTab(2)}
                        style={activeTab === 2 ? activeLinkStyle : linkStyle}>Feed</NavLink>
                    <NavLink className="link-tags" to="photos" onClick={() => setActiveTab(3)}
                        style={activeTab === 3 ? activeLinkStyle : linkStyle}>Photos</NavLink>
                    <NavLink className="link-tags" to="reviews" onClick={() => setActiveTab(4)}
                        style={activeTab === 4 ? activeLinkStyle : linkStyle}>Reviews</NavLink>
                    <NavLink className="link-tags" to="activities" onClick={() => setActiveTab(5)}
                        style={activeTab === 5 ? activeLinkStyle : linkStyle}>Activities</NavLink>
                    <NavLink
                        className="link-tags"
                        to="completed" onClick={() => setActiveTab(6)}
                        style={activeTab === 6 ? activeLinkStyle : linkStyle}>Completed</NavLink>
                    <div className="details">
                        <Outlet />
                    </div>

                </div>


            </div>
        </div >
    )
}

export default UserProfile;


/*
1. Community Component - with a side bar with lst of users currently available in the database. Each in the list is a clickable component
2. When clicked, navigate to the profile component passing the userid and email
3. In the UserProfile component - (use useEffect) perform eager loading for userDetails, feed, photos, reviews, Completed, List, Activities. Store the data in the slice of data in the store called userProfile
4. Then in the respective components retrive the slices of data like feed, review, activities, etc
5. For the respective components find the basic format
*/
