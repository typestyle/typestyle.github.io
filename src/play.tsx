/** Setup es6 */
import 'babel-polyfill';

import { setupPage, normalize } from 'typestyle/csx';
import * as csx from 'typestyle/csx';
import { style } from 'typestyle';
normalize();
setupPage('#root');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as cp from './components';
import { CodeEditor } from './play/codeEditor';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { debounce } from './utils';
import * as ts from 'byots';
import * as ps from './play/projectService';

class DemoState {
  /**
   * This is the file name we use for the user file
   */
  readonly mainCodeFilePath = 'userfile.tsx';

  @observable code: string;
  constructor() {
    this.reset();
  }
  @action reset = () => {
    this.code = '';
    ps.addFile(this.mainCodeFilePath, '');
  }
  @action setCode = (code: string) => {
    this.code = code;
    this.recalculateOutput();
  }
  @action onCodeEdit = (codeEdit: CodeEdit) => {
    ps.editFile(this.mainCodeFilePath, codeEdit);
  }

  @observable output = '';
  @action recalculateOutput = debounce(() => { 
    this.output = ts.transpile(this.code);
  }, 1000);
}

/**
 * Our singleton state
 */
const demoState = new DemoState();

/**
 * Provides a nice demo / test component 
 */
@observer
export class Demo extends React.Component<{}, {}> {
  render() {
    const spacing = 10;

    return <cp.FlexHorizontal className={style({ backgroundColor: '#343436' })}>
      {/** code */}
      <cp.Flex>
        <CodeEditor
          value={demoState.code}
          onChange = {(value => demoState.setCode(value))}
          onCodeEdit={(codeEdit) => demoState.onCodeEdit(codeEdit)} />
      </cp.Flex>
      <cp.SmallVerticalSpace/>
      {/** output */}
      <cp.Flex className={style({ backgroundColor: 'white' }, csx.layerParent)}>
        {demoState.output}
      </cp.Flex>
    </cp.FlexHorizontal>
  }
}

ReactDOM.render(<div className={style(csx.fillParent, csx.vertical)}>
  <cp.HeaderSmall />
  <Demo />
</div>, document.getElementById('root'));