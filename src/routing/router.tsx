import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import * as cp from '../components';

type Doc = {
  title: string
  link: string
  content: string
}

const intro: Doc = {
  title: "The guide to maintainable CSS",
  link: '',
  content: require('../docs/intro.md')
};
const css: Doc = {
  title: "Basic tips",
  link: 'css',
  content: require('../docs/css.md')
};
const page: Doc = {
  title: "Page Setup",
  link: 'page',
  content: require('../docs/page.md')
};

export function renderRoutes() {
  const renderMarkdownRoute = (doc: Doc) => {
    return <Route
      path={'/'+doc.link}
      component={() =>
        <cp.PageSection title={doc.title} link={doc.link}>
          <cp.MarkDown markdown={doc.content} />
        </cp.PageSection>
      } />
  }
  const routes = (
    <Router history={hashHistory}>
      {renderMarkdownRoute(intro)}
      {renderMarkdownRoute(css)}
      {renderMarkdownRoute(page)}
    </Router>
  );

  return routes;
}
