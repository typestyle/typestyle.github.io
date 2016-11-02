import * as ts from 'byots';
import * as lsh from './languageServiceHost';


const languageServiceHost = new lsh.LanguageServiceHost(undefined, {
  allowNonTsExtensions: true,
  allowJs: true,
  noLib: false,
});
const languageService = ts.createLanguageService(languageServiceHost, ts.createDocumentRegistry());

export function addFile(filePath: string, contents: string) {
    languageServiceHost.addScript(filePath, contents);
}
export function removeFile(filePath: string){
    languageServiceHost.removeFile(filePath);
}
export function editFile(filePath: string, codeEdit: CodeEdit) {
    languageServiceHost.applyCodeEdit(filePath, codeEdit.from, codeEdit.to, codeEdit.newText);
}
export function setContents(filePath: string, contents: string) {
    languageServiceHost.setContents(filePath,contents);
}
export function getLineAndCharacterOfPosition(filePath: string, pos: number): EditorPosition {
    return languageServiceHost.getLineAndCharacterOfPosition(filePath, pos);
}
export function getPositionOfLineAndCharacter(filePath: string, line: number, ch: number): number {
    return languageServiceHost.getPositionOfLineAndCharacter(filePath, line, ch);
}