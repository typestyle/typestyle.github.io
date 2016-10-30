import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router, Route } from 'react-router'
import { hashHistory, docs } from './routes';
import * as cp from '../components';

export function renderRoutes() {
  const routes = (
    <Router history={hashHistory}>
      {
        /**
        docs.map(doc => {
          <Route
            key={doc.link}
            path={doc.link}
            component={() =>
              <cp.PageSection key={doc.link} title={doc.title} link={doc.link}>
                <cp.MarkDown markdown={doc.content} />
              </cp.PageSection>
            } />
        })
         */
      }

      {/** Fallback */}
      <Route
        path={"/"}
        component={() =>
          <cp.PageSection key={docs[0].link} title={docs[0].title} link={docs[0].link}>
            <cp.MarkDown markdown={docs[0].content} />
          </cp.PageSection>
        } />
    </Router>
  );

  return routes;
}
