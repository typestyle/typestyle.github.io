/**
 * @module Component free information about screen links in the application
 */
import { Router, useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
export const hashHistory = useRouterHistory(createHashHistory)();

export const docs: {
  title: string
  link: string
  content: string
}[] = [
    {
      title: "The guide to maintainable CSS",
      link: 'intro',
      content: require('../docs/intro.md')
    },
    {
      title: "Basic tips",
      link: 'css',
      content: require('../docs/css.md')
    },
    {
      title: "Page Setup",
      link: 'page',
      content: require('../docs/page.md')
    }
  ];

/** For use with anchor tags */
export function linkTo(link: string) {
  return `/#/${link}`;
}
