# Flutter Element Embedding with React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Steps to replicate

Shoutouts to revosw for creating this small guide, without that I would have never figured this out https://github.com/flutter/flutter/issues/123940.
Created this demo app, to have one example available so others can see it implemented. Also, because even with the explanation it was a bit confusing for me.

Steps load your Flutter app into any React app:

1. Run this command in your Flutter app to create a web version:

```bash
$ flutter build web --profile --dart-define=Dart2jsOptimization=O0
```

This will not produce the minified javascript version, since some adjustments need to be made in build output.
That of course means, that the client will have to download a bigger bundle.

2.  Copy the folder `web` from `/build/web/` to your ` public` folder in your React app. In this project I renamed the file to `flutter`.\
    That means all of our flutter files are hosted at `YOUR_HOST/flutter/`.\
    Head over to `public/flutter/main.dart.js`\
    In the next step replace the t1 path with your foldername.\

```js
// what you will need to find
    getAssetUrl$1(asset) {
      var t1;
      if (A.Uri_parse(asset, 0, null).get$hasScheme())
        return A._Uri__uriEncode(B.List_5Q7, asset, B.C_Utf8Codec, false);
      t1 = this.get$_baseUrl();
      return A._Uri__uriEncode(B.List_5Q7, (t1 == null ? "" : t1) + "assets/" + asset, B.C_Utf8Codec, false);
    }

// replaced
    getAssetUrl$1(asset) {
      var t1;
      if (A.Uri_parse(asset, 0, null).get$hasScheme())
        return A._Uri__uriEncode(B.List_5Q7, asset, B.C_Utf8Codec, false);
      t1 = "/flutter/";
      return A._Uri__uriEncode(B.List_5Q7, (t1 == null ? "" : t1) + "assets/" + asset, B.C_Utf8Codec, false);
    }
```

3. Edit `flutter.js`

```js
// Search for this
function getBaseURI() {
  const base = document.querySelector("base");
  return (base && base.getAttribute("href")) || "";
}

// Use the same path as before
function getBaseURI() {
  return "/flutter/";
}
```

4. Create a flutter_init.js file inside your public folder and paste the following content it:

```js
window._stateSet = function () {};
window.addEventListener("load", function (ev) {
  let target = document.querySelector("#flutter_target");
  _flutter.loader.loadEntrypoint({
    onEntrypointLoaded: async function (engineInitializer) {
      let appRunner = await engineInitializer.initializeEngine({
        hostElement: target,
      });
      await appRunner.runApp();
    },
  });
});
```

5. Install `react-helmet-async` so we can run our flutter_init script

```bash
$ yarn add react-helmet-async
```

6. Setup is done now head back to your React app:

You need to wrapp your React App with a HelmetProvider and provide an helmetContext (can be empty).\

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HelmetProvider, Helmet } from "react-helmet-async"
import './index.css'

const helmetContext = {};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HelmetProvider context={helmetContext}>
            <App />
        </HelmetProvider>
    </React.StrictMode>,
)
```

Now that is taken care of add a Helmet component and run the `flutter_init.js`.
This will load the Flutter app and that was it!

```js
function App() {
  return (
    <>
      <Helmet>
        <script src="/flutter_init.js" defer></script>
      </Helmet>
      <div
        style={{ aspectRatio: 9 / 19.5 }}
        id="flutter_target"
        className="h-full"
      ></div>
    </>
  );
}
```
