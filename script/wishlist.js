let wishlitListings =document.querySelector('.wishlist-items')
let wishlistOverview=document.querySelector('.checkout')
let wishlists=JSON.parse(localStorage.getItem('wish-list'))?JSON.parse(localStorage.getItem('wish-list')):[];
let values=0;
let properties=0;
displayWishlist()
wishlistSummary()
function wishlistSummary() {
    wishlists.forEach((item)=>{
        values+=parseInt(item.price.split('').filter((number)=>{
            return number!=' '
        }).join("")) * item.quantity
        properties+=item.quantity;
    })
    wishlistOverview.innerHTML+=
    `
    <div class="row">
        <div class="col">
        <p class="display-5">You have a total of <span class="display-4 fw-bold">${properties}</span> properties on your wish-list</p>
        <hr>
        </div>
    </div>
    <div class="row">
        <div class="col">
        <h3 class="display-5">Total value of properties</h3>
        <p class="display-4 fw-bold">R ${values}</p>
        </div>
    </div>
    
    `
}

// display wish-list properties
function displayWishlist() {
    wishlitListings.innerHTML=""
    wishlists.forEach((listProperty) => {
        wishlitListings.innerHTML+=
        `
        <div class="card mb-3" style="max-width: 540px;min-height:130px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${listProperty.image}" class="img-fluid rounded-start" alt="propertyImage" style="height:130px">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${listProperty.location}</h5>
                        <p class="card-text">A beautiful ${listProperty.rooms} bedroom ${listProperty.type}</p>
                        <p class="card-text">Quantity: ${listProperty.quantity}</p>
                        <p class="card-text"> R ${listProperty.price}</p>
                    </div>
                </div>
            </div>
        </div>
        `
    });
    
}