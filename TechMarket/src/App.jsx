import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import { obtenerProductos, buscarProductos,obtenerCategorias, productosPorCategoria } from "./services/api";
import Cart from "./components/Cart";
import Favorites from "./components/Favorites";
import CategoryFilther from "./components/CategoryFilther";

function App() {

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

useEffect(() => {

  try {

    const carritoGuardado = JSON.parse(
      localStorage.getItem("carrito")
    );

    if (Array.isArray(carritoGuardado)) {
      setCarrito(carritoGuardado);
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
    const datos = await obtenerProductos();
    setProductos(datos);
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

    const datos = await buscarProductos(busqueda);

    setProductos(datos);

  } catch (error) {
    setError("No fue posible realizar la búsqueda.");
  } finally {
    setLoading(false);
  }
};

  

const agregarCarrito = (producto) => {

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

  if (cantidad < 1) return;


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


useEffect(() => {

  cargarCategorias();

}, []);

if (loading) {
    return <h2>Cargando productos...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }
  
  return (
  <div className="container">

    <h1>TechMarket</h1>

    <SearchBar
  busqueda={busqueda}
  setBusqueda={setBusqueda}
  buscarProductos={buscar}
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