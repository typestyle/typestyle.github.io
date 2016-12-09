/**
 * @module Renders out the code.
 */

/** 
 * NOTE:
 * - Any local imports become usable by the demo
 * - To update you also need to update projectService.ts 
 **/
import * as gls from '../../components/gls';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMServer from 'react-dom/server';
import * as typestyle from 'typestyle';
import * as csx from 'typestyle/lib/csx';
import * as csstips from 'csstips';
const ensureImport = csx || csstips;
const {
  style,
  cssRaw,
  keyframes,
  cssRule,
  classes,
  extend,
  media
} = typestyle;

namespace CodeOutputStyles {
  const base = typestyle.extend(
    csstips.fillParent,
    csstips.layerParent,
    {
      overflow: 'auto',
      fontFamily: 'sans-serif',
      fontSize: '16px'
    });

  export const outputClass = typestyle.style(base);
  export const errorClass = typestyle.style(base, csstips.padding(10), csstips.fillParent, csstips.centerCenter, { color: 'red', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '24px' });
  export const helpfulClass = typestyle.style(base, csstips.padding(10), csstips.fillParent, csstips.centerCenter, { color: '#333', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '24px', textAlign: 'center' });
}

/**
 * Renders the `jsx` string to `js` string and then sets it as its innerHTML
 */
export class CodeOutput extends React.PureComponent<{ pending: boolean, hasCode: boolean, output: string }, {}>{

  lastEvalResult?: any;
  componentDidUpdate() {
    if (!this.lastEvalResult) return;

    const root = ReactDOM.findDOMNode(this);
    ReactDOM.render(this.lastEvalResult, root);
  }

  render() {
    this.lastEvalResult = undefined;
    const compiled = this.props.output;
    console.log({ compiled })

    if (this.props.pending) {
      return <div className={CodeOutputStyles.helpfulClass}>Analyzing 🌹</div>;
    }

    if (!this.props.hasCode) {
      return <div className={CodeOutputStyles.helpfulClass}>
        Write some code to kick off 🌹
        <br />
        <br />
        (TIP: You can share the url to share code)
        </div>;
    }

    if (!compiled.replace('"use strict";', '').trim()) {
      return <div className={CodeOutputStyles.errorClass}>ERROR: No code emitted</div>;
    }

    let evaled: any;
    try {
      evaled = eval(compiled);
    }
    catch (e) {
      return <div className={CodeOutputStyles.errorClass}>EVAL ERROR: {e.message}</div>;
    }

    try {
      ReactDOMServer.renderToString(evaled);
      this.lastEvalResult = evaled;

      return <div className={CodeOutputStyles.outputClass}></div>;
    }
    catch (e) {
      const message: string = e.message;
      if (message.indexOf('You must pass a valid ReactElement.') !== -1) {
        return <div className={CodeOutputStyles.helpfulClass}>The last expression must to be a react element (e.g. {'<div>Hello world</div>'}) 🌹</div>;
      }
      return <div className={CodeOutputStyles.errorClass}>RENDER ERROR: {e.message}</div>;
    }

  }
}