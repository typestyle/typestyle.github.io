import * as React from "react";
import * as marked from "marked";
import escapeHtml = require("escape-html");
import { style, cssRaw } from 'typestyle';

/**
 * CSS customizations
 */
namespace MarkDownStyles {
  export const rootClass = 'typestyle-markdown';

  cssRaw(`
.${rootClass} {
    font-size: .7em;
}

.${rootClass} p {
    margin-top: .5em;
    margin-bottom: .5em;
}

.${rootClass} a {
    color: grey;
}

.${rootClass} a:hover {
    color: white;
}

.${rootClass} ul {
    margin: 0px;
}
  `);
}



interface Props { markdown: string }

/**
 * Renders markdown
 */
export class MarkDown extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const rendered = toHtml(this.props.markdown);

    return (
      <div className={MarkDownStyles.rootClass} dangerouslySetInnerHTML={{ __html: rendered }} />
    );
  }
}

/** Converts an html string to markdown */
export function toHtml(markdown: string) {
  return (
    `<div class="alm-markdown-root"> ${
    marked(escapeHtml(markdown))
      // Move hrefs to target blank
      .replace(/a href=/g, "a target='_blank' href=")
      // don't want a trailing newline
      .trim()
      // Make newlines `<br>`s
      .replace(/\n/g, '<br/>')
    }</div>`
  );
}