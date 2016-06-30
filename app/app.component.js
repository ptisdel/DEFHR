(function(app) {
    
    
  
    
    
    var HorseList =
    ng.core.Component({
      selector: 'horse-list',
      template: `

<ul>
    <li *ngFor="let horse of horses">{{horse.name}}</li>
</ul>
`,
        directives: [ng.common.NgFor]

    })
    .Class({
      constructor: function() {
          this.horses = [
              {name:"Bobby", gender:"male"},
              {name:"Caleb", gender:"male"},
              {name:"Jen", gender:"female"}
          ];
      }
    });
    
    
    
    
    app.AppComponent =
    ng.core.Component({
      selector: 'my-app',
      template: '<h1>My First Angular 2 App</h1><horse-list></horse-list>',
      directives: [HorseList]
    })
    .Class({
      constructor: function() {}
    });
    
    
    
    
})(window.app || (window.app = {}));