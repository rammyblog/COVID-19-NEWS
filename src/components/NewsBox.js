import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginBottom: 12
  },
  media: {
    height: 140,
  },
  typography:{
    fontFamily : 'Sen, sans-serif !important;'
  }

});


export default function NewsBox(props) {
  const {title, image, summary, link} = props.article
  const classes = useStyles();

  return (
      <>


    <Card className={classes.root}>
       <a href={link} target='_blank' className='card-link' rel="noopener noreferrer">

      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
          link={link}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" style={{fontFamily: "'Sen', sans-serif !important"}} component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {summary}
          </Typography>
        </CardContent>
      </CardActionArea>
        </a>

      <CardActions>
        <Button size="small" color="primary">
          <a href={link} target='_blank' rel="noopener noreferrer">Read More</a>
        </Button>

      </CardActions>
    </Card>

        </>
  );
}
