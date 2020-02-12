(function ($) {

    // [Send New Account data to PHP for DB Processing]
    var input = $(".validate-form").serializeArray()
    console.log(input);
    JSON.stringify(input);
    $.ajax({
        url: 'php/newAccount.php',
        type: 'POST',
        data: input,
        dataType: "json",
        success: function(data) {
          console.log("Success")
      
        },
        error: function(e) {
          //called when there is an error
          console.log(e.message);
        }
    });


})(jQuery);