import * as ts from 'byots';
import * as lsh from './languageServiceHost';
/**
 * A simpler project, wraps LanguageServiceHost and LanguageService
 * with default options we need for config purposes
 */
class Project {
    languageService: ts.LanguageService;
    languageServiceHost: lsh.LanguageServiceHost;
    constructor() {
        this.languageServiceHost = new lsh.LanguageServiceHost(undefined, {
            allowNonTsExtensions: true,
            allowJs: true,
            noLib: false,
        });
        this.languageService = ts.createLanguageService(this.languageServiceHost, ts.createDocumentRegistry());
    }
}
export const project = new Project();