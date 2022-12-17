let invoiceList=[]
let userData=[]
let invoiceTbody= document.getElementsByClassName('invoiceList')[0]
async function getDatas() {
    await fetch("/getInvoiceList")
      .then((response) => response.json())
      .then((data) => {
        invoiceList = data;
        
      })
      .catch((error) => {
        console.log(error);
      });
      await fetch("/getUserInfo")
      .then((response) => response.json())
      .then((data) => {

    userData=data
      })
      .catch((error) => {
        console.log(error);
      });

      //call the function
     genInvList(invoiceList,userData)
    }

    function genInvList(data,user){

console.log(data,user);
data.map((item,i)=>{
const created_at=new Date(item.transaction_time);

const element=`<tr class="btn-reveal-trigger">
                    
<td class="order py-2 align-middle white-space-nowrap"><a href="../../../app/e-commerce/orders/order-details.html">
 <strong>#${item.invoice_id}</strong></a> by <strong>${user[0]}</strong><br /><a href="mailto:ricky@example.com">${user[1]}</a></td>
<td class="date py-2 align-middle">${created_at.toLocaleString()}</td>
<td class="py-2 align-middle">${item.card_type}</td>
<td class="address py-2 align-middle white-space-nowrap">
${item.tran_id}

</td>
<td class="status py-2 align-middle text-center fs-0 white-space-nowrap"><span class="badge badge rounded-pill d-block badge-soft-success">Completed<span class="ms-1 fas fa-check" data-fa-transform="shrink-2"></span></span>
</td>
<td class="amount py-2 align-middle text-end fs-0 fw-medium">$${item.amount}</td>
<td class="py-2 align-middle white-space-nowrap text-end">
  <div class="dropdown font-sans-serif position-static">
    <button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal" type="button" id="order-dropdown-0" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span class="fas fa-ellipsis-h fs--1"></span></button>
    <div class="dropdown-menu dropdown-menu-end border py-0" aria-labelledby="order-dropdown-0">
      <div class="bg-white py-2"><a class="dropdown-item" href="/invoices/${item.invoice_id}">View Details</a>
        <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="#!">Delete</a>
      </div>
    </div>
  </div>
</td>
</tr>`

invoiceTbody.insertAdjacentHTML("beforeend", element);

})
}