import * as React from "react";
import * as marked from "marked";
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
  line-height: 24px;
}

.${rootClass} h2 {
  margin: 0px;
}
.${rootClass} h3 {
  margin: 0px;
}

/** List styling */
.${rootClass} ul {
    margin: 0px;
    margin-bottom: 20px !important;
}
.${rootClass} ul>* {
  margin-bottom: 10px !important;
}
.${rootClass} ul>*:last-child {
  margin-bottom: 0px !important;
}

.${rootClass} a {
  color: grey;
}

.${rootClass} a:hover {
  color: black;
}

/** Inline code */
.${rootClass} code {
  padding-left: 5px;
  padding-right: 5px;
  background: #eee;
}

/** Block code */
.${rootClass} pre>code {
  display: block;
  padding: 10px;
  background: #eee;
}
  `);
}



interface Props { markdown: string }

/**
 * Renders markdown
 */
export class MarkDown extends React.Component<Props, {}> {
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
  /** Custom rendering */
  const renderer = new marked.Renderer();

  /** 
   * Target blank external links
   * https://github.com/chjj/marked/pull/451
   **/
  renderer.link = function(href, title, text) {
    var external, newWindow, out;
    external = /^https?:\/\/.+$/.test(href);
    newWindow = external || title === 'newWindow';
    out = "<a href=\"" + href + "\"";
    if (newWindow) {
      out += ' target="_blank"';
    }
    if (title && title !== 'newWindow') {
      out += " title=\"" + title + "\"";
    }
    const output = out += ">" + text + "</a>";
    return output;
  };
  
  return (
    marked(markdown, { gfm: true, renderer: renderer })
      // don't want a trailing newline
      .trim()
  );
}