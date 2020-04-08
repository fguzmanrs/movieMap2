import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
// import tileData from './tileData';
import image1 from './images/RO.jpg';
import image2 from './images/FD.jpg';
import image4 from './images/SO84.jpg';
import image5 from './images/TDVC.jpg';
import image6 from './images/Spectre.jpg';
import image7 from './images/NTTD.jpg';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'none',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const tileData = [
  {
    img: image6,
    title: 'Spectre',
    author: 'random author',
  },
  {
    img: image1,
    title: 'Rogue One',
    author: 'random author',
  },
  {
    img: image5,
    title: 'The DaVinci Code',
    author: 'random author',
  },
  {
    img: image4,
    title: 'Summer Of 84',
    author: 'random author',
  },
  {
    img: image7,
    title: 'No Time To Die',
    author: 'random author',
  },
  {
    img: image2,
    title: 'Finding Dory',
    author: 'random author',
  },
  {
    img: image5,
    title: 'The DaVinci Code',
    author: 'random author',
  },
  {
    img: image4,
    title: 'Summer Of 84',
    author: 'random author',
  },
  {
    img: image6,
    title: 'Spectre',
    author: 'random author',
  }
];

export default function SingleLineGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={4.5}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`}>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}