$(document).ready(function () {
    

    
    
    $(window).scroll(function() {
        SetPageHeight();
    });
    
    $(window).on( "swipe", function( event ) {
        event.preventDefault();
    } );
    
    //on refresh, move back to top page
    $(window).on('beforeunload', function() {
        $(window).scrollTop(0);
    });
    $("#connector-results-screen").removeClass("visible");
    $("header").removeClass("show"); 
    
    
    $(document).on("click", "#menu-button", function(e) {
        $("#menu").toggleClass("mobile-show");
    }) ;
    
    
    
    var CurrPage=1;
    var CurrModal=0;
    var scrollLock=false;
    var transitionSpeed=300; //milliseconds
    
    $(document).on("click", "#beginButton", function(event) {
        ChangePage(2); 
    });
    
    $(document).on("click", "#connector-search-button", function(event) {
        //$("#connector-intro-screen").hide();        
        $("#connector-results-screen").addClass('visible');
    });
    
    $(document).on("change", "select", function() {
      // alert("test");
        $("#connector-flash").css("opacity",0.5);
      $("#connector-flash").animate({opacity: 0}, 200);
        
    });
    
    var lastTouchY;
    $('document').on('touchmove',function(e){
          //e.preventDefault();

         var currentTouchY = e.originalEvent.touches[0].clientY;
         if(currentTouchY > lastTouchY){
             ChangePage($(this).index()+1); 
         }else if(currentTouchY < lastTouchY){
             ChangePage(CurrPage-1);
         }
         lastTouchY = currentTouchY;
    });
    
    $(document).on("click", "h2", function(event) {
        ChangePage(1); 
    });
    
    $(document).on("click", ".modalLink", function(event) {
        $("#modals").removeClass("hidden");
        CurrModal=$(this).index()+1;
        ChangeModal(CurrModal);
        $(".page-down-arrow").hide();
    });
    
    
    $(document).on("click", ".modal-left-arrow", function(event) {
        CurrModal-=1;
        ChangeModal(CurrModal);
        StopVideos();
    });
    $(document).on("click", ".modal-right-arrow", function(event) {
        CurrModal+=1;
        ChangeModal(CurrModal);
        StopVideos();
    });
    
    $(document).on("click", "#menu .menu-item", function(event) {
        ChangePage($(this).index()+2); 
    });
    
    $(document).on("click", ".page-down-arrow", function(event) {
        ChangePage(CurrPage+1); 
    });
    
    $(document).on("click", ".modal-content", function(event) {
        event.stopPropagation();
    });
    
    
    $('body').mousewheel(function(event) {
    console.log(event.deltaX, event.deltaY, event.deltaFactor);
        
        if ($('#connector-results-screen.visible').length != 0) {
            //don't scroll if horses are open
            
            return;
        }
        
        
        event.preventDefault(); 
        
        
        var scrollAmount = event.deltaFactor;
        var scrollDirection=event.deltaY;
        
            if (scrollLock==false)
            {
                if (scrollDirection >= 0) ChangePage(CurrPage-1); 
                else ChangePage(CurrPage+1); 
                
                    //lock until next page ready
                    scrollLock=true;
                    setTimeout(function() {
                        scrollLock=false;
                    }, transitionSpeed);    
            }
    });
    
    
    $(document).on('click', '.closeModal, .modal', function(event) {        
        $("#modals").addClass("hidden");
        $(".page-down-arrow").show();
        $("#menu-button").removeClass("hiddenOnMobile");
        StopVideos();
        CurrModal=0;
    });
    
    
    $(window).bind('resize', function() {
        SetPageHeight();
    });
    
    function ChangePage(newPageNumber, overrideSamePageCondition) {   
        
        if (!CurrModal) {
            var maxPage=$(".page").length;            
            //CurrPage=((maxPage+newPageNumber-1)%(maxPage))+1; //IF WE WANT IT TO LOOPBACK TO INTRO, modulo correction for n-based math
            var NewPage=Math.min(Math.max(1,newPageNumber),maxPage); //IF WE DON'T WANT IT TO LOOP BACK TO INTRO  
            if (NewPage!=CurrPage || overrideSamePageCondition) {
                $('html,body').stop().animate({scrollTop: (NewPage-1)* $(window).height()},transitionSpeed); 
                
                // SHRINK EFFECT: 
                /*$("body").addClass('shrinkEffect');
            setTimeout(function() {
                $("body").removeClass('shrinkEffect');
            }, 1000);*/                
            }
            
            //prevents animation from stalling if the user keeps scrolling up and they're already heading to the first page
            CurrPage=NewPage;
            $("#menu .menu-item").removeClass("selected").eq(CurrPage-2).addClass("selected");
            if (CurrPage==1) {
                $("header").removeClass("show"); 
            } else {
                $("header").addClass("show");
            }       
            
            
            $("#menu").removeClass("mobile-show");
            $("#connector-results-screen").removeClass('visible');
            $(".popup").removeClass("show");
           
            
        }
    }
    
    function ChangeModal(index) {
        
        var translateAmount=((index-1)*25);  $("#modals").css("transform","translateX(-"+translateAmount+"%)");
        
        $("#menu-button").addClass("hiddenOnMobile");
        
        
    }

    function StopVideos() {
       $(".modal video").each(function(){
            this.pause();
        });        
    }
    
    
    // SCROLLING
    var scrolling = false;
    
    $(document).on('vmousedown', "#scroll-knob", function(event) {   
       scrolling=true;
    });
    
    $(document).on('vmousemove', function(event) {        
       if (scrolling) {
           
           var barWidth = parseInt($("#scroll").css("width"),10);
           var pageWidth = parseInt($("#timeline-content").css("width"),10)-parseInt($("#timeline-wrapper").css("width"),10);
           
           var newPos = event.pageX - $("#scroll").offset().left;
           var newPercent = Math.min((newPos/barWidth)*100,100);           
           var newTimelinePos = newPercent*pageWidth/100;
           
    
           
           newPercent = Math.max(newPercent, 0);
        
           $("#scroll-knob").css("left",newPercent+"%");
           $("#timeline-content").css("left","-"+newTimelinePos+"px");
           
       }
    });
    
    $(document).on('vmouseup', function(event) { 
        scrolling=false;
    });
    
    
    
    
    
    
    
    
    
    $(document).on('click', ".dot", function(event) {        
        
        var popup = $(this).parent(".popup");
        popup.toggleClass("show");
        
        
        $(".popup").not(popup).removeClass("show");
        
    });
    
     $(document).on('click', ".horse", function(event) {  
        var horse = $(this);
        window.open("http://www.defhr.org/horse/"+horse.attr("data-post-name")); 
     });
    
    
    function SetPageHeight() {
      $(".page").css("height",$(window).height()+"px");
      ChangePage(CurrPage, true);
      console.log("height changed");        
    }
    

});