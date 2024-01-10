import './TrailInfo.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setTrailInfo, setTrailReviews, setTrailCompletedList, setActivitiesList } from '../../store/trailInfo';
import { ReviewTrail } from './review';
import { ActivityTrail } from './activities';
import { CompletedTrail } from './completed';

const TrailInfo = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const trailInfo = useSelector((state) => state.trailInfo.trail);
    const trailId = location.state?.id;
    const [activeTab, setActiveTab] = useState(1);
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

        // to set the list of users who have completed the selected trail
        dispatch(setTrailCompletedList(trailId))
            .catch(async (res) => {
                console.log('ERROR');
                console.log(res);
            });

        //to set the activities done for the selected trail
        dispatch(setActivitiesList(trailId))
            .catch(async (res) => {
                console.log('ERROR');
                console.log(res);
            });


    }, [dispatch]);
    let content;
    switch (activeTab) {
        case 1:
            content = <ReviewTrail />;
            break;
        case 2:
            content = <p>Photos</p>;
            break;
        case 3:
            content = <ActivityTrail />;
            break;
        case 4:
            content = <CompletedTrail />;
            break;
        default:
            content = <div>Unknown option</div>;
    }
    if (trailInfo) {
        return (
            <div className="trail-info-card">
                <h2>{trailInfo.name}</h2>
                <h3>{trailInfo.difficulty}</h3>
                <p>Length:{trailInfo.length}  Elevation Gain:{trailInfo.elevationGain}</p>
                <h4>Description</h4>
                <p>{trailInfo.description}</p>
                <div className="trail-tabs">
                    <button onClick={() => setActiveTab(1)}>Reviews</button>
                    <button onClick={() => setActiveTab(2)}>Photos</button>
                    <button onClick={() => setActiveTab(3)}>Activities</button>
                    <button onClick={() => setActiveTab(4)}>Completed</button>
                </div>
                {content}


            </div>

        )
    }

}

export default TrailInfo;
