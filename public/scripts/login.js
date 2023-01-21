console.log("login");

async function login() {
  console.log(mail.value);
  console.log(pass.value);
  var data = new FormData();

  data.append("mail", mail.value);
  data.append("pass", pass.value);
  const rawResponse = await fetch("/loginAuth", {
    method: "POST",
    body: data,
  });
  const content = await rawResponse.json();

  if (content.data == true)      window.location.href = '/home';
  if(content.data=='admin') window.location.href='/dashboard';
  if(content.data==false) alerts.style.display = "block";
}

//hide alert when re-enter data
const inp = document.querySelectorAll("input");

Array.from(inp).map((item) => {
  item.addEventListener("click", function () {
    alerts.style.display = "none";
  });
});


//org login
async function orgLogin() {
  console.log(mail.value);
  console.log(pass.value);
  var data = new FormData();

  data.append("mail", mail.value);
  data.append("pass", pass.value);
  const rawResponse = await fetch("/orgLoginAuth", {
    method: "POST",
    body: data,
  });
  const content = await rawResponse.json();

  if (content.data == true)      window.location.href = '/home';
  if(content.data=='org') window.location.href='/org';
  if(content.data==false) alerts.style.display = "block";
}

//hide alert when re-enter data
const input = document.querySelectorAll("input");

Array.from(inp).map((item) => {
  item.addEventListener("click", function () {
    alerts.style.display = "none";
  });
});
