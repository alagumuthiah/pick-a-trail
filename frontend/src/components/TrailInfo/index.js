import './TrailInfo.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setTrailInfo, setTrailReviews } from '../../store/trailInfo';

const TrailInfo = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const trailInfo = useSelector((state) => state.trailInfo.trail);
    const trailId = location.state?.id;
    useEffect(() => {
        //to set trailInfo
        dispatch(setTrailInfo(trailId))
            .catch(async (res) => {
                console.log(res);
            });

        //to set the reviews given for the selected trail
        dispatch(setTrailReviews(trailId))
            .catch(async (res) => {
                console.log('ERROR');
                console.log(res);
            });

        //to set the reviews given by the selected user in the store
        // dispatch(setTrailCompletedList(trailId))
        //     .catch(async (res) => {
        //         console.log('ERROR');
        //         console.log(res);
        //     });

        // //to set the activities by the selected user in the store
        // dispatch(setActivitiesList(userId))
        //     .catch(async (res) => {
        //         console.log('ERROR');
        //         console.log(res);
        //     });


    }, [dispatch]);
    console.log('INFO');
    console.log(trailInfo);
    if (trailInfo) {
        return (
            <div className="trail-info-card">
                <h2>{trailInfo.name}</h2>
                <h3>{trailInfo.difficulty}</h3>
                <p>Length:{trailInfo.length}  Elevation Gain:{trailInfo.elevationGain}</p>
                <p>{trailInfo.description}</p>
            </div>
        )
    }

}

export default TrailInfo;
