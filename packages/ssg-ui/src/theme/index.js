import colors from './colors'

const defaultSpacing = 8

export default {
  colors,
  fontSize: {
    default: '16px',
    small: '14px',
    large: '18px',
    h1: '34px',
    h2: '26px',
    h3: '20px',
    h4: '16px',
    h5: '14px',
  },
  text: {
    small: () => 'font-size: 12px;',
    large: () => 'font-size: 16px;',
    bold: () => 'font-weight: 600;',
    muted: () => 'opacity: 0.7;',
    subtitle1: () => 'font-size: 18px; font-weight: 600;',
  },
  spacing: (f) => `${defaultSpacing * f}px`,
  elevate: (f) =>
    `box-shadow: 0 0 ${f * 3 + 3}px rgba(0,0,0,${f * 0.05 + 0.02});`,

  padding: (h, v) =>
    typeof v === 'number'
      ? `padding: ${defaultSpacing * h}px ${defaultSpacing * v}px;`
      : `padding: ${defaultSpacing * h}px;`,

  margin: (h, v) =>
    typeof v === 'number'
      ? `margin: ${defaultSpacing * h}px ${defaultSpacing * v}px;`
      : `margin: ${defaultSpacing * h}px;`,
}
