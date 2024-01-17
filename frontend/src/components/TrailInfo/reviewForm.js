import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addReviewForTrail } from "../../store/trailInfo";

const ReviewForm = (props) => {
    const dispatch = useDispatch();
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const trail = useSelector((state) => state.trailInfo.trail);
    const addReview = (event) => {
        event.preventDefault();
        const payload = {
            rating,
            comment
        }
        dispatch(addReviewForTrail(trail.id, payload))
            .catch(async (res) => {
                console.log(res);
            })
        props.handleModalClose();
    }
    return (
        <form>
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
                onChange={(event) => setComment(event.target.value)}></textarea>
            <button onClick={addReview} type="submit">Submit a Review</button>
        </form>
    )
}

export default ReviewForm;
