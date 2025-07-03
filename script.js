document.addEventListener("DOMContentLoaded",   () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
  const rederizarProductos = () =>{
    url ="https://dummyjson.com/products?limit=10";

    fetch(url)
      .then((res) => res.json())
      .then((data) =>{
        let contenedorProductos= document.getElementById("contenedor-productos");


        data.products.forEach((producto) => {
          let tarjetaProducto = document.createElement("article");
            tarjetaProducto.classList.add("producto-listado");

            let titleProducto = document.createElement("h3");
            titleProducto.textContent = producto.title;

            let imageProducto = document.createElement("img");
            imageProducto.classList.add("imagen-producto");
            imageProducto.src = producto.images[0];
            imageProducto.alt = producto.description;

            let precioProducto = document.createElement("p");
            precioProducto.textContent = `$${producto.price}`;

            let btnAgregar = document.createElement("button");
            btnAgregar.classList.add("btn-agregar");
            btnAgregar.textContent = "Agregar";

            btnAgregar.addEventListener("click",  () => {
              carrito.push(producto);
              localStorage.setItem("carrito",JSON.stringify(carrito));
              actualizarContador();
              sumaPrecio();
            });

            tarjetaProducto.appendChild(imageProducto);
            tarjetaProducto.appendChild(titleProducto);
            tarjetaProducto.appendChild(precioProducto);
            tarjetaProducto.appendChild(btnAgregar);

            contenedorProductos.appendChild(tarjetaProducto);
        });


      })
      .catch((err) => console.log("Error: ", err));
  };



  const actualizarContador =  () => {
    let contador = document.getElementById("contador-carrito");
    contador.textContent = carrito.length;
  }

  const sumaPrecio =  () => {
    suma=0
    carrito.forEach((precio) =>{
      suma+=precio.price;
    })
    console.log(suma)
  }

  rederizarProductos();
  actualizarContador();
});