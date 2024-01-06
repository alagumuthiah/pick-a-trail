import { useSelector } from "react-redux";

const FeedSection = () => {
    const feed = useSelector((state) => state.userProfile.activities);
    console.log('FEED');
    console.log(feed);
    if (feed?.message) {
        return (
            <h3>{feed.message}</h3>
        )
    }
    let feedFormat = feed.map((data) => {
        let createdDate = new Date(data.createdAt);
        let month = createdDate.toLocaleString('en-US', { month: 'long' });
        let year = createdDate.getFullYear();
        return (
            <>
                <h2>{data.title}</h2>
                <h3>{data.Review.Trail.name}</h3>
                <h3>{month},{year}</h3>
                <h5>Review :{data.Review.starsReview}</h5>
                <p>Length : {data.Review.Trail.length}</p>
                <p>Elevation Gain : {data.Review.Trail.elevationGain}</p>
                <p>{data.Review.comment}</p>
                <hr />
            </>
        )
    })

    return (
        <>
            <h1>Feed</h1>
            {feedFormat}
        </>
    )
}

export default FeedSection;
