function ProductCard({ producto, agregarCarrito, toggleFavorito, esFavorito }) {
  return (
    <div className="card">

      <img
        src={producto.thumbnail}
        alt={producto.title}
        className="card-img"
      />

      <h3>{producto.title}</h3>

      <p>
        <strong>Precio:</strong> ${producto.price}
      </p>

      <p>
        <strong>Categoría:</strong> {producto.category}
      </p>

      <p>
        <strong>Rating:</strong> {producto.rating}
      </p>


      <button onClick={() => agregarCarrito(producto)}>
        Agregar al carrito
      </button>


      <button onClick={() => toggleFavorito(producto)}>
        {esFavorito ? "★ Quitar favorito" : "☆ Favorito"}
      </button>

    </div>
  );
}

export default ProductCard;