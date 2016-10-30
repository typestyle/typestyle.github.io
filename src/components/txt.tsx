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

export const H2 = ({children, id}: {children?:any, id: string}) => {
  return <h2 className={style({
    margin: '0px',
    color: styles.colors.text
  })}
    id={id}>
    {children}
  </h2>;
}