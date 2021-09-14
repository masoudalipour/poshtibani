import React, { FC } from 'react';

import { Typography } from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { itemIsActive } from '$utils';

export type INavbarItem = LabelItem | ComponentItem;
interface LabelItem {
  label: string;
  href: string;
  as: string;
  conditionallyOpenAccess?: boolean;
  adminItem?: boolean;
  onlyWhenLoggedIn?: boolean; // "true" means displayed when user logged in, "false" means displayed when user not logged in, and "undefined" means displayed in both situations
}

interface ComponentItem {
  key: string;
  conditionallyOpenAccess?: boolean;
  onlyWhenLoggedIn?: boolean; // "true" means displayed when user logged in, "false" means displayed when user not logged in, and "undefined" means displayed in both situations
  component: FC<any>;
  props?: any;
}

interface MenuItemContainerProps {
  position: 'right' | 'left';
}

const MenuItemContainer = styled.a<MenuItemContainerProps>`
  display: flex;
  position: relative;
  text-decoration: none;
  padding-left: ${({ position }) => (position === 'right' ? '2.1rem' : '')};
  padding-right: ${({ position }) => (position === 'right' ? '2.1rem' : '')};
  p {
    padding: ${({ position }) => (position === 'left' ? '' : '0')};
  }
`;

const Wrapper = styled.span`
  padding-right: 1.5rem;
  padding-left: 1.5rem;
`;

interface MenuProps {
  active: number;
  position: 'left' | 'right';
}

const MenuItemCustom = styled(Typography)<MenuProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  line-height: 20px;
  letter-spacing: 0.1px;
  cursor: pointer;
  height: 48px;
  width: max-content;
  ${({ position }) => `padding: ${position === 'left' ? '2rem' : '1rem'};`};
  ${({ active }) => `
    color: ${active ? '#5CDB95' : '#224F7B'};
  `};
`;

const ItemLabel = styled.label`
  cursor: pointer;
  padding-right: 6px;
`;

/**
 * Tells if the item is LabelItem or ComponentItem
 * @returns true if the item type is LabelItem
 */
const isLabelItem = (item: INavbarItem): item is LabelItem => {
  return (item as LabelItem).href != null;
};

interface Props {
  menuItems: INavbarItem[];
  position: 'left' | 'right';
  loggedIn: boolean;
}

export const NavbarList: FC<Props> = ({ menuItems, position, loggedIn }) => {
  const router = useRouter();
  const [, isOpenAccess] = [false, true];

  const existsSingleEnabledLanguage = true;

  return (
    <>
      {menuItems.map((item) => {
        const matchedFromLoggedInSide =
          item.onlyWhenLoggedIn == null || item.onlyWhenLoggedIn === loggedIn;

        if (item.conditionallyOpenAccess && !isOpenAccess) {
          return null;
        }
        if (
          existsSingleEnabledLanguage &&
          !isLabelItem(item) &&
          item.key === 'UserLanguage'
        ) {
          return null;
        }
        if (isLabelItem(item)) {
          return (
            matchedFromLoggedInSide && (
              <Link
                key={item.label}
                href={item.href === '/login' ? item.href : '#'}
                as={item.as}
                passHref
              >
                <MenuItemContainer
                  target={item.href === '/admin' ? '_blank' : undefined}
                  position={position}
                >
                  <MenuItemCustom
                    variant="body2"
                    active={itemIsActive(router.pathname, item.as || item.href) ? 1 : 0}
                    position={position}
                  >
                    <ItemLabel>{item.label}</ItemLabel>
                  </MenuItemCustom>
                </MenuItemContainer>
              </Link>
            )
          );
        } else if (matchedFromLoggedInSide) {
          const Component = item.component;

          return (
            <Wrapper key={item.key}>
              <Component {...item.props} key={item.key} />
            </Wrapper>
          );
        }
      })}
    </>
  );
};

export default NavbarList;
