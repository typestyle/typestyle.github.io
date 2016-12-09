/**
 * components used to setup the demo page 
 */
import { style, classes } from 'typestyle';
import * as csstips from 'csstips';
import * as React from 'react';
import * as gls from './gls';
import { colors, fontSizes, spacing } from './styles';
import * as txt from './txt';

namespace BookSectionStyles {
  export const anchor = style({
    color: colors.text,
    textDecoration: 'none',
    $nest: {
      '&:hover': {
        color: colors.text,
        textDecoration: 'underline'
      }
    }
  });

  export const tocAnchor = style(
    csstips.padding(5, 5, 5, 10),
    {
      background: '#eee',
      color: colors.text,
      textDecoration: 'none',
      $nest: {
        '&:hover': {
          color: colors.text,
          background: '#ddd',
        }
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
    $nest: {
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
    }
  });
}

export type TOCItem = { display: string, link: string, prelude: string }

type BookSectionProps = {
  title: string,
  link: string,
  toc: TOCItem[],
  children?: React.ReactNode
}
export const BookSection = ({title, link, toc, children}: BookSectionProps) => {
  const currentSectionIndex = toc.findIndex(t => t.link === link);
  const currentToc = toc.find(t => t.link === link);
  const previousIfAny = toc[currentSectionIndex - 1];
  const nextIfAny = toc[currentSectionIndex + 1];

  const scrollToTop = () => window.scrollTo(0, 0);

  return <gls.ContentVerticalContentMargined margin={15} className={style(csstips.maxWidth(900))}>
    <txt.H1 id={'toc'}>Table of Contents</txt.H1>
    <gls.ContentVertical style={{ paddingBottom: '10px' }}>
      {toc.map((t, index) => {
        return <a key={index} className={classes(
          BookSectionStyles.tocAnchor,
          currentSectionIndex === index && style({
            fontWeight: 'bold',
            backgroundColor: '#ddd',
            borderLeft: '2px solid #999',
          })
        )} href={"#" + t.link}>
          {t.display}
        </a>
      })}
    </gls.ContentVertical>

    <a className={BookSectionStyles.anchor} title="Permalink" href={"#" + link}><txt.H1 id={link}>{title}</txt.H1></a>

    <div className={style(csstips.verticallySpaced(10), csstips.content, csstips.vertical)}>
      {children}
    </div>

    {/** Next / previous */}
    <hr style={{ margin: '0px' }} />
    <gls.ContentHorizontal>
      {previousIfAny && <gls.ContentHorizontalCentered>
        <a onClick={scrollToTop} className={BookSectionStyles.anchorLookingLikeButton} href={"#" + previousIfAny.link}>Previous</a>
      </gls.ContentHorizontalCentered>}
      <gls.Flex className={style(csstips.padding(10), csstips.endJustified, { color: colors.text, lineHeight: spacing.lineHeight })}>
        {nextIfAny && nextIfAny.prelude}
      </gls.Flex>
      {nextIfAny && <gls.ContentHorizontalCentered>
        <a onClick={scrollToTop} className={BookSectionStyles.anchorLookingLikeButton} href={"#" + nextIfAny.link}>Next</a>
      </gls.ContentHorizontalCentered>}
    </gls.ContentHorizontal>
  </gls.ContentVerticalContentMargined>
}