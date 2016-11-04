/**
 * components used to setup the demo page 
 */
import { style } from 'typestyle';
import * as csx from 'typestyle/csx';
import * as React from 'react';
import * as gls from './gls';
import { colors, fontSizes } from './styles';
import * as txt from './txt';

namespace PageStyles {
  export const anchor = style({
    color: colors.text,
    textDecoration: 'none',
    '&:hover': {
      color: colors.text,
      textDecoration: 'underline'
    }
  })
}

type PageSectionProps = {
  title: string,
  link: string,
  children?: React.ReactNode
}
export const PageSection = ({title, link, children}: PageSectionProps) => {
  return <gls.ContentVerticalMargined margin={15}>
    <a className={PageStyles.anchor} title="Permalink" href={"#" + link}><txt.H2 id={link}>{title}</txt.H2></a>
    <div className={style(csx.verticallySpaced(10), csx.content, csx.vertical)}>
      {children}
    </div>
  </gls.ContentVerticalMargined>
}