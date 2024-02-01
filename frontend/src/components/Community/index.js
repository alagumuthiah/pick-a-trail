import './Community.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserList } from '../../store/userList';
import { addFollowing, removeFollowing } from '../../store/session';

const Community = () => {
    const dispatch = useDispatch();
    const following = useSelector((state) => state.session.user.following);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setUserList())
            .catch(async (res) => {
                console.log('error');
                console.log(res);
                // const data = await res.json();
            })
    }, [dispatch]);
    let userList = useSelector((state) => state.userList);
    const currentUser = useSelector((state) => state.session.user);
    userList = userList.filter((user) => user.id !== currentUser.id);

    const loadProfile = (user) => {
        console.log('Inside community load profile');
        navigate("/members/" + user.firstName + '-' + user.lastName, { state: { id: user.id } });
    }

    const handleFollow = (userId) => {
        dispatch(addFollowing(userId))
            .catch(async (res) => {
                console.log('error');
                console.log(res);
            });
    }

    const handleUnfollow = (userId) => {
        dispatch(removeFollowing(userId))
            .catch(async (res) => {
                console.log('error');
                console.log(res);
            });
    }

    const userListFormat = userList.map((user) => {
        return (
            <div className="members-name">
                <div
                    className="username-div"
                    onClick={() => loadProfile(user)}>{user.firstName} {user.lastName}
                </div>
                {following && following.includes(user.id) ?
                    <button className="button-follow" onClick={() => handleUnfollow(user.id)}>Unfollow</button> :
                    <button className="button-follow" onClick={() => handleFollow(user.id)}>Follow</button>}
            </div>)

    });

    return (

        <div className="community-container">
            <div>
                <h1>Community</h1>
            </div>
            <div>
                <p>User List</p>
                <div className="community-user-list">
                    {userListFormat}
                </div>

            </div>
        </div>
    )
}

export default Community;
