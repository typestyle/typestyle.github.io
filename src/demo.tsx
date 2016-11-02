import { setupPage, normalize } from 'typestyle/csx';
import * as csx from 'typestyle/csx';
import { style } from 'typestyle';
normalize();
setupPage('#root');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as cp from './components';

const spacing = 10;

/**
 * Provides a nice demo / test component 
 */
export const Demo = () => {
  return <cp.FlexHorizontalMargined margin={spacing} className={style(csx.padding(spacing), { backgroundColor: '#343436' })}>
    <cp.Flex className={style({backgroundColor:'#272822', color: 'white'})}>Code</cp.Flex>
    <cp.Flex>Output</cp.Flex>
  </cp.FlexHorizontalMargined>
}

ReactDOM.render(<div className={style(csx.fillParent, csx.vertical)}>
  <cp.HeaderSmall />
  <Demo />
</div>, document.getElementById('root'));