import { useState } from 'react';
import { useSelector } from "react-redux"
import ReviewForm from './reviewForm';
export const ReviewTrail = () => {

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState('');
    const reviews = useSelector((state) => state.trailInfo.reviews);
    const currentUser = useSelector((state) => state.session.user);
    //Reviews doesn't get loaded after the review is added by the user. Though it gets updated in the database and redux store, it doesn't get reflected in frontend

    const handleModalClose = () => {
        setShowReviewModal(false);
    }

    const handleEditReview = (event, review) => {
        event.preventDefault();
        setSelectedReview(review);
        setShowReviewModal(true);
    }

    const handleDeleteReview = (event) => {
        event.preventDefault();
        console.log('delete review');
    }

    let reviewsFormat;
    if (reviews) {
        reviewsFormat = reviews.map((review) => {
            let createdDate = new Date(review.createdAt);
            let month = createdDate.toLocaleString('en-US', { month: 'long' });
            let year = createdDate.getFullYear();
            let day = createdDate.getDate();
            return (
                <div className="review-section" key={review.id}>
                    <div className="review-header">
                        <h3>{review.User.firstName}&nbsp;&nbsp;&nbsp;{review.User.lastName}</h3>
                        {(currentUser.id === review.User.id) &&
                            <>
                                <button
                                    className="button-style"
                                    onClick={(event) => handleEditReview(event, review)}>Edit</button>
                                <button className="button-style"
                                    onClick={handleDeleteReview}>Delete</button>
                            </>}
                    </div>

                    <h5>{day} {month},{year}</h5>
                    <p>{review.starsReview}</p>
                    <p>{review.comment}</p>
                    <hr />
                </div>
            )
        });
    }


    return (
        <div>
            <button className="button-style" onClick={() => setShowReviewModal(true)}>Add a review</button>
            {showReviewModal && <ReviewForm handleModalClose={handleModalClose} selectedReview={selectedReview} />}
            {showReviewModal && <div className="overlay" />}
            {reviewsFormat}

        </div>

    )
}
