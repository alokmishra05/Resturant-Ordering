import { menuArray } from "./data.js"
const arr1 = []
let feedHtml2 = ''
const modalText = document.getElementById('modal-text')
let total = 0;
const modalCloseBtn = document.getElementById('modal-close-btn')
const consentForm = document.getElementById('consent-form')
let arr2 = ``

// event listeners
document.addEventListener("click", function(e){
    if(e.target.dataset.id){
        handleADDClick(e.target.dataset.id) 
     }
    if(e.target.id === 'orderbtn'){
        finalorder()
    }
    if(e.target.dataset.rem){
        remorder(e.target.dataset.rem)
    }
    console.log(total)
})
modalCloseBtn.addEventListener('click', function(){
    modal.style.display = 'none'
}) 

function remorder(orderID){
    let index = arr1.findIndex(menu => menu.id == orderID)
    arr1.splice(index, 1)
    total -= menuArray.find(menu => menu.id == orderID).price
    render1()
} 

// prints the orders selected
function handleADDClick(orderID){
    const targetTweetObj = menuArray.filter(function(order){
        return order.id === orderID
    })[0]

    
    function getFeedHtml1(){
        let feedHtml1 = ``
        const menu  = menuArray.filter(function(x) { return x.id == orderID })[0]
        total += menu.price
            feedHtml1+= `
        <div class = "item1" id = "order1">
        <div>
           <p class = "name1">${menu.name} 
           <button id = "btnrem" class = "btnrem" data-rem="${menu.id}"> remove </button></p>
        </div>
        <div>  
           <p> ${menu.price} ₹</p>
        </div>
        </div>`
       return feedHtml1
    }
    arr1.push(getFeedHtml1())
    


// prints the total payment
    function getFeedHtml2(){
        feedHtml2= `
        <div>
           <p class = "total1">  TOTAL = ${total} <br>
           <button id = "orderbtn"> ORDER </button></p>
           </div>`
           return feedHtml2
    }

  
        arr2 = getFeedHtml2()
        
   
    render1()
    
}

function render1(){
    document.getElementById('order').innerHTML = '<h1> your order</h1>' + arr1.join("")
    document.getElementById('total').innerHTML = arr2
}


// prints the menu
function getFeedHtml(){
    let feedHtml = ``
    menuArray.forEach(function(menu){
    feedHtml+= `
<div class = "item">
    
<div class = "rohit">
    <p class = "name"> ${menu.emoji}${menu.name}</p>
    <p class = "ingredients">${menu.ingredients}</p>
    <p>${menu.price} ₹</p>
</div>
<div class = "btnn">
    <button class = "btn" data-id="${menu.id}"> + </button>
</div>
</div>`
    })
return feedHtml
}
function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}
render()


// opens the order info menu
function finalorder(){
    modal.style.display = 'flex'
}


// order info
consentForm.addEventListener('submit', function(e){
    e.preventDefault()
    const consentFormData = new FormData(consentForm)
    const fullName = consentFormData.get('fullName')
    
    modalText.innerHTML = `
    <div class="modal-inner-loading">
        <img src="image/loading.svg" class="loading">
        <p id="upload-text">processing your order...</p>
    </div>` 
    
    setTimeout(function(){
        document.getElementById('upload-text').innerText = `
        CONDIRMING YOUR ORDER...`
    }, 1500)
    
    setTimeout(function(){
        document.getElementById('modal-inner').innerHTML = `
        <a href = "/" class="modal-close-btn" id="modal-close-btn">X</a>
        <h2>Thanks <span class="modal-display-name">${fullName}</span>, have a good day ahead!! </h2>
        <img src = "image/order.gif" class = "ordergif"><br><br>
        <p>meanwhile <a href="https://linktr.ee/rohit9804" class="btn" target="_blank">LET'S CONNECT</a></p>
        </div>
    `
    }, 3000)
  
}) 
