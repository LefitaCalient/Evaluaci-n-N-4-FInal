const URL_BASE = "https://dummyjson.com/products";


export async function obtenerProductos() {

  const respuesta = await fetch(URL_BASE);


  if (!respuesta.ok) {
    throw new Error("Error al obtener productos");
  }


  const datos = await respuesta.json();

  return datos.products;

}

export async function buscarProductos(texto) {

  const respuesta = await fetch(
    `${URL_BASE}/search?q=${texto}`
  );


  if (!respuesta.ok) {
    throw new Error("Error en la búsqueda");
  }


  const datos = await respuesta.json();

  return datos.products;

}

export async function obtenerCategorias() {

  const respuesta = await fetch(
    `${URL_BASE}/categories`
  );


  if (!respuesta.ok) {
    throw new Error("Error al obtener categorías");
  }


  return await respuesta.json();

}

export async function productosPorCategoria(categoria) {

  const respuesta = await fetch(
    `${URL_BASE}/category/${categoria}`
  );


  if (!respuesta.ok) {
    throw new Error("Error al filtrar categoría");
  }


  const datos = await respuesta.json();


  return datos.products;

}

export async function obtenerProductosPaginados(limit = 10, skip = 0) {

  const respuesta = await fetch(
    `${URL_BASE}?limit=${limit}&skip=${skip}`
  );


  if (!respuesta.ok) {
    throw new Error("Error al obtener productos");
  }


  const datos = await respuesta.json();


  return {
    productos: datos.products,
    total: datos.total
  };

}