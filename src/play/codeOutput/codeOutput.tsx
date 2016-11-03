/**
 * @module Renders out the code.
 */

/** 
 * Note:
 * - Any local imports become usable by the demo
 * - To update you also need to update projectService.ts 
 **/
import * as gls from '../../components/gls';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as typestyle from 'typestyle';
import * as csx from 'typestyle/csx';
const {
  style,
  cssRaw,
  keyframes,
  cssRule,
  classes,
} = typestyle;

namespace CodeOutputStyles {
  const base = typestyle.extend(
    csx.fillParent,
    csx.layerParent,
    {
      overflow: 'auto',
      fontFamily: 'sans-serif',
      fontSize: '16px'
    });

  export const outputClass = typestyle.style(base, { border: '1px solid black' });
  export const errorClass = typestyle.style(base, csx.padding(10), { color: 'red', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '24px' });
  export const helpfulClass = typestyle.style(base, csx.padding(10), { color: '#333', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '24px' });
}

/**
 * Renders the `jsx` string to `js` string and then sets it as its innerHTML
 */
export class CodeOutput extends React.PureComponent<{ pending: boolean, hasCode: boolean, output: string }, {}>{
  render() {
    const compiled = this.props.output;
    console.log({ compiled })

    if (this.props.pending) {
      return <div className={CodeOutputStyles.helpfulClass}>Analyzing 🌹</div>;
    }

    if (!this.props.hasCode) {
      return <div className={CodeOutputStyles.helpfulClass}>Write some code to kick off 🌹</div>;
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
      const html = ReactDOMServer.renderToString(evaled);

      return <div className={CodeOutputStyles.outputClass} dangerouslySetInnerHTML={{
        __html: html
      }} />;
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