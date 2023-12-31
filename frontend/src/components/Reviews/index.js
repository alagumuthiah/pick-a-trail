import { useSelector } from "react-redux";
import './Review.css';

const Reviews = () => {
    const userReviews = useSelector((state) => state.userProfile.reviews);
    if (userReviews.length === 0) {
        return (
            <h3>No Review posted by this user</h3>
        )
    } else {
        let reviewsFormat = userReviews.map((review) => {
            return (
                <div className="review-section">
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
                <p>Placeholder to display average review of all the reviews given by the user</p>
                <ul>
                    {reviewsFormat}
                </ul>
            </div >
        )
    }

}

export default Reviews;
