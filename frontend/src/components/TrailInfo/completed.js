import { useSelector } from "react-redux"

export const CompletedTrail = () => {
    const completed = useSelector((state) => state.trailInfo.completed);
    console.log(completed);
    let completedFormat;
    if (completed) {
        completedFormat = completed.map((trail) => {
            return (
                <div key={trail.User.id}>
                    <h3>{trail.User.firstName}{trail.User.lastName}</h3>
                </div>

            )
        })
    }
    return (
        <div>
            {completedFormat}
        </div>

    )
}
