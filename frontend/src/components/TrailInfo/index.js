import './TrailInfo.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setTrailCompletedList, setTrailProfile } from '../../store/trailInfo';
import { updateCompletedTrailList, updateSavedTrailList } from '../../store/session';

import { ReviewTrail } from './review';
import { ActivityTrail } from './activities';
import { CompletedTrail } from './completed';
import StaticMap from '../Maps';

const TrailInfo = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const trailInfo = useSelector((state) => state.trailInfo.trail);
    const trailId = location.state?.id;
    const [activeTab, setActiveTab] = useState(1);
    const savedTrails = useSelector((state) => state.session.savedTrails);
    const completedTrails = useSelector((state) => state.session.completedTrails);
    const averageReview = useSelector((state) => state.trailInfo.averageReview);
    const activeTabStyle = {
        'background-color': '#749c4d',
        'font-weight': 'bold'
    }

    const tabStyle = {
        'background-color': '#2c5601'
    }

    useEffect(() => {
        console.log('Inside useEffect', trailId);
        //to set trailInfo
        dispatch(setTrailProfile(trailId))
            .catch(async (res) => {
                console.log(res);
            });
    }, [dispatch, trailId]);

    const handleCompleteTrail = () => {
        dispatch(updateCompletedTrailList(trailInfo.id)) //updating the completed in the session store and database
            .then(() => {
                dispatch(setTrailCompletedList(trailInfo.id)) //refreshing the completed in the trailInfo
                    .catch(async (res) => {
                        console.log('ERROR');
                        console.log(res);
                    })
            })
            .catch(async (res) => {
                console.log('ERROR');
                console.log(res);
            })
    }

    const handleSavedTrail = () => {
        dispatch(updateSavedTrailList(trailInfo.id))
            .catch(async (res) => {
                console.log('ERROR');
                console.log(res);
            })
    }

    let content;
    switch (activeTab) {
        case 1:
            content = <><h3>Average:{averageReview?.average}</h3><ReviewTrail /></>;
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
            content = null;
    }
    if (trailInfo) {
        return (

            <div className="trail-info-card">
                <StaticMap latitude={trailInfo.latitude} longitude={trailInfo.longitude} />
                <div className="trail-info">
                    <h2>{trailInfo.name} &nbsp; &nbsp;<button onClick={handleSavedTrail}>{savedTrails && savedTrails.indexOf(trailInfo.id) === -1 ? <i className='fa-regular fa-bookmark'></i> : <i className='fa-solid fa-bookmark'></i>} </button></h2>
                    <button className="button-style" onClick={handleCompleteTrail}>{completedTrails?.indexOf(trailInfo.id) === -1 ? 'Add to Completed' : 'Remove from Completed'}</button>
                    <h3>{trailInfo.difficulty}</h3>
                    <p>Length:{trailInfo.length}  Elevation Gain:{trailInfo.elevationGain}</p>
                    <h4>Description</h4>
                    <p>{trailInfo.description}</p>
                    <div className="trail-tabs">
                        <div className="tabs"
                            style={activeTab === 1 ? activeTabStyle : tabStyle}
                            onClick={() => setActiveTab(1)}>Reviews</div>
                        <div className="tabs"
                            style={activeTab === 2 ? activeTabStyle : tabStyle}
                            onClick={() => setActiveTab(2)}>Photos</div>
                        <div className="tabs"
                            style={activeTab === 3 ? activeTabStyle : tabStyle}
                            onClick={() => setActiveTab(3)}>Activities</div>
                        <div className="tabs"
                            style={activeTab === 4 ? activeTabStyle : tabStyle}
                            onClick={() => setActiveTab(4)}>Completed</div>
                    </div>
                    {content}
                </div>
            </div >

        )
    }

}

export default TrailInfo;
