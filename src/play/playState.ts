import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import * as ps from './projectService';
import { debounce } from '../utils';

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
    this.pendingUpdates = true;
  }
  @action onCodeEdit = (codeEdit: CodeEdit) => {
    ps.editFile(this.mainCodeFilePath, codeEdit);
  }
  @computed get hasCode() {
    return !!this.code.trim()
  }

  @observable output = '';
  @observable pendingUpdates = false;
  @action recalculateOutput = debounce(() => { 
    this.output = ps.getRawJsOutput(this.mainCodeFilePath);
    this._currentErrors = ps.getCodeErrors(this.mainCodeFilePath);
    this.pendingUpdates = false;
  }, 1000);

  @observable private _currentErrors: CodeError[] = []
  @computed get currentErrors() {
    return Array.from(this._currentErrors);
  }
}

/**
 * Our singleton state
 */
export const demoState = new DemoState();