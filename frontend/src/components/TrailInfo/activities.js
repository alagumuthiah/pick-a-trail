import { useSelector } from "react-redux"

export const ActivityTrail = () => {
    const activities = useSelector((state) => state.trailInfo.activities);
    let activitiesFormat;
    if (!activities.message) {
        activitiesFormat = activities.map((activity) => {
            let createdDate = new Date(activity.createdAt);
            let month = createdDate.toLocaleString('en-US', { month: 'long' });
            let year = createdDate.getFullYear();
            let day = createdDate.getDay();
            return (
                <div id={activity.id}>
                    <h2>{activity.title}</h2>
                    <h3>{month},{day},{year}</h3>
                    <p>Review:{activity.Review.starsReview}</p>
                </div>
            )
        })
    }
    return (
        <>
            {activitiesFormat}
        </>
    )
}
