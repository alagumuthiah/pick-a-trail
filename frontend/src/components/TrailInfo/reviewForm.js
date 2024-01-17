import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addReviewForTrail, updateReviewForTrail } from "../../store/trailInfo";

const ReviewForm = (props) => {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(props?.selectedReview?.starsReview || '');
    const [comment, setComment] = useState(props?.selectedReview?.comment || '');
    const trail = useSelector((state) => state.trailInfo.trail);
    const modifyReview = (event) => {
        event.preventDefault();
        const payload = {
            rating,
            comment
        }
        if (props?.selectedReview?.id) { //when called with a review update the review
            dispatch(updateReviewForTrail(props.selectedReview.id, payload))
                .catch(async (res) => {
                    console.log(res);
                })
        } else { // when called without any review, it is called by clicking the Add a Review button, so create a new review for the specific trail
            dispatch(addReviewForTrail(trail.id, payload))
                .catch(async (res) => {
                    console.log(res);
                })
        }

        props.handleModalClose();
    }
    return (
        <form className="modal-form">
            <h1>{trail.name}</h1>
            <label htmlFor="rating">Rating</label>
            <input
                type="text"
                name="rating"
                value={rating}
                onChange={(event) => setRating(event.target.value)} />
            <label htmlFor="comment">Comments</label>
            <textarea
                name="comment"
                value={comment}
                rows="5"
                onChange={(event) => setComment(event.target.value)}></textarea>
            <button className="button-style" onClick={modifyReview} type="submit">Submit a Review</button>
            <button className="button-style" onClick={() => props.handleModalClose()}>Cancel</button>
        </form>
    )
}

export default ReviewForm;
