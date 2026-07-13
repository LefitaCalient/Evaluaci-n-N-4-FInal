function Favorites({ favoritos }) {

  return (
    <div className="favorites">

      <h2 className="favorite-title">
        Mis Favoritos
      </h2>

      {favoritos.length === 0 ? (

        <p>No tienes favoritos.</p>

      ) : (

        favoritos.map((producto) => (

          <div key={producto.id}>

            <img
              src={producto.thumbnail}
              alt={producto.title}
              width="100"
            />

            <h4>{producto.title}</h4>

            <p>Precio: ${producto.price}</p>

            <p>Categoría: {producto.category}</p>

          </div>

        ))

      )}

    </div>
  );

}

export default Favorites;