
import { useSelector } from 'react-redux';
import Card from '../Card';

const ListDetails = () => {
    const selectedList = useSelector((state) => state.userProfile.selectedList);
    console.log(selectedList);
    let trailListFormat;
    if (selectedList?.trailsList.length === 0) {
        trailListFormat = '<h3>No trails added to the list</h3>';
    } else {
        trailListFormat = selectedList?.trailsList.map((trail) => {
            return (
                <Card key={trail.id} trail={trail} />
            )
        });
    }
    return (
        <>

            <div className="list-header">
                <h3>{selectedList.name}</h3>
            </div>
            <div className="trail-card-list">
                {trailListFormat}
            </div>
        </>
    )

}

export default ListDetails;
