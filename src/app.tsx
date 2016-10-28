import { setupPage, normalize } from 'typestyle/csx';
normalize();
setupPage('#root');

import * as React from 'react';
import * as ReactDOM from 'react-dom';


ReactDOM.render(<div>Hello world</div>, document.getElementById('root'));