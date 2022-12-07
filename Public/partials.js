(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['marker_popup'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">\r\n<div id=\"desc-container\">\r\n    <div class=\"plantName\">\r\n        <h2 class=\"plant-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"marker_name") || (depth0 != null ? lookupProperty(depth0,"marker_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"marker_name","hash":{},"data":data,"loc":{"start":{"line":4,"column":32},"end":{"line":4,"column":47}}}) : helper)))
    + "</h2>\r\n    </div>\r\n    <div class=\"plantImg\">\r\n        <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"marker_image") || (depth0 != null ? lookupProperty(depth0,"marker_image") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"marker_image","hash":{},"data":data,"loc":{"start":{"line":7,"column":18},"end":{"line":7,"column":34}}}) : helper)))
    + "\">\r\n    </div>\r\n    <div id=\"plantDesc\" contenteditable=\"false\"> \r\n        "
    + alias4(((helper = (helper = lookupProperty(helpers,"marker_description") || (depth0 != null ? lookupProperty(depth0,"marker_description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"marker_description","hash":{},"data":data,"loc":{"start":{"line":10,"column":8},"end":{"line":10,"column":30}}}) : helper)))
    + "\r\n    </div>\r\n    <p>Location: "
    + alias4(((helper = (helper = lookupProperty(helpers,"marker_long") || (depth0 != null ? lookupProperty(depth0,"marker_long") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"marker_long","hash":{},"data":data,"loc":{"start":{"line":12,"column":17},"end":{"line":12,"column":32}}}) : helper)))
    + ", "
    + alias4(((helper = (helper = lookupProperty(helpers,"marker_lat") || (depth0 != null ? lookupProperty(depth0,"marker_lat") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"marker_lat","hash":{},"data":data,"loc":{"start":{"line":12,"column":34},"end":{"line":12,"column":48}}}) : helper)))
    + "</p>\r\n    \r\n    <button type=\"button\" id=\"modal-close\" class=\"modal-hide-button\">&times;</button>\r\n    <button type=\"button\" id=\"expert-button\">Suggest Edits</button>\r\n    <button type=\"button\" id=\"save-button\">Save Changes</button>\r\n\r\n    <div id=\"voting-container\"> \r\n        <button class=\"fa fa-toggle-up\" id=\"upvote-arrow\" id=\"arrow\" style=\"font-size:24px\"></button>\r\n        <p> 0pp </p>\r\n        <button class=\"fa fa-toggle-down\" id=\"downvote-arrow\" id=\"arrow\" style=\"font-size:24px\"></button>\r\n    </div>\r\n</div>";
},"useData":true});
templates['myMarker'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<article class=\"marker\">\r\n  <div class=\"marker-content\">\r\n   <p class=\"plant-name\">\r\n      <a>"
    + alias4(((helper = (helper = lookupProperty(helpers,"marker_name") || (depth0 != null ? lookupProperty(depth0,"marker_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"marker_name","hash":{},"data":data,"loc":{"start":{"line":4,"column":9},"end":{"line":4,"column":24}}}) : helper)))
    + "</a>\r\n  </p>\r\n\r\n  <p class=\"plant-location\">\r\n      Longitude: "
    + alias4(((helper = (helper = lookupProperty(helpers,"marker_long") || (depth0 != null ? lookupProperty(depth0,"marker_long") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"marker_long","hash":{},"data":data,"loc":{"start":{"line":8,"column":17},"end":{"line":8,"column":32}}}) : helper)))
    + " | Latitude: "
    + alias4(((helper = (helper = lookupProperty(helpers,"marker_lat") || (depth0 != null ? lookupProperty(depth0,"marker_lat") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"marker_lat","hash":{},"data":data,"loc":{"start":{"line":8,"column":45},"end":{"line":8,"column":59}}}) : helper)))
    + "\r\n  </p>\r\n  <p class=\"marker-description\">\r\n      "
    + alias4(((helper = (helper = lookupProperty(helpers,"marker_description") || (depth0 != null ? lookupProperty(depth0,"marker_description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"marker_description","hash":{},"data":data,"loc":{"start":{"line":11,"column":6},"end":{"line":11,"column":28}}}) : helper)))
    + "\r\n  </p>\r\n  \r\n  </div>    \r\n  <div class=\"plant-img\">\r\n        <img src=\"../../"
    + alias4(((helper = (helper = lookupProperty(helpers,"marker_image") || (depth0 != null ? lookupProperty(depth0,"marker_image") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"marker_image","hash":{},"data":data,"loc":{"start":{"line":16,"column":24},"end":{"line":16,"column":40}}}) : helper)))
    + "\">\r\n  </div>\r\n</article>";
},"useData":true});
templates['onePost'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<main id=\"workspace\">\r\n    <div class='title-contents'>\r\n        <div class='title'>\r\n            <a>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":4,"column":15},"end":{"line":4,"column":24}}}) : helper)))
    + "</a>\r\n        </div>\r\n        <div class='title-username'>\r\n            <a>"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":7,"column":15},"end":{"line":7,"column":27}}}) : helper)))
    + "</a>\r\n        </div>\r\n    </div>\r\n</main>";
},"useData":true});
templates['rankedUser'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"content\">\r\n    <a class=\"avatar\" href=\"/users/"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":2,"column":35},"end":{"line":2,"column":47}}}) : helper)))
    + "\">\r\n        <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"image_url") || (depth0 != null ? lookupProperty(depth0,"image_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_url","hash":{},"data":data,"loc":{"start":{"line":3,"column":18},"end":{"line":3,"column":31}}}) : helper)))
    + "\"/>\r\n    </a>        \r\n    <div class=\"rank-info\"> \r\n        <a class=\"name\" href=\"/users/"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":6,"column":37},"end":{"line":6,"column":49}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":6,"column":51},"end":{"line":6,"column":63}}}) : helper)))
    + "</a>\r\n    </div>\r\n    <div class=\"points\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"plant_points") || (depth0 != null ? lookupProperty(depth0,"plant_points") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"plant_points","hash":{},"data":data,"loc":{"start":{"line":8,"column":24},"end":{"line":8,"column":40}}}) : helper)))
    + "</div>\r\n</div>";
},"useData":true});
templates['userProfile'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"top-half\"></div>\r\n    <a class=\"avatar\" id=\"profile-picture\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"profileUrl") || (depth0 != null ? lookupProperty(depth0,"profileUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profileUrl","hash":{},"data":data,"loc":{"start":{"line":2,"column":49},"end":{"line":2,"column":63}}}) : helper)))
    + "\">\r\n        <img src=\"../"
    + alias4(((helper = (helper = lookupProperty(helpers,"pfpUrl") || (depth0 != null ? lookupProperty(depth0,"pfpUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pfpUrl","hash":{},"data":data,"loc":{"start":{"line":3,"column":21},"end":{"line":3,"column":31}}}) : helper)))
    + "\">\r\n    </a>        \r\n    <div class=\"profile-username\"> \r\n        <a class=\"username\" href=\"/users/"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":6,"column":41},"end":{"line":6,"column":53}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":6,"column":55},"end":{"line":6,"column":67}}}) : helper)))
    + "\r\n        <div class=\"date-joined\"> Joined "
    + alias4(((helper = (helper = lookupProperty(helpers,"dateJoined") || (depth0 != null ? lookupProperty(depth0,"dateJoined") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"dateJoined","hash":{},"data":data,"loc":{"start":{"line":7,"column":41},"end":{"line":7,"column":55}}}) : helper)))
    + "</div></a>\r\n    </div>\r\n</div>\r\n<div class=\"bottom-half\">\r\n    <br><br><br><br>\r\n    <div class=\"points\" id=\"profile-points\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"profilePoints") || (depth0 != null ? lookupProperty(depth0,"profilePoints") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profilePoints","hash":{},"data":data,"loc":{"start":{"line":12,"column":44},"end":{"line":12,"column":61}}}) : helper)))
    + "</div>\r\n    <br><br><br>\r\n    <a class=\"user-markers\" href=\"#\"> Your Markers</a>\r\n</div>";
},"useData":true});
})();