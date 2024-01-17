import { useDispatch } from "react-redux";
import { deleteReviewForTrail } from "../../store/trailInfo";

const ConfirmationModal = (props) => {
    const dispatch = useDispatch();

    const handleDeleteReview = (event) => {
        event.preventDefault();
        if (props?.review?.id) {
            dispatch(deleteReviewForTrail(props?.review?.id))
                .catch(async (res) => {
                    console.log(res);
                })
        }
        props.handleModalClose();

    }
    return (
        <form className="modal-form">
            <h2>Are you sure you want to delete?</h2>
            <button className="button-style" onClick={(event) => handleDeleteReview(event)}>Delete</button>
            <button className="button-style" onClick={() => props.handleModalClose()}>Cancel</button>
        </form>
    )
}

export default ConfirmationModal;
