// Code
import CodeMirror = require('codemirror');
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as csx from "typestyle/csx";
import { style, classes, cssRaw } from "typestyle";
import * as ts from 'byots';
import * as utils from '../utils';


// CSS
cssRaw(require('codemirror/lib/codemirror.css'));
cssRaw(require('codemirror/theme/monokai.css'));
cssRaw(require('codemirror/addon/fold/foldgutter.css'));
// Css overrides
cssRaw(`
/* Make code mirror flex boxy */
.CodeMirror {
    display: flex;
    flex-direction: column;
    flex: 1;
}
.CodeMirror-scroll {
    flex: 1;
}

/** Bigger, better font */
.CodeMirror {
  font-size: 16px;
  font-family: consolas, menlo, monospace; 
}

/* Make code mirror selections a bit more popping */
.cm-s-monokai div.CodeMirror-selected {
    background: #58574B;
}

/* matchbrackets addon */
.cm-s-monokai .CodeMirror-matchingbracket {
    color: #4f0 !important;
    background-color: #32332b;
    text-decoration: none;
}
.cm-s-monokai .CodeMirror-nonmatchingbracket {
    background-color: #32332b;
}

/* cm-s-monokai has nothing for qualifier */
.cm-s-monokai span.cm-qualifier { color: rgb(0, 208, 255); }

/* make overrite (insert) mode visually different */
.CodeMirror-overwrite .CodeMirror-cursor{
    border-left:2px solid red !important;
}

/* match-highlight from demo : https://codemirror.net/demo/matchhighlighter.html */
.cm-matchhighlight {
    text-decoration: underline;
}

/* tag matching is a bit too bold. Dull it down a bit */
.CodeMirror-matchingtag {
    background: rgba(0, 150, 150, .3);
}

/* Code folding style from graphiql */
.CodeMirror-foldmarker {
  border-radius: 4px;
  background: #08f;
  background: -webkit-linear-gradient(#43A8FF, #0F83E8);
  background:         linear-gradient(#43A8FF, #0F83E8);

  color: white;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0, 0, 0, 0.1);
     -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0, 0, 0, 0.1);
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  font-family: arial;
  line-height: 0;
  padding: 0px 4px 1px;
  font-size: 12px;
  margin: 0 3px;
  text-shadow: 0 -1px rgba(0, 0, 0, 0.1);
}
`)

/**
 *  addons
 */
// keymap
require('codemirror/keymap/sublime');
// comments (single / multiline)
require('codemirror/addon/comment/comment');
// code folding
require('codemirror/addon/fold/foldcode');
require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/brace-fold');
require('codemirror/addon/fold/xml-fold');
require('codemirror/addon/fold/markdown-fold');
require('codemirror/addon/fold/comment-fold');
// require('codemirror/addon/fold/foldgutter.css');
// Highlight active line
require('codemirror/addon/selection/active-line');
// Highlight matching brackets
require('codemirror/addon/edit/matchbrackets');
// Auto close brackets and strings
require('codemirror/addon/edit/closebrackets');
// Auto match tags (great for TSX!)
require('codemirror/addon/edit/matchtags');
// Auto highlight same words selected
require('codemirror/addon/search/match-highlighter');

const mode = 'jsx';
require('codemirror/mode/jsx/jsx');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');

import autocomplete = require('./addons/autocomplete/autocomplete');
import linter = require('./addons/linter');

interface Props {
  onFocusChange?: (focused: boolean) => any;
  readOnly?: boolean | "nocursor";
  preview?: ts.TextSpan;
  value: string;
  onChange: (value: string) => any;
  onCodeEdit: (codeEdit: CodeEdit) => any;
  filePath: string;
}

