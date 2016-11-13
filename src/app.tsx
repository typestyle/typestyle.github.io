/** Setup es6 */
import 'babel-polyfill';

import { setupPage, normalize } from 'typestyle/lib/csx';
normalize();
setupPage('#root');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as cp from './components';
import { renderRoutes } from './routing/router';
import * as csx from 'typestyle/lib/csx';
import { style } from 'typestyle';

export const Header = () => {
  return (
    <div className={style(
      csx.centerCenter,
      csx.padding(10, 0, 35, 0),
      {
        backgroundColor: cp.colors.header,
        color: 'white'
      })}>
      <div className={style(csx.content, csx.vertical, csx.verticallySpaced(10))}>
        <h1># TypeStyle</h1>
        <p>Making CSS TypeSafe</p>
      </div>
    </div>
  );
}

ReactDOM.render(<cp.Content>
  <Header />
  <cp.ContentVerticalMargined style={{ padding: '20px 10px 10px 10px' }}>

    {/** The github links */}
    <cp.ContentVerticalMargined>
      <cp.ContentVerticalCentered>
        <iframe src="https://ghbtns.com/github-btn.html?user=typestyle&repo=typestyle&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
      </cp.ContentVerticalCentered>

      <cp.ContentVerticalCentered style={{ color: cp.colors.text, textAlign: 'center', lineHeight: '30px' }}>
        This project is powered by github 🌟s, and they are much appreciated 🌹
      </cp.ContentVerticalCentered>
    </cp.ContentVerticalMargined>

    {renderRoutes()}

  </cp.ContentVerticalMargined>

</cp.Content>, document.getElementById('root'));