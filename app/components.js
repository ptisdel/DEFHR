(function(app) {
    
 
    
    
    /* Section Templates */
    
        var IntroSection =
        ng.core.Component({
          selector: 'intro-section',
          templateUrl: 'templates/intro.html'
        })
        .Class({
          constructor: function() {

          }
        });

        var CaseStudiesSection =
        ng.core.Component({
          selector: 'case-studies-section',
          templateUrl: 'templates/casestudies.html'
        })
        .Class({
          constructor: function() {
              
              this.selectedQuadrant="";
              
              this.selectQuadrant = function(quadName) {
                  this.selectedQuadrant=quadName;
              }

          }
        });

        var TimelineSection =
        ng.core.Component({
          selector: 'timeline-section',
          templateUrl: 'templates/timeline.html'
        })
        .Class({
          constructor: function() {

          }
        });

        var DEFHRConnectorSection =
        ng.core.Component({
          selector: 'defhr-connector-section',
          templateUrl: 'templates/defhrconnector.html'
        })
        .Class({
          constructor: function() {

          }
        });
    
    
    /* master component */
    
    app.MasterComponent =
    ng.core.Component({
      selector: 'master',
      templateUrl: 'templates/master.html',
      directives: [IntroSection,CaseStudiesSection,TimelineSection,DEFHRConnectorSection]
    })
    .Class({
      constructor: function() {
          
          this.currentSection = 0;
          
          this.menuItems = [ 
              {name:"Case Studies", id: 0},
              {name:"Timeline", id: 1},
              {name:"DEFHR Connector", id: 2}              
          ];
          
          this.selectSection = function(menuitem) {
              
              this.currentSection=menuitem.id;
              
          }
          
      }     
        
    });
    
    
    
    
})(window.app || (window.app = {}));