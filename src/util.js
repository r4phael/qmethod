function otherCheck() {
    if (document.getElementById('radio7').checked) {
        document.getElementById('ifOther').style.display = 'block';
    }
    else {
        document.getElementById('ifOther').style.display = 'none';
    } 

}

function otherCheck2() {
    if (document.getElementById('checkOther').checked) {
        document.getElementById('ifOther2').style.display = 'block';
    }
    else {
        document.getElementById('ifOther2').style.display = 'none';
    } 

}

function inputCheck() {
   
   var nameInput = document.getElementById('text_buggy').value;
   if (!nameInput == "") {
        document.getElementById('input_buggy').style.display = 'block';
    }
    else {
        document.getElementById('input_buggy').style.display = 'none';
    } 

}

function testModal(){
    console.log('Test testModal!');
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
      })
}

    
  