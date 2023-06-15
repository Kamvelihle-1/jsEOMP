let page=document.querySelector('.properties')
let propType=document.querySelector('#filter-type')
let propRooms=document.querySelector('#filter-bedrooms')
let propLocation =document.querySelector('#filter-location')
let propPrice=document.querySelector('#fliter-price')
let filterBtn=document.querySelector('#filter-btn')
let btnSubmit=document.querySelector('#submit')
let btnClose=document.querySelector('.btn-close')



let productsList=[
    {
        id:1,
        type:"House",
        image:"https://i.postimg.cc/bNJm7Xpf/th-1631564054.jpg",
        price:'35 000 000',
        quantity:1,
        location:"Cairo,Egypt",
        rooms:8
    },
    {
        id:2,
        type:"House",
        image:"https://i.postimg.cc/Y2JxsvnY/th-2114995106.jpg",
        price:'23 500 000',
        quantity:1,
        location:"Cape Town,South Africa",
        rooms:6
    },
    {
        id:3,
        type:"House",
        image:"https://i.postimg.cc/1tF8n3G1/th-3756547690.jpg",
        price:'45 000 000',
        quantity:1,
        location:"Marrakech,Moretious",
        rooms:12
    },
    {
        id:4,
        type:"House",
        image:"https://i.postimg.cc/qvQbSkCr/th-4118733502.jpg",
        price:'60 000 000',
        quantity:1,
        location:"Cape Town,South Africa",
        rooms:7
    },
    {
        id:5,
        type:"House",
        image:"https://i.postimg.cc/bNJm7Xpf/th-1631564054.jpg",
        price:'35 000 000',
        quantity:1,
        location:"Sandton,South Africa",
        rooms:8
    }
]
localStorage.setItem('property-list',JSON.stringify(productsList))

let newList=[];
let wishList=[];
let wishlistButtons,quantityAddButtons,quantityMinusButtons
let isType,isRooms,isLocation,minPrice,maxPrice

displayProp(productsList);

// Property filter
filterBtn.addEventListener('click',()=>{

    page.innerHTML=""
    productsList.forEach((listing)=>{
        filterValues()

        if ((listing.type==isType)&&(listing.price>minPrice) && (listing.price<maxPrice)) {
            newList.push(listing)
            
        }
      //console.log((listing.type==isType)&&(listing.rooms==parseInt(isRooms))&&(listing.location==isLocation)&&(listing.price>minPrice) && (listing.price<maxPrice));
    //  console.log(isType,isLocation,isRooms,maxPrice,minPrice);
    //  console.log(parseInt(listing.price)>minPrice);
    //  console.log(parseInt(listing.price)<maxPrice);
    //  console.log(listing.rooms==parseInt(isRooms));
    })
    if (newList.length>0) {
        displayProp(newList)
        newList=[]
    } else {
        page.innerHTML+=
        `
        <p class="display-2">No properties available </p>
        `
    }
    
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
function addToWishlist() {
    wishlistButtons=[...document.querySelectorAll('#btn-wishlist')]
    wishlistButtons.forEach((property)=>{
        property.addEventListener('click',()=>{
            let pos= wishlistButtons.indexOf(property)
            wishList.push(productsList[pos])
            localStorage.setItem('wish-list',JSON.stringify(wishList))
        })
    })   
}
wishList=JSON.parse(localStorage.getItem('wish-list'))
function addQuantity() {

    quantityAddButtons=[...document.querySelectorAll('#btn-AddQuantity')]
    quantityAddButtons.forEach((btnIncrease)=>{
        btnIncrease.addEventListener('click',()=>{
            let btnPos=quantityAddButtons.indexOf(btnIncrease)
            try {
                wishList.forEach((wish)=>{
                    if (wish.id == productsList[btnPos].id) {
                        wish.quantity+=1
                        localStorage.setItem('wish-list',JSON.stringify(wishList))
                        console.log(wishList);
                    }
                })   
            } catch (error) {
                alert(error)
            }    
        })
    })
}
function minusQuantity() {
    quantityMinusButtons=[...document.querySelectorAll('#btn-MinusQuantity')]
    quantityMinusButtons.forEach((btnDecrease)=>{
        btnDecrease.addEventListener('click',()=>{
            let btnPosition= quantityMinusButtons.indexOf(btnDecrease)
            try {
                wishList.forEach((wishItem)=>{
                    if (wishItem.id == productsList[btnPosition].id) {
                        if (wishItem.quantity>0) {
                            wishItem.quantity -=1
                            localStorage.setItem('wish-list',JSON.stringify(wishList))
                        } else {
                            alert('Quantity can not be 0 or less')
                        }
                    }
                }) 
            } catch (error) {
                alert(error)
            }
           
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
        <div class="card prod-card" style="max-width: 18rem;">
            <img src="${prop.image}" class="card-img-top" alt="property-image" style="height:190px;">
            <div class="card-body">
                <h5 class="card-title">${prop.location}</h5>
                <p class="card-text">A beutiful ${prop.rooms} room ${prop.type}</p>
                <p>R ${prop.price}</p>
                <button id="btn-MinusQuantity"><i class="fa-solid fa-minus"></i></button>
                <button class="mx-3" id="btn-AddQuantity"><i class="fa-solid fa-plus"></i></button>
                <button id="btn-wishlist"><i class="fa-solid fa-bookmark"></i></button>
            </div>
        </div>
        `
    });
    addToWishlist();
    addQuantity();
    minusQuantity();
}

