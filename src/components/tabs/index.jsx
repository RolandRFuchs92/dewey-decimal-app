import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Tabs, Tab, Typography, Box, Fade } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

/**
 * 
 * @param {Json[]} tabs 
 */
export default function SimpleTabs({tabs}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            {tabs.map(({label}, index) => <Tab key={label + index} label={label} {...a11yProps(index)}></Tab>)}
        </Tabs>
      </AppBar>
        {tabs.map(({content, label}, index) => {
        return <RenderContent key={label + index} value={value} index={index}>{content}</RenderContent>
        })}
    </div>
  );
}

const RenderContent = ({children, value, index}) => {
    const [fade, setFade] = useState(false);
    useEffect(() =>{
        setFade(true);
    },[]);

    return <TabPanel value={value} index={index}>
        <Fade in={true} timeout={1000}>
            {children}
        </Fade>
 </TabPanel>
}