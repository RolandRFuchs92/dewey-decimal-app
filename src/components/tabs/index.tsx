import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography } from '@material-ui/core';

export type TabPanelProps = {
  children: JSX.Element;
  value: number;
  index: number;
};

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && children}
    </Typography>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export type TabProps = {
  label: string;
  content: JSX.Element;
};

export type SimpleTabsProps = {
  tabs: TabProps[];
};

export default function SimpleTabs({ tabs }: SimpleTabsProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (_: unknown, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {tabs.map(({ label }: { label: string }, index: number) => (
            <Tab key={label + index} label={label} {...a11yProps(index)}></Tab>
          ))}
        </Tabs>
      </AppBar>
      {tabs.map(({ content, label }: TabProps, index: number) => {
        return (
          <RenderContent key={label + index} value={value} index={index}>
            {content}
          </RenderContent>
        );
      })}
    </div>
  );
}

export type RenderContentProps = {
  children: JSX.Element;
  value: number;
  index: number;
};

const RenderContent = ({ children, value, index }: RenderContentProps) => {
  return (
    <TabPanel value={value} index={index}>
      {children}
    </TabPanel>
  );
};
