import { useSelector } from "react-redux";
import './List.css';

const List = () => {
    const savedList = useSelector((state) => state.userProfile.lists);
    let savedListFormat;
    const handleListClick = (id) => {
        console.log('Clicked', id);
    }

    if (savedList && savedList.length === 0) {
        return (
            <h1>No lists created</h1>
        )
    } else if (savedList) {
        savedListFormat = savedList.map((list) => {
            const trails = list.trailList.split(',');
            return (
                <>
                    <div onClick={() => handleListClick(list.id)} className="list-item" >
                        <div>
                            <h3>Image</h3>
                        </div>
                        <div>
                            <h3>{list.name}</h3>
                            <h4>{trails.length} items</h4>
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
