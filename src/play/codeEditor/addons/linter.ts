import { cssRaw } from 'typestyle';
import CM = require('codemirror');
import { demoState } from '../../playState';
import * as escape from 'escape-html';
let CodeMirror = CM;

// Docs https://codemirror.net/doc/manual.html#addon_lint
cssRaw(require('codemirror/addon/lint/lint.css'));
import lint = require('./lint');
var _import = lint;
cssRaw(require('./lint.css'));

/** Enable linter for this code mirror */
export function setupOptions(options: any, filePath: string) {
  options.lint = new Linter(filePath).lint;
}

interface LintError {
  message: string,
  /** 'error' (default) | 'warning' */
  severity?: string,
  from: CM.Position,
  to: CM.Position
}

function codeErrorToLintError(codeError: CodeError): LintError {
  return {
    message: codeError.message,
    severity: 'error',
    from: CodeMirror.Pos(codeError.from.line, codeError.from.ch),
    to: CodeMirror.Pos(codeError.to.line, codeError.to.ch)
  };
}

class Linter {
  constructor(public filePath: string) {
  }

  lint = (doc: string, options: any, cm: CodeMirror.Editor) => {
    let rawErrors = demoState.currentErrors;
    let errors: LintError[] = rawErrors.map(codeErrorToLintError);
    // this.updateInlineWidgets(cm,
    //   /** only first */
    //   rawErrors.filter((x, i) => !i)
    // ); // If you want to enable inline error linting
    return errors;
  }

  // based on view-source:https://codemirror.net/demo/widget.html
  widgets = []
  updateInlineWidgets(editor: any, codeErrors: CodeError[]) {
    let widgets = this.widgets;
    editor.operation(function() {
      for (var i = 0; i < widgets.length; ++i) {
        editor.removeLineWidget(widgets[i]);
      }
      widgets.length = 0;

      for (var i = 0; i < codeErrors.length; ++i) {
        var err = codeErrors[i];

        var msg = document.createElement("div");

        msg.style.display = 'inline-block';

        msg.innerHTML = `<div style="font-size: 12px; padding: 3px; background-color: black;">
                    🐛 ${escape(err.message)}
                </div>`;

        widgets.push(editor.addLineWidget(err.from.line, msg, { coverGutter: false, noHScroll: true }));
      }
    });

    var info = editor.getScrollInfo();
    var after = editor.charCoords({ line: editor.getDoc().getCursor().line + 1, ch: 0 }, "local").top;
    if (info.top + info.clientHeight < after) {
      editor.scrollTo(null, after - info.clientHeight + 3);
    }
  }
}