import Proact, { UnsafeHtml } from '@proact/core'

const theme = {
  fontFamily: 'sans-serif',
  fontSize: {
    normal: '16px',
    large: '18px',
    small: '14px',
  },
  colors: {
    text: '#333333',
    background: '',
    primary: '#002244',
    primaryContrast: '#ffffff',
    secondary: '#0099CC',
    secondaryContrast: '#ffffff',
    greyLight: '#f0f0f0',
    greyLightContrast: '#222222',
    grey: '#dddddd',
    greyContrast: '#222222',
    greyDark: '#777777',
    greyDarkContrast: '#ffffff',
  },
  themeSpacing: 8,
  spacing: (s) => {
    return `${s * theme.themeSpacing}px`
  },
}

const globalStyles = `
  body {
    font-family: sans-serif;
    font-size: ${theme.fontSize.normal};
    color: ${theme.colors.text};
    padding: 0;
    margin: 0;
  }
  header {
    padding: ${theme.spacing(1)} 0;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.primaryContrast};
  }
  header .container {
    display: flex;
    align-items: center;
  }
  header a, footer a {
    color: ${theme.colors.primaryContrast};
    text-decoration: none;
  }
  header .logo {
    margin-right: ${theme.spacing(4)};
  }
  header nav a {
    padding: ${theme.spacing(2)};
  }
  footer {
    padding: ${theme.spacing(2)} 0;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.primaryContrast};
    font-size: ${theme.fontSize.small};
  }
  .text-muted {
    opacity: 0.6;
  }
  section {
    padding: ${theme.spacing(4)} 0;
  }
  .container {
    box-sizing: border-box;
    width: 100%;
    max-width: 986px;
    margin: 0 auto;
    padding: 0 ${theme.spacing(3)};
  }
  .hero {
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.secondaryContrast};
    text-align: center;
  }
  .hero h1 {
    font-size: 50px;
    font-weight: 100;
  }
  .hero p {
    font-size: 28px;
    font-weight: 100;
  }
  div.latest-posts {
    display: flex;
    margin: 0 -${theme.spacing(1)} ;
  }
  div.latest-posts > article {
    box-sizing: border-box;
    padding: ${theme.spacing(2)};
    margin: 0 ${theme.spacing(1)};
    border: solid 1px ${theme.colors.grey};
    flex: 1;
  }
  section.latest-posts {
    background-color: ${theme.colors.greyLight};
    color: ${theme.colors.greyLightContrast};
  }
  pre {
    background-color: ${theme.colors.greyLight};
    color: ${theme.colors.greyLightContrast};
    padding: ${theme.spacing(2)};
  }
  figure {
    margin: ${theme.spacing(4)} 0;
  }
  figcaption {
    padding: ${theme.spacing(1)} 0;
    color: ${theme.colors.greyDark};
    font-size: ${theme.fontSize.small};
    font-style: italic;
    text-align: center;
  }
  figure img {
    box-shadow: 0 0 8px rgba(0,0,0,0,2);
    width: 100%;
    max-width: 100%;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  td, th {
    padding: ${theme.spacing(2)} ${theme.spacing(1)};
    text-align: left;
  }
  th {
    border-bottom: solid 1px ${theme.colors.grey};
  }
`

export default function () {
  return (
    <style>
      <UnsafeHtml html={globalStyles} />
    </style>
  )
}
