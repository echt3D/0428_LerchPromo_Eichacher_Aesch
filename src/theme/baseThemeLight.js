import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import * as AppSetup from "../custom/appSetup.js";

let baseThemeLight = createTheme({
  palette: {
    customChipColors: {
      g: AppSetup.greenChipColor,
      y: AppSetup.yellowChipColor,
      r: AppSetup.redChipColor,
      gr: AppSetup.grayChipColor,
    },
    customChipTextColor: {
      g: AppSetup.greenChipTextColor,
      y: AppSetup.yellowChipTextColor,
      r: AppSetup.redChipTextColor,
      gr: AppSetup.grayChipTextColor,
    },
    background: {
      default: AppSetup.globalBackgroundColor,
    },
    text: {
      primary: AppSetup.globalTextColor,
      secondary: AppSetup.globalTextSecondaryColor,
    },
    button: {
      main: AppSetup.globalButtonBackgroundColor,
      text: AppSetup.globalButtonTextColor,
      mainHover: AppSetup.globalButtonBackgroundHoverColor,
      textHover: AppSetup.globalButtonTextHoverColor,
    },
    secondary: { main: "#666" },
  },
  typography: {
    fontFamily: AppSetup.globalTextFontFamily,
    h1: {
      fontFamily: AppSetup.globalTitleFontFamily,
      fontWeight: "bold",
    },
    h2: {
      fontFamily: AppSetup.globalTitleFontFamily,
      fontWeight: "bold",
    },
    h3: {
      fontFamily: AppSetup.globalTitleFontFamily,
      fontWeight: "bold",
    },
    h4: {
      fontFamily: AppSetup.globalTitleFontFamily,
      fontWeight: "bold",
    },
    h5: {
      fontFamily: AppSetup.globalTitleFontFamily,
      fontWeight: "bold",
    },
    h6: {
      fontFamily: AppSetup.globalTitleFontFamily,
      fontWeight: "bold",
    },
  },

  shape: {
    borderRadius: 6,
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          width: 54,
          height: 54,
          "@media (max-width: 640px)": {
            width: 46,
            height: 46,
          },
          backgroundColor: AppSetup.globalCardBackgroundColor,
          color: AppSetup.globalTextSecondaryColor,
          "&:hover": {
            backgroundColor: AppSetup.globalButtonBackgroundHoverColor,
            color: AppSetup.globalButtonTextHoverColor,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          "& .MuiSvgIcon-root": {
            fill: AppSetup.globalTextColor, // Set the desired color for the SVG icon
          },
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          backgroundColor: AppSetup.globalCardBackgroundColor,
          color: AppSetup.globalTextSecondaryColor,
          "&:hover": {
            backgroundColor: AppSetup.globalButtonBackgroundHoverColor,
            color: AppSetup.globalButtonTextHoverColor,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h5: {
          color: AppSetup.globalTextColor,
        },
        h6: {
          color: AppSetup.globalTextSecondaryColor,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: AppSetup.globalAccentColor,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: AppSetup.globalAccentColor2,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fill: AppSetup.globalAccentColor2,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: AppSetup.globalCardBackgroundColor,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: AppSetup.globalAccentColor,
          textDecorationColor: AppSetup.globalAccentColor,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: AppSetup.globalCardBackgroundColor,
          color: AppSetup.globalTextSecondaryColor,
        },
      },
    },
  },
});

baseThemeLight = responsiveFontSizes(baseThemeLight);

export default baseThemeLight;
