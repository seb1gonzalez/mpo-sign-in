(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [POST To PHP New Account info]*/
    $('.new_acc_form').on('submit',function() {
        var input = $(".new_acc_form");

        //If input is validated we post to php
        if(validate_inputs(input) == true){
            send_newacc_info(input);
        }else{
            console.log("Input not Valid");
        }

        //Hide validation promts
        $('.validate-form .input100').each(function(){
            $(this).focus(function(){
               hideValidate(this);
            });
        });
    
    });

    //Function that posts the info with ajax to PHP
    function send_newacc_info(input){
         // [Send New Account data to PHP for DB Processing]
         input = input.serializeArray();
         console.log(input);
         $.ajax({
             url: 'php\\newAccount.php',
             type: 'POST',
             data: {'input': input},
             success: function(data) {
               console.log("Success");
             },
             error: function(e) {
               //called when there is an error
               console.log(e.message);
 
             }
         });
    }

    /*==================================================================
    [ Validate Inputs]*/
    
    $('.validate-form').on('submit',function(){
        var input = $('.validate-input .input100');
        validate_inputs(input);
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    /*Iterate through fields to validate all input*/
    function validate_inputs(input){
        var check = true;
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        return check;
    }


    /*Validate Characters and input completion*/
    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    


    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }
        
    });


})(jQuery);