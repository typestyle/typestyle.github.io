/** Setup es6 */
import 'babel-polyfill';

import { convertCss } from 'css-to-typestyle';
import { setupPage, normalize } from 'csstips';
import * as csstips from 'csstips';
import { rem, color } from 'csx';
import { style, cssRule, media } from 'typestyle';
normalize();
setupPage('#root');

/**
 * Clear default margins from all things 
 * I wouldn't do this in a production site. But doing it to make teaching easier
 */
cssRule('h1,h2,h3,h4,h5,h6,h7,h8,p', {
  margin: 0
});

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as cp from './components';
import { observer } from 'mobx-react';
import * as gls from './components/gls';

@observer
export class HeaderSmall extends React.Component<{}, {}> {
  render() {
    return (
      <div className={style({ padding: 24, color: 'white', background: 'black' })}>
        <gls.ContentHorizontalMargined className={style(csstips.center)}>
          <a
            className={style({ whiteSpace: 'nowrap', textDecoration: 'none', color: 'white', $nest: { '&:hover': { textDecoration: 'underline' } } })}
            href="https://twitter.com/intent/tweet?text=Maintainable%20%23CSS%20has%20never%20been%20as%20easy%20as%20with%20%23TypeStyle%3A%20typestyle.github.io%0A%0A%23JavaScript%20%23TypeScript%20%40basarat%20%F0%9F%8C%B9"
            target="_blank">
            <h2 className={style(csstips.margin(0))}># TypeStyle 🌹</h2>
          </a>

          <div className={style(csstips.flex)} />

          <a
            className={style({ whiteSpace: 'nowrap', textDecoration: 'none', color: 'white', $nest: { '&:hover': { textDecoration: 'underline' } } })}
            href="http://typestyle.io/#/play"
            target="_blank">
            <h4 className={style(csstips.margin(0))}>Help</h4>
          </a>

          <a className={style(media({ minWidth: 0, maxWidth: 500 }, { display: 'none' }))}>
            <iframe src="https://ghbtns.com/github-btn.html?user=typestyle&repo=typestyle&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
          </a>
        </gls.ContentHorizontalMargined>
      </div >
    );
  }
}

const baseBgColor = color('#343436');

const styledEntry = style({
    width: '100%',
    height: '100%',
    backgroundColor: '#272822',
    color: '#f8f8f2',
    fontSize: 16,
    fontFamily: 'consolas, menlo, monospace',
    padding: rem(.7)
});

const buttonClass = style({
    borderRadius: rem(.5),
    borderColor: baseBgColor.toHexString(),
    backgroundColor: baseBgColor.darken(.2).toHexString(),
    color: baseBgColor.invert().lighten(.2).toHexString(),
    cursor: 'pointer',
    outline: 'none',
    $nest: {
        '&:hover': {
            backgroundColor: baseBgColor.darken(.1).toHexString()
        }
    }
});


/**
 * Provides a nice demo / test component 
 */
@observer
export class Demo extends React.Component<{}, { cssContents?: string, tsContents?: string }> {
    constructor(props) {
        super(props);
        this.state = {
            cssContents: '',
            tsContents: ''
        };
    }
    onConvertToTypeStyle = () => {
        const cssToConvert = this.state.cssContents;
        convertCss(cssToConvert).then((tsContents) => {
            this.setState({ tsContents });
        });
    }
    onCssContentChange = (event) => {
        this.setState({cssContents: event.target.value});
    }
    render() {
        return <cp.FlexHorizontal className={style({ backgroundColor: baseBgColor.toHexString(), alignItems: 'stretch' })}>
            <div className={style({ flexBasis: '100%' })}>
                <textarea placeholder="Paste css here"
                    className={styledEntry}
                    autoFocus
                    value={this.state.cssContents}
                    onChange={this.onCssContentChange}></textarea>
            </div>
            <div className={style({ padding: rem(1) })}>
                <button className={buttonClass} onClick={this.onConvertToTypeStyle}>Convert!</button>
            </div>
            <div className={style({ flexBasis: '100%' })}>
                <textarea placeholder="Copy TypeStyle from here" className={styledEntry} readOnly value={this.state.tsContents}></textarea>
            </div>
        </cp.FlexHorizontal>
    }
}

ReactDOM.render(<div className={style(csstips.fillParent, csstips.vertical)}>
  <HeaderSmall />
  <Demo />
</div>, document.getElementById('root'));