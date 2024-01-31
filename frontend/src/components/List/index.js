import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import './List.css';
import { setSelectedList } from "../../store/userProfile";

const List = () => {
    const navigate = useNavigate();
    const savedList = useSelector((state) => state.userProfile.lists);
    const dispatch = useDispatch();
    let savedListFormat;
    const handleListClick = (list) => {
        console.log('Clicked', list.id);
        dispatch(setSelectedList(list.id))
            .then(() => {
                navigate("/lists/" + list.name);
            })
            .catch(async (res) => {
                console.log('Error');
                console.log(res);
            })
    }

    if (savedList && savedList.length === 0) {
        return (
            <h1>No lists created</h1>
        )
    } else if (savedList) {
        savedListFormat = savedList.map((list) => {
            return (
                <>
                    <div onClick={() => handleListClick(list)} className="list-item" >
                        <div>
                            <h3>Image</h3>
                        </div>
                        <div>
                            <h3>{list.name}</h3>
                            <h4>{list.trailList.length} items</h4>
                        </div>

                    </div >
                    <hr />
                </>

            )
        })
    }

    return (
        <>
            <h1>List</h1>
            {savedListFormat}
        </>
    )
}

export default List;
