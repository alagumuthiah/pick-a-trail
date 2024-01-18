import GoogleMapReact from 'google-map-react';

const StaticMap = () => {
    //static coordinates is given, have to store it in the db and use the coordinates dynamically
    const defaultProps = {
        center: {
            lat: 47.608013,
            lng: -122.335167
        },
        zoom: 12
    };
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    return (
        // set the container height explicitly

        <div style={{ height: '60vh', width: '50%', margin: 20 }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
            </GoogleMapReact>
        </div>
    );
}

export default StaticMap;
