const xmlfile=[{
  "active": "false",
  "activities": "Installation of technological innovations such as cooling systems to preserve the quality of the milk. Financial aid to acquire milking equipment and improve the infrastructure. Technological training. Advice to comply with sanitary requirements.",
  "additionalDocumentation": "https://www.globalgiving.org/pfil/1408/projdoc.doc",
  "approvedDate": "2006-07-07T14:07:24-04:00",
  "contactAddress": "Castelli 12 2B",
  "contactCity": "Buenos Aires",
  "contactCountry": "Argentina",
  "contactName": "Juan Diaz",
  "contactPostal": "1031",
  "contactState": "Buenos Aires",
  "contactTitle": "Executive Director of Fundapaz",
  "contactUrl": "http://www.fundapaz.org.ar",
  "countries": {
    "country": {
      "iso3166CountryCode": "AR",
      "name": "Argentina"
    }
  },
  "country": "Argentina",
  "dateOfMostRecentReport": "2009-10-08T11:48:13-04:00",
  "donationOptions": {
    "donationOption": [
      {
        "amount": "50",
        "description": "Buys a new milking goat"
      },
      {
        "amount": "100",
        "description": "Protects 40 goats from tuberculosis and other infectious diseases"
      },
      {
        "amount": "250",
        "description": "Provides food for a group of 30 goats for one year"
      },
      {
        "amount": "1000",
        "description": "Provides a new milking parlor for a rural family"
      },
      {
        "amount": "5000",
        "description": "Provides a cooling system to preserve 1000 lt of milk"
      }
    ]
  },
  "funding": "3898.24",
  "goal": "40000.00",
  "id": "1408",
  "image": {
    "$": {
      "id": "0"
    },
    "imagelink": [
      {
        "$": {
          "size": "small"
        },
        "url": "https://www.globalgiving.org/pfil/1408/pict_grid1.jpg"
      },
      {
        "$": {
          "size": "thumbnail"
        },
        "url": "https://www.globalgiving.org/pfil/1408/pict_thumbnail.jpg"
      },
      {
        "$": {
          "size": "medium"
        },
        "url": "https://www.globalgiving.org/pfil/1408/pict_med.jpg"
      },
      {
        "$": {
          "size": "large"
        },
        "url": "https://www.globalgiving.org/pfil/1408/pict_grid7.jpg"
      },
      {
        "$": {
          "size": "extraLarge"
        },
        "url": "https://www.globalgiving.org/pfil/1408/pict_large.jpg"
      },
      {
        "$": {
          "size": "original"
        },
        "url": "https://www.globalgiving.org/pfil/1408/pict_original.jpg"
      }
    ],
    "title": "Support for goat farmers in Santiago del Estero"
  },
  "imageGallerySize": "6",
  "imageLink": "https://www.globalgiving.org/pfil/1408/pict.jpg",
  "iso3166CountryCode": "AR",
  "longTermImpact": "The families will have fully equipped and authorized milking rooms that will enable them to sell their production and improve their milk in quality and quantity, and therefore increase their income. Their overall quality of life will be improved",
  "modifiedDate": "2022-10-25T01:23:34-04:00",
  "need": "The beneficiaries are sixty families who need to be licensed by the National Animal Health Organization. In order to achieve this, these low income farmers need to comply with the sanitary and structural requirements of the NAHO. Licenses will enable them to deliver goat milk to a local factory and expand their market. \r\nThe beneficiaries suffer from structural poverty. The majority of them are officially unemployed and have low level of education, poor housing and lack of health services.",
  "numberOfDonations": "61",
  "numberOfReports": "4",
  "progressReportLink": "https://www.globalgiving.org/projects/support-rural-farmers-in-argentina/updates/",
  "projectLink": "https://www.globalgiving.org/projects/support-rural-farmers-in-argentina/",
  "region": "South/Central America and the Caribbean",
  "remaining": "36101.76",
  "status": "retired",
  "summary": "Caprines (dairy goats) are a key source of income for rural families in Santiago del Estero. However, many do not meet the standards required to sell their goat milk. Our goal is to solve this issue.",
  "themeName": "Animal Welfare",
  "themes": {
    "theme": {
      "id": "animals",
      "name": "Animal Welfare"
    }
  },
  "title": "Support for goat farmers in Santiago del Estero",
  "type": "project"
}]

