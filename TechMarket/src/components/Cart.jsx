function Cart({ carrito, cambiarCantidad, eliminarProducto, vaciarCarrito }) {

  return (
    <div>

      <h2>Carrito</h2>


      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (

        carrito.map((producto) => (

          <div key={producto.id}>

            <h4>{producto.title}</h4>

            <p>
              Cantidad: {producto.cantidad}
            </p>


            <button
              onClick={() =>
                cambiarCantidad(producto.id, producto.cantidad + 1)
              }
            >
              +
            </button>


            <button
              onClick={() =>
                cambiarCantidad(producto.id, producto.cantidad - 1)
              }
            >
              -
            </button>


            <button
              onClick={() =>
                eliminarProducto(producto.id)
              }
            >
              Eliminar
            </button>


          </div>

        ))

      )}


      <button onClick={vaciarCarrito}>
        Vaciar carrito
      </button>

    </div>
  );
}


export default Cart;