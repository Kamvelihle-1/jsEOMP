let page=document.querySelector('.properties')
let propType=document.querySelector('#filter-type')
let propRooms=document.querySelector('#filter-bedrooms')
let propLocation =document.querySelector('#filter-location')
let propPrice=document.querySelector('#fliter-price')
let filterBtn=document.querySelector('#filter-btn')
let btnSubmit=document.querySelector('#submit')
let btnClose=document.querySelector('.btn-close')


let productsList=JSON.parse(localStorage.getItem('property-list'))?JSON.parse(localStorage.getItem('property-list')):[];
let newList=[];
let wishList=[];
let wishlistButtons;
let isType,isRooms,isLocation,minPrice,maxPrice
displayProp(productsList);
// Property filter
filterBtn.addEventListener('click',()=>{
    page.innerHTML=""
    productsList.forEach((listing)=>{
        filterValues()
        console.log(listing.price>minPrice);
        console.log(listing.price<maxPrice);
        console.log(listing.type==isType);
        // console.log(isType,isRooms,isLocation,minPrice,maxPrice);
    //    console.log(parseInt(listing.price)>minPrice);
    //   console.log(parseInt(listing.price)<maxPrice);
       //console.log(listing.rooms==parseInt(isRooms));
        if ((listing.type==isType)&&(listing.price>minPrice) && (listing.price<maxPrice)) {
            newList.push(listing)
            console.log(newList);
        }
      //console.log((listing.type==isType)&&(listing.rooms==parseInt(isRooms))&&(listing.location==isLocation)&&(listing.price>minPrice) && (listing.price<maxPrice));
    //  console.log(isType,isLocation,isRooms,maxPrice,minPrice);
    //  console.log(parseInt(listing.price)>minPrice);
    //  console.log(parseInt(listing.price)<maxPrice);
    //  console.log(listing.rooms==parseInt(isRooms));
    })
    displayProp(newList)
})

function filterValues() {
   // switch (true) {
     //   case propType.value.length>0:
             isType=propType.value;
           // break;
       // case propRooms.value.length>0:
            // isRooms=propRooms.value
          //  break;
       // case propLocation.value.length>0:
            // isLocation=propLocation.value
           // console.log(propLocation.value);
         //   break;
       // case propPrice.value.length>0:
      // console.log(propPrice.value);
            switch (true) {
               
                case propPrice.value=='400k-599k':
                    minPrice= '400 000';
                    maxPrice= '599 000';
                    break;
                case propPrice.value== '600k-799k':
                    minPrice= '600 000';
                    maxPrice= '799 000';
                    break;
                case propPrice.value=='800k-1mil':
                    minPrice= '800 000';
                    maxPrice= '1 000 000';
                    break;
                case propPrice.value=='1.1mil-4.9mil':
                    minPrice= '1 100 000';
                    maxPrice= '4 900 000';
                    break;
                case propPrice.value== '5mil-9.9mil':
                    minPrice= '5 000 000';
                    maxPrice= '9 900 000';
                    break;
                case propPrice.value=='10mil-14.9mil':
                    minPrice= '10 000 000';
                    maxPrice= '14 900 000';
                    break;
                case propPrice.value=='15mil-19.9mil':
                    minPrice= '15 000 000';
                    maxPrice= '19 900 000';
                    break;
                case propPrice.value=='20mil-24.9mil':
                    minPrice= '20 000 000';
                    maxPrice= '24 900 000';
                    break;
                case propPrice.value=='25mil-29.9mil':
                    minPrice= '25 000 000';
                    maxPrice= '29 900 000';
                    break;
                case propPrice.value=='30mil+':
                    minPrice= '30 000 000';
                    maxPrice= '80 000 000';
                    break;
            
                
            } 
    
        
   
}

//Adding to wish-list
function addToWishlist(params) {
    wishlistButtons=[...document.querySelectorAll('#btn-wishlist')]
    wishlistButtons.forEach((property)=>{
        property.addEventListener('click',()=>{
            let pos=wishlistButtons.indexOf(property)
            wishList.push(productsList[pos])
            localStorage.setItem('wish-list',JSON.stringify(wishList))
        })
        
    })   
}
// Contact massage submit
btnSubmit.addEventListener('click',()=>{
   btnClose.click()
})

//Displaying products
function displayProp(arrData) {
    page.innerHTML="";
    arrData.forEach((prop) => {
        page.innerHTML+=
        `
        <div class="card" style="width: 18rem;">
            <img src="${prop.image}" class="card-img-top" alt="property-image">
            <div class="card-body">
                <h5 class="card-title">${prop.location}</h5>
                <p class="card-text">A beutiful ${prop.rooms} room ${prop.type}</p>
                <p>R ${prop.price}</p>
                <button id="btn-wishlist"><i class="fa-solid fa-bookmark"></i></button>
            </div>
        </div>
        `
    });
    addToWishlist();
}