xmlfile.map(item=>{
  item.image.imagelink.map(el=>{
    console.log(el);
  })
})


// var dataset={
//   'Lisa Rose': {
//   'Lady in the Water': 2.5,
//   'Snakes on a Plane': 3.5,
//   'Just My Luck': 3.0,
//   'Superman Returns': 3.5,
//   'You, Me and Dupree': 2.5,
//   'The Night Listener': 3.0},

// 'Gene Seymour': {'Lady in the Water': 3.0,
//   'Snakes on a Plane': 3.5,
//   'Just My Luck': 1.5,
//   'Superman Returns': 5.0,
//   'The Night Listener': 3.0,
//   'You, Me and Dupree': 3.5},
  
//   'Michael Phillips': {'Lady in the Water': 2.5,
//   'Snakes on a Plane': 3.0,
//   'Superman Returns': 3.5,
//   'The Night Listener': 4.0},
//   'Claudia Puig': {'Snakes on a Plane': 3.5,
//   'Just My Luck': 3.0,
//   'The Night Listener': 4.5,
//   'Superman Returns': 4.0,
//   'You, Me and Dupree': 2.5},
  
//   'Mick LaSalle': {'Lady in the Water': 3.0,
//   'Snakes on a Plane': 4.0,
//   'Just My Luck': 2.0,
//   'Superman Returns': 3.0,
//   'The Night Listener': 3.0,
//   'You, Me and Dupree': 2.0},
  
//   'Jack Matthews': {'Lady in the Water': 3.0,
//   'Snakes on a Plane': 4.0,
//   'The Night Listener': 3.0,
//   'Superman Returns': 5.0,
//   'You, Me and Dupree': 3.5},
  
//   'Toby': {'Snakes on a Plane':4.5,
//   'You, Me and Dupree':1.0,
//   'Superman Returns':4.0}};

//   var euclid = Math.sqrt(Math.pow(3.5-2.5,2)+Math.pow(4.0-3.5,2));
//   console.log(euclid);
// //1.118033989
// var reuclid = 1/(1+euclid);
// //0.472135954
// //calculate the euclidean distance btw two item
// var euclidean_score  = function(dataset,p1,p2){
    
//   var existp1p2 = {};//store item existing in both item
// //if dataset is in p1 and p2 
//   //store it in as one
//   for(var key in dataset[p1]){
   
//       if(key in dataset[p2]){
//           existp1p2[key] = 1
//       }
// if(len(existp1p2) ==0) return 0;//check if it has a data
// var sum_of_euclidean_dist = [];//store the  euclidean distance
      
//       //calculate the euclidean distance
//       for(item in dataset[p1]){
//           if(item in dataset[p2]){
//               sum_of_euclidean_dist.push(Math.pow(dataset[p1] [item]-dataset[p2][item],2));
//           }
// }
//       var sum=0;
//       for(var i=0;i<sum_of_euclidean_dist.length;i++){
//           sum +=sum_of_euclidean_dist[i]; //calculate the sum of the euclidean
//       }
// //since the sum will be small for familiar user
//       // and larger for non-familiar user 
//       //we make it exist btwn 0 and 1
//       var sum_sqrt = 1/(1 +Math.sqrt(sum));
//   return sum_sqrt;
//   }
  
// }

