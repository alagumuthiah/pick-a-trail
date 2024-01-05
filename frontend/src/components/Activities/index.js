import { useSelector } from "react-redux";

const Activities = () => {

    const activities = useSelector((state) => state.userProfile.activities);
    console.log(activities);
    let activitiesFormat = activities.message;
    if (!activities.message) {
        activitiesFormat = activities.map((activity) => {
            let createdDate = new Date(activity.createdAt);
            let month = createdDate.toLocaleString('en-US', { month: 'long' });
            let year = createdDate.getFullYear();
            return (
                <>
                    <h2>{activity.title}</h2>
                    <h3>{month},{year}</h3>
                    <p>Length : {activity.Review.Trail.length}</p>
                    <p>Elevation Gain : {activity.Review.Trail.elevationGain}</p>
                    <p>{activity.Review.comment}</p>
                    <hr />
                </>
            )
        })
    }

    return (
        <>
            <h2>Activities</h2>
            {activitiesFormat}
        </>

    )
}

export default Activities;
