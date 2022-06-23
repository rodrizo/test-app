import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function Piloto() {
  const url = "http://localhost:13822/api/piloto";

  const [piloto, setPiloto] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [selectedPilot, setSelectedPilot] = useState({
    IdPiloto: "",
    Nombre: "",
    Ayudantes: "",
    Viaticos: "",
    Descripcion: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedPilot({
      ...selectedPilot,
      [name]: value,
    });
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
  const seleccionarPiloto = (pilot, caso) => {
    setSelectedPilot(pilot);
    (caso === "Editar") ? 
    openCloseModalEdit() : openCloseModalEliminar();
  }

  //GET
  const get = async () => {
    await axios
      .get(url)
      .then((response) => {
        setPiloto(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  //POST
  const post = async () => {
    delete selectedPilot.IdPiloto;
    selectedPilot.Ayudantes = parseInt(selectedPilot.Ayudantes)
    selectedPilot.Viaticos = parseFloat(selectedPilot.Viaticos)
    await axios
      .post(url, selectedPilot)
      .then((response) => {
        setPiloto(response.data);
        openCloseModalInsert();
      })
      .catch((error) => {
        console.log(error);
      });
  };

   
  //PUT
  const putMethod = async () => {
    selectedPilot.Ayudantes = parseInt(selectedPilot.Ayudantes)
    selectedPilot.Viaticos = parseFloat(selectedPilot.Viaticos)
    await axios.put(url+"/"+selectedPilot.IdPiloto, selectedPilot)
      .then((response) => {
        var respuesta = response.data;
        var dataAuxiliar = piloto;
        dataAuxiliar.map(ob => {
          if(ob.IdPiloto === selectedPilot.IdPiloto){
            ob.Nombre = respuesta.Nombre;
            ob.Ayudantes = respuesta.Ayudantes;
            ob.Viaticos = respuesta.Viaticos;
            ob.Descripcion = respuesta.Descripcion;
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
    selectedPilot.Ayudantes = parseInt(selectedPilot.Ayudantes)
    selectedPilot.Viaticos = parseFloat(selectedPilot.Viaticos)
    await axios.delete(url+"/"+selectedPilot.IdPiloto)
      .then((response) => {
        //filtrando data
        setPiloto(piloto.filter(ob => ob.IdPiloto !== response.data));
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
      <button onClick={() => openCloseModalInsert()} className="btn btn-success">Insertar nuevo piloto</button>
      <br></br>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Ayudantes</th>
            <th>Viaticos</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {piloto.map((data) => (
            <tr key={data.IdPiloto}>
              <td>{data.IdPiloto}</td>
              <td>{data.Nombre}</td>
              <td>{data.Ayudantes}</td>
              <td>{data.Viaticos}</td>
              <button type="button" className="btn btn-light mr-1" onClick={() => seleccionarPiloto(data, "Editar")}>
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
              <button type="button" className="btn btn-light mr-1" onClick={() => seleccionarPiloto(data, "Eliminar")}>
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

      
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar nuevo piloto</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name="Nombre" onChange={handleChange}/>

            <label>Ayudantes: </label>
            <br />
            <input type="text" className="form-control" name="Ayudantes" onChange={handleChange}/>

            <label>Viaticos: </label>
            <br />
            <input type="text" className="form-control" name="Viaticos" onChange={handleChange}/>

            <label>Descripcion: </label>
            <br />
            <input type="text" className="form-control" name="Descripcion" onChange={handleChange}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => post()}>Insertar</button>{"    "}
          <button className="btn btn-danger" onClick={() => openCloseModalInsert()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar piloto</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label> ID: </label>
            <br />
            <input type="text" className="form-control" readOnly value={selectedPilot && selectedPilot.IdPiloto}/>

            <label>Nombre: </label>
            <br />
            <input type="text"  name="Nombre" className="form-control" onChange={handleChange} value={selectedPilot && selectedPilot.Nombre}/>

            <label>Ayudantes: </label>
            <br />
            <input type="text" name="Ayudantes" className="form-control" onChange={handleChange} value={selectedPilot && selectedPilot.Ayudantes}/>

            <label>Viaticos: </label>
            <br />
            <input type="text" name="Viaticos" className="form-control" onChange={handleChange} value={selectedPilot && selectedPilot.Viaticos}/>

            <label>Descripcion: </label>
            <br />
            <input type="text" name="Descripcion" className="form-control" onChange={handleChange} value={selectedPilot && selectedPilot.Descripcion}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => putMethod()}>Editar</button>{"    "}
          <button className="btn btn-danger" onClick={() => openCloseModalEdit()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalHeader>¿Está seguro que desea eliminar al piloto {selectedPilot && selectedPilot.Nombre} ?</ModalHeader>
        
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => deleteMethod()}>Si</button>{"    "}
          <button className="btn btn-danger" onClick={() => openCloseModalEliminar()}>No</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
