import { setupPage, normalize } from 'typestyle/csx';
import * as csx from 'typestyle/csx';
import { style } from 'typestyle';
normalize();
setupPage('#root');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as cp from './components';
import { CodeEditor } from './demo/codeEditor';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';


class DemoState {
  @observable code: string = '';
  @action setCode(code: string) {
    this.code = code;
  }
}

const demoState = new DemoState();

/**
 * Provides a nice demo / test component 
 */
@observer
export class Demo extends React.Component<{}, {}> {
  render() {
    const spacing = 10;

    return <cp.FlexHorizontalMargined margin={spacing} className={style(csx.padding(spacing), { backgroundColor: '#343436' })}>
      {/** code */}
      <cp.Flex>
        <CodeEditor value={demoState.code} onChange={value => demoState.setCode(value)} />
      </cp.Flex>
      {/** output */}
      <cp.Flex className={style({ backgroundColor: 'white'}, csx.layerParent)}>
        Output
      </cp.Flex>
    </cp.FlexHorizontalMargined>
  }
}

ReactDOM.render(<div className={style(csx.fillParent, csx.vertical)}>
  <cp.HeaderSmall />
  <Demo />
</div>, document.getElementById('root'));