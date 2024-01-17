import { useSelector } from "react-redux"

export const ReviewTrail = () => {
    const reviews = useSelector((state) => state.trailInfo.reviews);
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
            {reviewsFormat}
        </div>

    )
}
