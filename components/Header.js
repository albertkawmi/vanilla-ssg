const Exclaim = require('./Exclaim')

const Header = () =>  // html
`
  <header>
    HEADER${Exclaim('red')}<br /><a href="index.html">Home</a> | <a href="about.html">About</a>
  </header>
`

module.exports = Header
