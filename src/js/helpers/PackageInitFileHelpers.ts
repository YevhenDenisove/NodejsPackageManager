export class PackageInitFileHelpers {
    scope: any;

    constructor(scope: any) {
        this.scope = scope;
    }

    getJsonContent() {
        const packageManager: string = this.scope.$root.activeActivityBarMenuItem.packageManager;

        if (packageManager === 'npm') {
            return this.packageNpm();
        } else if (packageManager === 'bower') {
            return this.packageBower();
        }
    }

    private packageNpm(): string {
        var formValues: any = this.scope.form['npm'];
        var scriptCommandInputs: any = this.scope.scriptCommandInputs;
        let author: string = `${formValues.author_name} <${formValues.author_email}> (${formValues.author_url})`;
        author = author.replace(/undefined/g, '').replace(' <>', '').replace(' ()', '');

        const result: any = {
            name: formValues.name,
            version: formValues.version,
            description: formValues.description
        }

        if (formValues.main !== undefined && formValues.main !== '') {
            result['main'] = formValues.main;
        }

        if (scriptCommandInputs.length > 0) {
            result.scripts = {};

            scriptCommandInputs.forEach((value: any, i: number) => {
                result.scripts[value.script_key] = value.script_value;
            });
        }

        if (formValues.repository_type !== undefined && formValues.repository_type !== '' && formValues.repository_url !== undefined && formValues.repository_url !== '') {
            result.repository = {};
            result.repository['type'] = formValues.repository_type;
            result.repository['url'] = formValues.repository_url;
        }

        if (formValues.keywords !== undefined && formValues.keywords !== '') {
            result.keywords = [];

            if (formValues.keywords.indexOf(',') === -1) {
                result.keywords.push(formValues.keywords.trim());
            } else {
                formValues.keywords.split(',').forEach((value: any, i: number) => {
                    result.keywords.push(value.trim());
                });
            }
        }

        if (author !== undefined && author !== '') {
            result.author = author;
        }

        if (formValues.license !== undefined && formValues.license !== '') {
            result.license = formValues.license;
        }

        result.private = formValues.private === 'true';

        if (formValues.bugs_url !== undefined && formValues.bugs_url !== '') {
            result.bugs = {};
            result.bugs['url'] = formValues.bugs_url;
        }

        if (formValues.homepage !== undefined && formValues.homepage !== '') {
            result.homepage = formValues.homepage;
        }

        return JSON.stringify(result, null, 2);
    }

    private packageBower() {
        var formValues: any = this.scope.form['bower'];

        const result: any = {
            name: formValues.name,
            version: formValues.version,
            description: formValues.description
        }

        if (formValues.main !== undefined && formValues.main !== '') {
            result['main'] = formValues.main;
        }

        if (formValues.authors !== undefined && formValues.authors !== '') {
            result.authors = [];

            if (formValues.authors.indexOf(',') === -1) {
                result.authors.push(formValues.authors.trim());
            } else {
                formValues.authors.split(',').forEach((value: any, i: number) => {
                    result.authors.push(value.trim());
                });
            }
        }

        if (formValues.keywords !== undefined && formValues.keywords !== '') {
            result.keywords = [];

            if (formValues.keywords.indexOf(',') === -1) {
                result.keywords.push(formValues.keywords.trim());
            } else {
                formValues.keywords.split(',').forEach((value: any, i: number) => {
                    result.keywords.push(value.trim());
                });
            }
        }

        if (formValues.license !== undefined && formValues.license !== '') {
            result.license = formValues.license;
        }

        result.private = formValues.private === 'true';

        if (formValues.homepage !== undefined && formValues.homepage !== '') {
            result.homepage = formValues.homepage;
        }

        if (formValues.ignore !== undefined && formValues.ignore !== '') {
            result.ignore = [];

            if (formValues.ignore.indexOf(',') === -1) {
                result.ignore.push(formValues.ignore.trim());
            } else {
                formValues.ignore.split(',').forEach((value: any, i: number) => {
                    result.ignore.push(value.trim());
                });
            }
        }

        return JSON.stringify(result, null, 2);
    }
}