// var len  = function(obj){
//   var len=0;
//   for(var i in obj){
//       len++
//   }
//   return len;
// }
// euclidean_score(dataset,"Lisa Rose","Jack Matthews");
// //0.3405424265831667
// var pearson_correlation = function(dataset,p1,p2){
//   var existp1p2 = {};
//   for(item in dataset[p1]){
//               if(item in dataset[p2]){
//                   existp1p2[item] = 1
//               }
//           }
//           var num_existence = len(existp1p2);
//   if(num_existence ==0) return 0;
//   //store the sum and the square sum of both p1 and p2
//           //store the product of both
//           var p1_sum=0,
//               p2_sum=0,
//               p1_sq_sum=0,
//               p2_sq_sum=0,
//               prod_p1p2 = 0;
//           //calculate the sum and square sum of each data point
//           //and also the product of both point
//           for(var item in existp1p2){
//               p1_sum += dataset[p1][item];
//               p2_sum += dataset[p2][item];
//   p1_sq_sum += Math.pow(dataset[p1][item],2);
//               p2_sq_sum += Math.pow(dataset[p2][item],2);
//   prod_p1p2 += dataset[p1][item]*dataset[p2][item];
//           }
//           var numerator =prod_p1p2 - (p1_sum*p2_sum/num_existence);
//   var st1 = p1_sq_sum - Math.pow(p1_sum,2)/num_existence;
//           var st2 = p2_sq_sum -Math.pow(p2_sum,2)/num_existence;
//   var denominator = Math.sqrt(st1*st2);
//   if(denominator ==0) return 0;
//           else {
//               var val = numerator / denominator;
//               return val;
//           }
          
//   }
//   pearson_correlation(dataset,'Lisa Rose','Jack Matthews')
// //0.7470178808339965

// var similar_user = function(dataset,person,num_user,distance){
//   var scores=[];
//   for(var others in dataset){
//           if(others != person && typeof(dataset[others])!="function"){
//               var val = distance(dataset,person,others)
//               var p = others
//               scores.push({val:val,p:p});
//           }
//       }
//       scores.sort(function(a,b){
//           return b.val < a.val ? -1 : b.val > a.val ? 1 : b.val >= a.val ? 0 : NaN;
//       });
//       var score=[];
//       for(var i =0;i<num_user;i++){
//           score.push(scores[i]);
//       }
//   return score;
      
//   }

//   similar_user(dataset,'Jack Matthews',3 ,pearson_correlation);
// // [ { val: 0.963795681875635, p: 'Gene Seymour' },
// //   { val: 0.7470178808339965, p: 'Lisa Rose' },
// //   { val: 0.66284898035987, p: 'Toby' } ]

//   console.log(  similar_user(dataset,'Jack Matthews',3,pearson_correlation));

//   var recommendation_eng = function(dataset,person,distance){

//     var totals = {
//         //you can avoid creating a setter function
//         //like this in the object you found them
//         //since it just check if the object has the property if not create
//         //and add the value to it.
//         //and  because of this setter that why a function property
//         // is created in the dataset, when we transform them.
//         setDefault:function(props,value){
//             if(!this[props]){
//                 this[props] =0;
//             }
// this[props] += value;
//         }
//     },
//         simsum = {
//             setDefault:function(props,value){
//                 if(!this[props]){
//                     this[props] =0;
//                 }
    
//                 this[props] += value;
//             }
//         },
//         rank_lst =[];
// for(var other in dataset){

// if(other ===person) continue;
// var similar = euclidean_score(dataset,person,other);
       
//         if(similar <=0) continue;
// for(var item in dataset[other]){
//   console.log((item,'d',dataset[other][item]*similar));
//                 if((item in dataset[person]) ||(dataset[person][item]==0)){
//                  //the setter help to make this look nice.
        
//                     totals.setDefault(item,dataset[other][item]*similar);
//                     simsum.setDefault(item,similar);
//                     console.log(similar);
                    
//                 }
            
//         }
    
        
//     }
//     console.log(totals);
//    for(var item in totals){
 
//   //this what the setter function does
//   //so we have to find a way to avoid the function in the object     
//         if(typeof totals[item] !="function"){
           
//             var val = totals[item] / simsum[item];
//             rank_lst.push({val:val,items:item});
//        }
//     }
//     rank_lst.sort(function(a,b){
//         return b.val < a.val ? -1 : b.val > a.val ? 
//         1 : b.val >= a.val ? 0 : NaN;
//     });
//     var recommend = []; 
//       for(var i in rank_lst){
//         recommend.push(rank_lst[i].items);
//      }
// console.log(rank_lst,recommend);
//    return [rank_lst,recommend];
// }

// console.log(recommendation_eng(dataset,'Lisa Rose',euclidean_score ));
// recommendation_eng(dataset,'Toby',euclidean_score)