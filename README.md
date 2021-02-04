![](https://cdn-images-1.medium.com/max/2400/1*jIRj4wdytLof28mxFkIuQQ.png)
## Holyheld — Beautiful Website.

Holyheld makes the internet economy easy and available to everyone. The app abstracts blockchain complexity so that you can finally get great financial service with all DeFi benefits. You can earn highest and safest yield on your digital assets with our automatic portfolio management system. You can also send, receive and swap 3000+ digital assets on Ethereum.  

## Dependencies

Requires [Node.js](https://nodejs.org/en/) to work. The project is built using [Webpack](https://webpack.js.org/).

## Stack

- JavaScript (ES6 +)
- [Pug](https://pugjs.org/api/getting-started.html)
- [Sass](https://sass-lang.com/)

## Commands

- `npm install` - install dependencies
- `npm start` - initiate development mode with booting up the server
- `npm run build` - build in production mode

## Structure

- `public` - the contents of the folder are copied to the dist without changes
- `src` - source files
  - `components` - components
  - `data` - data for filling pages
  - `fonts` - fonts
  - `icons` - icons to be collected into a sprite
  - `images` - pictures
  - `pages` - pages
  - `scripts` - general scripts and script import of all components
  - `styles` - general styles and import of styles of all components
  - `templates` - pug templates
- `dist` - compiled project
- `webpack.common.js` - general Webpack config used in all modes
- `webpack.dev.js` - Webpack config for development mode
- `webpack.prod.js` - Webpack config for production mode
