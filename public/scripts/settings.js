function getDatas(){
  
  //stop spinner after loading
  document.getElementById("loading-spinner").style.display = "none";
}
        //save birthdate and gender
        async function genderBdate() {
            let genderCheck = document.getElementsByClassName('gender');
            let birthdate = document.getElementById("datepicker")
            let displayBdate=document.getElementById('displayBdate')
            
            let gender;
            Array.from(genderCheck).map((item) => {
                if (item.checked) 
                    gender = item.value;
                
            });
            console.log(gender);
            console.log(birthdate.value);
            var data = new FormData();
        
            data.append("gender", gender);
            data.append("birthdate", birthdate.value);
            const rawResponse = await fetch("/saveGenderBdate", {
                method: "POST",
                body: data
            });
            const content = await rawResponse.json();
            console.log(content);
            if (content.affectedRows == 1) {
                genBdateAlert.removeAttribute('hidden')
                displayBdate.innerText=new Date(birthdate.value).toLocaleDateString('en',{ year: 'numeric', month: 'long', day: 'numeric'})
                setTimeout(() => {
                    genBdateAlert.setAttribute('hidden', '')
                }, 5000);
            }
        
        }
        
        async function generalSettings() {
        let firstName=document.getElementById('firstName')
        let lastName=document.getElementById('lastName')
        let email=document.getElementById('email')
        let phoneCode=document.getElementById('phoneCode')
        let phone=document.getElementById('phone')
        
        if(phone.value.length<1){
          const liveToastBtn=document.getElementById('liveToastBtn')
          liveToastBtn.click()
        }
            var data = new FormData();
        
            data.append("firstName", firstName.value);
            data.append("lastName", lastName.value);
            data.append("email", email.value);
            data.append("phoneCode", phoneCode[phoneCode.selectedIndex].value);
            data.append("phone", phone.value);
        
            const rawResponse = await fetch("/saveProfileData", {
                method: "POST",
                body: data
            });
            const content = await rawResponse.json();
            console.log(content);
            if (content.affectedRows == 1) {
              genSettingsAlert.removeAttribute('hidden')
                setTimeout(() => {
                  genSettingsAlert.setAttribute('hidden', '')
                }, 5000);
            }
        
        }
        
        async function changeAdress(){
        const streetAdress=document.getElementById('street-adress')
        const city=document.getElementById('city')
        const state=document.getElementById('state')
        const zipcode=document.getElementById('zipcode')
        const saveAdressAlert=document.getElementById('saveAdressAlert')
        var data = new FormData();
        
        data.append("streetAdress", streetAdress.value);
        data.append("city", city.value);
        data.append("state", state.value);
        data.append("zipcode", zipcode.value);
        
        
        
        const rawResponse = await fetch("/changeAdress", {
                method: "POST",
                body: data
            });
            const content = await rawResponse.json();
            console.log(content);
            if (content.affectedRows == 1) {
              saveAdressAlert.removeAttribute('hidden')
                setTimeout(() => {
                  saveAdressAlert.setAttribute('hidden', '')
                }, 5000);
            }
        }
        
        
        
        function changePicture(){
          
          const changePicture=document.getElementById('changePicture')
          console.log(changePicture);
          changePicture.submit()
        }
        
        const oldPassword=document.getElementById('old-password')
          const password=document.getElementById('new-password')
          const confirmPassword=document.getElementById('confirm-password')
          const passSaveAlert=document.getElementById('passSaveAlert')
          const crossSign1=document.getElementById('crossSign1')
        const crossSign2=document.getElementById('crossSign2')
        console.log(crossSign2);
        const passSign1=document.getElementById('passSign1')
        const passSign2=document.getElementById('passSign2')
        const passAlert1=document.getElementById('passAlert1')
        const passAlert2=document.getElementById('passAlert2')
          let flag=false
        
        
        
          
        async function changePass(){
        
          let oldPassAlert=document.getElementById('oldPassAlert')
          let newPassAlert=document.getElementById('newPassAlert')
        
          var data = new FormData();
        
        data.append("oldPassword", oldPassword.value);
        data.append("newPassword", password.value);
        data.append("confirmPassword", confirmPassword.value);
        
        
        if(flag==true){
          const rawResponse = await fetch("/changePassword", {
            method: "POST",
            body: data
        });
        
        
        const content = await rawResponse.json();
            console.log(content);
            if(content.data==0){
              oldPassAlert.style.display='block'
              setTimeout(() => {
                oldPassAlert.style.display='none'
                }, 5000);
            
            }
            if(content.data==1){
              newPassAlert.style.display='block'
              setTimeout(() => {
                newPassAlert.style.display='none'
                }, 5000);
            
            }
            if(content.affectedRows==1){
              oldPassword.value=''
              password.value=''
              confirmPassword.value=''
              passSaveAlert.removeAttribute('hidden')
              clearPassField()
              setTimeout(() => {
                passSaveAlert.setAttribute('hidden', '')
                }, 5000);
            
            }
         
        }
        
        }
        // passvalidation
        
        passwordForm.addEventListener('focusout', (e) => {
         console.log( password.value,confirmPassword.value);
          if (e.target.name == 'password' && e.target.value.length > 0) {
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
              flag=true
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
          }
           else {
            clearPassField();
          }
        
        });
        
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
          console.log('confirm passwords valid');
          passAlert2.style.display = 'none';
          passSign2.style.display = 'block';
          crossSign2.style.display = 'none';
          confirmPassword.classList.add('border-success')
          confirmPassword.classList.remove('border-danger');
          return true;
        }
        
        function clearPassField() {
          if (password.value.length <= 0) {
            password.classList.remove('border-success');
            password.classList.remove('border-danger');
            passSign1.style.display='none'
            crossSign1.style.display = 'none';
            passAlert1.style.display = 'none';
            passAlert2.style.display = 'none';
          }
          if (confirmPassword.value.length <= 0) {
            confirmPassword.classList.remove('border-success');
            confirmPassword.classList.remove('border-danger');
            passSign2.style.display='none'
            crossSign2.style.display = 'none';
            passAlert1.style.display = 'none';
            passAlert2.style.display = 'none';
          }
        }