import * as gls from '../../components/gls';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as typestyle from 'typestyle';
import * as csx from 'typestyle/csx';

namespace CodeOutputStyles {
  const base = {
    backgroundColor: '#EEE',
    overflow: 'auto',
    border: '5px solid #5AD15A',
    fontFamily: 'sans-serif',
    fontSize: '16px'
  };

  export const outputClass = typestyle.style(base);
  export const errorClass = typestyle.style(base, { color: 'red', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '24px' });
}

/**
 * Renders the `jsx` string to `js` string and then sets it as its innerHTML
 */
class CodeOutput extends React.Component<{ output: string, horizontal?: boolean }, {}>{
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
    const props = {
      dangerouslySetInnerHTML:
      {
        __html: html
      },
      className: this.props.horizontal ? typestyle.style(csx.selfStart) : ''
    };

    return <gls.Flex className={CodeOutputStyles.outputClass}>
      <gls.FlexVertical {...props} />
    </gls.Flex>;
  }
}