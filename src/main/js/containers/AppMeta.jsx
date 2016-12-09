/* @flow */
import React from 'react';
import Helmet from 'react-helmet';

/**
 * Renders nothing directly, but updates the DOM with the specified data. Note that
 * we don't have script tags in here, because we want these to appear at the bottom
 * of our page, and we don't want Helmet re-inserting them at the top!
 */
const AppMeta = () => (
  <Helmet
    htmlAttributes={{ lang: 'en' }}
    titleTemplate="Spring React Boilerplate - %s"
    defaultTitle="Spring React Boilerplate"
    meta={[
      { name: 'description', content: 'Spring React Boilerplate' },
      { property: 'og:type', content: 'article' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]}
    link={[
        { rel: 'canonical', href: 'http://example.com/example' },
        { rel: 'apple-touch-icon', href: 'http://example.com/img/apple-touch-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: 'http://example.com/img/apple-touch-icon-72x72.png' },
      {
        rel: 'stylesheet',
        href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
        integrity: 'sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7',
        crossorigin: 'anonymous'
      },
      {
        rel: 'stylesheet',
        href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css',
        integrity: 'sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r',
        crossorigin: 'anonymous'
      },
      { rel: 'stylesheet', href: '/app/bundle.css' }
    ]}
  />
);

export default AppMeta;
