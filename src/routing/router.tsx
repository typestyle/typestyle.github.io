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
  title: "Core API (TypeStyle)",
  link: 'core',
  content: require('../docs/core.md'),
  prelude: 'Go ahead and jump into the super simple core API.',
},
{
  title: "Raw CSS Support (TypeStyle)",
  link: 'raw',
  content: require('../docs/raw.md'),
  prelude: 'Next we look at providing a more complete story for any advanced CSS scenario you might have.',
},
{
  title: "Server side rendering (TypeStyle)",
  link: 'server',
  content: require('../docs/server.md'),
  prelude: 'Next we look at server side rendering which *may* or *may not* be something you need.',
},
{
  title: "Advanced edge cases (TypeStyle)",
  link: 'advanced',
  content: require('../docs/advanced.md'),
  prelude: 'Next we look at some advanced cases that are also handled with TypeStyle.',
},
{
  title: "Colors (csx)",
  link: 'colors',
  content: require('../docs/colors.md'),
  prelude: 'Having a great color palette is fundamental to great design. We give this special love in our API.',
},
{
  title: "Page Setup (csstips)",
  link: 'page',
  content: require('../docs/page.md'),
  prelude: 'Setting up your first or next HTML page can be daunting. Next we show how TypeStyle makes this easier.',
},
{
  title: "Flexbox (csstips)",
  link: 'flex',
  content: require('../docs/flex.md'),
  prelude: 'Its not just the CSS tools that are evolving, but CSS itself is getting better ways to represent application layouts. One of the best ways is the flexbox and we provide guidance + great mixins to make using it easier and meaningful.',
},
{
  title: "Box helpers (csstips)",
  link: 'box',
  content: require('../docs/box.md'),
  prelude: 'How you manage the space around and inside your components is vital to a great design. Next we cover the helpers to make this a breeze.',
},
{
  title: "Playground Docs",
  link: 'play',
  content: require('../docs/play.md'),
  prelude: 'Next we show you a playground we designed expecially to allow beginners to experiment and learn CSS easily.',
},
{
  title: "Why TypeStyle",
  link: 'why',
  content: require('../docs/why.md'),
  prelude: 'If you are looking for reasons to use TypeStyle, we have plenty of them.',
},
{
  title: "Reviews",
  link: 'reviews',
  content: require('../docs/reviews.md'),
  prelude: 'Checkout the positive response to this library / framework.',
},
];
const toc: cp.TOCItem[] = docs.map(r => ({ display: r.title, link: r.link, prelude: r.prelude }));

export function renderRoutes() {
  const renderMarkdownRoute = (doc: Doc) => {
    return <Route
      path={'/' + doc.link + '(/:sub)'}
      component={({params}: { params?: { sub: string } }) => {
        if (params && params.sub) {
          setTimeout(() => {
            const item = document.getElementById(params.sub);
            if (item) {
              window.scrollTo(0, item.offsetTop)
            }
          }, 400);
        }
        return (
          <cp.BookSection title={doc.title} link={doc.link} toc={toc}>
            <cp.MarkDown markdown={doc.content} />
          </cp.BookSection>
        );
      } } />
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
