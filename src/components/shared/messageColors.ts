import { theme } from '$components/theme/muiTheme';

// TODO: Get all the colors from the theme
export const messageColors = {
  default: theme.palette?.primary?.main,
  error: theme.palette?.error?.main,
  info: '#5C8FDB',
  success: theme.palette?.primary?.main,
  warning: '#DBBF5C',
};
