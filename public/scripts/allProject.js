let org = [];
let project=[]

let count=25;
let prevCount=0;
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
      project=data
    })
    .catch((error) => {
      console.log(error);
    });
   
     allProject(project)
}

function allProject(data,count,prevCount) {
  const projects = document.getElementsByClassName("allProject")[0];
  data.map((el, i) => {
    const img = JSON.parse(el.imageLink);
    if (i >= 0 && i <= 25 ) {
      const fundPercentage = ~~((el.funding / el.goal) * 100);
      const orgName = org.filter((org) => {
        if (org.id == el.org_id) {
          return org;
        }
      });
   
      let element = `
      <div class="card mb-3 mx-auto mb-5 mt-5 " style="width: 80%;">


<div class="row g-0">
<div class="col-md-4 allProjImg">
  <img src="${img[5].url}"class="img-fluid rounded-start" alt="...">
</div>
<div class="col-md-8">
  <div class="card-body">
  <div class="d-flex flex-row mb-3">
  <div class="">${el.themeName} |</div>
  <div class="pl-2">${el.country} </div>

  </div>
    <h3 class="card-title"><a href="projects/${el.p_id}">${el.title}  </a></h3>
    <p class="card-text"> <a href=""> ${orgName[0].name} </a> </P>
    
    <p class="card-text">${el.summary.substring(
      0,
      100
    )}<a style="font-weight:bold;color: #4F5F99 " href="project/${
        el.p_id
      }">...read more</a></p>
 
    <div class="d-flex">
 <div class="p-2 flex-grow-1">
 <div class="progress mb-3" style="height:15px">
 <div class="progress-bar" role="progressbar" style="width: ${fundPercentage}%" aria-valuenow="${fundPercentage}" aria-valuemin="0" aria-valuemax="100">${fundPercentage}%</div>
</div>
 </div>
 <div class="p-2" >
 <div class="input-group mb-2">

 <input style="width: 50px" class="form-control" type="text" placeholder="$" aria-label="Input group example" aria-describedby="btnGroupAddon2" />
 <div class="input-group-text btn btn-danger" id="btnGroupAddon2">Donate</div>
 </div>
 </div>

 </div>
    </div>
</div>
</div>
</div>
`;

      projects.insertAdjacentHTML("afterbegin", element);
    }
  });

}

(function() {
  var paginator = new pagination.ItemPaginator({prelink:'/', current: 3, rowsPerPage: 200, totalResult: 10020});
  var html = paginator.render();
  var paginator = pagination.create('search', {prelink:'/', current: 1, rowsPerPage: 200, totalResult: 10020});
  html += paginator.render();
  document.getElementById("paging").innerHTML = html;
})();