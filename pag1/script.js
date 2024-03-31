const cartBtn = document.querySelector('.cartBtn')
const closeBtn = document.querySelector('.closeBtn')
const body = document.querySelector('body')
const cartModal = document.querySelector('.cartModal')
const conteiner = document.querySelector('.conteiner')
const checkin = document.querySelector('.checkin')
const cartTotal = document.querySelector('.cartTotal')
const addToCartBtn = document.querySelector('.addToCart')
const cartItens = document.querySelector('.cartItens')
const cartCount = document.querySelector('.cartCount')


cartBtn.addEventListener("click", () => {
    cartModal.classList.add('ativo')
    

})

const closeCart = ()  => {
    cartModal.classList.remove('ativo')
}



cartModal.addEventListener("click", (event) => {
   if(event.target === cartModal) {
    cartModal.classList.remove('ativo')
   }
        
    
    
    
})

const cart = []

body.addEventListener("click", function(event)  {
    const parentButton = event.target.closest('.addToCart')
    if(parentButton) {
        const name = parentButton.getAttribute('data-name')
        const price = Number(parentButton.getAttribute('data-price'))

        addToCart(name, price)
    }
    


})

function addToCart(name,price) {
    const existItem  = cart.find(item => item.name === name )
    if(existItem) {
        existItem.quantity ++
        updateCartModal()
        return
        
        
    }


    cart.push({
        name,
        price,
        quantity: 1
    })
    updateCartModal()

}

function updateCartModal() {
    cartItens.innerHTML = ''
    let total = 0

    cart.forEach(item => {
       const cartItensElement = document.createElement('div')
       cartItensElement.innerHTML = `
       <div class="itemAdicionado">
        <div>
            <p>${item.name}</p>
            <p>QTD: ${item.quantity}</p>
            <p>R$ ${item.price}</p>
            
        </div>
        <div>
           <i data-name="${item.name}" class="bi bi-trash removeItemBtn"></i>
        </div>
        
        
       </div>
       <hr>
       `
       total += item.price * item.quantity
       
       cartItens.appendChild(cartItensElement)

       

       

    })

    cartTotal.innerHTML = total.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
    cartCount.innerHTML = cart.length


}

cartModal.addEventListener("click", function(event)  {
    if(event.target.classList.contains("removeItemBtn")) {
        const name = event.target.getAttribute("data-name")
        removeItemCart(name)
        updateCartModal()
    }
})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name)
    if(index !== -1) {
        const item = cart[index]

        if (item.quantity > 1) {
            item.quantity --
            updateCartModal()
            return
            
            
        } else {
            cart.splice(index, 1)
        
        
        
        }
        updateCartModal()

        
        
        
        
        

    }
}

checkin.addEventListener("click", () => {
    if(cart.length === 0) {
        Toastify({
            text: "[Erro] Adicione itens ao carrinho",
            duration: 3000,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "red",
            },
          }).showToast();
        return
    }
    window.open('login.html')
})














