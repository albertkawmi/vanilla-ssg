module.exports = {
  common: {
    cssFiles: ['styles/reset.css'],
    scriptFiles: ['scripts/main.js'],
    title: 'A default title',
    head: // html
      `
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="Albert Kawmi" />
      `
  },

  '/': {
    title: 'Hello',
    cssFiles: ['styles/exclaim.css'],
    body: 'pages/index',
    head: // html
      `
      <meta name="description" content="The home page" />
      `
  },

  '/about': {
    title: 'About',
    body: 'pages/about',
    head: // html
      `
      <meta name="description" content="The about page" />
      `
  }
}
