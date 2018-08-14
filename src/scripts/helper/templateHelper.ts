declare var jQuery: any;
declare var nunjucks: any;
declare var app_settings: any;

class TemplateHelper {
    private templateUrl: any = app_settings.dist_url + 'templates';
    private templateTrigger: any = jQuery('[data-template]');


    public init() {
        nunjucks.configure(this.templateUrl, {autoescape: true});

        console.log('hund');
    }


    /**
     *
     * @param obj
     * @param src
     */
    public mergeObjects(obj, src) {
        Object.keys(src).forEach(function (key) {
            obj[key] = src[key];
        });
        return obj;
    }


    /**
     *
     * @param templateName
     * @param additionalData
     * @param callback
     */
    public getTemplate(templateName, additionalData, callback) {
        const _this = this;

        jQuery.getJSON(this.templateUrl + '/' + templateName + '.json', function (json) {
            if (!json) {
                return false;
            }

            let templateData = this.mergeObjects(json, additionalData);
            let template = nunjucks.render(templateName + '.html', {items: templateData});

            return callback(template, templateData);
        });
    }
}