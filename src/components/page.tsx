/**
 * components used to setup the demo page 
 */
import { style } from 'typestyle';
import * as csx from 'typestyle/csx';
import * as React from 'react';
import * as gls from './gls';
import { colors, fontSizes } from './styles';
import * as txt from './txt';

namespace HeaderStyles {
  export const root = style(
    csx.centerCenter,
    csx.padding(10, 0, 35, 0),
    {
      backgroundColor: colors.header,
      color: 'white'
    });
  export const anchor = style({
    color: colors.text,
    textDecoration: 'none',
    '&:hover': {
      color: colors.text,
      textDecoration: 'underline'
    }
  })
}

export const Header = () => {
  return (
    <div className={HeaderStyles.root}>
      <div className={style(csx.content, csx.vertical, csx.verticallySpaced(10))}>
        <h1># TypeStyle</h1>
        <p>Making CSS TypeSafe</p>
      </div>
    </div>
  );
}

export const HeaderSmall = () => {
  return (
    <div className={style(csx.padding(24),{color:'white',background: 'black'})}>
      <div className={style(csx.content, csx.horizontal, csx.center, csx.horizontallySpaced(10))}>
        <h3 className={style(csx.margin(0), {whiteSpace:'nowrap'})}># TypeStyle</h3>
        <div className={style(csx.flex)}/>
        <iframe src="https://ghbtns.com/github-btn.html?user=typestyle&repo=typestyle&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
      </div>
    </div>
  );
}

type PageSectionProps = {
  title: string, 
  link: string,
  children?: React.ReactNode
}
export const PageSection = ({title, link, children}: PageSectionProps) => {
  return <gls.ContentVerticalMargined margin={15}>
    <a className={HeaderStyles.anchor} title="Permalink" href={"#"+link}><txt.H2 id={link}>{title}</txt.H2></a>
    <div className={style(csx.verticallySpaced(10), csx.content, csx.vertical)}>
      {children}
    </div>
  </gls.ContentVerticalMargined>
}