const common = {
  palette: {
    white: '#fff',
    black: '#000',
    gray50: '#f9f9f9',
    gray100: '#ececec',
    gray200: '#e3e3e3',
    gray300: '#cdcdcd',
    gray400: '#b4b4b4',
    gray500: '#9b9b9b',
    gray600: '#676767',
    gray700: '#424242',
    gray750: '#2f2f2f',
    gray800: '#212121',
    gray900: '#171717',
    gray950: '#0d0d0d',
    red500: '#ef4444',
    red700: '#b91c1c',
    brandPurple: '#ab68ff',
    tagBlue: '#08f',
    tagBlueLight: '#0af',
    hintText: '#08f',
    hintBg: '#b3dbff',
    iconSecondary: '#676767',
    selection: '#007aff',
    surfaceError: 'rgb(249, 58, 55)',
    textError: '#f93a37',

    // service colors
    currentColor: 'currentColor',
    inherit: 'inherit',
    initial: 'initial',
    unset: 'unset',
    none: 'none',
    transparent: 'transparent',
  },
  typography: {
    fontWeight: {
      thin: 100,
      extraLight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
    },
  },
  sizes: {
    maxWidth: 1440,
    minWidth: 320,
    headerHeight: 50,
    footerMinHeight: 50,
  },
  paddings: {
    layout: 15,
  },
  zIndexes: {
    header: 10,
  },
  breakpoints: {
    mobile: 480,
    tablet: 768,
    laptop: 1024,
    desktop: 1280,
    largeScreen: 1920,
  },
};

const theme = {
  dark: {
    ...common,
    palette: {
      ...common.palette,
      textPrimary: common.palette.gray100,
      textSecondary: common.palette.gray400,
      textTertiary: common.palette.gray500,
      textQuaternary: common.palette.gray600,
      textPlaceholder: 'hsla(0, 0%, 100%, 0.8)',
      borderXLight: 'hsla(0, 0%, 100%, 0.05)',
      borderLight: 'hsla(0, 0%, 100%, 0.1)',
      borderMedium: 'hsla(0, 0%, 100%, 0.15)',
      borderHeavy: 'hsla(0, 0%, 100%, 0.2)',
      borderXHeavy: 'hsla(0, 0%, 100%, 0.25)',
      borderSharp: 'hsla(0, 0%, 100%, 0.05)',
      mainSurfaceBackground: 'rgba(33, 33, 33, 0.9)',
      composerSurface: 'rgba(50, 50, 50, 0.8)',
      dotColor: common.palette.white,
      mainSurfacePrimary: common.palette.gray800,
      mainSurfaceSecondary: common.palette.gray750,
      mainSurfaceTertiary: common.palette.gray700,
      sidebarSurfacePrimary: common.palette.gray900,
      sidebarSurfaceSecondary: common.palette.gray800,
      sidebarSurfaceTertiary: common.palette.gray750,
      link: '#7ab7ff',
      linkHover: '#5e83b3',
    },
  },
  light: {
    ...common,
    palette: {
      ...common.palette,
      textPrimary: common.palette.gray950,
      textSecondary: '#7d7d7d',
      textTertiary: common.palette.gray400,
      textQuaternary: common.palette.gray300,
      textPlaceholder: 'rgba(0, 0, 0, 0.7)',
      borderXLight: 'rgba(0, 0, 0, 0.05)',
      borderLight: 'rgba(0, 0, 0, 0.1)',
      borderMedium: 'rgba(0, 0, 0, 0.15)',
      borderHeavy: 'rgba(0, 0, 0, 0.2)',
      borderXHeavy: 'rgba(0, 0, 0, 0.25)',
      borderSharp: 'rgba(0, 0, 0, 0.05)',
      mainSurfaceBackground: 'hsla(0, 0%, 100%, 0.95)',
      composerSurface: 'hsla(0, 0%, 94%, 0.9)',
      dotColor: common.palette.black,
      mainSurfacePrimary: common.palette.white,
      mainSurfaceSecondary: common.palette.gray50,
      mainSurfaceTertiary: common.palette.gray100,
      sidebarSurfacePrimary: common.palette.gray50,
      sidebarSurfaceSecondary: common.palette.gray100,
      sidebarSurfaceTertiary: common.palette.gray200,
      link: '#2964aa',
      linkHover: '#749ac8',
    },
  },
};

// mobile-first
export const MediaQueries = {
  tablet: `(min-width: ${common.breakpoints.tablet}px)`,
  laptop: `(min-width: ${common.breakpoints.laptop}px)`,
  desktop: `(min-width: ${common.breakpoints.desktop}px)`,
  largeScreen: `(min-width: ${common.breakpoints.largeScreen}px)`,
};

export type Theme = typeof theme.light;
export type ThemePaletteKey = keyof typeof theme.light.palette;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}

export default theme;
