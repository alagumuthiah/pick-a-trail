import { useSelector } from 'react-redux';

const Completed = () => {
    const completedTrails = useSelector((state) => state.userProfile.completed);
    console.log(completedTrails);
    const trailsList = completedTrails.map((trail) => {
        return (
            <>
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
            </>
        )
    })
    return (
        <>
            <h2>Completed</h2>
            {trailsList}
        </>

    )
}

export default Completed;
