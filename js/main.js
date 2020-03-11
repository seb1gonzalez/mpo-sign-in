(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    })

    /*==================================================================
    [Send info to PHP for log in processing]*/
    $('.log_in_form').on("submit", function (e) {
        e.preventDefault();
        var input = $('.validate-input .input100');
        //Send info to PHP
        send_log_in(input);
    });

    /*Redirect to proper page based on user type*/
    function redUser(response){
        response = response.split("\"");
        console.log(response);
        //Response remains with double quotes.
        if(response[1].localeCompare("Invalid")==0)
            console.log("Response was invalid");
        else if(response[1].localeCompare("Admin")==0)
            //Redirect to admin page without allowing back
            window.location.replace("http://ctis.utep.edu/MPO_Projects/requestForm_Victor/management-views/admin-view/");
        else if(response[1].localeCompare("Creator")==0)
            //Redirect to creator page without allowing back page
            window.location.replace("http://ctis.utep.edu/MPO_Projects/requestForm_Victor/management-views/employee-view/");
        else if(response[1].localeCompare("Submitter")==0)
            //Redirect to submitter page without allowing back button
            window.location.replace("http://ctis.utep.edu/MPO_Projects/requestForm_Victor/management-views/employee-view/");
        else
            alert("Something Wrong with input");
            
    }

    //Sends log in info to PHP to validate account and returns response
    function send_log_in(input){
        // [Send New Account data to PHP for DB Processing]
        input = input.serializeArray();
        $.ajax({
            url: 'php\\processLogin.php',
            type: 'POST',
            data: {'input': input},
            success: function(data) {
                redUser(data);
            },
            error: function(e) {
              //called when there is an error
              console.log(e.message);
            }
        });
    }

    /*==================================================================
    [ Validate Inputs]*/

    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    /*Iterate through fields to validate all input*/
    function validate_inputs(input) {
        var check = true;
        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }
        return check;
    }


    /*Validate Characters and input completion*/
    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {
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
    $('.btn-show-pass').on('click', function () {
        if (showPass == 0) {
            $(this).next('input').attr('type', 'text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type', 'password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }

    });


})(jQuery);