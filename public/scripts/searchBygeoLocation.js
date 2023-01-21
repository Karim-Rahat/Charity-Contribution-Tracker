let x ,y
    
      
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x="Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  y=position.coords.latitude
  x=position.coords.longitude

  const formData=new FormData()
  formData.append('longitude',x)
  formData.append('latitude',y)
  fetch('/geoLocation',{
    method: 'POST',
    body: formData
  })
}

getLocation()


const search=document.getElementsByClassName('search-box')[0]


let locationProject=[]
let searchElement=document.getElementById('searchElement')
fetch("/getLocationProject")
      .then((response) => response.json())
      .then(async (data) => {
        locationProject=data
      })
      .catch((error) => {
        console.log(error);
      });


search.addEventListener('click',()=>{
    const projectCount=document.getElementById('projectCount')
    projectCount.innerText=locationProject.length
    const dropdownMenu=document.getElementsByClassName('dropdown-menu')[0]

    const positionRelative=document.getElementsByClassName('position-relative')[0]
   
dropdownMenu.classList.add('show')
positionRelative.classList.add('show')
locationProject.map(item=>{ 
    lazyload()  


            const element=`<a class="dropdown-item px-card dropShadow2" href='/project/${item.p_id}'>
         
                      <div class="d-flex align-items-center  m-1 p-2">
                        <div class="avatar avatar-l status-online me-2">
                          <img class="lazyload rounded-circle" data-src="${item.imageLink}" alt="">
          
                        </div>
                        <div class="flex-1">
                          <h6 class="mb-0  text-wrap titles">${item.title}</h6>
                          <p class="fs--2 mb-0 d-flex">${item.country}</p>
                        </div>
                      </div>
                    
                    </a>`
                    searchElement.insertAdjacentHTML('afterbegin',element)  
                  
                  }) 
         


            
var options = {

    valueNames: [ 'titles'],
    plugins: [
        [ 'fuzzySearch' ]
    ]
};


var featureList = new List('list-id', options, locationProject.title);

$('.search-fuzzy').keyup(function() {
   
    featureList.fuzzySearch($(this).val());

});

    
})



