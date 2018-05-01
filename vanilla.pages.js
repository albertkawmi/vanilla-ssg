module.exports = {
  common: {
    cssFiles: ['styles/reset.css'],
    scriptFiles: [{ path: 'scripts/main.js', inline: true }],
    title: 'A default title',
    head: // html
      `
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="Albert Kawmi" />
      `
  },

  'index.html': {
    title: 'Hello',
    cssFiles: ['styles/exclaim.css'],
    body: 'pages/index',
    head: // html
      `
      <meta name="description" content="The home page" />
      `
  },

  'about.html': {
    title: 'About',
    scriptFiles: [{ path: 'js/utils.js', inline: false }],
    body: 'pages/about',
    head: // html
      `
      <meta name="description" content="The about page" />
      `
  }
}