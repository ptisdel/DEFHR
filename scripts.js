$(document).ready(function () {
    
    //on refresh, move back to top page
     $('html,body').stop().animate({scrollTop: 0},1);
    
    var CurrPage=1;
    var ModalOpen=false;
    var scrollLock=false;
    var transitionSpeed=300; //milliseconds
    
    $(document).on("click", "#beginButton", function(event) {
        ChangePage(2); 
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
        $("#"+$(this).attr("id")+"-modal").removeClass("hidden");
        ModalOpen=true;
    });
    
    $(document).on("click", "#menu .menu-item", function(event) {
        ChangePage($(this).index()+2); 
    });
    
    $(document).on("click", ".modal-content", function(event) {
        event.stopPropagation();
    });
    
    $(document).on('mousewheel DOMMouseScroll', function(event) {        
        event.preventDefault(); 
        var scrollAmount = event.originalEvent.wheelDelta;
        
            if (scrollLock==false)
            {
                if (event.originalEvent.wheelDelta >= 0) ChangePage(CurrPage-1); 
                else ChangePage(CurrPage+1); 
                
                    //lock until next page ready
                    scrollLock=true;
                    setTimeout(function() {
                        scrollLock=false;
                    }, transitionSpeed);    
            }
    });
    
    $(document).on('click', '.closeModal, .modal', function(event) {        
        $(".modal").addClass("hidden");
        StopVideos();
        ModalOpen=false;
    });
    
    function ChangePage(newPageNumber) {   
        
        if (!ModalOpen) {
            var maxPage=$(".page").length;            
            //CurrPage=((maxPage+newPageNumber-1)%(maxPage))+1; //IF WE WANT IT TO LOOPBACK TO INTRO, modulo correction for n-based math
            var NewPage=Math.min(Math.max(1,newPageNumber),maxPage); //IF WE DON'T WANT IT TO LOOP BACK TO INTRO  
            if (NewPage!=CurrPage) {
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
            
            
           
            
        }
    }

    function StopVideos() {
        
       /* $(".video").each(function() {
            var videoURL = $(this).prop('src');
            $(this).prop('src','');
            $(this).prop('src',videoURL);
        });*/
        
    }
    
    var scrolling = false;
    
    $(document).on('mousedown', "#scroll-knob", function(event) {        
       scrolling=true;
    });
    
    $(document).on('mousemove', function(event) {        
       if (scrolling) {
           
           var barWidth = parseInt($("#scroll").css("width"),10);
           
           var newPos = event.pageX - $("#scroll").offset().left;
           var newPercent = (newPos/barWidth)*100;
           console.log(newPos);
           console.log(newPercent);
           
           newPercent = Math.max(newPercent, 0);
        
           $("#scroll-knob").css("left",newPercent+"%");
           $("#timeline-content").css("transform","translateX(-"+newPercent+"%)");

           
       }
    });
    
    $(document).on('mouseup', function(event) { 
        scrolling=false;
    });
    

});