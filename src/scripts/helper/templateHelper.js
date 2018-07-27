var TemplateHelper = function (){
  this.templateUrl = app_settings.dist_url + 'templates';
  this.templateTrigger = jQuery('[data-template]');

  nunjucks.configure(this.templateUrl, {autoescape: true});

  // Merge two Objects
  this.extend = function (obj, src){
    Object.keys(src).forEach(function (key){
      obj[key] = src[key];
    });
    return obj;
  };
};


/**
 * use <div data-template="[templateName]"></div>
 * to add a custom template
 * @returns {boolean}
 */
TemplateHelper.prototype.init = function (){
  const _this = this;
  if (this.templateTrigger.length === 0){
    return false;
  }

  jQuery.each(this.templateTrigger, function (k, v){
    var $templateContainer = jQuery(this);
    var templateName = $templateContainer.attr('data-template');

    _this.getTemplate(templateName, {}, function (template, json){
      $templateContainer.html(template);
    });
  });
};


/**
 * Get JSON by Template Name
 * merge Custom Data into JSON
 * return rendered Template and JSON
 *
 * @param templateName
 * @param additionalData
 * @param callback
 */
TemplateHelper.prototype.getTemplate = function (templateName, additionalData, callback){
  const _this = this;

  jQuery.getJSON(this.templateUrl + '/' + templateName + '.json', function (json){
    if (!json){
      return false;
    }

    var templateData = _this.extend(json, additionalData);
    var template = nunjucks.render(templateName + '.html', {items: templateData});

    return callback(template, templateData);
  });

};