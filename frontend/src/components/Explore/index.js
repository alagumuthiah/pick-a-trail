import './Explore.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setTrailList } from '../../store/trailList';
import Card from '../Card';

const Explore = () => {
    const dispatch = useDispatch();
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


    if (trailList) {
        trailListFormat = trailList.map((trail) => {
            return (
                <Card key={trail.id} trail={trail} />
            )
        });
    }

    return (
        <div>
            <h1>Explore</h1>
            <p>Trail List</p>
            <div className="trail-card-list">
                {trailListFormat}
            </div>

        </div>
    )
}

export default Explore;
