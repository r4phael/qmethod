function otherCheck() {
    console.log("Inside otherCheck");
    if (document.getElementById('radio-7').checked) {
        console.log("Inside if");
        console.log(document.getElementById('radio-7').getAttribute("class"));
        document.getElementById('ifOther').style.display = 'block';
    }
    else {
        console.log("Else!")
        document.getElementById('ifOther').style.display = 'none';
    } 

}

function otherCheck2() {
    console.log("Inside otherCheck2");
    if (document.getElementById('check-5').checked) {
        console.log("Inside if");
        console.log(document.getElementById('radio-7').get);
        document.getElementById('ifOther2').style.display = 'block';
    }
    else {
        console.log("Else!")
        document.getElementById('ifOther2').style.display = 'none';
    } 

}
    
  