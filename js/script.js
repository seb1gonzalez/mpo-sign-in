(function($){

    /*Table container initializer */
    $("#gridContainer").dxDataGrid({
        dataSource:{ employees,
        },
        showBorders: true,
        paging: {
            pageSize: 10
        },

        editing: {
            mode: "row",
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true
        }, 
        columns: [
            {
                caption: "Agency",
                dataField: "agency"
            },
            {
                caption:"First Name",
                dataField: "first_name",
            },
            {
                caption:"Last Name",
                dataField: "last_name",
            }, 
            {
                caption:"Email",
                dataField: "email",
            },
            {
                caption: "Access Level",
                dataField: "type_of_user",
                lookup: {
                    dataSource: accessLevels,
                    displayExpr: "level",
                    valueExpr: "ID"
                }
            }, 
            {
                caption: "Password",
                dataField: "pass"
            },     
        ],
        onEditingStart: function(e) {
            console.log("Editing Start");
        },
        onInitNewRow: function(e) {
            console.log("Init Row");
        },
        onRowInserting: function(e) {
            console.log("Row Insert");
        },
        onRowInserted: function(e) {
            //Data is inserted succesfully
            var newData = e["data"];
            sendNewUser(newData);
        },
        onRowUpdating: function(e) {
        console.log("Row Updating");
        },
        onRowUpdated: function(e) {
            console.log("Row Updated");
        },
        onRowRemoving: function(e) {
            console.log("Row Removing");
        },
        onRowRemoved: function(e) {
            console.log("Row Removed");
            var dataToRem = e["data"];
            removeUser(dataToRem);
        }
    });

    $("#clear").dxButton({
        text: "Clear",
        onClick: function() {
            $("#events ul").empty();
        }
    });
   
    var accessLevels = [{
        "level": "Admin",
        "ID":1
        }, {
        "level": "Submitter",
        "ID":2
        },{
        "level": "Creator",
        "ID":3
    }];

    $.ajax({
        url: './php/retrieveEmployees.php',
        type: 'GET',
        success: function(data) {
            /**This gives out the error mentioned but the call is still successful*/
            // $("#gridContainer").dxDataGrid({
            //     dataSource: data,
            //     filterRow: {
            //         visible: true
            //     }
            // });
            console.log(data);
        },
        error: function(e) {
            //called when there is an error
            console.log(e.message);
        }
    });

})(jQuery);

//Dummy data pasted directly from the console log showing the response from ajax
var employees = [{"agency":"MPO",
"first_name":"Ana",
"last_name":"Guevara",
"email":"aguev@mpo.com",
"type_of_user":"1",
"pass":"$2y$10$0s2N7FMU4uzX5KTbRVR3V.IZw6GwfxZDzvIG6QTJwE8ICdlpi7orG"}];

/**Function that sends new user information to PHP for DB*/
function sendNewUser(input){
    // [Send New Account data to PHP for DB Processing]
    console.log(input);
    $.ajax({
        url: '../../sign-in/php/newAccount.php',
        type: 'POST',
        data: {'input': input},
        success: function(data) {
            console.log(data);
        },
        error: function(e) {
          //called when there is an error
          console.log(e.message);
        }
    });
}

/**Function that deletes the corresponding user from the database*/
function removeUser(input){
    //Send Data to be deleted
    $.ajax({
        url: 'php/deleteAccount.php',
        type: 'POST',
        data: {'input': input},
        success: function(data) {
            console.log(data);
        },
        error: function(e) {
          //called when there is an error
          console.log(e.message);
        }
    });
}