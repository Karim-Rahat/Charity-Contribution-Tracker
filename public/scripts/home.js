async function getDatas() {
  await fetch("/getThemes")
    .then((response) => response.json())
    .then((data) => {
      genNavs(data);
    });

  await fetch("/getProjects")
    .then((response) => response.json())
    .then((data) => {
      firstCover(data[35]);
      multiCover(data);
    });

  //stop spinner after loading
  document.getElementById("loading-spinner").style.display = "none";
}

//first cover item

function firstCover(projects) {


  let div1 = document.getElementsByClassName("div1")[0];

  let element = `

      <div class="containerImage">
          <img class="lazyload img-fluid rounded image" data-src="${projects.imageLink}" alt="" /> 
         
      
          <div class="overlay">
           
              <div class="image-title">
                  <a>${projects.country} </a><br>
                  <strong class="image-desc">
                  ${projects.title}
                  </strong>
              </div>

            
      
              <div class="btnDiv">
                 
                
                  <a href="/saveToCart/${projects.title}/${projects.p_id}/5"> <btn class="hiddenBtn btn">  Donate </btn></a>
                
                 
                </div>
          </div>
       
    
         </div>`;

  div1.innerHTML = element;
  lazyload();
}

function multiCover(projects) {
  const div2 = document.getElementsByClassName("div2")[0];
  projects.map((el, i) => {

    if (i < 4) {
      let element = `<div class="containerImage">
  <img class="lazyload img-fluid rounded image" data-src="${el.imageLink}"  alt="" /> 

  <div class="overlay">

  <div class="image-title">
  <a>${el.country} </a><br>
  <strong class="image-desc">
  ${el.title}
  </strong>
 </div>
      <div class="btnDiv">
      <a href="/saveToCart/${el.title}/${el.p_id}/5"> <btn class="hiddenBtn btn">  Donate </btn></a></div></div></div>`;
      div2.insertAdjacentHTML("afterbegin", element);
      lazyload();
    }
  });
}

function genNavs(themes) {
  //tagnavs
  const tagNavs = document.getElementsByClassName("tags")[0];

  themes.map((nav, i) => {
    if (i == 0) {
      let navs = `<div class="p-2 bd-highlight">Explore Projects:</div>`;
      tagNavs.insertAdjacentHTML("beforeend", navs);
    }
    if (i > 0 && i < 10) {
      let navs = `<div class="bd-highlight navItem"><a href="#">${nav.t_name} </a></div>`;

      tagNavs.insertAdjacentHTML("beforeend", navs);
    }
    if (i == 11) {
      let navs = `<div class="bd-highlight navItem"><a href="#">SEE ALL > </a></div>`;

      tagNavs.insertAdjacentHTML("beforeend", navs);
    }
  });
}
