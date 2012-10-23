/*

THIS REQUIRES JQUERY!

use for https://www.facebook.com/GevaliaCoffee/app_416000975120849
this JS drive the core functionality for the application

the main piece to take from this, beside the general application set-up, is the function that reinitializes the social widgets with a URL change asynchronously

socialWidgetInit();

this should be rewritten to use a main object (break out of global) and other general JS performance enhancements.  

var socialWidget = {};

*/
(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&amp;appId=286808998080270";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		
		
			var fanGate = true;
        	var tURL = 'https://www.facebook.com/GevaliaCoffee';
						
			function extractUrl(input) {
			 // remove quotes and wrapping url()
			 return input.replace(/"/g,"").replace(/url\(|\)$/ig, "");
			}
			var activeElem = "";
			function socialWidgetInit(promoURL,promoMsg,promoImg,activeElem) {
			
				var twitterButton = '&lt;a href="https://twitter.com/share" class="twitter-share-button" data-url="'+promoURL+'" data-text="'+promoMsg+'" data-count="none"&gt;Tweet&lt;/a&gt;';						   
				
        		var promoURLtest = promoURL;
        		promoURL = escape(promoURL);
        		promoURL = promoURL.replace(/\//g,"%2F");   
        		promoMsg = escape(promoMsg);	
        		
        		var mailToURL = "mailto:?subject="+promoMsg+"&amp;body="+promoURL;        		
        		//var mailToURL = "mailto:?subject="+promoMsg+"&amp;body=%3Ca%20href%3D%22"+promoURL+"%22%3E"+promoMsg+"%3C/a%3E";
        		$("#share-email").attr("href",mailToURL);	
        		
				var pinterestButton = '&lt;iframe scrolling="no" frameborder="0" src="https://assets.pinterest.com/pinit.html?url='+promoURL+'&amp;amp;media='+promoImg+'&amp;amp;description='+promoMsg+'&amp;amp;layout=none" style="border: medium none; width: 90px; height: 20px;"&gt;&lt;/iframe&gt;'; 
				
				
        		$("#promo-send").fadeOut(200, function(){
        		
					//remove fb button
					$('div.fb-like').remove();
					//remove pinterest and twitter buttons
					$('#promo-send iframe').remove();	
					//add fresh buttons						
					$('#promo-send').append(twitterButton);
					$('#promo-send').append(pinterestButton);
					
					//dont show for FB polls ("no-share" class)
					if (!$(activeElem).parent("li").hasClass("no-share")) {
						$('#promo-send').prepend('&lt;div class="fb-like" data-send="true" data-width="400" data-show-faces="false" data-layout="button_count" id="promo-send-button" data-href="' + promoURL + '"&gt;&lt;/div&gt;');
						//reinitialize FB widget after DOM change
						if(typeof(FB) !== 'undefined') {
							FB.XFBML.parse(document.getElementById('promo-send'));				}
					}
					
						
					//reinitialize TWTTR widget after DOM change
					if (typeof (twttr) != 'undefined') {
			            twttr.widgets.load();
			        }
			        
				}).fadeIn(1000);

			}
			
        	function activeLike(speed) {
        		var firstPromo = $("#promo").attr("class");
        		$("#promo-options li."+firstPromo+" a").addClass("active");
        		var firstPromoURL = $("#promo-options li."+firstPromo+" a").attr("href");
        		var firstPromoMsg = $("#promo-options li."+firstPromo+" a").html();
        		var firstPromoImg = extractUrl($("#promo-options li."+firstPromo+" a").css("background-image"));
        		
        		$("#promo a").attr("href",firstPromoURL).attr("title",firstPromoMsg).html(firstPromoMsg);
        		        		
				socialWidgetInit(firstPromoURL,firstPromoMsg,firstPromoImg,activeElem);
					
				$("body").removeClass("splash");
				$("#intro-message").fadeOut(speed);
				$("#main-content").fadeIn(speed);
			}

			function inactiveLike(speed) {
				$("body").addClass("splash");
				$("#main-content").fadeOut(speed);
				$("#intro-message").fadeIn(speed);
			}
			
          $("#promo-options li a").bind('click', function(){         
				var promoImage = $(this).parent("li").attr("class");
        		$("#promo").fadeOut(200, function(){
					$("#promo").attr("class",promoImage);
				}).fadeIn(1000);
 	
        		var activePromoURL = $(this).attr("href");
        		var activePromoMsg = $(this).html();	
        		var activePromoImg = extractUrl($(this).css("background-image"));	
        		$("#promo a").attr("href",activePromoURL).attr("title",activePromoMsg).html(activePromoMsg);
        		
          		$("#promo-options li a.active").removeClass("active");
				$(this).addClass("active");
				activeElem = $(this);
				socialWidgetInit(activePromoURL,activePromoMsg,activePromoImg,activeElem);
        		
								
				
    			return false;
			});
			
            var fbAsyncInit = function() {

                FB.init({
                    appId  : '286808998080270',
                    status : true, // check login status
                    cookie : true, // enable cookies to allow the server to access the session
                    xfbml  : true  // parse XFBML
                });

                FB.Canvas.setAutoGrow();
                
                FB.Event.subscribe('edge.create', function(response) {
                	if (fanGate) {
                	activeLike(1000);
                	}
                });

                FB.Event.subscribe('edge.remove', function(response) {
                	inactiveLike(3000);
                });
            };



    		$(document).ready( function () {
			activeLike(1000);fanGate = false;				/*var playlist = ";
				$('#video-options').children("a").each(
				    function(){
				    	var thisCode = $(this).attr("video-code")
				        playlist = playlist +  + ",";
				        alert("playlist"+playlist);
				    }
				);*/
            });