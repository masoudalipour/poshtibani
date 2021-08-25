import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

const fontSizes = {
  overline: {
    fontSize: '1.2rem',
  },
  body1: {
    fontSize: '1.4rem',
  },
  body2: {
    fontSize: '1.6rem',
  },
  subtitle1: {
    fontSize: '1.6rem',
  },
  subtitle2: {
    fontSize: '1.4rem',
  },
  h1: {
    fontSize: '9.6rem',
  },
  h2: {
    fontSize: '6.0rem',
  },
  h3: {
    fontSize: '4.8rem',
  },
  h4: {
    fontSize: '3.4rem',
  },
  h5: {
    fontSize: '2.4rem',
  },
  h6: {
    fontSize: '2.0rem',
  },
  button: {
    fontSize: '1.4rem',
  },
  caption: {
    fontSize: '1.3rem',
  },
};

const commonTheme = {
  spacing: 4,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1024,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#5CDB95',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#2c2c2c',
    },
    error: {
      main: '#DB5C5C',
      contrastText: '#ffffff',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          fontSize: '56.25%', // 1rem = 9px 9/16
          '@media (min-width:1920px)': {
            fontSize: '62.5%', // 1rem = 10px , 10/16
          },
          '@media (max-width:1280px)': {
            fontSize: '50%', // 1 rem = 8px, 8/16
          },
          '@media (max-width:1024px)': {
            fontSize: '43.75%', // 1 rem = 7px, 7/16
          },
          '@media (max-width:600px)': {
            fontSize: '37.5%', // 1 rem = 6px, 6/16
          },
        },
      },
    },
    MuiChip: {
      root: {
        fontSize: '1.3rem',
      },
    },
    MuiSvgIcon: {
      root: {
        fontSize: '2.4rem',
      },
      fontSizeLarge: {
        fontSize: '3rem',
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '1rem',
      },
    },
    MuiButton: {
      root: {
        fontSize: '1.4rem',
      },
    },
    MuiButtonBase: {
      root: {
        fontSize: '1.4rem',
        lineHeight: '1',
      },
    },
    MuiTypography: {
      ...fontSizes,
    },
    MuiPopover: {
      paper: {
        borderRadius: '10px',
      },
    },
    MuiTableRow: {
      root: {
        '&$selected': {
          backgroundColor: '#cff1ff',
          '&:hover': {
            backgroundColor: '#cff1ff',
          },
        },
        '&$hover': {
          '&:hover': {
            backgroundColor: '#e3faff',
          },
        },
      },
    },
  },
};

let regularTheme = createTheme({
  typography: {
    fontFamily: 'Lato',
    ...fontSizes,
  },
  ...commonTheme,
});

regularTheme = responsiveFontSizes(regularTheme);

export const theme = regularTheme;
export const arabicTheme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: 'Shabnam',
      ...fontSizes,
    },
    ...commonTheme,
  }),
);

// export default theme;
