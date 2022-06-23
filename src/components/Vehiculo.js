import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function Vehiculo() {
  const url = "http://localhost:13822/api/vehiculo";
  const url2 = "http://localhost:13822/api/piloto";

  
  const [piloto, setPiloto] = useState([]);
  const [vehiculo, setVehiculo] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [selectedV, setSelectedV] = useState({
    IdVehiculo: "",
    Placa: "",
    CapacidadMts: "",
    Consumo: "",
    Costo: "",
    Tipo: "",
    Piloto: "",
    FechaInicio: "",
    FechaFinal: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedV({
      ...selectedV,
      [name]: value,
    });
  };

  const handlePilot = (e) => {
    this.setPiloto({Piloto: e.target.value});
  };

  const openCloseModalInsert = () =>{
    setModalInsertar(!modalInsertar);
  }

  const openCloseModalEdit = () =>{
    setModalEditar(!modalEditar);
  }
  
  const openCloseModalEliminar = () =>{
    setModalEliminar(!modalEliminar);
  }

  //function for put and delete
  const seleccionarVehiculo = (vehic, caso) => {
    setSelectedV(vehic);
    (caso === "Editar") ? 
    openCloseModalEdit() : openCloseModalEliminar();
  }

  //GET
  const get = async () => {
    await axios
      .get(url)
      .then((response) => {
        setVehiculo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  //GET PILOTOS
  const getPilots = async () => {
    await axios
      .get(url2)
      .then((response) => {
        setPiloto(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //POST
  const post = async () => {
    delete selectedV.IdVehiculo;
    selectedV.Costo = parseFloat(selectedV.Costo)
    await axios
      .post(url, selectedV)
      .then((response) => {
        setVehiculo(response.data);
        openCloseModalInsert();
      })
      .catch((error) => {
        console.log(error);
      });
  };

   
  //PUT
  const putMethod = async () => {
    selectedV.Costo = parseFloat(selectedV.Costo)
    await axios.put(url+"/"+selectedV.IdVehiculo, selectedV)
      .then((response) => {
        var respuesta = response.data;
        var dataAuxiliar = vehiculo;
        dataAuxiliar.map(ob => {
          if(ob.IdVehiculo === selectedV.IdVehiculo){
            ob.Placa = respuesta.Placa;
            ob.Capacidad = respuesta.Capacidad;
            ob.Consumo = respuesta.Consumo;
            ob.Costo = respuesta.Costo;
            ob.Tipo = respuesta.Tipo;
            ob.Piloto = respuesta.Piloto;
            ob.FechaInicio = respuesta.FechaInicio;
            ob.FechaFinal = respuesta.FechaFinal;
            
          }
        });
        openCloseModalEdit();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //DELETE
  const deleteMethod = async () => {
    selectedV.Costo = parseFloat(selectedV.Costo)
    await axios.delete(url+"/"+selectedV.IdVehiculo)
      .then((response) => {
        //filtrando data
        setVehiculo(vehiculo.filter(ob => ob.IdVehiculo !== response.data));
        openCloseModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <div>
      <br></br>
      <button onClick={() => openCloseModalInsert()} className="btn btn-success">Insertar nuevo vehículo</button>
      <br></br>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>IdVehiculo</th>
            <th>Placa</th>
            <th>Capacidad</th>
            <th>Piloto</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculo.map((data) => (
            <tr key={data.IdVehiculo}>
              <td>{data.IdVehiculo}</td>
              <td>{data.Placa}</td>
              <td>{data.CapacidadMts}</td>
              <td>{data.Piloto}</td>
              <button type="button" className="btn btn-light mr-1" onClick={() => seleccionarVehiculo(data, "Editar")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
              </button>
              <button type="button" className="btn btn-light mr-1" onClick={() => seleccionarVehiculo(data, "Eliminar")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </button>
            </tr>
          ))}
        </tbody>

      </table>

      
      <Modal isOpen={modalInsertar} onClick={() => getPilots()}>
        <ModalHeader>Insertar nuevo vehículo</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Placa: </label>
            <br />
            <input type="text" className="form-control" name="Placa" onChange={handleChange}/>

            <label>Capacidad: </label>
            <br />
            <input type="text" className="form-control" name="CapacidadMts" onChange={handleChange}/>

            <label>Consumo: </label>
            <br />
            <input type="text" className="form-control" name="Consumo" onChange={handleChange}/>

            <label>Costo: </label>
            <br />
            <input type="text" className="form-control" name="Costo" onChange={handleChange}/>

            <label>Tipo: </label>
            <br />
            <input type="text" className="form-control" name="Tipo" onChange={handleChange}/>

            <label>Piloto: </label>
            <br />
            <select className="form-select" value={piloto} name="Piloto" onChange={handlePilot}>
              {piloto.map(pi => <option key={pi.IdPiloto}>
                {pi.Nombre}
              </option>)}
            </select>

            <label>Fecha de inicio: </label>
            <br />
            <input type="date" className="form-control" name="FechaInicio" onChange={handleChange}/>

            <label>Fecha de finalización: </label>
            <br />
            <input type="date" className="form-control" name="FechaFinal" onChange={handleChange}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => post()}>Insertar</button>{"    "}
          <button className="btn btn-danger" onClick={() => openCloseModalInsert()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar vehículo</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label> ID: </label>
            <br />
            <input type="text" className="form-control" readOnly value={selectedV && selectedV.IdVehiculo}/>

            <label>Placa: </label>
            <br />
            <input type="text"  name="Placa" className="form-control" onChange={handleChange} value={selectedV && selectedV.Placa}/>

            <label>Capacidad: </label>
            <br />
            <input type="text" name="Capacidad" className="form-control" onChange={handleChange} value={selectedV && selectedV.CapacidadMts}/>

            <label>Consumo: </label>
            <br />
            <input type="text" name="Consumo" className="form-control" onChange={handleChange} value={selectedV && selectedV.Consumo}/>

            <label>Costo: </label>
            <br />
            <input type="text" name="Costo" className="form-control" onChange={handleChange} value={selectedV && selectedV.Costo}/>

            <label>Tipo: </label>
            <br />
            <input type="text" name="Tipo" className="form-control" onChange={handleChange} value={selectedV && selectedV.Tipo}/>

            <label>Piloto: </label>
            <br />
            <input type="text" name="Piloto" className="form-control" onChange={handleChange} value={selectedV && selectedV.Piloto}/>

            <label>Fecha de inicio: </label>
            <br />
            <input type="date" name="FechaInicio" className="form-control" onChange={handleChange} value={selectedV && selectedV.FechaInicio}/>

            <label>Fecha de finalización: </label>
            <br />
            <input type="date" name="FechaFinal" className="form-control" onChange={handleChange} value={selectedV && selectedV.FechaFinal}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => putMethod()}>Editar</button>{"    "}
          <button className="btn btn-danger" onClick={() => openCloseModalEdit()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalHeader>¿Está seguro que desea eliminar el vehículo? {selectedV && selectedV.IdVehiculo}</ModalHeader>
        
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => deleteMethod()}>Si</button>{"    "}
          <button className="btn btn-danger" onClick={() => openCloseModalEliminar()}>No</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
