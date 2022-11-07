
async function getDatas() {
  console.log("lol");

  await fetch("/getThemes")
    .then((response) => response.json())
    .then((data) => {
      genNavs(data);
    });

    
 await fetch("/getProjects")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    firstCover(data[36]);
    multiCover(data)
  });

}

//first cover item

function firstCover(projects) {
  const img = JSON.parse(projects.imageLink);
  console.log(img);

  let div1 = document.getElementsByClassName("div1")[0];

 let element = `

      <div class="containerImage">
          <img class="img-fluid rounded image" src="${img[5].url}" alt="" /> 
         
      
          <div class="overlay">
           
              <div class="image-title">
                  <a>${projects.country} </a><br>
                  <strong class="image-desc">
                  ${projects.title}
                  </strong>
              </div>

            
      
              <div class="btnDiv">
                  <button class="hiddenBtn" type="button">Donate</button>
                 
                </div>
          </div>
       
    
         </div>`;

  div1.innerHTML = element;
}

function multiCover(projects) {

const div2=document.getElementsByClassName('div2')[0]
projects.map((el,i)=>{
  const img = JSON.parse(el.imageLink);
if(i<4)
{
  let element=`  
  <div class="containerImage">
  <img class="img-fluid rounded image" src="${img[5].url}"  alt="" /> 

  <div class="overlay">

  <div class="image-title">
  <a>${el.country} </a><br>
  <strong class="image-desc">
  ${el.title}
  </strong>
 </div>




      <div class="btnDiv">
          <button class="hiddenBtn" type="button">Donate</button>

      </div>
  </div>



 </div> `
 div2.insertAdjacentHTML("afterbegin", element);
}


})
}

function genNavs(themes) {
  //tagnavs
  const tagNavs = document.getElementsByClassName("tags")[0];
console.log(themes);
  themes.map((nav, i) => {
    if(i==0){
      let navs = `<div class="p-2 bd-highlight">Explore Projects:</div>`;
      tagNavs.insertAdjacentHTML("beforeend", navs);
    }
   if(i>0 && i<10){
    let navs = `<div class="bd-highlight navItem"><a href="#">${nav.t_name} </a></div>`;

    tagNavs.insertAdjacentHTML("beforeend", navs);
   }
   if(i==11){
   
      let navs = `<div class="bd-highlight navItem"><a href="#">SEE ALL > </a></div>`;
  
      tagNavs.insertAdjacentHTML("beforeend", navs);
     }
   

  });
}
