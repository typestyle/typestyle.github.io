/**
 * components used to setup the demo page 
 */
import { style } from 'typestyle';
import * as csx from 'typestyle/csx';
import * as React from 'react';
import * as gls from './gls';
import { colors, fontSizes } from './styles';

namespace HeaderStyles {
  export const root = style(
    csx.centerCenter,
    {
      height: '200px',
      backgroundColor: colors.header,
      fontStyle: 'italic'
    });
}

export const Header = () => {
  return (
    <div className={HeaderStyles.root}>
      <h1 className={style({ color: 'white' })}>TypeStyle</h1>
    </div>
  );
}