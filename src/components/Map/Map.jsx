import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, unstable_createMuiStrictModeTheme, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';
import mapStyles from './mapStyles';

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData}) => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)');

    
    
    // const coordinates = { lat: 21.4885, lng: 39.1873}; /* latitude and longitude */

    return(
        <div className={classes.mapContainer}>
            <GoogleMapReact 
                bootstrapURLKeys={{key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={12}
                margin={[50,50,50,50]}
                options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });           //latitude and longtitude
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });     //north east bounds, and south east bounds.
                  }}
                onChildClick={(child)=> setChildClicked(child)}
            >
                {places?.map((place,i)=>(
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        { /*for desktop */
                            !isMobile ? (
                                <LocationOnOutlinedIcon color="primary" fontSize='large'/>
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img 
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                        alt={place.name}
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly/>
                                </Paper>
                            )
                        }
                    </div>
                ))}
                {weatherData?.list?.map((data, i)=>(
                    <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <img height={100} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt={'weather'}/>
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
}

export default Map;


