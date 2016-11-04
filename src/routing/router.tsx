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
const colors: Doc = {
  title: "Colors",
  link: 'colors',
  content: require('../docs/colors.md')
};
const page: Doc = {
  title: "Page Setup",
  link: 'page',
  content: require('../docs/page.md')
};
const flexbox: Doc = {
  title: "Flexbox",
  link: 'flex',
  content: require('../docs/flex.md')
};
const toc: cp.TOCItem[] = [
  { display: 'About', link: '' },
  { display: 'CSS Basics', link: 'css' },
  { display: 'Page Setup (csx)', link: 'page' },
  { display: 'Flexbox (csx)', link: 'flex' },
  { display: 'Colors (csx)', link: 'colors' },
]

export function renderRoutes() {
  const renderMarkdownRoute = (doc: Doc) => {
    return <Route
      path={'/' + doc.link}
      component={() =>
        <cp.BookSection title={doc.title} link={doc.link} toc={toc}>
          <cp.MarkDown markdown={doc.content} />
        </cp.BookSection>
      } />
  }
  const routes = (
    <Router history={hashHistory}>
      {renderMarkdownRoute(intro)}
      {renderMarkdownRoute(colors)}
      {renderMarkdownRoute(css)}
      {renderMarkdownRoute(page)}
      {renderMarkdownRoute(flexbox)}
    </Router>
  );

  return routes;
}
