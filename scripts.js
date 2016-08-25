$(document).ready(function () {
    
    //on refresh, move back to top page
     $('html,body').stop().animate({scrollTop: 0},1);
    
    var CurrPage=1;
    var ModalOpen=false;
    
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
        if (event.originalEvent.wheelDelta >= 0) ChangePage(CurrPage-1); else ChangePage(CurrPage+1);    
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
                $('html,body').stop().animate({scrollTop: $(".page:nth-child("+NewPage+")").offset().top},1200); 
                $("body").addClass('shrinkEffect');
            setTimeout(function() {
                $("body").removeClass('shrinkEffect');
            }, 1000);
            }//prevents animation from stalling if the user keeps scrolling up and they're already heading to the first page
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
        
        $(".video").each(function() {
            var videoURL = $(this).prop('src');
            $(this).prop('src','');
            $(this).prop('src',videoURL);
        });
        
    }

});