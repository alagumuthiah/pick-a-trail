import './Explore.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTrailList } from '../../store/trailList';

const Explore = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let trailListFormat;
    const trailList = useSelector((state) => state.trailList);
    useEffect(() => {
        dispatch(setTrailList())
            .catch(async (res) => {
                console.log('error');
                console.log(res);
                // const data = await res.json();
            })
    }, [dispatch]);

    const loadTrail = (trail) => {
        navigate("/trails/" + trail.name, { state: { id: trail.id } });
    }
    if (trailList) {
        trailListFormat = trailList.map((trail) => {
            return (
                <div className="explore-trails" onClick={() => loadTrail(trail)}>
                    <h3>{trail.name}</h3>
                    {trail.Park && <p>{trail.Park.name}</p>}
                    <p>Difficulty:<b>{trail.difficulty}</b> Length:<b>{trail.length}</b></p>
                </div>
            )
        });
    }


    return (
        <>
            <div>
                <h1>Explore</h1>
                <p>Trail List</p>
                <div className="trail-card-list">
                    {trailListFormat}
                </div>

            </div>
        </>
    )
}

export default Explore;
