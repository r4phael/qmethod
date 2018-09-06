function otherCheck() {
    if (document.getElementById('radio7').checked) {
        document.getElementById('ifOther').style.display = 'block';
    }
    else {
        document.getElementById('ifOther').style.display = 'none';
    } 

}

function otherCheck2() {
    if (document.getElementById('check5').checked) {
        document.getElementById('ifOther2').style.display = 'block';
    }
    else {
        document.getElementById('ifOther2').style.display = 'none';
    } 

}

$(document).ready(function() {

    var requiredCheckboxes = $('div#checkboxes input[type=checkbox]');

    console.log("checkbox:");
    console.log(requiredCheckboxes);

    requiredCheckboxes.change(function(){

        if(requiredCheckboxes.is(':checked')) {
            requiredCheckboxes.removeAttr('required');
            console.log("if");
        }

        else {
            requiredCheckboxes.attr('required', 'required');
            console.log("else");
        }
    });

});
    
  