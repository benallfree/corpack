# Corpack

**Cordova + Webpack + HMR = Love**

Corpack makes Cordova development dreamy with webpack presets for modern ES6 and Hot Module Replacement.

## Quickstart

```bash
npm install -g corpack
```

Create a new Cordova app:

```bash
cordova create hello com.example.hello HelloWorld
cordova platform add ios
```

Initialize it with Corpack:

```bash
corpack init
```

Start an HMR-ready dev server:

```bash
corpack serve
```

Now run your app. Saving source files will instantly refresh in the app:

```bash
cordova run ios
```

## Batteries Included

Corpack uses ES6 + proposals. Classes, decorators, arrow functions... you can use it all.

`corpack init` uses [React](https://github.com/facebook/react/) as the base web framework and comes preconfigured with it. If you use something different, it's easy enough to remove. Checkout [onsen](https://github.com/OnsenUI/OnsenUI) for a Mobile UI framework, and [react-konva](https://github.com/konvajs/react-konva) to create badass `<canvas>` apps.

React and Webpack work exceptionally well together. Most asset types can be embedded (SCSS, CSS, JS, GIF, PNG, JPG, MP3) and used in your applicaiton as follows:

```jsx
import myPng from './assets/logo.png

const Image = props=><Image src={myPng}/>
```

## Available Commands

`corepack <command>`:

Command | Discussion
--------|------------
init    | Initializes your Cordova app with a fresh project structure. **Caution: overwrites files; only use on new projects.**
serve | Start an HMR-ready dev server so you can make changes on the fly. You'll need to rebuild and re-run your app (`cordova run ios`) after starting your server.
watch | Just watch and rebuild sources (no dev server)

## Integrating into an exiting projects

Corpack turns `./www` into a build directory. Rearrange your source into the following folder structure:

```
./www
  (empty)
./src
  index.js   <-- This is the corpack entry point
  ...other source files (JS, CSS)...
```

## Thanks

Big ups to [webpack](https://github.com/webpack/webpack), [webpack-dev-server](https://github.com/webpack/webpack-dev-server), [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/), and [Laravel Mix](https://github.com/JeffreyWay/laravel-mix).
