function Favorites({ favoritos }) {

  return (
    <div>

      <h2>Mis Favoritos</h2>


      {favoritos.length === 0 ? (

        <p>No tienes favoritos.</p>

      ) : (

        favoritos.map((producto) => (

          <div key={producto.id}>

            <h4>{producto.title}</h4>

            <p>
              Precio: ${producto.price}
            </p>

          </div>

        ))

      )}

    </div>
  );

}


export default Favorites;