let org = [];
let project = [];
let projects = document.getElementsByClassName("allProject")[0];
let count = 25;
let prevCount = 0;
async function getDatas() {
  await fetch("/getOrg")
    .then((response) => response.json())
    .then((data) => {
      org = data;
    })
    .catch((error) => {
      console.log(error);
    });

  await fetch("/getThemes")
    .then((response) => response.json())
    .then((data) => {})
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
  $("#pagination-container").pagination({
    dataSource: project,
    pageSize: 6,
    showGoInput: true,
    showGoButton: true,
    formatGoInput: ' <%= input %>',
    showPrevious: true,
    showNext: true,
    showNavigator: true,
    callback: function (data, pagination) {
      projectNum.innerHTML=`Found <b>${project.length} </b> Projects`
      allProject(data);
    },
  });
}

function allProject(data) {
  console.log(data);
  
  projects.innerHTML = "";
  data.map((el, i) => {
    const img = JSON.parse(el.imageLink);

    const fundPercentage = ~~((el.funding / el.goal) * 100);
    // match org id
    const orgName = org.filter((org) => org.id == el.org_id);
    console.log(orgName);

    let element = ` <div class="card mb-3 mx-auto " style="width: 80%;">
    <div class="row g-0">
      <div class="col-md-4 allProjImg">
        <img src="${img[5].url}" class="img-fluid img-fluids rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <div class="d-flex flex-row mb-3">
            <div class="">${el.themeName} |</div>
            <div class="pl-2">${el.country} </div>
          </div>
          <h3 class="card-title">
            <a href="projects/${el.p_id}">${el.title} </a>
          </h3>
          <p class="card-text">By
            <a href=""> ${orgName[0].name} </a>
          </P>
          <p class="card-text">${el.summary.substring( 0, 100 )} <a style="font-weight:bold;color: #4F5F99 " href="project/${el.p_id
     }">...read more</a>
          </p>

  <div class="textBlack"> <p><b>Funding collected </b> : <span class="fundingStatus">$${Math.ceil(el.funding)}</span>  of <span class="fundingStatus">$${Math.ceil(el.goal)} </span> </p> </div>
          <div class="flex">

            <div class="flex-content">
          
              <div class="progress mt-2" style="height:20px">
                <div class="progress-bar " role="progressbar" style="width: ${fundPercentage}%" aria-valuenow="${fundPercentage}" aria-valuemin="0" aria-valuemax="100">${fundPercentage}% </div>
              </div>
            </div>
            <div class="flex-content">
              <div class="input-group" >
                <input style="width: 50px;height:30px" class="form-control" type="number" placeholder="$" aria-label="Input group example" aria-describedby="btnGroupAddon2" />
                <div class="input-group-text btn btn-sm btn-danger"  id="btnGroupAddon2">Donate</div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div> `;

    projects.insertAdjacentHTML("beforeend", element);
  });
}
