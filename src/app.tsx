import { setupPage, normalize } from 'typestyle/csx';
normalize();
setupPage('#root');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as cp from './components';
import { renderRoutes } from './routing/router';

ReactDOM.render(<cp.Content>
  <cp.Header />
  <cp.ContentVerticalMargined style={{ padding: '10px' }}>

    {/** The github links */}
    <cp.ContentVerticalMargined>
      <cp.ContentVerticalCentered>
        <iframe src="https://ghbtns.com/github-btn.html?user=typestyle&repo=typestyle&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
      </cp.ContentVerticalCentered>

      <cp.ContentVerticalCentered style={{ color: cp.colors.text }}>
        This project is powered by github 🌟s, and they are much appreciated 🌹
      </cp.ContentVerticalCentered>
    </cp.ContentVerticalMargined>

    {renderRoutes()}

  </cp.ContentVerticalMargined>

</cp.Content>, document.getElementById('root'));