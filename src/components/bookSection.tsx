/**
 * components used to setup the demo page 
 */
import { style, classes } from 'typestyle';
import * as csx from 'typestyle/csx';
import * as React from 'react';
import * as gls from './gls';
import { colors, fontSizes } from './styles';
import * as txt from './txt';

namespace BookSectionStyles {
  export const anchor = style({
    color: colors.text,
    textDecoration: 'none',
    '&:hover': {
      color: colors.text,
      textDecoration: 'underline'
    }
  });

  export const anchorLookingLikeButton = style({
    cursor: 'pointer',
    height: 'auto',
    padding: "12px 30px 11px",
    border: `1px solid ${colors.header}`,
    borderRadius: '3px',
    color: colors.white,
    backgroundColor: colors.header,
    fontSize: fontSizes.buttonText,
    textDecoration: "none",
    lineHeight: "1em",
    outline: 'none',
    transition: 'color .2s, background-color .2s',
    display: 'inline-block',
    '&:hover': {
      backgroundColor: colors.headerHover,
    },
    '&:active': {
      backgroundColor: colors.headerHover,
    },
    '&:focus': {
      outline: 'thin dotted',
      outlineColor: colors.header
    }
  });
}

export type TOCItem = { display: string, link: string }

type BookSectionProps = {
  title: string,
  link: string,
  toc: TOCItem[],
  children?: React.ReactNode
}
export const BookSection = ({title, link, toc, children}: BookSectionProps) => {
  const currentSectionIndex = toc.findIndex(t => t.link === link);
  const previousIfAny = toc[currentSectionIndex - 1];
  const nextIfAny = toc[currentSectionIndex + 1];

  const scrollToTop = () => window.scrollTo(0, 0);

  return <gls.ContentVerticalMargined margin={15}>
    <txt.H2 id={'toc'}>Table of Contents</txt.H2>
    <gls.ContentVerticalMargined margin={10} style={{ paddingLeft: '10px' }}>
      {toc.map((t, index) => {
        return <a key={index} className={classes(
          BookSectionStyles.anchor,
          currentSectionIndex === index && style({
            fontWeight: 'bold',
            textDecoration: 'underline'
          })
        )} href={"#" + t.link}>
          {t.display}
        </a>
      })}
    </gls.ContentVerticalMargined>

    <a className={BookSectionStyles.anchor} title="Permalink" href={"#" + link}><txt.H2 id={link}>{title}</txt.H2></a>
    <div className={style(csx.verticallySpaced(10), csx.content, csx.vertical)}>
      {children}
    </div>

    {/** Next / previous */}
    <hr />
    <gls.ContentHorizontal>
      {previousIfAny && <a onClick={scrollToTop} className={BookSectionStyles.anchorLookingLikeButton} href={"#" + previousIfAny.link}>Previous</a>}
      <gls.Flex />
      {nextIfAny && <a onClick={scrollToTop} className={BookSectionStyles.anchorLookingLikeButton} href={"#" + nextIfAny.link}>Next</a>}
    </gls.ContentHorizontal>
  </gls.ContentVerticalMargined>
}