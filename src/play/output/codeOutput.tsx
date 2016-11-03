import * as gls from '../../components/gls';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as typestyle from 'typestyle';
import * as csx from 'typestyle/csx';

namespace CodeOutputStyles {
  const base = typestyle.extend(
    csx.fillParent,
    csx.layerParent,
    {
      backgroundColor: '#EEE',
      overflow: 'auto',
      fontFamily: 'sans-serif',
      fontSize: '16px'
    });

  export const outputClass = typestyle.style(base);
  export const errorClass = typestyle.style(base, { color: 'red', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '24px' });
}

/**
 * Renders the `jsx` string to `js` string and then sets it as its innerHTML
 */
export class CodeOutput extends React.Component<{ output: string, horizontal?: boolean }, {}>{
  render() {
    const compiled = this.props.output;
    if (!compiled.replace('"use strict";', '').trim()) {
      return <gls.Flex className={CodeOutputStyles.errorClass}>ERROR: No code emitted</gls.Flex>;
    }

    let evaled: any;
    try {
      evaled = eval(compiled);
    }
    catch (e) {
      return <gls.Flex className={CodeOutputStyles.errorClass}>EVAL ERROR: {e.message}</gls.Flex>;
    }

    const html = ReactDOMServer.renderToString(evaled);

    return <div className={CodeOutputStyles.outputClass} dangerouslySetInnerHTML={{
      __html: html
    }} />;
  }
}