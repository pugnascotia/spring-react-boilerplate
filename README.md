# spring-react-boilerplate

An example application that uses a Spring Java backend with a React
frontend and can perform server-side rendering (SSR).

## Another Boilerplate?

Yes, but with Java. It's inspired by the
[spring-react-isomorphic](https://github.com/sdeleuze/spring-react-isomorphic)
project, but at this point has been largely rebuilt from the ground up. The
frontend is build on
[create-react-app](https://github.com/facebookincubator/create-react-app)
(CRA), though it was necessary to "eject" from CRA in order to apply some
changes for server.

The project also uses:

- [Yarn](https://yarnpkg.com/) for installing Node modules.
- [Babel](https://babeljs.io/) for transpiling the server-side render function.
- [Hot module reloading (HMR)](https://github.com/gaearon/react-hot-loader) of React components
- [Redux](https://github.com/reactjs/redux) to manage state, both in the client and when rendering on the server.
- [react-router](https://github.com/ReactTraining/react-router) for page routing, on client and server
- [react-helmet](https://github.com/nfl/react-helmet) for managing meta-data in the HTML
- Type checking with [Flow](https://flowtype.org/).

## Other Goodies

You also get:

- [Project Lombok](https://projectlombok.org/) to cut down the Java
  boilerplate
- [Jackson](https://github.com/FasterXML/jackson) to serialize model data
  before rendering on the server. For more information, see
  [this OpenJDK thread on the subject](http://mail.openjdk.java.net/pipermail/nashorn-dev/2013-September/002006.html),
  but summary is Nashorn won't (and actually can't) string-ify POJOs via
  `JSON.stringify`, meaning it can't be used to serialise the Redux state.
  Without this you'll have a bad time trying to use your Java objects in
  your Redux state.

## Changes from create-react-app

   * Webpack output is a UMD bundle, which makes it possible to load it in
     Nashorn
   * Hot reloading has been added
   * LESS support has been added
   * CRA's `polyfills.js` has been changed to be SSR-friendly
   * Possible to disable uglification during the production build by
     setting the `DEBUG` environment variable (see below).

## The `render` function

We implement a custom render function for Spring to call. The source code
is in `src/main/js/react-render/render.js`, and is compiled to ES5 syntax
during the Maven build. Its build process also pulls in polyfills, to allow
React etc to work, and also the frontend's JSON manifest, in order to
locate the frontend's built assets. See the `build.sh` in the same
directory for how the final render code is assembled.

## Running the code

Execute `mvn` if you have Maven already installed, or `./mvnw` if you
don't. You'll need [Java8
installed](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
either way at a *MINIMUM* version of `1.8.0_65`. Older versions have a bug
that makes rendering brutally slow. Note that since React is not
thread-safe, Spring is configured to use a script engine per thread, and
each one will have to load the bundle when first initialises. You may want
to force refresh the website a few times to make sure all the threads are
initialised.

To run the frontend in hot-module reloading mode, switch to another
terminal and execute:

    cd src/main/app
    yarn start

Your browser should automatically open
[http://localhost:3000](http://localhost:3000).  Now when you edit your
files, the changes will be loaded in your browser automatically and, where
possible, be applied without losing the application's current state thanks
to `react-hot-loader`!

## Conventions

Controllers that render views are suffixed with `Controller`. REST endpoints are
suffixed with `Resource` and handle requests under `/api`.

## Testing the Webpack bundle / render function

In order to preempt runtime errors with Nashorn loading the bundle, a test
script is executed by Maven during the `test-compile` phase, located at
`src/test/js/react-renderer/test.js`. If this script fails, you can diagnose the problem
by running:

    DEBUG=true mvn test-compile

This will rebuild the webpack bundle without minification, which should
make the cause of any error clearer.

It's easy to create a bundle that's broken on the server by including code that
expects a DOM - and that includes the Webpack style loader. This is the root of
most problems. You should note that server-side rendering *does not* require a
DOM - which is why `src/main/js/react-renderer/polyfill.js` doesn't provide
any `window` or `document` stubs.

## Caveats

This isn't necessarily the best way to write a React application or a
Spring application. Pull requests welcome!
