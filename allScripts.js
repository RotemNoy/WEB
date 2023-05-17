function CreateNavBar() {

      var newDiv = document.createElement("div");

      newDiv.className = "nav_bar";
      newDiv.innerHTML = "<ul><li><a href='welcomePage.html'><img height='85px' src='pics/amigologo1.png' alt='Amigo'></a></li>" +
                            "<li><a href='aboutUs.html'>ABOUT US</a></li>" +
                            "<li><a href='selectKayak.html'>RENT A KAYAK</a></li>" +
                            "<li><a href='SelectGroup.html'>REGISTER FOR GROUP</a></li>" +                          
                            "<li><a href='contactUsss.html'>CONTACT US</a></li>" +                            
                            "<li class='rightli'><a href='logingPage.html'>SIGN IN</a></li>" +
                            "<li class='rightli'><a href='CreateAccount.html'>SIGN UP</a></li>" +
                            "<li class='rightli'><h3 id = ampm>" + 
                            GetDayPart() +
                            "</h3></li></ul>";
      
      var body = document.querySelector("body");        
      // Insert the new div element as the first child of the body element
      body.insertBefore(newDiv, body.firstChild);

};

function GetDayPart() {

  var currentTime = new Date();
  var hours = currentTime.getHours();
  var ampm = hours >= 15 ? 'Good Afternoon' : 'Good Morning';

  return ampm;

}

//select group

const rows = document.getElementsByTagName("tr");
var selectedRow;

function selectRow(row) {
  // Remove selected class from all rows  
  for (let i = 0; i < rows.length; i++) {
    rows[i].classList.remove("selected");
  }
  
  // Add selected class to the clicked row
  row.classList.add("selected");
  selectedRow = row.rowIndex;

  document.getElementById("SelectButton").disabled = false;
}

function SelectGroupButton() {

  window.location.href = 'acceptanceGroup.html?level=' + rows[selectedRow].cells[0].textContent + '&day=' + rows[selectedRow].cells[1].textContent + '&hours=' + rows[selectedRow].cells[2].textContent;
}

function SelectKayakButton() {

  window.location.href = 'selectDate.html?kayak=' + rows[selectedRow].cells[1].textContent;
}

function SelectDateButton() {
  window.location.href = 'acceptanceKayak.html?date=' + document.getElementById('rent_date').value;
}


//errors
            
//login page

            function validateLoginForm() {

                
                var idInput = document.getElementById('idl');

                var idErr = document.getElementById('err_idl');
                
                idErr.textContent = '';
           
                
                if (validateIdInput(idInput.value) == false ||idInput.value == "" ) {
                    idErr.textContent = 'your ID must contain  digits only!.';
                    return false;
                }



                // If all fields are valid, the form will submit
                return true;
            }


            function validateIdInput(input) {
                var regex = "\\d{9}";
                if (input < 5) {
          
                    return true;
                }
                // Invalid input
                return false;
            }

    // sign up

    


    function validateSIGNUPForm() {

      //const form = document.querySelector('form');
      //event.preventDefault(); // Prevent form submission for demonstration purposes

      var idInput = document.getElementById('id');
      var nameInput = document.getElementById('name');
      var emailInput = document.getElementById('email');
      var birthdateInput = document.getElementById('birthdate');
      var phoneInput = document.getElementById('phone');

      var idErr = document.getElementById('err_id');
      var nameErr = document.getElementById('err_name');
      var emailErr = document.getElementById('err_email');
      var birthdateErr = document.getElementById('err_birthdate');
      var phoneErr = document.getElementById('err_phone');

      idErr.textContent = '';
      nameErr.textContent = '';
      emailErr.textContent = '';
      birthdateErr.textContent = '';
      phoneErr.textContent = '';

      /*ID input Validation*/
      if (idInput.value === '') {

          idErr.textContent = 'ID is required';
          return false;

      }

      /*Full Name input Validation*/
      if (nameInput.value === '') {
          nameErr.textContent = 'Full Name is required';
          return false;
      }


      /*email input Validation*/
      if (emailInput.value === '') {
          emailErr.textContent = 'EMail is required';
          return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (validateRegexInput(emailInput.value, emailRegex) == false) {
          emailErr.textContent = 'Email address must have a valid format';
          return false;
      }

      /*Birth Date input Validation*/
      if (birthdateInput.value === '') {
          birthdateErr.textContent = 'Date of Birth is required';
          return false;
      }

      /*Phone input Validation*/
      if (phoneInput.value === '') {
          phoneErr.textContent = 'Phone Number is required';
          return false;
      }

      if (validateRegexInput(phoneInput.value, phoneRegex) == false) {
          phoneErr.textContent = 'Phone Number must have at least 9 digits';
          return false;
      }


      // If all fields are valid, the form will submit
      return true;
  }


  function validateRegexInput(input, regex) {
      
      if (regex.test(input)) {
          return true;
      }
      return false;
  }

      
      function ValidateEmail(mail){       
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/   
      if (regex.test(myForm.emailAddr.value)){
       return (true)
      }
       return (false)
      }

      
    function validateContactForm() {

      var nameInput = document.getElementById('namec');
      var emailInput = document.getElementById('emailc');
      var phoneInput = document.getElementById('phonec');
      
      var nameErr = document.getElementById('err_namec');
      var emailErr = document.getElementById('err_emailc');
      var phoneErr = document.getElementById('err_phonec');
      
      nameErr.textContent = '';
      emailErr.textContent = '';
      phoneErr.style.textContent = '';

      if (nameInput.value === '') {
        nameErr.textContent = 'Full Name is required';
        return false;
    }


    /*email input Validation*/
    if (emailInput.value === '') {
        emailErr.textContent = 'EMail is required';
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (validateRegexInput(emailInput.value, emailRegex) == false) {
        emailErr.textContent = 'Email address must have a valid format';
        return false;
    }

    
      /*Phone input Validation*/
      if (phoneInput.value === '') {
        phoneErr.textContent = 'Phone Number is required';
        return false;
    }

    if (validateRegexInput(phoneInput.value, phoneRegex) == false) {
        phoneErr.textContent = 'Phone Number must have at least 9 digits';
        return false;
    }


      
       // If all fields are valid, the form will submit
      return true;
      }
      
      
    function validateSIGNINForm() {

      var idInput = document.getElementById('idl');
      
      var idErr = document.getElementById('err_idl');
      
      idErr.textContent = '';

      
      /*ID input Validation*/
      if (idInput.value === '') {

        idErr.textContent = 'ID is required';
        return false;

    }



      return true;
      }
      
      function onloadgroup() {
            
        var level = new URLSearchParams(window.location.search).get("level");
        var day = new URLSearchParams(window.location.search).get("day");
        var hours = new URLSearchParams(window.location.search).get("hours");
        
        var h3 = document.getElementById("dynH3");
        h3.innerHTML = "You have successfully registered to <u>" + level + "</u> level rowing!<br>We are rowing every <u>" + day + "</u> between <u>" + hours + "</u>.";

    }

    function onloadDate() {

      var kayak_date = new URLSearchParams(window.location.search).get("date");
    
      var h3 = document.getElementById("dynH3");
      h3.innerHTML = "You have successfully rent kayak on <u>" + kayak_date;

    

  }

