function SearchBar({ busqueda, setBusqueda, buscarProductos }) {

  const manejarSubmit = (e) => {
    e.preventDefault();
    buscarProductos();
  };

  return (
    <form onSubmit={manejarSubmit}>

      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <button type="submit">
        Buscar
      </button>

    </form>
  );
}

export default SearchBar;