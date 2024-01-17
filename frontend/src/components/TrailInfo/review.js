import { useState } from 'react';
import { useSelector } from "react-redux"
import ReviewForm from './reviewForm';
export const ReviewTrail = () => {

    const [showReviewModal, setShowReviewModal] = useState(false);
    const reviews = useSelector((state) => state.trailInfo.reviews);
    //Reviews doesn't get loaded after the review is added by the user. Though it gets updated in the database and redux store, it doesn't get reflected in frontend
    const handleModalClose = () => {
        console.log('Handle Close');
        setShowReviewModal(false);
    }
    let reviewsFormat;
    if (reviews) {
        reviewsFormat = reviews.map((review) => {
            return (
                <div className="review-section" key={review.id}>
                    <h3>{review.User.firstName}&nbsp;&nbsp;&nbsp;{review.User.lastName}</h3>
                    <p>{review.starsReview}</p>
                    <p>{review.comment}</p>
                </div>
            )
        });
    }


    return (
        <div>
            <button className="button-style" onClick={() => setShowReviewModal(true)}>Add a review</button>
            {showReviewModal && <ReviewForm handleModalClose={handleModalClose} />}
            {reviewsFormat}

        </div>

    )
}