export class CodeEditor extends React.Component<Props, { isFocused: boolean }>{
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false
    };
  }

  codeMirror: CodeMirror.EditorFromTextArea;
  refs: {
    [string: string]: any;
    textarea: any;
  }

  /** Ready after the doc is loaded */
  ready = false;
  afterReadyQueue: { (): void }[] = [];
  /** If already ready it execs ... otherwise waits */
  afterReady = (cb: () => void) => {
    if (this.ready) cb();
    else {
      this.afterReadyQueue.push(cb);
    }
  }

  componentDidMount() {

    var options: CodeMirror.EditorConfiguration = {
      mode: mode,

      lineNumbers: true,
      keyMap: 'sublime',
      theme: 'monokai',
      indentUnit: 2,

      // Soft tabs (tabs to spaces):
      // https://github.com/codemirror/CodeMirror/issues/988#issuecomment-37692827
      extraKeys: {
        Tab: function(cm) {
          if (cm.doc.somethingSelected()) {
            return CodeMirror.Pass;
          }
          var spacesPerTab = cm.getOption("indentUnit");
          var spacesToInsert = spacesPerTab - (cm.doc.getCursor("start").ch % spacesPerTab);
          var spaces = Array(spacesToInsert + 1).join(" ");
          cm.replaceSelection(spaces, "end", "+input");
        },
        'Ctrl-Space': "autocomplete"
      },

      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],

      // Active line addon
      styleActiveLine: true,

      // Match bracket addon
      matchBrackets: true,

      // match-highlighter
      highlightSelectionMatches: { showToken: /\w/ },

      // Auto close brackets and strings
      autoCloseBrackets: true,

      // Match tags (great for tsx!)
      // Doesn't work right now.
      // It needs `tag` token to work (see code in `xml-fold.js` i.e. `/\btag\b/``)
      matchTags: { bothTags: true },

      /** Overcomes horizontal scrolling for now */
      lineWrapping: true,
    } as any;

    // setup hint / autocomplete options
    autocomplete.setupOptions(options, this.props.filePath);

    // lint
    linter.setupOptions(options, this.props.filePath);

    var textareaNode = ReactDOM.findDOMNode(this.refs.textarea);
    this.codeMirror = CodeMirror.fromTextArea(textareaNode as HTMLTextAreaElement, options);
    this.codeMirror.on('focus', this.focusChanged.bind(this, true));
    this.codeMirror.on('blur', this.focusChanged.bind(this, false));

    // also lint on errors changing
    this.codeMirror.on('change', utils.debounce(() => { 
      this.codeMirror && (this.codeMirror as any).performLint();
    },2000));

    // Make hint / autocomplete more aggresive
    autocomplete.setupCodeMirror(this.codeMirror);

    this.codeMirror.on('change', this.codemirrorValueChanged);
    this._currentCodemirrorValue = this.props.value || '';
    this.codeMirror.setValue(this._currentCodemirrorValue);

    (this.codeMirror.getDoc() as any).on('beforeChange', (doc: CodeMirror.Doc, change: CodeMirror.EditorChange) => {

      // This is just the user pressing backspace on an empty file.
      // If we let it go through then the classifier cache will crash.
      // So abort
      if (change.from.line === change.to.line && change.from.ch === change.to.ch && change.text.length === 1 && change.text[0].length === 0) {
        return;
      }

      let codeEdit: CodeEdit = {
        from: { line: change.from.line, ch: change.from.ch },
        to: { line: change.to.line, ch: change.to.ch },
        newText: change.text.join('\n'),
        sourceId: ''
      };

      this.props.onCodeEdit(codeEdit);
    });

    setTimeout(() => this.codeMirror.refresh(), 500);// Needed to resize gutters correctly
  }

  componentWillUnmount() {
    // todo: is there a lighter-weight way to remove the cm instance?
    if (this.codeMirror) {
      this.codeMirror.toTextArea();
			/**
			 * Very hacky way to unlink docs from CM
			 * If we don't do this then the doc stays in memory and so does cm :-/
			 */
      (this.codeMirror.getDoc() as any).cm = null;
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.codeMirror && nextProps.value !== undefined && this._currentCodemirrorValue != nextProps.value.toString()) {
      this.codeMirror.setValue(nextProps.value);
    }
  }

  _currentCodemirrorValue: string;
  codemirrorValueChanged = (doc, change) => {
    const newValue = doc.getValue();
    this._currentCodemirrorValue = newValue;
    this.props.onChange && this.props.onChange(newValue);
  }

  getCodeMirror() {
    return this.codeMirror;
  }

  focusChanged = (focused) => {
    this.setState({
      isFocused: focused
    });
    this.props.onFocusChange && this.props.onFocusChange(focused);
  }

  getValue() {
    return this.codeMirror.getDoc().getValue();
  }

  render() {
    var className = 'ReactCodeMirror';
    if (this.state.isFocused) {
      className += ' ReactCodeMirror--focused';
    }
    return (
      <div className={classes(className, style(csx.vertical, csx.flex, { position: 'relative' }))}>
        <textarea ref="textarea" autoComplete="false" />
      </div>
    );
  }

}