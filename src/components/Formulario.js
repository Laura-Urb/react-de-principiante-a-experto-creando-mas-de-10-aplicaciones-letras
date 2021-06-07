import React, { useState } from "react";
import Error from "./Error";

const Formulario = ({setBusquedaCompleta}) => {
  const [busqueda, setBusqueda] = useState({
    artista: "",
    cancion: "",
  });

  const [error, setError] = useState(false);

  const { artista, cancion } = busqueda;

  const updateBusqueda = (e) => {
    setBusqueda({ ...busqueda, [e.target.name]: e.target.value });
  };

  const saveBusqueda = (e) => {
    e.preventDefault();
    if (cancion.trim() === "" || artista.trim() === "") {
      setError(true);
      return;
    }
    setError(false);

    setBusquedaCompleta(busqueda);
  };

  return (
    <div className="bg-info">
      {error ? (
        <Error mensaje="todos los campos son obligatorios"></Error>
      ) : null}
      <div className="container">
        <div className="row">
          <form
            className="col card text-white bg-transparent mb-5 pt-5 pb-2"
            onSubmit={saveBusqueda}
          >
            <fieldset>
              <legend className="text-center">Buscador Letras Canciones</legend>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Artista</label>
                    <input
                      type="text"
                      className="form-control"
                      name="artista"
                      placeholder="Nombre Artista"
                      value={artista}
                      onChange={updateBusqueda}
                    ></input>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Canción</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cancion"
                      placeholder="Nombre Canción"
                      value={cancion}
                      onChange={updateBusqueda}
                    ></input>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary float-right">
                Buscar
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
