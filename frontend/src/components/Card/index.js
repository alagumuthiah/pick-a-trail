import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateSavedTrailList } from '../../store/session';
import './Card.css';

const Card = (props) => {
    const trail = props.trail;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let savedList = useSelector((state) => state.session.savedTrails);
    let completedList = useSelector((state) => state.session.completedTrails);
    const loadTrail = (trail) => {
        navigate("/trails/" + trail.name, { state: { id: trail.id } });
    }
    let savedStyle = 'fa-regular fa-bookmark';
    let completed = false;
    const handleSave = (event) => {
        console.log('Save clicked', trail.id);
        event.stopPropagation();
        dispatch(updateSavedTrailList(trail.id))
            .catch(async (res) => {
                console.log(res);
            })
    }
    if (savedList) {
        savedStyle = savedList.indexOf(trail.id) !== -1 ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
    }
    if (completedList) {
        completed = completedList.indexOf(trail.id) !== -1 ? true : false;
    }

    return (

        <div className="explore-trails" onClick={() => loadTrail(trail)}>
            <h3>{trail.name} &nbsp; &nbsp; <i onClick={(event) => handleSave(event)} className={savedStyle}></i>&nbsp; &nbsp;{completed ? <i className="fa-solid fa-check"></i> : null}</h3>
            {trail.Park && <p>{trail.Park.name}</p>}
            <p>Difficulty:<b>{trail.difficulty}</b> Length:<b>{trail.length}</b></p>

        </div>
    )
}

export default Card;
