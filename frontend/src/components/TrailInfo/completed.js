import { useSelector } from "react-redux"

export const CompletedTrail = () => {
    const completed = useSelector((state) => state.trailInfo.completed);
    console.log(completed);
    let completedFormat;
    if (completed) {
        completedFormat = completed.map((trail) => {
            return (
                <h3>{trail.User.firstName}{trail.User.lastName}</h3>
            )
        })
    }
    return (
        <div>
            {completedFormat}
        </div>

    )
}
