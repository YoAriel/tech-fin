document.addEventListener("DOMContentLoaded",  () => {
    
    
    const renderProductos = () => {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // productosEnCarrito(carrito);


    let seccionProductos = document.getElementById("contenedor-productos");
    seccionProductos.innerHTML ="";

    if(!carrito.length){
        let mensajeCarrito = document.createElement("p");
        mensajeCarrito.classList.add("mensaje-carrito");
        mensajeCarrito.textContent="No se han agregado productos al carrito";
        
        seccionProductos.appendChild(mensajeCarrito);
    }else{
        carrito.forEach((producto, index) =>{
            let tarjetaProducto = document.createElement("article");
            tarjetaProducto.classList.add("producto-listado");
            
            let titleProducto = document.createElement("h3");
            titleProducto.textContent=producto.title;
            
            let imageProducto = document.createElement("img");
            imageProducto.classList.add("imagen-producto");
            imageProducto.src=producto.images[0];
            
            let precioProducto = document.createElement("p");
            precioProducto.textContent = `$${producto.price}`;
            
            let btnEliminar = document.createElement("button");
            btnEliminar.classList.add("eliminar-produc-carrito");
            btnEliminar.textContent="Eliminar";
            btnEliminar.addEventListener("click",  () => {
                eliminarProducto(index);
            });
            
            
            tarjetaProducto.appendChild(imageProducto);
            tarjetaProducto.appendChild(titleProducto);
            tarjetaProducto.appendChild(btnEliminar);
            
            seccionProductos.appendChild(tarjetaProducto);
        });
        
        renderizarBotones();
    };

  };


  
  const renderizarBotones =  () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let divAcctiones = document.getElementById("lista-carrito");
    divAcctiones.innerHTML = "";

    if(carrito.length){

      let btnVaciar = document.createElement("button");
      
      btnVaciar.classList.add("btn-eliminar");
      btnVaciar.textContent = "Vaciar carrito";
      btnVaciar.addEventListener("click",  () => {
        vaciarCarrito();
      });

      btnVaciar.addEventListener("click", () => {
        vaciarCarrito();
        window.location.href = "carrito.html";
        });

      let btnFinalizar = document.createElement("button");
      btnFinalizar.classList.add("btn-finalizar");
      btnFinalizar.textContent = "Finalizar Compra";

      btnFinalizar.addEventListener("click",  () => {
        let confimacion = confirm("¿Está segur@ de realizar la compra?");
        if(confimacion){
          alert("Gracias por su compra");
          localStorage.removeItem("carrito");
          window.location.href = "index.html";
          
        };
    });

        divAcctiones.appendChild(btnFinalizar);
        divAcctiones.appendChild(btnVaciar);
        sumaTotal();
    };
  };

  const eliminarProducto =  (indice) => {
    let carrito = JSON.parse(localStorage.getItem("carrito") || []);
    carrito.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Eliminado");
    window.location.href = "carrito.html";
    renderProductos();
  }

  const vaciarCarrito =  () => {
    localStorage.removeItem("carrito");
    alert("Vaciando carrito");
    renderProductos();
  }
  
  const sumaTotal = () => {
  let items = JSON.parse(localStorage.getItem("carrito")) || [];
  let navTotal = document.getElementById("total");
  let total = 0;
  items.forEach((precios)  => {
    total+=precios.price;
    });

  
  let totalCarrito = document.createElement("p");
  totalCarrito.textContent = `Total: $${total.toFixed(2)}`;

  navTotal.appendChild(totalCarrito);
  
  console.log(total)

  }; 
  renderProductos();
})