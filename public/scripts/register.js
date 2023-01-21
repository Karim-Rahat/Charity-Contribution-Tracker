/* eslint-disable no-unused-vars */
let flag=true

registerBtn.addEventListener('click',function(e){

e.preventDefault()

  registerForm.reportValidity();



  let genderCheck = document.getElementsByClassName('genderCheck');
  let gender;
  Array.from(genderCheck).map((item) => { if (item.checked) gender = item.value; console.log(gender);});
  const formData = new FormData();
  formData.append('firstname', firstName.value);
  formData.append('lastname', lastName.value);
  formData.append('email', email.value);
  formData.append('password', password.value);
  formData.append('birthdate', bdate.value);
  formData.append('gender', gender);
  formData.append('countryCode', countryCode.value);
  formData.append('phone', phoneNum.value);

  //validation
  if (checkReg.checked == false) { return false; }
  if (registerForm.reportValidity() == false) { return false }


// name validation
registerForm.addEventListener('keyup', (e) => {
  if (e.target.name == 'firstName' || e.target.name == 'lastName') {
    const charValidation = /[^a-z]/gi;
    e.target.classList.add('border-success')
    e.target.value = e.target.value.replace(charValidation, '');
  }

});
  //post
  console.log(flag);
  if(flag==true){
    axios
    .post('/registration', formData)
    .then((response) => {
     
      if(response.data.affectedRows==1){

      
        let timerInterval
        Swal.fire({
          title: 'Registration Successfull!',
          html: 'Redirected to login page in <b></b> milliseconds.',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          window.location.href = '/confirmMail';
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })

       


      }
    })
    .catch((error) => {
      console.log(error);
    });
  }



})
// email validation
email.addEventListener('focusout',(e)=>{
  console.log(e.target.value);
  axios
  .get('/getUserEmail')
  .then((response) => {

    response.data.map(item => {
      if (item == e.target.value) {
        console.log('3');
        emailError.style.display = 'block';
        resetEmailVal.style.display = 'block';
        emailSuccess.style.display = 'none';
        email.classList.add('border-danger')
   
        emailalertText.innerHTML = "This Email already exists!!"
       
        flag=false
      }
      else{
        flag=true
      }
    

    })
  })
})

registerForm.addEventListener('focusout', (e) => {
  if (firstName.value.length == 0) { firstName.classList.remove('border-success') }
  if (lastName.value.length == 0) { lastName.classList.remove('border-success') }
  if (email.value.length == 0) { email.classList.remove('border-success') }
  if (phoneNum.value.length == 0) { phoneNum.classList.remove('border-success') }
  else { phoneNum.classList.add('border-success') }
  if (bdate.value.length == 0) { bdate.classList.remove('border-success') }
  else { bdate.classList.add('border-success') }



  if (e.target.name == 'email' && e.target.value.length > 0) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (e.target.value.match(regex) == null) {
      console.log('1');
      emailError.style.display = 'block';
      email.classList.remove('border-success')
      email.classList.add('border-danger')
      resetEmailVal.style.display = 'block';
      emailSuccess.style.display = 'none';
      emailalertText.innerHTML = "Invalid Email!!"
    } else {
      console.log('2');
      email.classList.remove('border-danger')
      email.classList.add('border-success')
      emailSuccess.style.display = 'block';
      emailError.style.display = 'none';
      resetEmailVal.style.display = 'none';
    }
    resetEmailVal.addEventListener('click', () => {

      e.target.value = '';
      emailError.style.display = 'none';
      resetEmailVal.style.display = 'none';
      email.classList.remove('border-danger')
    });
  }

 
});

// passvalidation
passwordForm.addEventListener('focusout', (e) => {
  if (e.target.name == 'pass' && e.target.value.length > 0) {
    console.log(passValidation());
    passValidation();
  }

  if (e.target.name == 'confirmPassword' && e.target.value.length > 0) {
    console.log(confirmPasswordValidation());
    confirmPasswordValidation();
  }

  if (
    password.value.length > 0
    && confirmPassword.value.length > 0
    && passValidation() == true
    && confirmPasswordValidation() == true
  ) {
    if (password.value == confirmPassword.value) {
      console.log('pass matched');
      passAlert1.style.display = 'none';

      password.classList.add('border-success')
      confirmPassword.classList.add('border-success');

      password.classList.remove('border-danger');

      confirmPassword.classList.remove('border-danger');

      passSign1.style.display = 'block';
      passSign2.style.display = 'block';
      crossSign1.style.display = 'none';
      crossSign2.style.display = 'none';
      flag=true;
    } else {
      console.log(password.value, confirmPassword.value);
      passAlert1.style.display = 'block';

      password.classList.remove('border-success')
      confirmPassword.classList.remove('border-success');
      password.classList.add('border-danger');

      confirmPassword.classList.add('border-danger');
      passSign1.style.display = 'none';
      passSign2.style.display = 'none';
      crossSign1.style.display = 'block';
      crossSign2.style.display = 'block';
      flag=false
    }
  } else {
    clearPassField();
  }
  crossSign1.addEventListener('click', () => {
    if (crossSign1.style.display == 'block') {
      password.value = '';

      clearPassField();
    }
  });
  crossSign2.addEventListener('click', () => {
    if (crossSign2.style.display == 'block') {
      confirmPassword.value = '';

      clearPassField();
    }
  });
});

function passValidation() {
  const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if (password.value.length > 0 && password.value.match(passw) == null) {
    passAlert1.style.display = 'none';
    passAlert2.style.display = 'block';
    password.classList.remove('border-success')
    password.classList.add('border-danger');
    crossSign1.style.display = 'block';
    passSign1.style.display = 'none';
  
    return false;
  }
  console.log('passwords valid');
  passAlert2.style.display = 'none';

  password.classList.remove('border-danger');
  password.classList.add('border-success')
  passSign1.style.display = 'block';
  crossSign1.style.display = 'none';

  password.classList.remove('border-danger');

  return true;
}
// confirmPassword validation
function confirmPasswordValidation() {
  const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if (
    confirmPassword.value.length > 0
    && confirmPassword.value.match(passw) == null
  ) {
    passAlert1.style.display = 'none';
    passAlert2.style.display = 'block';
    confirmPassword.classList.remove('border-success')
    confirmPassword.classList.add('border-danger');
    crossSign2.style.display = 'block';
    passSign2.style.display = 'none';
  
    return false;
  }
  console.log('passwords valid');
  passAlert2.style.display = 'none';
  passSign2.style.display = 'block';
  crossSign2.style.display = 'none';
  confirmPassword.classList.add('border-success')
  confirmPassword.classList.remove('border-danger');
  
  return true;
}

function clearPassField() {
  if (password.value.length <= 0) {
    password.classList.remove('border-danger');
    crossSign1.style.display = 'none';
    passAlert1.style.display = 'none';
  }
  if (confirmPassword.value.length <= 0) {
    confirmPassword.classList.remove('border-danger');
    crossSign2.style.display = 'none';
    passAlert2.style.display = 'none';
  }
}

