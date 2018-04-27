const Header = require('../components/Header')
const Footer = require('../components/Footer')

const HelloWorld = () => // html
`
  ${Header()}
  <main>
    <h1>Hello</h1>
    <p>A hello world app</p>
  </main>
  ${Footer()}
`

module.exports = HelloWorld
