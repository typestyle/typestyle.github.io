import { setupPage, normalize } from 'typestyle/csx';
normalize();
setupPage('#root');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as cp from './components';

ReactDOM.render(<cp.Content>
  <cp.Header />
  <cp.ContentVerticalMargined style={{ padding: '24px' }}>

    {/** The github links */}
    <cp.ContentVerticalMargined>
      <cp.ContentVerticalCentered>
        <iframe src="https://ghbtns.com/github-btn.html?user=typestyle&repo=typestyle&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
      </cp.ContentVerticalCentered>

      <cp.ContentVerticalCentered>
        This project is powered by github 🌟s, and they are much appreciated 🌹
      </cp.ContentVerticalCentered>
    </cp.ContentVerticalMargined>

    <cp.PageSection title={"The guide to maintainable CSS"} link="intro">
      <cp.Ps>
        <cp.P>
          Writing maintainable CSS is hardwork. But writing maintainable JavaScript is a fairly solved problem. Lets combine the two to make CSS maintainability an issue of the past.
        </cp.P>
        <cp.P>
          This guide is designed for the beginner and expert alike. Lets kick off with some CSS core concepts.
        </cp.P>
      </cp.Ps>

      {
        /** 
        <cp.MarkDown markdown={`This is a demo`} />
         */
      }
      
    </cp.PageSection>

  </cp.ContentVerticalMargined>

</cp.Content>, document.getElementById('root'));