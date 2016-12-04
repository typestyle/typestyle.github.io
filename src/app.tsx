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
import { style, forceRenderStyles } from 'typestyle';
import './augmentTypes';

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

const anchorClass = style({
  color: '#333', whiteSpace: 'nowrap', textDecoration: 'none',
  nested: {
    '&:hover': { textDecoration: 'underline' },
    '&:visited': { color: '#333' }
  }
})

ReactDOM.render(<cp.Content>
  <Header />
  <cp.ContentVerticalMargined style={{ padding: '20px 10px 10px 10px' }}>

    {/** The github links */}
    <cp.ContentVerticalMargined>
      <cp.ContentVerticalCentered>
        <iframe src="https://ghbtns.com/github-btn.html?user=typestyle&repo=typestyle&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
      </cp.ContentVerticalCentered>

      <div style={{ color: cp.colors.text, textAlign: 'center', lineHeight: '30px' }}>
        <a href="https://github.com/typestyle/typestyle/stargazers" target="_blank" className={anchorClass}>Powered by your github 🌟s.</a> <a
          className={anchorClass}
          href="https://twitter.com/intent/tweet?text=Maintainable%20%23CSS%20has%20never%20been%20as%20easy%20as%20with%20%23TypeStyle%3A%20typestyle.github.io%0A%0A%23JavaScript%20%23TypeScript%20%40basarat%20%F0%9F%8C%B9"
          target="_blank">
          Don't forget to share 🌹
          </a>
      </div>
    </cp.ContentVerticalMargined>

    <cp.Content className={style(csx.horizontallyCenterSelf, csx.maxWidth(900))}>
      {renderRoutes()}
    </cp.Content>

  </cp.ContentVerticalMargined>

</cp.Content>, document.getElementById('root'));

forceRenderStyles();