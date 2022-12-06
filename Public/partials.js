(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['markdesc'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!--\r\n<div class=\"desc\">\r\n    <div class=\"plantImg\">\r\n        <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"plantImgURL") || (depth0 != null ? lookupProperty(depth0,"plantImgURL") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"plantImgURL","hash":{},"data":data,"loc":{"start":{"line":4,"column":18},"end":{"line":4,"column":33}}}) : helper)))
    + "\">\r\n    </div>\r\n    <div class=\"plantName\">\r\n        <h2>"
    + alias4(((helper = (helper = lookupProperty(helpers,"plantName") || (depth0 != null ? lookupProperty(depth0,"plantName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"plantName","hash":{},"data":data,"loc":{"start":{"line":7,"column":12},"end":{"line":7,"column":25}}}) : helper)))
    + "</h2>\r\n    </div>\r\n    <div class=\"line\"></div>\r\n    <div class=\"plantDesc\"> "
    + alias4(((helper = (helper = lookupProperty(helpers,"plantDesc") || (depth0 != null ? lookupProperty(depth0,"plantDesc") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"plantDesc","hash":{},"data":data,"loc":{"start":{"line":10,"column":28},"end":{"line":10,"column":41}}}) : helper)))
    + ", "
    + alias4(((helper = (helper = lookupProperty(helpers,"plantLat") || (depth0 != null ? lookupProperty(depth0,"plantLat") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"plantLat","hash":{},"data":data,"loc":{"start":{"line":10,"column":43},"end":{"line":10,"column":55}}}) : helper)))
    + ", "
    + alias4(((helper = (helper = lookupProperty(helpers,"plantLong") || (depth0 != null ? lookupProperty(depth0,"plantLong") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"plantLong","hash":{},"data":data,"loc":{"start":{"line":10,"column":57},"end":{"line":10,"column":70}}}) : helper)))
    + " </div>\r\n</div>\r\n\r\n-->\r\n";
},"useData":true});
templates['marker_popup'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"desc-container\">\r\n    <div class=\"plantName\">\r\n        <h2 class=\"plant-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"marker_name") || (depth0 != null ? lookupProperty(depth0,"marker_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"marker_name","hash":{},"data":data,"loc":{"start":{"line":3,"column":32},"end":{"line":3,"column":47}}}) : helper)))
    + "</h2>\r\n    </div>\r\n    <div class=\"plantImg\">\r\n        <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"marker_image") || (depth0 != null ? lookupProperty(depth0,"marker_image") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"marker_image","hash":{},"data":data,"loc":{"start":{"line":6,"column":18},"end":{"line":6,"column":34}}}) : helper)))
    + "\">\r\n    </div>\r\n    <div id=\"plantDesc\" contenteditable=\"false\"> \r\n        "
    + alias4(((helper = (helper = lookupProperty(helpers,"marker_description") || (depth0 != null ? lookupProperty(depth0,"marker_description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"marker_description","hash":{},"data":data,"loc":{"start":{"line":9,"column":8},"end":{"line":9,"column":30}}}) : helper)))
    + "\r\n    </div>\r\n    <p>Location: "
    + alias4(((helper = (helper = lookupProperty(helpers,"marker_long") || (depth0 != null ? lookupProperty(depth0,"marker_long") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"marker_long","hash":{},"data":data,"loc":{"start":{"line":11,"column":17},"end":{"line":11,"column":32}}}) : helper)))
    + ", "
    + alias4(((helper = (helper = lookupProperty(helpers,"marker_lat") || (depth0 != null ? lookupProperty(depth0,"marker_lat") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"marker_lat","hash":{},"data":data,"loc":{"start":{"line":11,"column":34},"end":{"line":11,"column":48}}}) : helper)))
    + "</p>\r\n    \r\n    <button type=\"button\" id=\"modal-close\" class=\"modal-hide-button\">&times;</button>\r\n    <button type=\"button\" id=\"expert-button\">Suggest Edits</button>\r\n    <button type=\"button\" id=\"save-button\">Save Changes</button>\r\n</div>";
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

  return "<main id=\"workspace\">\n    <div class='title-contents'>\n        <div class='title'>\n            <a>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":4,"column":15},"end":{"line":4,"column":24}}}) : helper)))
    + "</a>\n        </div>\n        <div class='title-username'>\n            <a>"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":7,"column":15},"end":{"line":7,"column":27}}}) : helper)))
    + "</a>\n        </div>\n    </div>\n</main>";
},"useData":true});
templates['rankedUser'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"content\">\r\n    <a class=\"avatar\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":2,"column":28},"end":{"line":2,"column":40}}}) : helper)))
    + "\">\r\n        <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"pfpUrl") || (depth0 != null ? lookupProperty(depth0,"pfpUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pfpUrl","hash":{},"data":data,"loc":{"start":{"line":3,"column":18},"end":{"line":3,"column":28}}}) : helper)))
    + "\">\r\n    </a>        \r\n    <div class=\"rank-info\"> \r\n        <a class=\"name\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":6,"column":30},"end":{"line":6,"column":42}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":6,"column":44},"end":{"line":6,"column":56}}}) : helper)))
    + "</a>\r\n    </div>\r\n    <div class=\"points\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"profilePoints") || (depth0 != null ? lookupProperty(depth0,"profilePoints") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profilePoints","hash":{},"data":data,"loc":{"start":{"line":8,"column":24},"end":{"line":8,"column":41}}}) : helper)))
    + "</div>\r\n</div>";
},"useData":true});
templates['userProfile'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"top-half\"></div>\n    <a class=\"avatar\" id=\"profile-picture\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"profileUrl") || (depth0 != null ? lookupProperty(depth0,"profileUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profileUrl","hash":{},"data":data,"loc":{"start":{"line":2,"column":49},"end":{"line":2,"column":63}}}) : helper)))
    + "\">\n        <img src=\"../"
    + alias4(((helper = (helper = lookupProperty(helpers,"pfpUrl") || (depth0 != null ? lookupProperty(depth0,"pfpUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pfpUrl","hash":{},"data":data,"loc":{"start":{"line":3,"column":21},"end":{"line":3,"column":31}}}) : helper)))
    + "\">\n    </a>        \n    <div class=\"profile-username\"> \n        <a class=\"username\" href=\"/users/"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":6,"column":41},"end":{"line":6,"column":53}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":6,"column":55},"end":{"line":6,"column":67}}}) : helper)))
    + "\n        <div class=\"date-joined\"> Joined "
    + alias4(((helper = (helper = lookupProperty(helpers,"dateJoined") || (depth0 != null ? lookupProperty(depth0,"dateJoined") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"dateJoined","hash":{},"data":data,"loc":{"start":{"line":7,"column":41},"end":{"line":7,"column":55}}}) : helper)))
    + "</div></a>\n    </div>\n</div>\n<div class=\"bottom-half\">\n    <br><br><br><br>\n    <div class=\"points\" id=\"profile-points\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"profilePoints") || (depth0 != null ? lookupProperty(depth0,"profilePoints") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profilePoints","hash":{},"data":data,"loc":{"start":{"line":12,"column":44},"end":{"line":12,"column":61}}}) : helper)))
    + "</div>\n    <br><br><br>\n    <a class=\"user-markers\" href=\"#\"> Your Markers</a>\n</div>";
},"useData":true});
})();