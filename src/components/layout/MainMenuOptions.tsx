import React, { useState, Dispatch } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  makeStyles
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { isNil, upperFirst } from 'lodash';

import Icons from 'components/icons';
import { CreateListItemModel } from './Layout.type';

const useStyles = makeStyles(theme => {
  return {
    list: {
      overflow: 'hidden'
    },
    nested: {
      paddingLeft: theme.spacing(4)
    },
    menuItem: {
      '&:after': {
        content: '""',
        height: 3,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        transition: 'all cubic-bezier(0, 0, 0.2, 1) 1s',
        right: -200,
        opacity: 0
      },
      '&.Mui-selected': {
        '&:after': {
          background: `linear-gradient(to right, white 15px, ${theme.palette.primary.light} 50%, ${theme.palette.primary.main} 85%, ${theme.palette.primary.dark})`,
          right: 0,
          opacity: 1
        }
      }
    }
  };
});

const ExpandLess = Icons.ExpandLess;
const ExpandMore = Icons.ExpandMore;
let prevSelected;

function MenuOptions({
  menuItems
}: {
  menuItems: CreateListItemModel[];
}): JSX.Element {
  const classes = useStyles();
  const handleSelected = (setSelected: Dispatch<boolean>) => {
    setSelected(true);
    prevSelected = setSelected;
  };

  return (
    <List disablePadding className={classes.list}>
      {!isNil(menuItems) &&
        menuItems.map(menuItem => {
          const {
            label,
            icon,
            path,
            menuItems
          }: CreateListItemModel = menuItem;
          return (
            <CreateListItem
              key={label}
              label={label}
              icon={icon}
              path={path}
              menuItems={menuItems}
              handleSelected={handleSelected}
            />
          );
        })}
    </List>
  );
}

function CreateListItem({
  label,
  icon,
  path,
  menuItems,
  handleSelected
}: CreateListItemModel & {
  handleSelected: (callback: Dispatch<boolean>) => void;
}) {
  const classes = useStyles();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const hasMenuItems = !isNil(menuItems);
  const [selected, setSelected] = useState<boolean>(false);

  const handleMenuItemClick = (path: string) => {
    if (!hasMenuItems) {
      handleSelected(setSelected);
    }

    if (isNil(path)) {
      setIsOpen(!isOpen);
      return;
    }
    history.push(path);
  };
  const Icon = Icons[upperFirst(icon)];
  return (
    <>
      <ListItem
        selected={selected}
        button
        key={label}
        onClick={() => handleMenuItemClick(isNil(path) ? '' : path)}
        className={classes.menuItem}
      >
        <ListItemIcon>{Icon}</ListItemIcon>
        <ListItemText primary={label} />
        {hasMenuItems ? (isOpen ? ExpandLess : ExpandMore) : null}
      </ListItem>
      {hasMenuItems && (
        <Collapse in={isOpen} className={classes.nested}>
          <MenuOptions menuItems={!isNil(menuItems) ? menuItems : []} />
        </Collapse>
      )}
    </>
  );
}

export default MenuOptions;
