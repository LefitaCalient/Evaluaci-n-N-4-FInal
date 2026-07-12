function CategoryFilther({
  categorias,
  categoriaSeleccionada,
  cambiarCategoria
}) {


  return (

    <div>

      <label>
        Categoría:
      </label>


      <select
        value={categoriaSeleccionada}
        onChange={(e) =>
          cambiarCategoria(e.target.value)
        }
      >

        <option value="">
          Todas
        </option>


        {categorias.map((categoria) => (

          <option
            key={categoria}
            value={categoria}
          >
            {categoria}
          </option>

        ))}


      </select>


    </div>

  );

}


export default CategoryFilther;