import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import { obtenerProductosPaginados, buscarProductos,obtenerCategorias, productosPorCategoria } from "./services/api";
import Cart from "./components/Cart";
import Favorites from "./components/Favorites";
import CategoryFilther from "./components/CategoryFilther";
import { sanitizarTexto } from "./utils/security";

function App() {

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [pagina, setPagina] = useState(0);
  const [totalProductos, setTotalProductos] = useState(0);
  const [favoritos, setFavoritos] = useState([]);
  
  const validarCantidad = (cantidad) => {

  return (
    Number.isInteger(cantidad) &&
    cantidad > 0
  );

};

  useEffect(() => {
    cargarProductos();
  }, []);

useEffect(() => {

  try {

    const carritoGuardado = JSON.parse(
      localStorage.getItem("carrito")
    );

    if (
  Array.isArray(carritoGuardado) &&
  carritoGuardado.every(
    producto =>
      producto.id &&
      validarCantidad(producto.cantidad)
  )
) {
  setCarrito(carritoGuardado);
} else {
  localStorage.removeItem("carrito");
}

  } catch (error) {

    localStorage.removeItem("carrito");

  }

}, []);

useEffect(() => {

  try {

    const favoritosGuardados = JSON.parse(
      localStorage.getItem("favoritos")
    );


    if (Array.isArray(favoritosGuardados)) {
      setFavoritos(favoritosGuardados);
    }


  } catch (error) {

    localStorage.removeItem("favoritos");

  }

}, []);

const cargarProductos = async () => {

  try {

    const datos = await obtenerProductosPaginados(
      10,
      0
    );


    setProductos(datos.productos);

    setTotalProductos(datos.total);

    setPagina(0);


  } catch (err) {

    setError("No fue posible cargar los productos.");

  } finally {

    setLoading(false);

  }

};

const buscar = async () => {
  if (busqueda.trim() === "") {
    cargarProductos();
    return;
  }

  try {
    setLoading(true);

    const textoSeguro = sanitizarTexto(busqueda);

    const datos = await buscarProductos(textoSeguro);

    setProductos(datos);

  } catch (error) {
    setError("No fue posible realizar la búsqueda.");
  } finally {
    setLoading(false);
  }
};

const agregarCarrito = (producto) => {
  if (!producto || !producto.id) {
    return;
  }
  const existe = carrito.find(
    item => item.id === producto.id
  );


  let nuevoCarrito;


  if (existe) {

    nuevoCarrito = carrito.map(item =>
      item.id === producto.id
      ? {
          ...item,
          cantidad: item.cantidad + 1
        }
      : item
    );


  } else {

    nuevoCarrito = [
      ...carrito,
      {
        ...producto,
        cantidad: 1
      }
    ];

  }


  setCarrito(nuevoCarrito);

  localStorage.setItem(
    "carrito",
    JSON.stringify(nuevoCarrito)
  );

};

const cambiarCantidad = (id, cantidad) => {
  if (!validarCantidad(cantidad)) {
    return;
  }

  const actualizado = carrito.map(producto =>
    producto.id === id
    ? {
        ...producto,
        cantidad: cantidad
      }
    : producto
  );


  setCarrito(actualizado);

  localStorage.setItem(
    "carrito",
    JSON.stringify(actualizado)
  );

};

const eliminarProducto = (id) => {

  const actualizado = carrito.filter(
    producto => producto.id !== id
  );


  setCarrito(actualizado);

  localStorage.setItem(
    "carrito",
    JSON.stringify(actualizado)
  );

};

const vaciarCarrito = () => {

  setCarrito([]);

  localStorage.removeItem("carrito");

};

const toggleFavorito = (producto) => {

  const existe = favoritos.some(
    item => item.id === producto.id
  );


  let nuevosFavoritos;


  if (existe) {

    nuevosFavoritos = favoritos.filter(
      item => item.id !== producto.id
    );


  } else {

    nuevosFavoritos = [
      ...favoritos,
      producto
    ];

  }


  setFavoritos(nuevosFavoritos);


  localStorage.setItem(
    "favoritos",
    JSON.stringify(nuevosFavoritos)
  );

};

const cargarCategorias = async () => {

  try {

    const datos = await obtenerCategorias();

    setCategorias(datos);

  } catch(error){

    console.log(error);

  }

};

const cambiarCategoria = async (categoria) => {

  setCategoriaSeleccionada(categoria);

  try {

    setLoading(true);


    if (categoria === "") {

      await cargarProductos();

    } else {

      const datos = await productosPorCategoria(categoria);

      setProductos(datos);

    }


  } catch(error) {

    setError("No fue posible cargar la categoría.");

  } finally {

    setLoading(false);

  }

};

useEffect(() => {

  cargarCategorias();

}, []);

const cargarPagina = async (nuevaPagina) => {

  try {

    setLoading(true);


    const datos = await obtenerProductosPaginados(
      10,
      nuevaPagina * 10
    );


    setProductos(datos.productos);

    setTotalProductos(datos.total);

    setPagina(nuevaPagina);


  } catch(error) {

    setError("No fue posible cargar la página.");

  } finally {

    setLoading(false);

  }

};

if (loading) {
    return <h2>Cargando productos...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
  <div className="container">

  <header className="header">

  <h1>TechMarket</h1>

  <p>
    Catálogo de productos tecnológicos
  </p>

</header>

<SearchBar
  busqueda={busqueda}
  setBusqueda={setBusqueda}
  buscarProductos={buscar}
/>

<CategoryFilther
  categorias={categorias}
  categoriaSeleccionada={categoriaSeleccionada}
  cambiarCategoria={cambiarCategoria}
/>

    <p>Productos encontrados: {productos.length}</p>

    <div className="grid">

      {productos.map((producto) => (

        <ProductCard
          key={producto.id}
          producto={producto}
          agregarCarrito={agregarCarrito}
          toggleFavorito={toggleFavorito}
          esFavorito={
            favoritos.some(
              item => item.id === producto.id
            )
          }
        />

      ))}

    </div>

    <div className="pagination">

        <button
          disabled={pagina === 0}
          onClick={() => cargarPagina(pagina - 1)}
        >
          Anterior
      </button>


        <span>
          Página {pagina + 1}
        </span>


      <button
          disabled={(pagina + 1) * 10 >= totalProductos}
          onClick={() => cargarPagina(pagina + 1)}
          >
          Siguiente
      </button>

    </div>

        <Cart
          carrito={carrito}
          cambiarCantidad={cambiarCantidad}
          eliminarProducto={eliminarProducto}
          vaciarCarrito={vaciarCarrito}
        />
        <Favorites favoritos={favoritos} />

    </div>
);
}


export default App;