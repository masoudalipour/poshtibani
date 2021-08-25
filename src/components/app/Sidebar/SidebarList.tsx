import React, { FC, useState, ReactElement } from 'react';

import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import MuiListItemIcon, { ListItemIconProps } from '@material-ui/core/ListItemIcon';
import MuiListItemText, { ListItemTextProps } from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Link from 'next/link';
import styled from 'styled-components';

import { useAccessIndicator } from '$components/app/Sidebar/useAccessIndicator';

import { itemIsActive } from '$utils';

export interface ISidebarList {
  label: string;
  href: string;
  icon?: ReactElement;
  child?: ISidebarList[];
  bold?: boolean;
  depthLevel?: number;
  orgAdminItem?: boolean; // true if only the administrator of the organization should has access
}

const useSubStyles = makeStyles(() =>
  createStyles({
    subListIcon: {
      minWidth: '2rem',
      direction: 'rtl',
    },
    rootListIcon: {
      minWidth: '0',
      width: '3.4rem',
      height: '3.4rem',
    },
    listItem: {
      '&:hover': {
        backgroundColor: 'rgba(92, 219, 149, 26%)',
      },
    },
  }),
);

interface ItemIconProp extends ListItemIconProps {
  active: number;
}

const ItemIcon = styled<FC<ItemIconProp>>(({ active, ...props }) => (
  <MuiListItemIcon {...props} />
))`
  & > svg > path {
    ${({ active, theme }) => `
    fill:${active && theme.palette.primary.main}
    `}
  }
  div[type='regular'] {
    ${({ active, theme }) => `
    color:${active && `${theme.palette.primary.main}!important`}
    `}
  }
`;

interface ItemTextProp extends ListItemTextProps {
  bold?: number;
  active: number;
  childrenLevel: number;
}
const ListItemText = styled<FC<ItemTextProp>>(
  ({ bold, active, childrenLevel, ...props }) => <MuiListItemText {...props} />,
)`
  font-family: 'Montserrat';
  margin-right: 1rem;
  & > .MuiListItemText-primary {
    text-align: right;
    color: rgb(189, 189, 189);
    ${({ bold, childrenLevel, active, theme }) => `
      color: ${childrenLevel === 1 && active ? theme.palette.primary.main : ''};
      font-weight:${bold ? '900' : '400'};
    `};
  }
`;

interface StyledListItemProps {
  childrenLevel: number;
  isActive: boolean;
  child: boolean;
}

const StyledListItem = styled(({ childrenLevel, isActive, child, refs, ...props }) => (
  <ListItem {...props} />
))`
  padding-right: ${({ childrenLevel }: StyledListItemProps) =>
    `${childrenLevel * 3.6}rem`};
  ${({ isActive, child }: StyledListItemProps) => `
    background-color: ${
      isActive && child
        ? 'rgba(92, 219, 149, 0.26)'
        : child
        ? 'rgba(133, 133, 133, 0.26)'
        : ''
    };

  `};
`;
interface StyledMainLinkProps {
  isOpen?: boolean;
}
const StyledMainLink = styled.div<StyledMainLinkProps>`
  ${({ isOpen }) => `
    background-color: ${isOpen ? 'rgba(133, 133, 133, 0.26)' : ''}
  `}
`;

const Expandable: FC<any> = ({ isExpanded }) => {
  return isExpanded ? (
    <ExpandLess style={{ fill: '#fff' }} />
  ) : (
    <ExpandMore style={{ fill: '#fff' }} />
  );
};

const MainLink: FC<any> = ({ field, children, isOpen }) => {
  if (field?.child) {
    return <StyledMainLink isOpen={isOpen}>{children}</StyledMainLink>;
  }

  return <Link href={field.href}>{children}</Link>;
};

interface MainListProps {
  list: ISidebarList[];
  child?: boolean;
  pathname: string;
  depthLevel?: number;
}
export const SidebarList: FC<MainListProps> = ({ list, child, pathname, depthLevel }) => {
  const classes = useSubStyles();
  const filteredList = useAccessIndicator(list);
  const theme = useTheme();

  const [subMenuOpen, setSubMenuOpen] = useState<Record<string, boolean>>(() => {
    const openMenus = {};
    const openMenusLabels = filteredList
      .filter((field) => itemIsActive(pathname, field.href, `/admin/${field.label}`))
      .map((field) => field.label);

    openMenusLabels.forEach((label) => (openMenus[label] = true));
    return openMenus;
  });

  const handleClick = (field) => {
    setSubMenuOpen((prevState) => ({
      [field]: !prevState?.[field],
    }));
  };

  const childrenLevel = (depthLevel ?? 0) + 1;

  return (
    <>
      {filteredList.map((field) => (
        <div key={field.href}>
          <MainLink field={field} pathname={pathname} isOpen={subMenuOpen?.[field.label]}>
            <StyledListItem
              classes={{ root: classes.listItem }}
              button
              key={field.label}
              onClick={() => handleClick(field.label)}
              childrenLevel={childrenLevel}
              isActive={itemIsActive(pathname, field.href, '/admin')}
              child={!!child}
            >
              {field.icon && (
                <ItemIcon
                  active={itemIsActive(pathname, field.href, '/admin') ? 1 : 0}
                  classes={{
                    root: child ? classes.subListIcon : classes.rootListIcon,
                  }}
                  color={theme.palette.primary.main}
                >
                  {field.icon}
                </ItemIcon>
              )}
              <ListItemText
                bold={field.bold ? 1 : 0}
                primary={field.label}
                childrenLevel={childrenLevel}
                color={theme.palette.primary.main}
                active={itemIsActive(pathname, field.href, '/admin') ? 1 : 0}
              />
              {field?.child && <Expandable isExpanded={subMenuOpen?.[field.label]} />}
            </StyledListItem>
          </MainLink>

          {field?.child && (
            <Collapse
              in={subMenuOpen?.[field.label] ?? false}
              timeout="auto"
              unmountOnExit
            >
              <div>
                <SidebarList
                  list={field.child}
                  child
                  pathname={pathname}
                  depthLevel={childrenLevel}
                />
              </div>
            </Collapse>
          )}
        </div>
      ))}
    </>
  );
};

export default SidebarList;
