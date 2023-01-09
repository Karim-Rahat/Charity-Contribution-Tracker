
let org = [];
let project = [];
let projects = document.getElementsByClassName("allProject")[0];
let count = 25;
let prevCount = 0;
async function getProjectDatas() {
  console.log('ok');
  await fetch("/getOrg")
    .then((response) => response.json())
    .then((data) => {
      org = data;
       //pagination
  paginationProject(org);
    })
    .catch((error) => {
      console.log(error);
    });




}

function allProject(data) {
  projects.innerHTML = "";
  data.map((el, i) => {

const element=`

<tr class="border-bottom border-200">
  <td style="width: 300px">
    <div class="d-flex align-items-center position-relative">
      <img class="rounded-1 border border-200" src="${el.logoUrl}" width="60" alt="">
      <div class="flex-1 ms-1">
        <h6 class="mb-1 fw-semi-bold text-nowrap"><a class="text-900 text-wrap stretched-link" href="#!">${el.name} </a></h6>
        <p class="fw-semi-bold mb-0 text-500">${el.city,+' ',el.country} </p>
      </div>
    </div>
  </td>
  <td class="align-middle text-center fw-semi-bold" style="width: 100px">
    #${el.id}
  </td>
  <td class="align-middle text-center fw-semi-bold" style="width: 150px">
    ${el.totalProjects} 
    </td>


    <td class="align-middle pe-card">
    <div class="d-flex align-items-center text-truncate" style="max-width: 250px;">
    <a  tabindex="0" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Mission" data-bs-content="${el.mission}">${el.mission} </a>
    
    </div>
  </td>
  <td class="align-middle text-end fw-semi-bold text-wrap" style="width: 200px">
   <a href="${el.websiteLink}"> ${el.websiteLink} </a>
  </td>

</tr>
 `

projects.insertAdjacentHTML("beforeend", element);
  });
}


  function paginationProject(project) {
  $("#pagination-container").pagination({
    dataSource: project,
    pageSize: 10,
    showGoInput: true,
    showGoButton: true,
    formatGoInput: "<%=input%>",
    showPrevious: true,
    showNext: true,
    showNavigator: true,
    callback: function (data, pagination) {

      document.body.scrollTop = 10;
      document.documentElement.scrollTop = 10;
      allProject(data);
      
      
      
      var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
      var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl)
})
    },
  });
}
