import React, { FC } from 'react';

import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Link from 'next/link';
import styled from 'styled-components';
// import Notification from '../../../../public/icons/notification.svg';

const UserMenuContainer = styled.a`
  max-width: 100;
  height: 48px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1rem;
  color: white;
  cursor: pointer;
  text-decoration: none;
`;

// const NotificationContainer = styled.div`
//   position: relative;
//   display: inline-block;
//   width: 30px;
//   height: 21px;
//   cursor: pointer;
// `;

// const NotificationAlert = styled(Typography)`
//   position: absolute;
//   width: 18px;
//   height: 18px;
//   top: calc(50% - 15px);
//   font-weight: bold;
//   line-height: 12px;
//   color: #fff;
//   border: 2px solid #ededed;
//   right: -5px;
//   background: red;
//   border-radius: 50%;
//   text-align: center;
// `;

interface navbarItem {
  href: string;
  label: string;
}
interface UserNavbarMenuProps {
  items: navbarItem[];
}

export const UserNavbarMenu: FC<UserNavbarMenuProps> = ({ items }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Notification Alert is hidden when there no Notification */}
      {/* <Grid item>

            <NotificationAlert variant="caption">{0}</NotificationAlert>
            <Notification style={{ width: '100%', height: '100%' }} />
          </NotificationContainer>
        </Grid> */}
      <Grid item>
        <UserMenuContainer>
          <AccountCircleRoundedIcon
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleClick}
            fontSize="large"
          />
          <Menu
            id="user-menu"
            elevation={0}
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            disableScrollLock={true}
            keepMounted
            autoFocus={false}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {items.map((item) => {
              return (
                <MenuItem onClick={handleClose} key={item.label}>
                  <Link href={item.href} passHref>
                    <span style={{ color: '#224F7B' }}>{item.label}</span>
                  </Link>
                </MenuItem>
              );
            })}
          </Menu>
        </UserMenuContainer>
      </Grid>
    </>
  );
};

export default UserNavbarMenu;
