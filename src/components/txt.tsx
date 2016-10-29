import * as React from 'react';
import {style} from 'typestyle';
import * as csx from 'typestyle/csx';
import * as styles from './styles';

export const P = ({children}: {children?:any}) => {
  return <p className={style({
    color: styles.colors.text,
    margin: '0px',
    lineHeight: '30px'
  })}>
    {children}
  </p>;
}

export const Ps = ({children}: {children?:any}) => {
  return <div className={style(csx.verticallySpaced(10), csx.content, csx.vertical)}>
    {children}
  </div>;
}

export const H2 = ({children}: {children?:any}) => {
  return <h2 className={style({
    margin: '0px',
    color: styles.colors.text
  })}>
    {children}
  </h2>;
}