import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Axios from "axios";
import Letra from "./components/Letra";
import Info from "./components/Info";

function App() {
  const [busquedaCompleta, setBusquedaCompleta] = useState({
    artista: "",
    cancion: "",
  });

  const [letra, setLetra] = useState("");

  const [info, setInfo] = useState({});

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(busquedaCompleta).length === 0) return;

    const { artista, cancion } = busquedaCompleta;

    const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
    const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

    const consultarAPILetra = async () => {
      // const respuesta = await fetch(url);
      // const resultado = await respuesta.json();

      // const resultado = await Axios.get(url);
      // setLetra(resultado.data.lyrics);

      const [letra, informacion] = await Promise.all([
        Axios.get(url),
        Axios.get(url2)
      ]);

      setLetra(letra.data.lyrics);
      setInfo(informacion.data.artists[0]);
    };

    consultarAPILetra();
  }, [busquedaCompleta, info]);

  return (
    <Fragment>
      <Formulario setBusquedaCompleta={setBusquedaCompleta}></Formulario>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Letra letra={letra}></Letra>
          </div>
          <div className="col-md-6">
            <Info info={info}></Info>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
