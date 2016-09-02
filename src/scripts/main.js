$(document).ready(function(){

       //- Initial script for the navigation bar - abandonned in V1
       $(window).scroll(function () {
            var scroll = $(this).scrollTop();
            var topDist = $("#navbar").position();
            if (scroll > 60) {
                $("#navbar").addClass("white").removeClass("transparent z-depth-0").css({"position": "fixed", "margin-top": "0px"});
                $("#leftItems").removeClass("nav-item-left").addClass("animated fadeIn");
                $("#rightItems").removeClass("nav-item-right").addClass("animated fadeIn");
            } else {
                $("#navbar").removeClass("white").addClass("z-depth-0 transparent").css({"position": "static", "margin-top": "60px"});
                $("#leftItems").addClass("nav-item-left").removeClass("animated fadeIn");
                $("#rightItems").addClass("nav-item-right").removeClass("animated fadeIn");
            }
        });

        // Script for the main page sentence with malarkey
        var elem = document.querySelector('#headWords');
        var words = ["be more efficient ?", "sell more ?"];
        var opts = {
         typeSpeed: 75,
         deleteSpeed: 75,
         pauseDelay: 2000,
         loop: true,
         postfix: ''
        };
        malarkey(elem, opts).type('web-application ?').pause().delete()
                .type('workflow analysis ?').pause().delete()
                .type('data analysis ?').pause().delete();


        // Script to show-up the contact form
        $("#messageButton").click( function() {
            $("#phoneNumber").hide('slow');
            $("#emailAddress").hide('slow');
            $("#contactForm").toggle('slow');
        });

        // Script to show-up the email address
        $("#emailButton").click( function() {
            $("#contactForm").hide('slow');
            $("#phoneNumber").hide('slow');
            $("#emailAddress").toggle('slow');
        });

        // Script to show-up the phone Number
        $("#phoneButton").click( function() {
            $("#contactForm").hide('slow');
            $("#emailAddress").hide('slow');
            $("#phoneNumber").toggle('slow');
        });

        // Script for the form submission
        $("#contactForm").submit(function() {
            var data = {name: 'name', textarea: 'textarea'};
            $.post('/send', data, function(resp) {
                alert(resp);
                console.log("post response: " + resp);
            });
        });

});
