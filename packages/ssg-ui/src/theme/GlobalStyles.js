import { createGlobalStyle } from 'styled-components'

import theme from './'

export default createGlobalStyle`
html, body {
  min-height: 100vh;
}
body {
  margin: 0;
  font-family: 'Roboto';
  font-size: ${theme.fontSize.default};
  color: ${theme.colors.text};
  background-color: ${theme.colors.greyLighter};
  line-height: 1.6;
  -webkit-overflow-scrolling: touch;
}
* {
  outline: none;
  box-sizing: border-box;
}
h1, h2, h3, h4, h5 {
  line-height: 1.35;
  font-weight: 800;
}
h1 {
  font-size: ${theme.fontSize.h1}
}
h2 {
  font-size: ${theme.fontSize.h2}
}
h3 {
  font-size: ${theme.fontSize.h3}
}
h4 {
  font-size: ${theme.fontSize.h4}
}
h5 {
  font-size: ${theme.fontSize.h5}
}
a {
  color: ${theme.colors.primary};
  text-decoration: none;
}
input, select, textarea, button {
  font-family: 'Roboto';
  font-size: ${theme.fontSize.default};
  min-height: ${theme.spacing(4)};
  ${theme.padding(0, 1)}
}
textarea {
  min-height: ${theme.spacing(10)};

}
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  height: ${theme.spacing(5)};
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
}
th {
  border-bottom: solid 1px ${theme.colors.grey};
}
tr:hover {
  background-color: ${theme.colors.greyLighter};
}
`
