import * as ts from 'byots';
import * as lsh from './languageServiceHost';
import * as fuzzaldrin from 'fuzzaldrin';
import * as utils from '../utils';

const languageServiceHost = new lsh.LanguageServiceHost(undefined, {
  allowNonTsExtensions: true,
  allowJs: true,
  noLib: false,
});
const languageService = ts.createLanguageService(languageServiceHost, ts.createDocumentRegistry());

export function addFile(filePath: string, contents: string) {
  languageServiceHost.addScript(filePath, contents);
}
export function removeFile(filePath: string) {
  languageServiceHost.removeFile(filePath);
}
export function editFile(filePath: string, codeEdit: CodeEdit) {
  languageServiceHost.applyCodeEdit(filePath, codeEdit.from, codeEdit.to, codeEdit.newText);
}
export function setContents(filePath: string, contents: string) {
  languageServiceHost.setContents(filePath, contents);
}
export function getLineAndCharacterOfPosition(filePath: string, pos: number): EditorPosition {
  return languageServiceHost.getLineAndCharacterOfPosition(filePath, pos);
}
export function getPositionOfLineAndCharacter(filePath: string, line: number, ch: number): number {
  return languageServiceHost.getPositionOfLineAndCharacter(filePath, line, ch);
}


/**
 * 
 * 
 * 
 * TRUE project service stuff
 * 
 * 
 * 
 */
export function getCompletionsAtPosition(query: Types.GetCompletionsAtPositionQuery): Types.GetCompletionsAtPositionResponse {
  const {filePath, position, prefix} = query;
  const service = languageService;

  const completions: ts.CompletionInfo = service.getCompletionsAtPosition(filePath, position);
  let completionList = completions ? completions.entries.filter(x => !!x) : [];
  const endsInPunctuation = utils.prefixEndsInPunctuation(prefix);

  if (prefix.length && prefix.trim().length && !endsInPunctuation) {
    // Didn't work good for punctuation
    completionList = fuzzaldrin.filter(completionList, prefix.trim(), { key: 'name' });
  }

  /** Doing too many suggestions is slowing us down in some cases */
  let maxSuggestions = 50;
  /** Doc comments slow us down tremendously */
  let maxDocComments = 10;

  // limit to maxSuggestions
  if (completionList.length > maxSuggestions) completionList = completionList.slice(0, maxSuggestions);

  // Potentially use it more aggresively at some point
  // This queries the langauge service so its a bit slow
  function docComment(c: ts.CompletionEntry): {
    /** The display parts e.g. (a:number)=>string */
    display: string;
    /** The doc comment */
    comment: string;
  } {
    const completionDetails = languageService.getCompletionEntryDetails(filePath, position, c.name);
    const comment = ts.displayPartsToString(completionDetails.documentation || []);

    // Show the signatures for methods / functions
    var display: string;
    if (c.kind == "method" || c.kind == "function" || c.kind == "property") {
      let parts = completionDetails.displayParts || [];
      // don't show `(method)` or `(function)` as that is taken care of by `kind`
      if (parts.length > 3) {
        parts = parts.splice(3);
      }
      display = ts.displayPartsToString(parts);
    }
    else {
      display = '';
    }
    display = display.trim();

    return { display: display, comment: comment };
  }

  let completionsToReturn: Completion[] = completionList.map((c, index) => {
    if (index < maxDocComments) {
      var details = docComment(c);
    }
    else {
      details = {
        display: '',
        comment: ''
      }
    }
    return {
      name: c.name,
      kind: c.kind,
      comment: details.comment,
      display: details.display
    };
  });

  /**
   * Add function signature help
   */
  if (query.prefix == '(') {
    const signatures = service.getSignatureHelpItems(query.filePath, query.position);
    if (signatures && signatures.items) {
      signatures.items.forEach((item) => {
        const template: string = item.parameters.map((p, i) => {
          const display = '${' + (i + 1) + ':' + ts.displayPartsToString(p.displayParts) + '}';
          return display;
        }).join(ts.displayPartsToString(item.separatorDisplayParts));

        const name: string = item.parameters.map((p) => ts.displayPartsToString(p.displayParts))
          .join(ts.displayPartsToString(item.separatorDisplayParts));

        // e.g. test(something:string):any;
        // prefix: test(
        // template: ${something}
        // suffix: ): any;
        const description: string =
          ts.displayPartsToString(item.prefixDisplayParts)
          + template
          + ts.displayPartsToString(item.suffixDisplayParts);

        completionsToReturn.unshift({
          snippet: {
            template,
            name,
            description: description
          }
        });
      });
    }
  }

  return {
    completions: completionsToReturn,
    endsInPunctuation: endsInPunctuation
  };
}

/**
 * General utility interfaces
 */
export namespace Types {

  /** Used a lot in project service */
  export interface FilePathPositionQuery {
    filePath: string;
    position: number;
  }

  /**
   * Completions stuff
   */
  export interface GetCompletionsAtPositionQuery extends FilePathPositionQuery {
    prefix: string;
  }
  export interface GetCompletionsAtPositionResponse {
    completions: Completion[];
    endsInPunctuation: boolean;
  }
}