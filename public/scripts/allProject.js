let org = [];
let project = [];
let themes = [];
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
    .then((data) => {
      themes = data;
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

//sorting

/* <i class="fa-solid fa-xmark" onclick="close()"></i> */

const themeSelection = document.getElementById("theme");
let sortedThemeProject=[];
let sortedCountryProject = [];
let tflag=0;
let cflag = 0;
let selectedValueTheme
let selectedValueCountry
themeSelection.addEventListener("change", (e) => {
  
  let selectedValueTheme = themeSelection.value;

  if (selectedValueTheme=="") {
    sortedThemeProject = [];
    tflag=0
    paginationProject(project);
  } else{
    tflag=1

    
  }

if(tflag==1 && cflag==1){
  sortedThemeProject = [];
  sortedCountryProject=[]
// console.log('b',sortedCountryProject.length);
 themeSort(project,selectedValueTheme)
 countrySort(sortedThemeProject,selectedValueCountry)
}
if(tflag==1 && cflag==0){
// console.log('bb');
  sortedThemeProject = [];
 themeSort(project,selectedValueTheme)
}
if(tflag==0 && cflag==1){
//  console.log('bbb',sortedCountryProject.length);
 sortedCountryProject=[]
 countrySort(project,selectedValueCountry)
}
console.log(cflag,tflag);

});

//country sort
const countryThemeSelection = document.getElementById("country");

countryThemeSelection.addEventListener("change", (e) => {

 selectedValueCountry = countryThemeSelection.value;
  if (selectedValueCountry == "") {
    sortedCountryProject  = [];
    paginationProject(project);
    cflag = 0;
  } else {
    // paginationProject(sortedCountryProject);
    cflag = 1;
  }

    if(tflag==1 && cflag==1){
    //  console.log('c',sortedThemeProject.length);
      sortedCountryProject  = [];
      
     countrySort(sortedThemeProject,selectedValueCountry)
    //  themeSort(sortedCountryProject,selectedValueTheme)
    }
    if(tflag==0 && cflag==1){
      // console.log('cc');
      sortedCountryProject  = [];
     countrySort(project,selectedValueCountry)
    }
    if(tflag==1 && cflag==0){
      // console.log('ccc');
     
     themeSort(sortedThemeProject,selectedValueTheme)
    }
    // console.log(tflag,cflag);

});


function themeSort(project,selectedValue){
 
  project.map((item, i) => {
    let thm = JSON.parse(item.theme);

    if (thm.theme.length <= 2) {
      thm.theme.map((id) => {
        if (id.id == selectedValue) sortedThemeProject.push(item);
      });
    } else {
      if (thm.theme.id == selectedValue) sortedThemeProject.push(item);
    }

  });

  paginationProject(sortedThemeProject)


}
function countrySort(project,selectedValue){

  project.map((item, i) => {
    if (item.country == selectedValue) {
      sortedCountryProject.push(item);
    console.log('a');

    }
  });
// console.log(sortedCountryProject);
  paginationProject(sortedCountryProject)
}

function allProject(data) {
  projects.innerHTML = "";
  data.map((el, i) => {
    const img = JSON.parse(el.imageLink);

    const fundPercentage = ~~((el.funding / el.goal) * 100);
    // match org id
    const orgName = org.filter((org) => org.id == el.org_id);

    let element = ` <div class="card mb-3 mx-auto " style="width: 80%;">
    <div class="row g-0">
      <div class="col-md-4 allProjImg">
        <img src="${
          img[5].url
        }" class="img-fluid img-fluids rounded-start" alt="...">
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
          <p class="card-text">${el.summary.substring(
            0,
            100
          )} <a style="font-weight:bold;color: #4F5F99 " href="project/${
      el.p_id
    }">...read more</a>
          </p>

  <div class="textBlack"> <p><b>Funding collected </b> : <span class="fundingStatus">$${Math.ceil(
    el.funding
  ).toLocaleString('en-US')}</span>  of <span class="fundingStatus">$${Math.ceil(
      el.goal
    ).toLocaleString('en-US')} </span> </p> </div>
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

function paginationProject(project) {
  $("#pagination-container").pagination({
    dataSource: project,
    pageSize: 6,
    showGoInput: true,
    showGoButton: true,
    formatGoInput: " <%= input %>",
    showPrevious: true,
    showNext: true,
    showNavigator: true,
    callback: function (data, pagination) {
      projectNum.innerHTML = `Found <b>${project.length} </b> Projects`;
      document.body.scrollTop = 10;
      document.documentElement.scrollTop = 10;
      allProject(data);
    },
  });
}
