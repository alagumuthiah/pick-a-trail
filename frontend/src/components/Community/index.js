import './Community.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserList } from '../../store/userList';

const Community = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setUserList())
            .catch(async (res) => {
                console.log('error');
                console.log(res);
                // const data = await res.json();
            })
    }, [dispatch]);
    const userList = useSelector((state) => state.userList);

    const loadProfile = (user) => {
        navigate("/members/" + user.firstName + '-' + user.lastName, { state: { id: user.id, email: user.email } });
    }

    const userListFormat = userList.map((user) => {
        return <button onClick={() => loadProfile(user)}>{user.firstName} {user.lastName}</button>
    });
    console.log(userListFormat);

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
