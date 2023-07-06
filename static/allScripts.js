function GetDayPart() {

    var currentTime = new Date();
    var hours = currentTime.getHours();
    var ampm = hours >= 15 ? 'Good Afternoon' : 'Good Morning';

    return ampm;    
}

function getCookie(cookieName) {
    // Split the cookies by semicolon
    var cookies = document.cookie.split(';');

    // Loop through the cookies to find the one with the given name
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();

        // Check if the cookie starts with the provided name
        if (cookie.indexOf(cookieName + '=') === 0) {
            // Extract the value of the cookie
            var cookieValue = cookie.substring(cookieName.length + 1, cookie.length);
            return decodeURIComponent(cookieValue);
        }
    }

    // If the cookie is not found, return null
    return null;
}


function selectRow(row) {
    // Remove the 'selected' class from all rows
    const rows = document.querySelectorAll('#myTable tr');
    var selectedRow;
    rows.forEach(row => {
        row.classList.remove('selected');
    });

    // Add the 'selected' class to the clicked row
    row.classList.add('selected');
    selectedRow = row.rowIndex;

    document.getElementById('SelectButton').disabled = false;

    //var id = document.getElementById('myTable').rows[selectedRow].cells[0].textContent;
    //document.cookie = 'selectedGroup=' + id;

    return selectedRow;
}


/*function selectRow_Kayak(row) {
  // Remove the 'selected' class from all rows
  const rows = document.querySelectorAll('#myTable tr');
  var selectedRow;
  rows.forEach(row => {
      row.classList.remove('selected');
  });

  // Add the 'selected' class to the clicked row
  row.classList.add('selected');
  selectedRow = row.rowIndex;

  document.getElementById('SelectButton').disabled = false;
  var id = document.getElementById('myTable').rows[selectedRow].cells[0].textContent;
  document.cookie = 'selectedKayak=' + id;

  return selectedRow;
}*/


function isValidID(value) {
  var digitPattern = /^\d{9}$/;
  if (!digitPattern.test(value)) {
    return false; // Invalid ID format
  }
  return true; // Valid ID format
}

function isValidEmail(email) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return false; // Invalid email format
  }
  return true; // Valid email format
}

function isValidPhoneNumber(phoneNumber) {
  var phonePattern = /^(?:\+972|0)(?:-)?(?:[23489]|5[0248]|77)(?:-)?(?:\d{7}|\d{3}-\d{4})$/;
  if (!phonePattern.test(phoneNumber)) {
    return false; // Invalid phone number format
  }
  return true; // Valid phone number format
}

function isValidFullName(fullName) {
  var namePattern = /^[A-Za-z\s]+$/;
  if (!namePattern.test(fullName)) {
    return false; // Invalid full name format
  }
  return true; // Valid full name format
}


//module.exports={getCookie}