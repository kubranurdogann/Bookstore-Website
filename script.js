
      $(document).ready(function () {
        var cartCount = 0;

        $("#cart-count").hide();

        $(".add-to-cart").click(function () {
          cartCount++;

          if (cartCount > 0) {
            $("#cart-count").text(cartCount).show();
          }

          var icon = $(this).find("i");
          icon.addClass("rotate"); //plus iconunu döndürme işlemi

          //plus iconunu check iconu ile değiştir
          setTimeout(function () {
            icon
              .removeClass("fa-plus rotate")
              .addClass("fa-check")
              .css("color", "#239c02");

            
            icon.removeClass("fade-out").addClass("fade-in");
          }, 300); 

          // İkonu tekrar eski haline getir
          setTimeout(function () {
            icon.addClass("fade-out"); 

            setTimeout(function () {
              icon
                .removeClass("fa-check")
                .addClass("fa-plus")
                .css("color", "black"); 
              icon.removeClass("fade-out").addClass("fade-in"); 
            }, 500);
          }, 1000);
        });
      });
