import { setupPage, normalize } from 'typestyle/csx';
normalize();
setupPage('#root');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as cp from './components';

ReactDOM.render(<cp.Content>
  <cp.Header/>

  <cp.SmallVerticalSpace/>

  <cp.ContentVerticalCentered>
    <cp.PrimaryButton text="Star on github" onClick={()=>window.location.href="https://github.com/typestyle/typestyle"} />
  </cp.ContentVerticalCentered>

</cp.Content>, document.getElementById('root'));