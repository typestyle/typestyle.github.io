import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import * as cp from '../components';

type Doc = {
  title: string
  link: string
  content: string
}

const docs: Doc[] = [{
  title: "The guide to maintainable CSS",
  link: '',
  content: require('../docs/intro.md')
},
{
  title: "Core API",
  link: 'core',
  content: require('../docs/core.md')
},
{
  title: "Raw CSS Support",
  link: 'raw',
  content: require('../docs/raw.md')
},
{
  title: "Basic CSS Tips",
  link: 'css',
  content: require('../docs/css.md')
},
{
  title: "Page Setup (csx)",
  link: 'page',
  content: require('../docs/page.md')
},
{
  title: "Flexbox (csx)",
  link: 'flex',
  content: require('../docs/flex.md')
},
{
  title: "Colors (csx)",
  link: 'colors',
  content: require('../docs/colors.md')
}];
const toc: cp.TOCItem[] = docs.map(r => ({ display: r.title, link: r.link }));

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
    React.createElement(
      Router,
      { history: hashHistory },
      ...docs.map(renderMarkdownRoute)
    )
  );
  return routes;
}
