import { useSelector } from "react-redux";
import './Review.css';

const Reviews = () => {
    const userReviews = useSelector((state) => state.userProfile.reviews);
    const averageReview = useSelector((state) => state.userProfile.averageReview);
    if (userReviews?.length === 0) {
        return (
            <h3>No Review posted by this user</h3>
        )
    } else {
        let reviewsFormat = null;
        reviewsFormat = userReviews?.map((review) => {
            return (
                <div key={review.id} className="review-section">
                    <h3>{review.Trail.name}</h3>
                    <p>{review.starsReview}</p>
                    <p>{review.comment}</p>
                    <hr />
                </div>
            )
        });
        return (
            <div>
                <h2> Reviews</h2 >
                <p>Average: {averageReview?.average}</p>
                <ul>
                    {reviewsFormat}
                </ul>
            </div >
        )
    }

}

export default Reviews;
