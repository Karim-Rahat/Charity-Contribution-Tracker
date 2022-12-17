const cartContent = document.getElementsByClassName("cart-content")[0];
const cardFooter = document.getElementsByClassName("card-footer")[0];
const itemNo = document.getElementsByClassName("itemNo")[0];

let amount = 0;
let totalItem = 0;
let cartData = [];
let project = [];

async function getDatas() {
  await fetch("/getProjects")
    .then((response) => response.json())
    .then(async (data) => {
      project = data;
    })
    .catch((error) => {
      console.log(error);
    });

  await fetch("/getCartData")
    .then((response) => response.json())
    .then(async (data) => {
      cartData = data;
      console.log(data);
      cartListGen(cartData);
    })
    .catch((error) => {
      console.log(error);
    });
}

function cartListGen(cartData) {
  cartContent.innerHTML = "";
  cardFooter.innerHTML = "";
  amount = 0;
  totalItem = 0;
  itemNo.innerText = 0;

  cartData.map((item, i) => {
    const projectData = project.filter((el) => el.p_id == item.project_id);

    const img = JSON.parse(projectData[0].imageLink);
    amount = amount + item.amount;

    totalItem = cartData.length;
    itemNo.innerText = totalItem;

    let element = `<div class="row gx-card mx-0 align-items-center border-bottom border-200">
      <div class="col-4 py-3">
      
        <div class="d-flex align-items-center"><a href="/project/${item.project_id}">
        <img class="img-fluid rounded-1 me-3 d-block d-md-block" src="${img[5].url}" alt="" width="200" height="100" /></a>
         
        </div>
      </div>

      <div class="col-4 py-3>
     
      <h5 class="fs-0">
      <a class="text-900" href="">${item.title}</a></h5>
      
    </div>


    <div class="col-4 py-3">
    <div class="row align-items-center">
      <div class="col-md-6 d-flex justify-content-end justify-content-md-center mb-2 mb-md-0 order-1 order-md-0">
        <div>
          <div class="input-group input-group-sm flex-nowrap" data-quantity="data-quantity">
          <span class="input-group-text" id="basic-addon1">$</span>
          <input class="form-control text-center px-2 input-spin-none cartInp" type="number" value="${item.amount}" c_id="${item.c_id}" 
           />
          </div>
        </div>
      </div>
      <div class="col-md-6 text-end justify-content-end text-md-center ps-0 order-1 order-md-1  text-600">
      <div class="fs--2 fs-md--1 text-end justify-content-end">
      <i class="fa-solid fa-delete-left fa-2xl" onclick="delItem(${item.c_id})"></i>
      </div>
      </div>
    </div>
  </div>

 


      
     
 
      </div>`;
    cartContent.insertAdjacentHTML("beforeend", element);
  });

  const totalElement = `    <div class="row fw-bold gx-card mx-0">
  <div class="col-9 col-md-8 py-2 text-end text-900">Total</div>
  <div class="col px-0">
    <div class="row gx-card mx-0">
      <div class="col-md-8 py-2 d-none d-md-block text-center"><span class="itemNo">${totalItem}</span> (items)</div>
      <div class="col-12 col-md-4 text-end py-2"><span class="totalAmount"> $${amount} </span></div>
    </div>
  </div>
</div>`;

  cartContent.insertAdjacentHTML("beforeend", totalElement);

  const footer = `   <button type="button" class="btn btn-primary" id="chkOutBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Donate
  </button>
  
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <a href="/init/${amount}" alt="SSLCommerz" style="border:none" ><img style="width:90%;height:auto;" src="/content/SSLCommerz-Pay-With-logo-All-Size-05.png" /></a>
        </div>
  
      </div>
    </div>
  </div>`;
  cardFooter.insertAdjacentHTML("beforeend", footer);

  //check if cart has empty then disable button
  if (cartData.length == 0) {
    document.getElementById("chkOutBtn").setAttribute("disabled", "");
  }
}

//update sum of ammount value dynamically
cartContent.addEventListener("keyup", (e) => {
  const cartInp = document.getElementsByClassName("cartInp");
  const totalAmount = document.getElementsByClassName("totalAmount")[0];
  let amount = 0;
  Array.from(cartInp).map((el) => {
    amount = amount + parseInt(el.value);
    totalAmount.innerText = amount;
  });
});
//validaiton if  input value less than 5
cartContent.addEventListener("focusout", async (e) => {
  const cartInp = document.getElementsByClassName("cartInp");
  const totalAmount = document.getElementsByClassName("totalAmount")[0];
  let amount = 0;

  Array.from(cartInp).map((el) => {
    el.value < 5 ? (el.value = 5) : el.value;
    amount = amount + parseInt(el.value);
    totalAmount.innerText = amount;
  });

  //change input value to database

  console.log(e.target.value);
  let data = new FormData();
  data.append("c_id", e.target.getAttribute("c_id"));
  data.append("amount", e.target.value);
  const rawResponse = await fetch("/updateCartAmount", {
    method: "POST",
    body: data,
  });
  console.log(rawResponse);
});

//delete item from cart and database
async function delItem(c_id) {
  let data = new FormData();
  data.append("c_id", c_id);

  const rawResponse = await fetch("/delCartItem", {
    method: "POST",
    body: data,
  });
  console.log(rawResponse);
  if (rawResponse.status == 200) {
    await fetch("/getCartData")
      .then((response) => response.json())
      .then(async (data) => {
        cartData = data;

        cartListGen(cartData);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

async function chkout() {
  let data = new FormData();
  // data.append("cartData",JSON.stringify(cartData));
}
