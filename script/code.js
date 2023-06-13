let page=document.querySelector('.properties')
let propType=document.querySelector('#filter-type')
let propRooms=document.querySelector('#filter-bedrooms')
let propLocation =document.querySelector('#filter-location')
let propPrice=document.querySelector('#filter-price')
let filterBtn=document.querySelector('#filter-btn')


let productsList=JSON.parse(localStorage.getItem('property-list'))?JSON.parse(localStorage.getItem('property-list')):[];
let newList=[];
let wishList=[];
let wishlistButtons;
let isType,isRooms,isLocation,minPrice,maxPrice=100000000
displayProp(productsList);
// Property filter
filterBtn.addEventListener('click',()=>{
    page.innerHTML=""
    productsList.forEach((listing)=>{
        filterValues()
        if ((listing.type==isType)&&(listing.rooms==parseInt(isRooms))&&(listing.location==isLocation)&&(parseInt(listing.price)>minPrice) && (parseInt(listing.price)<maxPrice)) {
            newList.push(listing)
            console.log(newList);
        }
     console.log((listing.type==isType)&&(listing.rooms==parseInt(isRooms))&&(listing.location==isLocation)&&(parseInt(listing.price)>minPrice) && (parseInt(listing.price)<maxPrice));
     console.log(isType,isLocation,isRooms,maxPrice,minPrice);
    })
    displayProp(newList)
})

function filterValues() {
   // switch (true) {
     //   case propType.value.length>0:
             isType=propType.value;
           // break;
       // case propRooms.value.length>0:
            isRooms=propRooms.value
          //  break;
       // case propLocation.value.length>0:
            isLocation=propLocation.value
         //   break;
       // case propPrice.value.length>0:
            switch (true) {
                case propPrice.value=='400k-599k':
                    minPrice= 400000;
                    maxPrice= 599000;
                    break;
                case propPrice.value== '600k-799k':
                    minPrice= 600000;
                    maxPrice= 799000;
                    break;
                case propPrice.value=='800k-1mil':
                    minPrice= 800000;
                    maxPrice= 1000000;
                    break;
                case propPrice.value=='1.1mil-4.9mil':
                    minPrice= 1100000;
                    maxPrice= 4900000;
                    break;
                case propPrice.value== '5mil-9.9mil':
                    minPrice= 5000000;
                    maxPrice= 9900000;
                    break;
                case propPrice.value=='10mil-14.9mil':
                    minPrice= 10000000;
                    maxPrice= 14900000;
                    break;
                case propPrice.value=='15mil-19.9mil':
                    minPrice= 15000000;
                    maxPrice= 19900000;
                    break;
                case propPrice.value=='20mil-24.9mil':
                    minPrice= 20000000;
                    maxPrice= 24900000;
                    break;
                case propPrice.value=='25mil-29.9mil':
                    minPrice= 25000000;
                    maxPrice= 29900000;
                    break;
                case propPrice.value=='30mil+':
                    minPrice= 30000000;
                   
                    break;
            
                
            } 
    
        
   
}

//Adding to wish-list
function addToWishlist(params) {
    wishlistButtons=[...document.querySelectorAll('#btn-wishlist')]
    wishlistButtons.forEach((property)=>{
        property.addEventListener('click',()=>{
            wishList.push(productsList[wishlistButtons.indexOf(event.target)+1])
            
        })
    })
    localStorage.setItem('wish-list',JSON.stringify(wishList))
    
}
  

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

