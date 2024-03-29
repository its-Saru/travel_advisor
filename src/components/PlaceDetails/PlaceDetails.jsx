import React from 'react';
import {Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip} from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

const PlaceDetails = ({place, selected, refProp}) => {
    const classes = useStyles();

    if(selected) refProp?.current?.scrollIntoView({behavior: "smooth", block:"start"})

    return(
        <Card elevation={6}>
            <CardMedia
                style={{ height: 350 }}
                image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{place.name}</Typography>
                {/*prices*/}
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
                </Box>
                {/*rating*/}
                <Box display="flex" justifyContent="space-between">
                    <Rating value={Number(place.rating)} readOnly/>    
                    <Typography gutterBottom variant="subtitle1">out of {place.num_reviews}</Typography>
                </Box>
                {/*ranking */}
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
                </Box>
                {/*awards*/}
                {place?.awards?.map((award)=>(
                    <Box my={1} /*my = margin y axis */display="flex" justifyContent="space-between" alignItems="center">
                        <img src={award.images.small} alt={award.display_name}/>
                        <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                    </Box>
                ))};
                {/*cuisine types */}
                {place?.cuisine?.map(({name})=>(
                    <Chip key={name} size="small" label={name} className={classes.chip}/>
                ))};
                {/*restaurant address */}
                {place?.address &&(
                    <Typography gutterBottom variant='body2' color='textSecondary' className={classes.subtitle}>
                        <LocationOnIcon /*location icon*//> {place.address}
                    </Typography>
                )};
                {/*restuarant phone*/}
                {place?.phone &&(
                    <Typography gutterBottom variant='body2' color='textSecondary' className={classes.spacing}>
                        <PhoneIcon /*phone icon*//> {place.phone}
                    </Typography>
                )};
                <CardActions>
                    <Button size='small' color='primary' /*on click travel advisor */ onClick={()=>window.open(place.web_url, '_blank')}>
                        Trip Advisor
                    </Button>
                    <Button size='small' color='primary' /*on click restaurant website */ onClick={()=>window.open(place.website, '_blank')}>
                        Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default PlaceDetails;