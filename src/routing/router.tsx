import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import * as cp from '../components';

type Doc = {
  title: string
  link: string
  content: string
  prelude: string
}

const docs: Doc[] = [{
  title: "The guide to maintainable CSS",
  link: '',
  content: require('../docs/intro.md'),
  prelude: '',
},
{
  title: "Playground",
  link: 'play',
  content: require('../docs/play.md'),
  prelude: 'Next we show you a playground we designed expecially to allow beginners to experiment and learn CSS easily.'
},
{
  title: "Core API",
  link: 'core',
  content: require('../docs/core.md'),
  prelude: 'Next we kick off with the core TypeStyle functions.'
},
{
  title: "Raw CSS Support",
  link: 'raw',
  content: require('../docs/raw.md'),
  prelude: 'Next we look at providing a more complete story for any advanced CSS scenario you might have.'
},
{
  title: "Basic CSS Tips",
  link: 'css',
  content: require('../docs/css.md'),
  prelude: 'Now lets take a quick detour into some quick CSS tips.'
},
{
  title: "Page Setup (csx)",
  link: 'page',
  content: require('../docs/page.md'),
  prelude: 'Setting up your first or next HTML page can be daunting. Next we show how TypeStyle makes this easier.'
},
{
  title: "Flexbox (csx)",
  link: 'flex',
  content: require('../docs/flex.md'),
  prelude: 'Its not just the CSS tools that are evolving, but CSS itself is getting better ways to represent application layouts. One of the best ways is the flexbox and we provide guidance + great mixins to make using it easier and meaningful.'
},
{
  title: "Colors (csx)",
  link: 'colors',
  content: require('../docs/colors.md'),
  prelude: 'Having a great color pallet is fundamental to great design. We give this special love in our API.'
}];
const toc: cp.TOCItem[] = docs.map(r => ({ display: r.title, link: r.link, prelude: r.prelude }));

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
