import { useState } from 'react';
import { useSelector } from "react-redux"
import ReviewForm from './reviewForm';
import ConfirmationModal from './confirmationModal';
export const ReviewTrail = () => {

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState('');
    const reviews = useSelector((state) => state.trailInfo.reviews);
    console.log(reviews);
    const currentUser = useSelector((state) => state.session.user);
    //Reviews doesn't get loaded after the review is added by the user. Though it gets updated in the database and redux store, it doesn't get reflected in frontend

    const handleModalClose = () => {
        setShowReviewModal(false);
    }

    const handleDeleteModalClose = () => {
        setShowConfirmationModal(false);
    }

    const handleAddReviewModal = () => {
        setShowReviewModal(true);
        setSelectedReview('');
    }
    const handleEditReview = (event, review) => {
        event.preventDefault();
        setSelectedReview(review);
        setShowReviewModal(true);
    }

    const handleDeleteReview = (event, review) => {
        event.preventDefault();
        setSelectedReview(review);
        setShowConfirmationModal(true);
    }

    let reviewsFormat;
    if (reviews) {
        reviewsFormat = Object.keys(reviews).map((reviewId) => {
            let createdDate = new Date(reviews[reviewId].createdAt);
            let month = createdDate.toLocaleString('en-US', { month: 'long' });
            let year = createdDate.getFullYear();
            let day = createdDate.getDate();
            return (
                <div className="review-section" key={reviewId}>
                    <div className="review-header">
                        <h3>{reviews[reviewId]?.User?.firstName}&nbsp;&nbsp;&nbsp;{reviews[reviewId]?.User?.lastName}</h3>
                        {(currentUser.id === reviews[reviewId].User.id) &&
                            <>
                                <button
                                    className="button-style"
                                    onClick={(event) => handleEditReview(event, reviews[reviewId])}>Edit</button>
                                <button className="button-style"
                                    onClick={(event) => handleDeleteReview(event, reviews[reviewId])}>Delete</button>
                            </>}
                    </div>

                    <h5>{day} {month},{year}</h5>
                    <p>{reviews[reviewId].starsReview}</p>
                    <p>{reviews[reviewId].comment}</p>
                    <hr />
                </div>
            )
        });
    }


    return (
        <div>
            <button className="button-style" onClick={() => handleAddReviewModal()}>Add a review</button>
            {showReviewModal && <ReviewForm handleModalClose={handleModalClose} selectedReview={selectedReview} />}
            {showConfirmationModal && <ConfirmationModal handleModalClose={handleDeleteModalClose} review={selectedReview} />}
            {(showReviewModal || showConfirmationModal) && <div className="overlay" />}
            {reviewsFormat}

        </div>

    )
}
