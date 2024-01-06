import { useSelector } from "react-redux";

const Activities = () => {

    const activities = useSelector((state) => state.userProfile.activities);
    let activitiesFormat;
    if (activities && activities?.message) {
        return (
            <>
                <h3>{activities.message}</h3>
            </>
        )
    } else if (activities) {
        activitiesFormat = activities.map((activity) => {
            let createdDate = new Date(activity.createdAt);
            let month = createdDate.toLocaleString('en-US', { month: 'long' });
            let year = createdDate.getFullYear();
            return (
                <div id={activity.id}>
                    <h2>{activity.title}</h2>
                    <h3>{month},{year}</h3>
                    <p>Length : {activity.Review.Trail.length}</p>
                    <p>Elevation Gain : {activity.Review.Trail.elevationGain}</p>
                    <hr />
                </div>
            )
        });
    }
    return (
        <>
            <h2>Activities</h2>
            {activitiesFormat}
        </>

    )


}

export default Activities;
