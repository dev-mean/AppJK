var $active, $next;
function cycleQuotes(){
  $active = $('.quotes .visible');
  $next = ($active.next().length > 0) ? $active.next() : $('.quotes div:first');
  $active.removeClass('visible animated zoomIn');
  $next.addClass('visible').addClass('animated zoomIn');
}


$(document).ready(function(){
	var inter = setInterval('cycleQuotes()', 4000);
  $.get('https://www.googleapis.com/youtube/v3/search?key=AIzaSyDZx4Vi22tn8t_oRFRjO4BDS7xVHD2G5k0&channelId=UCSZbeyI1cNTqcV13Zea8u8A&part=snippet,id&order=date&maxResults=1',function(data){
    var videoId = data.items[0].id.videoId;
    $.post('update_video.php',{videoId:videoId},function(data2){
        
    });
  });

});

function do_close(){
      $(".about-close").trigger('click');
      $(".contact-close").trigger('click');
    }
    function contact_submit(){
      var flag1 = validate_required("name","Please input a valid name");
      var flag2 = validate_email("email","Please input a valid email");
      var flag3 = validate_required("message","Please input a valid message");
      var flag4 = validate_required("code","Please input a valid code");
      if(flag1 && flag2 && flag3 && flag4){
        $("#contact_btn").html('Please Wait');

        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();
        var captcha = $("#code").val();
        var file = "send_message";
        $.post(file +".php", {name:name,email:email,message:message, captcha:captcha}, function(data) {
          // alert(data);
          data = JSON.parse(data);

          if(data.success){
            var name = $("#name").val('');
            var email = $("#email").val('');
            var message = $("#message").val('');
            var code = $("#code").val('');
            $("#contact_btn").addClass('success-green').html(data.message);
            setTimeout(message_success, 1000);

          } else {
            alert(data.message);
            $("#contact_btn").html('Send');
          }
       }); 
      }
    }

     $(document).ready(function() {

      $(".quotes").find('.normal-font').eq(0).addClass('visible');

      $.post('flickrstream.php',function(data){
      	
      });

      $.post('captcha.php',function(data){
        data = JSON.parse(data);
        $("#captcha_image").attr("src",data.image);
      });

      $(".about").click(function(){
        $(".contact-close").trigger('click');

        $(this).hide("slow");

        $("#about").show().css('z-index','100');
        $("#about").removeClass("fadeOutDown").addClass("animated fadeInUp moretime");
        $('body,html').animate({
          scrollTop: 0 ,
          }, 500
        );
      });

      $(".about-close").click(function() {

        $(".about").show("slow");
        $("#about").removeClass('fadeInUp').addClass("animated fadeOutDown").css('z-index','-1');;
      });

      $(".contact").click(function(){
        $(".about-close").trigger('click');
        $(this).hide("slow");
        $("#contact").show().css('z-index','100');
        $("#contact").removeClass("fadeOutDown").addClass("animated fadeInUp moretime");
        $('body,html').animate({
            scrollTop: 0 ,
            }, 500
          );
      });

      $(".contact-close").click(function() {
        $(".contact").show("slow");
        $("#contact").removeClass('fadeInUp').addClass("animated fadeOutDown").css('z-index','-1');;

      });

      var x = 0;  
            var y = 0;  
            //cache a reference to the banner  
            var banner = $(".bg_full");  
  
            // set initial banner background position  
            banner.css('backgroundPosition', x + 'px' + ' ' + y + 'px');  
  
            // scroll up background position every 90 milliseconds  
            window.setInterval(function() {  
                banner.css("backgroundPosition", x + 'px' + ' ' + y + 'px');  
                //y--;  
                x--;
            }, 90);

      keeploop();
        });
    
    var back = 1;

     function keeploop(data){
     	$( "#keepsp_anim" ).css('width',0);
     	$( "#keepsp_anim" ).show();
     	$( "#keepsp_anim" ).animate({
		    width: "+=178"
  		  }, 2000, function() {
          console.log('asd');
            setTimeout(contract_image, 6000);
  		  });
     }

     function contract_image(){
      console.log('1');
        $( "#keepsp_anim" ).animate({
        width: "-=122"
        }, 1500, function() {
          $( "#keepsp_anim" ).removeClass('back'+back);

          if(back == 4) {
            back = 1
          } else {
            back = back +1;
          }

          $("#keepsp_anim").addClass('back'+back);
          setTimeout(expand_image, 500);
        });
     }

     function expand_image(){
        $( "#keepsp_anim" ).animate({
        width: "+=122"
        }, 1500, function() {
          setTimeout(contract_image, 3000);
        });
     }


     function validate_required(id_info, alttext){
        var value = $("#"+id_info).val();
        if (value.match(/^[A-Za-z0-9 \-_]+$/) == null){
          $("#"+id_info).parent().find('span').text(alttext);
          return false;
        }
        else {
          $("#"+id_info).parent().find('span').text("");
          return true;
        }
    }

        function validate_email(id_info, alttext){
        var value = $("#"+id_info).val();
      
        if (value.match(/([\w\-]+\@[\w\-]+\.[\w\-]+)/) == null){
          $("#"+id_info).parent().find('span').text(alttext);
          return false;
        }
        else {
          $("#"+id_info).parent().find('span').text("");
          return true;
        }
    }

    function message_success(){
      $(".contact-close").trigger('click');
      $("#contact_btn").removeClass('success-green');
      $("#contact_btn").html('Send');
    }
