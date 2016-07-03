(function(app) {
  document.addEventListener('DOMContentLoaded', function() {
      
    ng.platformBrowserDynamic.bootstrap(app.MasterComponent);
      
  });
})(window.app || (window.app = {}));