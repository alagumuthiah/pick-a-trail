import GoogleMapReact from 'google-map-react';

const StaticMap = (props) => {
    //static coordinates is given, have to store it in the db and use the coordinates dynamically
    const defaultProps = {
        center: {
            lat: parseFloat(props.latitude),
            lng: parseFloat(props.longitude)
        },
        zoom: 14
    };
    console.log(defaultProps);
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
