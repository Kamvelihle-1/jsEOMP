let addListing =document.querySelector('#add-btn')
let listingLocation=document.querySelector('#listing-location')
let listingImage=document.querySelector('#listing-image')
let listingPrice=document.querySelector('#listing-price')
let roomNum=document.querySelector('#listing-roomNum')
let btnSort=document.querySelector('#sort-btn')
let btnEdit=document.querySelector('#edit-btn')
let btnDelete=document.querySelector('#delete-btn')
let table=document.querySelector('#tblAdmin')
let temp=6
let listings=[
    {
        id:1,
        image:"https://i.postimg.cc/bNJm7Xpf/th-1631564054.jpg",
        price:'35 000 000',
        location:"Cairo, Egypt",
        rooms:8
    },
    {
        id:2,
        image:"https://i.postimg.cc/Y2JxsvnY/th-2114995106.jpg",
        price:'23 500 000',
        location:"Cape Town, South Africa",
        rooms:6
    },
    {
        id:3,
        image:"https://i.postimg.cc/1tF8n3G1/th-3756547690.jpg",
        price:'45 000 000',
        location:"Marrakech, Moretious",
        rooms:12
    },
    {
        id:4,
        image:"https://i.postimg.cc/qvQbSkCr/th-4118733502.jpg",
        price:'60 000 000',
        location:"Cape Town, South Africa",
        rooms:7
    },
    {
        id:5,
        image:"https://i.postimg.cc/bNJm7Xpf/th-1631564054.jpg",
        price:'35 000 000',
        location:"Sandton, South Africa",
        rooms:8
    }
]
displayList()
// Adding listings
addListing.addEventListener('click',()=>{
    event.preventDefault();
    listings.push(new Addlisting(temp,listingImage.value,listingPrice.value,listingLocation.value,roomNum.value))
    temp++
    localStorage.setItem('property-list',JSON.stringify(listings))
    table.innerHTML="";
    clear();
    displayList();
})
function Addlisting(key,img,pr,loc,rm) {
    this.id=key;
    this.image=img;
    this.price=pr;
    this.location=loc;
    this.rooms=rm;
}

// sortting
btnSort.addEventListener('click',()=>{
    listings=JSON.parse(localStorage.getItem('property-list'))
    
    listings.sort(function(a, b) {
        // Compare the 'name' property
        let loc1 = a.location.slice(0,a.location.indexOf(',')-1).toUpperCase();
        let loc2 = b.location.slice(0,b.location.indexOf(',')-1).toUpperCase();
        
        if (loc1 < loc2) {
          return -1;
        }
        
        if (loc1> loc2) {
          return 1;
        }
        
        return 0; // names are equal
      });
      table.innerHTML="";
    displayList()
})

// Displaying listings
function displayList() {
   // listings=JSON.parse(localStorage.getItem('property-list'))
    listings.forEach((item) =>{
        table.innerHTML+=
        `
        <tr>
            <td> ${item.id}</td>
            <td><img src="${item.image}"</td>
            <td>${item.location}</td>
            <td>R ${item.price}</td>
            <td>${item.rooms}</td>
            <td><button data-bs-toggle="modal" data-bs-target="#newListing-model" id="edit-btn">Edit</button></td>
            <td><button id="delete-btn">Delete</button></td>
        </tr>
        
        `
    }) 
}
// clear function
function clear() {
   listingImage.value="" ;
   listingLocation.value="";
   listingPrice.value="",
   roomNum.value="";
}
