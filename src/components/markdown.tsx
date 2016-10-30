import * as React from "react";
import * as marked from "marked";
import escapeHtml = require("escape-html");
import { style, cssRaw, classes } from 'typestyle';
import * as csx from 'typestyle/csx';
import { colors } from './styles';

/**
 * CSS customizations
 */
namespace MarkDownStyles {
  export const rootClass = 'typestyle-markdown';

  cssRaw(`
.${rootClass} {
    color: ${colors.text}
}

.${rootClass} p {
  margin: 0px;
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
      <div className={classes(MarkDownStyles.rootClass, style(csx.verticallySpaced(10)))} dangerouslySetInnerHTML={{ __html: rendered }} />
    );
  }
}

/** Converts an html string to markdown */
export function toHtml(markdown: string) {
  return (
    marked(escapeHtml(markdown), { gfm: true })
      // Move hrefs to target blank
      .replace(/a href=/g, "a target='_blank' href=")
      // don't want a trailing newline
      .trim()
  );
}