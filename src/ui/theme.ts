/**
 * ThemePaletteKey
 *
 * Represents all valid color keys derived from CSS variables.
 * Ensures type safety when using theme colors in components.
 */
export type ThemePaletteKey =
  /* Global Palette */
  | 'white'
  | 'black'
  | 'gray-50'
  | 'gray-100'
  | 'gray-200'
  | 'gray-300'
  | 'gray-400'
  | 'gray-500'
  | 'gray-600'
  | 'gray-700'
  | 'gray-750'
  | 'gray-800'
  | 'gray-900'
  | 'gray-950'
  | 'red-500'
  | 'red-700'
  | 'brand-purple'
  | 'tag-blue'
  | 'tag-blue-light'
  | 'hint-text'
  | 'hint-bg'
  | 'icon-secondary'
  | 'selection'
  | 'surface-error'
  | 'text-error'

  /* Service Palette */
  | 'current-color'
  | 'inherit'
  | 'initial'
  | 'unset'
  | 'none'
  | 'transparent'

  /* Theme-based Palette */
  | 'text-primary'
  | 'text-secondary'
  | 'text-tertiary'
  | 'text-quaternary'
  | 'text-placeholder'
  | 'border-x-light'
  | 'border-light'
  | 'border-medium'
  | 'border-heavy'
  | 'border-x-heavy'
  | 'border-sharp'
  | 'main-surface-background'
  | 'composer-surface'
  | 'dot-color'
  | 'main-surface-primary'
  | 'main-surface-secondary'
  | 'main-surface-tertiary'
  | 'sidebar-surface-primary'
  | 'sidebar-surface-secondary'
  | 'sidebar-surface-tertiary'
  | 'link'
  | 'link-hover';

/**
 * TypographyWeight
 *
 * Represents the different font-weight options.
 */
export type TypographyWeight = 'regular' | 'bold';

/**
 * TypographyFamily
 *
 * Represents the different font-family options.
 */
export type TypographyFamily = 'title' | 'subtitle' | 'text';

/**
 * TypographyVariant
 *
 * Represents the different typography variants used in the application.
 */
export type TypographyVariant =
  | 'title'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline';
