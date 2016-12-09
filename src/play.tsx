/** Setup es6 */
import 'babel-polyfill';

import { setupPage, normalize } from 'csstips';
import * as csstips from 'csstips';
import { style, cssRule } from 'typestyle';
normalize();
setupPage('#root');

/**
 * Clear default margins from all things 
 * I wouldn't do this in a production site. But doing it to make teaching easier
 */
cssRule('h1,h2,h3,h4,h5,h6,h7,h8,p', {
  margin: '0px'
});

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as cp from './components';
import { CodeEditor } from './play/codeEditor/codeEditor';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { debounce } from './utils';
import * as ts from 'byots';
import * as ps from './play/projectService';
import { demoState } from './play/playState';
import { CodeOutput } from './play/codeOutput/codeOutput';
import * as gls from './components/gls';

@observer
export class HeaderSmall extends React.Component<{}, {}> {
  render() {
    return (
      <div className={style(csstips.padding(24), { color: 'white', background: 'black' })}>
        <gls.ResponsiveContentMargined className={style(csstips.center)}>
          <a
            className={style({ whiteSpace: 'nowrap', textDecoration: 'none', color: 'white', $nest: { '&:hover': { textDecoration: 'underline' } } })}
            href="https://twitter.com/intent/tweet?text=Maintainable%20%23CSS%20has%20never%20been%20as%20easy%20as%20with%20%23TypeStyle%3A%20typestyle.github.io%0A%0A%23JavaScript%20%23TypeScript%20%40basarat%20%F0%9F%8C%B9"
            target="_blank">
            <h2 className={style(csstips.margin(0))}># TypeStyle 🌹</h2>
          </a>

          <div className={style(csstips.flex)} />

          <a
            className={style({ whiteSpace: 'nowrap', textDecoration: 'none', color: 'white', $nest: { '&:hover': { textDecoration: 'underline' } } })}
            href="http://typestyle.io/#/play"
            target="_blank">
            <h4 className={style(csstips.margin(0))}>Help</h4>
          </a>

          <iframe src="https://ghbtns.com/github-btn.html?user=typestyle&repo=typestyle&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
        </gls.ResponsiveContentMargined>
      </div >
    );
  }
}


/**
 * Provides a nice demo / test component 
 */
@observer
export class Demo extends React.Component<{}, {}> {
  render() {
    const spacing = 10;

    return <cp.FlexHorizontal className={style({ backgroundColor: '#343436' })}>
      {/** code */}
      <cp.Flex style={{ maxWidth: '50%', position: 'relative' }}>
        <CodeEditor
          filePath={demoState.mainCodeFilePath}
          value={demoState.code}
          onChange={(value => demoState.setCode(value))}
          onCodeEdit={(codeEdit) => demoState.onCodeEdit(codeEdit)} />
      </cp.Flex>
      <cp.SmallVerticalSpace />
      {/** output */}
      <cp.Flex className={style({ backgroundColor: 'white', transition: 'opacity .2s', opacity: demoState.pendingUpdates ? 0.7 : 1 }, csstips.layerParent, csstips.maxWidth('50%'))}>
        <CodeOutput pending={demoState.pendingUpdates} hasCode={demoState.hasCode} output={demoState.output} />
      </cp.Flex>
    </cp.FlexHorizontal>
  }
}

ReactDOM.render(<div className={style(csstips.fillParent, csstips.vertical)}>
  <HeaderSmall />
  <Demo />
</div>, document.getElementById('root'));