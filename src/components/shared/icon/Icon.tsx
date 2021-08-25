import React, { FC } from 'react';

import styled from 'styled-components';

const regularNameToUnicodeMap = {
  Home: String.fromCharCode(0xf262),
  Plugin: String.fromCharCode(0xf261),
  Tree: String.fromCharCode(0xf25f),
  Schema: String.fromCharCode(0xf25e),
  Registered: String.fromCharCode(0xf25d),
  Copyright: String.fromCharCode(0xf25c),
  Users: String.fromCharCode(0xf25b),
};

const solidNameToUnicodeMap = {
  Search: String.fromCharCode(0xf002),
  Check: String.fromCharCode(0xf00c),
  Cancel: String.fromCharCode(0xf00d),
  Undo: String.fromCharCode(0xf01e),
  Refresh: String.fromCharCode(0xf021),
  Lock: String.fromCharCode(0xf023),
  Plus: String.fromCharCode(0xf067),
  Minus: String.fromCharCode(0xf068),
  Alert: String.fromCharCode(0xf071),
  Fix: String.fromCharCode(0xf0ad),
  Filter: String.fromCharCode(0xf0b0),
  Chain: String.fromCharCode(0xf0c1),
  Burger: String.fromCharCode(0xf0c9),
  BurgerBool: String.fromCharCode(0xf0ca),
  BurgerNum: String.fromCharCode(0xf0cb),
  Downside: String.fromCharCode(0xf0d7),
  Upside: String.fromCharCode(0xf0d8),
  ScrollLeft: String.fromCharCode(0xf0d9),
  ScrollRight: String.fromCharCode(0xf0da),
  Scroll: String.fromCharCode(0xf0dc),
  ScrollDown: String.fromCharCode(0xf0dd),
  ScrollUp: String.fromCharCode(0xf0de),
  Bell: String.fromCharCode(0xf0f3),
  Expand: String.fromCharCode(0xf0fe),
  Left: String.fromCharCode(0xf104),
  Right: String.fromCharCode(0xf105),
  Up: String.fromCharCode(0xf106),
  Down: String.fromCharCode(0xf107),
  Keyboard: String.fromCharCode(0xf11c),
  Question: String.fromCharCode(0xf128),
  Info: String.fromCharCode(0xf129),
  Notification: String.fromCharCode(0xf12a),
  Collapse: String.fromCharCode(0xf12b),
  Folder: String.fromCharCode(0xf12c),
  Item: String.fromCharCode(0xf12d),
  EmptyCheckBox: String.fromCharCode(0xf12e),
  Checkbox: String.fromCharCode(0xf12f),
};

type RegularIcon = keyof typeof regularNameToUnicodeMap;
type SolidIcon = keyof typeof solidNameToUnicodeMap;

type IconType = RegularIcon | SolidIcon;

const typeToIconsMap = {
  solid: solidNameToUnicodeMap,
  regular: regularNameToUnicodeMap,
};

interface IIconWrapper {
  type?: string;
}

interface IconProps {
  icon: IconType;
  color?: string;
  style?: React.CSSProperties;
  onClick?: any;
}

const IconWrapper = styled.div<IIconWrapper>`
  display: inline-block;
  font-size: ${({ style }) => (style?.fontSize ? style.fontSize : '1.6rem')};
  font-family: ${({ type }) => `avidfont-${type}`};
  color: ${({ theme, color }) => theme.palette[color ?? '']?.main ?? color ?? '#000'};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};
`;

export const Icon: FC<IconProps> = ({ icon, ...otherProps }) => {
  const type = Object.keys(regularNameToUnicodeMap).includes(icon) ? 'regular' : 'solid';
  return (
    <IconWrapper type={type} {...otherProps}>
      {typeToIconsMap[type][icon]}
    </IconWrapper>
  );
};
