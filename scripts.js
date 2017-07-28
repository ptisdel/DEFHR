$(document).ready(function () {
    

    
    var lethargy = new Lethargy();
    
    $(window).bind('mousewheel DOMMouseScroll wheel MozMousePixelScroll', function(e){
        e.preventDefault()
        e.stopPropagation();
        if(lethargy.check(e) !== false) {
            
            
            
           
            var scrollDirection=lethargy.check(e);
            
            console.log(scrollDirection);
        
            if ($('#connector-results-screen.visible').length != 0) {
                //don't scroll if horses are open
                return;
            }



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

            
            
            
            
            
        }
    });
    
    
    
    
    //on refresh, move back to top page
    $(window).on('beforeunload', function() {
        $('#pages').css("top","0px");
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
    
    
    
    // SCROLLING & SWIPING
    
    /*$('body').mousewheel(function(event) {
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
    });*/
    
      
   $(window).on('swipedown',function(e){
       
       if ($('#connector-results-screen').hasClass("visible")) {
            //don't scroll if horses are open
        }
       else {
           
        
        ChangePage(CurrPage-1); 
                
        //lock until next page ready
        scrollLock=true;
        setTimeout(function() {
            scrollLock=false;
        }, transitionSpeed);    
       }
   } );
    
   $(window).on('swipeup',function(e){
       
       if ($('#connector-results-screen').hasClass("visible")) {
            //don't scroll if horses are open
        }
        else {     
        
        ChangePage(CurrPage+1); 
                
        //lock until next page ready
        scrollLock=true;
        setTimeout(function() {
            scrollLock=false;
        }, transitionSpeed);    
        }
   } );
    
   
    
    
    
    
    
    
    
    $(document).on('click', '.closeModal, .modal', function(event) {        
        $("#modals").addClass("hidden");
        $(".page-down-arrow").show();
        $("#menu-button").removeClass("hiddenOnMobile");
        StopVideos();
        CurrModal=0;
    });
    
    
    $(window).bind('resize', function() {
        SetPageHeight();
      console.log("page resized");     
    });
    
    $(window).bind('orientationchange', function() {
        console.log("orientation changed");
        SetPageHeight();
    });
    
    function ChangePage(newPageNumber, overrideSamePageCondition) {   
        
        if (!CurrModal || overrideSamePageCondition) {
            var maxPage=$(".page").length;            
            //CurrPage=((maxPage+newPageNumber-1)%(maxPage))+1; //IF WE WANT IT TO LOOPBACK TO INTRO, modulo correction for n-based math
            var NewPage=Math.min(Math.max(1,newPageNumber),maxPage); //IF WE DON'T WANT IT TO LOOP BACK TO INTRO  
            if (NewPage!=CurrPage || overrideSamePageCondition) {
                $('#pages').css("top",-((NewPage-1)*$(window).height())+"px");
                
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
        $(".modal").removeClass("selected");
        $(".modal:nth-child("+index+")").addClass("selected");
        
        $("#menu-button").addClass("hiddenOnMobile");
        
        
    }

    function StopVideos() {
       $(".modal video").each(function(){
            this.pause();
        });        
    }
    
    
    // TIMELINE SCROLLING
    var scrolling = false;
    
    $(document).on('vmousedown', "#scroll-knob", function(event) {   
       scrolling=true;
       event.preventDefault();
    });
    
    $(document).on('vmousemove', function(event) {        
       if (scrolling) {
           event.preventDefault();
           
           var barWidth = parseInt($("#scroll").css("width"),10);
           var pageWidth = parseInt($("#timeline-content").css("width"),10)-parseInt($("#timeline-wrapper").css("width"),10);
           
           var newPos = event.pageX - $("#scroll").offset().left;
           var newPercent = Math.min((newPos/barWidth)*100,100);           
           var newTimelinePos = Math.max(newPercent*pageWidth/100,0);
           
           console.log("new pos: "+newPos+"; newPercent: "+newPercent+"; newTimelinePos: "+newTimelinePos+";");
            
           
           newPercent = Math.max(newPercent, 0);
           
           console.log(newPercent);
        
           $("#scroll-knob").css("left",newPercent+"%");
           $("#timeline-wrapper").scrollLeft(newTimelinePos);
           
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
    }
    

});