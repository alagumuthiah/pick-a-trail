import { useNavigate } from 'react-router-dom';
import './Card.css';
const Card = (props) => {
    const trail = props.trail;
    const navigate = useNavigate();

    const loadTrail = (trail) => {
        navigate("/trails/" + trail.name, { state: { id: trail.id } });
    }

    return (
        <div className="explore-trails" onClick={() => loadTrail(trail)}>
            <h3>{trail.name}</h3>
            {trail.Park && <p>{trail.Park.name}</p>}
            <p>Difficulty:<b>{trail.difficulty}</b> Length:<b>{trail.length}</b></p>
        </div>
    )
}

export default Card;
