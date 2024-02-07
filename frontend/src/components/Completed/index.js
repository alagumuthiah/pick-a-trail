import { useSelector } from 'react-redux';

const Completed = () => {
    const completedTrails = useSelector((state) => state.userProfile.completed);
    let trailsList;
    if (completedTrails) {
        trailsList = completedTrails.map((trail) => {
            return (
                <div key={trail.trailId}>
                    <h3>
                        {trail.Trail.name}
                    </h3>
                    <h4>
                        Difficulty:{trail.Trail.difficulty}
                    </h4>
                    <h4>
                        Elevation Gain: {trail.Trail.elevationGain} metres
                    </h4>
                    <hr />
                </div>
            )
        });
    }

    return (
        <>
            {/* <h2>Completed</h2> */}
            {trailsList}
        </>

    )
}

export default Completed;
