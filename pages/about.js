const Header = require('../components/Header')
const Footer = require('../components/Footer')

const About = () => // html
`
  ${Header()}
  <main>
    <h1>About</h1>
    <p>Blah blah blah...</p>
    <p><a href="index.html">Go Back</a></p>
  </main>
  ${Footer()}
`

module.exports = About
