let close =document.querySelector('.btn-close')
let addListing =document.querySelector('#add-btn')
let listingType=document.querySelector('#listing-type')
let listingLocation=document.querySelector('#listing-location')
let listingImage=document.querySelector('#listing-image')
let listingPrice=document.querySelector('#listing-price')
let roomNum=document.querySelector('#listing-roomNum')
let btnSort=document.querySelector('#sort-btn')
let btnEdit=document.querySelector('#edit-model')
// let btnDelete=document.querySelector('#delete-btn')
let table=document.querySelector('#tblAdmin')
let tempId=6;
let editBtn;
let deleteBtn;
let check=true;
let editPosition;

let listings=JSON.parse(localStorage.getItem('property-list'))?JSON.parse(localStorage.getItem('property-list')):[
    {
        id:1,
        type:"House",
        image:"https://i.postimg.cc/bNJm7Xpf/th-1631564054.jpg",
        price:'35 000 000',
        location:"Cairo,Egypt",
        rooms:8
    },
    {
        id:2,
        type:"House",
        image:"https://i.postimg.cc/Y2JxsvnY/th-2114995106.jpg",
        price:'23 500 000',
        location:"Cape Town,South Africa",
        rooms:6
    },
    {
        id:3,
        type:"House",
        image:"https://i.postimg.cc/1tF8n3G1/th-3756547690.jpg",
        price:'45 000 000',
        location:"Marrakech,Moretious",
        rooms:12
    },
    {
        id:4,
        type:"House",
        image:"https://i.postimg.cc/qvQbSkCr/th-4118733502.jpg",
        price:'60 000 000',
        location:"Cape Town,South Africa",
        rooms:7
    },
    {
        id:5,
        type:"House",
        image:"https://i.postimg.cc/bNJm7Xpf/th-1631564054.jpg",
        price:'35 000 000',
        location:"Sandton,South Africa",
        rooms:8
    }
]
localStorage.setItem('property-list',JSON.stringify(listings))
displayList()

// Adding listings

function addHouse() {
    addListing.addEventListener('click',()=>{
        if (isValid()) {
            event.preventDefault();
            listings.push(new Addlisting(tempId,listingType.value,listingImage.value,listingPrice.value,listingLocation.value,roomNum.value))
            tempId++
            localStorage.setItem('property-list',JSON.stringify(listings))
            table.innerHTML="";
            clear();
            defaultTable()
            displayList();
            close.click()
        }
    }) 
    
   
  
}
function Addlisting(key,tp,img,pr,loc,rm) {
    this.id=key;
    this.type=tp;
    this.image=img;
    this.price=pr;
    this.quantity=1;
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
     defaultTable();
    displayList();
})

// Deleting a listing
function btnDelete() {
    deleteBtn=[...document.querySelectorAll('#delete-btn')]
    deleteBtn.forEach((btnDelete)=>{
        btnDelete.addEventListener('click',()=>{
            let position = deleteBtn.indexOf(event.target)
            listings.splice(position,1)
            localStorage.setItem('property-list',JSON.stringify(listings))
            defaultTable();
            displayList();
        })
    })
    
}



// Editing the listing
function editer() {
    editBtn=[...document.querySelectorAll('#edit-btn')]
    editBtn.forEach((edit)=>{
        edit.addEventListener('click',()=>{
             editPosition =editBtn.indexOf(event.target)
            listingType.value=listings[editPosition].type
            listingImage.value=listings[editPosition].image
            listingLocation.value=listings[editPosition].location
            listingPrice.value=listings[editPosition].price
            roomNum.value=listings[editPosition].rooms
            btnEditer(editPosition);
            
        })
       
       
    })
    
}
//Edit button in the model
function btnEditer() {
    try {
        btnEdit.addEventListener('click',()=>{
            if (isValid()) {
                listings[editPosition]=new Addlisting(editPosition+1,listingType.value,listingImage.value,listingPrice.value,listingLocation.value,roomNum.value)
                localStorage.setItem('property-list',JSON.stringify(listings))
                defaultTable();
                clear();
                displayList();
                close.click()
            } 
        })
        
    } catch (error) {
        alert('An error occured',error)
    }
   
}


// Displaying listings
function displayList() {
   // listings=JSON.parse(localStorage.getItem('property-list'))
    listings.forEach((item) =>{
        table.innerHTML+=
        `
        <tr>
            <td> ${item.id}</td>
            <td>${item.type}</td>
            <td class="tbl-image"><img src="${item.image}"</td>
            <td>${item.location}</td>
            <td>R ${item.price}</td>
            <td>${item.rooms}</td>
            <td><button data-bs-toggle="modal" data-bs-target="#newListing-model" id="edit-btn">Edit</button></td>
            <td><button id="delete-btn">Delete</button></td>
        </tr>
        
        `
    }) 
    btnDelete();
    addHouse();
    editer();
}

// Validation
function isValid() {
    switch (true) {
        case !isNaN(listingType.value) || !listingType.value:
            alert('Please enter a valid property type (house/apartment)')
            listingType.value="";
            check=false;
            break;
        case !isNaN(listingImage.value) || !listingImage.value:
            alert('Please enter a valid image link/url')
            listingImage.value="";
            check=false;
            break;
        case !isNaN(listingLocation.value) || !listingLocation.value:
            alert('Please enter a valid property location (City, country)')
            listingLocation.value="";
            check=false;
            break;
        case isNaN(parseInt(listingPrice.value)) || !listingPrice.value:
            alert('Please enter a valid listing price (exclude currency)')
            listingPrice.value="";
            check=false;
            break;
        case isNaN(parseInt(roomNum.value)) || !roomNum.value:
            alert('Please enter a valid number of bedrooms')
            roomNum.value="";
            check=false;
            break;    
        default:
            return check;
            break;
    }
    
}

// Table headings
function defaultTable() {
    table.innerHTML=`
    <tr>
          <th>Id</th>
          <th>Type</th>
          <th>Image</th>
          <th>Location</th>
          <th>Price</th>
          <th>Bedrooms</th>
          <th>Edit</th>
          <th>Delete</th>
    </tr>
    `
}
// clear function
function clear() {
   listingImage.value="" ;
   listingLocation.value="";
   listingPrice.value="",
   roomNum.value="";
}
