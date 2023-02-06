
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
    })
    .catch((error) => {
      console.log(error);
    });


  await fetch("/getProjects")
    .then((response) => response.json())
    .then(async (data) => {
      project = data;
    })
    .catch((error) => {
      console.log(error);
    });

  //pagination
  paginationProject(project);
}

function allProject(data) {
  projects.innerHTML = "";
  data.map((el, i) => {
   
    // match org id
    const orgName = org.filter((org) => org.id == el.org_id);
    const fundPercentage = ~~((el.funding / el.goal) * 100);
    const fundPercentages=`style=width:${fundPercentage}%`
    fundPer=~~(fundPercentage) 

const element=`

<tr class="border-bottom border-200">
  <td>
    <div class="d-flex align-items-center position-relative">
      <img class="rounded-1 border border-200" src="${el.imageLink}" width="60" alt="">
      <div class="flex-1 ms-3">
        <h6 class="mb-1 fw-semi-bold text-nowrap"><a class="text-900 stretched-link" href="#!">${el.title} </a></h6>
        <p class="fw-semi-bold mb-0 text-500">${orgName[0].name} </p>
      </div>
    </div>
  </td>
  <td class="align-middle text-center fw-semi-bold">
    ${Math.ceil(el.goal).toLocaleString("en-US")}
  </td>
  <td class="align-middle text-center fw-semi-bold">
    ${Math.ceil(el.funding).toLocaleString("en-US")} </td>

  <td class="align-middle text-end fw-semi-bold">$
    ${Math.ceil(el.remaining).toLocaleString("en-US")} 
  </td>
  <td class="align-middle pe-card">
    <div class="d-flex align-items-center">
      <div class="progress me-3 rounded-3 bg-200" style="height: 5px;width:80px">
        <div class="progress-bar bg-primary rounded-pill"  role="progressbar"
        aria-valuenow="${fundPer}" aria-valuemin="0" aria-valuemax="100"
        ${fundPercentages}></div>
      </div>
      <div class="fw-semi-bold ms-2">${fundPer}% </div>
    </div>
  </td>
</tr>
 `

projects.insertAdjacentHTML("beforeend", element);
  });
}


  function paginationProject(project) {
  $("#pagination-container").pagination({
    dataSource: project,
    pageSize: 5,
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
    },
  });
}
