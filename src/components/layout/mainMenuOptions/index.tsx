import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  makeStyles
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { isNil, upperFirst } from 'lodash';

import Icons from 'components/icons';
import { CreateListItemModel } from '../Layout.type';
import { setPageTitle } from 'utils/redux/global.action';

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

export type CurrentSelectedIndex = {
  selectedOption: string;
  setSelectedOption: (index: string) => void;
  dataTestId?: string;
};

export type MenuItemProps = {
  menuItems: CreateListItemModel[];
  dataTestId?: string;
};

export default ({ menuItems, dataTestId }: MenuItemProps) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    dispatch(setPageTitle(menuItems[0].label));
  }, []);

  return (
    <MenuOptions
      dataTestId={dataTestId}
      menuItems={menuItems}
      option={{
        selectedOption,
        setSelectedOption: (option: string) => setSelectedOption(option)
      }}
    />
  );
};

export type MenuOptionsProps = {
  menuItems: CreateListItemModel[];
  option: CurrentSelectedIndex;
  dataTestId?: string;
};

const menuItemsClass = 'menuItemContainer';
function MenuOptions({
  menuItems,
  option,
  dataTestId
}: MenuOptionsProps): JSX.Element {
  const classes = useStyles();

  return (
    <List
      disablePadding
      className={`${classes.list} ${menuItemsClass}`}
      data-testid={dataTestId}
    >
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
              selectedOption={option.selectedOption}
              setSelectedOption={(selection: string) =>
                option.setSelectedOption(selection)
              }
              menuItems={menuItems}
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
  selectedOption,
  setSelectedOption
}: CreateListItemModel & CurrentSelectedIndex) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const hasMenuItems = !isNil(menuItems);
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    setSelected(selectedOption === path!);
  }, [selectedOption]);

  const handleMenuItemClick = (path: string) => {
    if (path.length) {
      setSelectedOption(path!);
      dispatch(setPageTitle(label));
    } else {
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
        className={`${classes.menuItem} menuItem`}
      >
        <ListItemIcon>{Icon}</ListItemIcon>
        <ListItemText primary={label} />
        {hasMenuItems ? (isOpen ? ExpandLess : ExpandMore) : null}
      </ListItem>
      {hasMenuItems && (
        <Collapse in={isOpen} className={classes.nested}>
          <MenuOptions
            menuItems={!isNil(menuItems) ? menuItems : []}
            option={{ selectedOption, setSelectedOption }}
          />
        </Collapse>
      )}
    </>
  );
}
