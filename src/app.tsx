/** Setup es6 */
import 'babel-polyfill';

import { setupPage, normalize } from 'csstips';
import * as csstips from 'csstips';
normalize();
setupPage('#app-root');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as cp from './components';
import { renderRoutes } from './routing/router';
import { style, forceRenderStyles } from 'typestyle';
import './augmentTypes';

export const Header = () => {
  return (
    <div className={style(
      csstips.centerCenter,
      csstips.padding(10, 0, 35, 0),
      {
        backgroundColor: cp.colors.header,
        color: 'white'
      })}>
      <div className={style(csstips.content, csstips.vertical, csstips.verticallySpaced(10))}>
        <h1># TypeStyle</h1>
        <p>Making CSS TypeSafe</p>
      </div>
    </div>
  );
}

const anchorClass = style({
  color: '#333', whiteSpace: 'nowrap', textDecoration: 'none',
  $nest: {
    '&:hover': { textDecoration: 'underline' },
    '&:visited': { color: '#333' }
  }
})

ReactDOM.render(<cp.Content>
  <Header />
  <cp.ContentVerticalContentMargined style={{ padding: '20px 10px 10px 10px' }}>

    {/** The github links */}
    <cp.ContentVerticalContentMargined>
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
    </cp.ContentVerticalContentMargined>

    <cp.Content className={style(csstips.horizontallyCenterSelf, csstips.maxWidth('100%'))}>
      {renderRoutes()}
    </cp.Content>

    <cp.Content className={style(csstips.horizontallyCenterSelf, csstips.horizontallyCenterChildren, csstips.maxWidth(900))}>
      <cp.MarkDown markdown={'[Found a bug? Send us a PR ❤️](https://github.com/typestyle/typestyle.github.io/tree/source/src/docs)'}/>
    </cp.Content>

  </cp.ContentVerticalContentMargined>

</cp.Content>, document.getElementById('app-root'));

forceRenderStyles();