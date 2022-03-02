import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";



import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";



const url = "http://localhost:49153/api/productos";

class Productos extends Component {
  stateC={
  dataC:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id_CATEGORIA : '',
    categoria: ''
    
  },
  
}

peticionGetC=()=>{
axios.get("http://localhost:49153/api/categorias").then(response=>{
  this.setState({dataC: response.dataC});

this.stateC.dataC.map((categoria) => { return(console.log(categoria.categoria))})

}).catch(error=>{
  console.log(error.message);
})
}






state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id_PRODUCTOS: "",
      nombrE_PRODUCTO: "",
      detallE_PRODUCTO: "",
      linkimageN_PRODUCTO: "",
      type_iD: "",
    },
  }

  


  peticionGet = () => {
    axios
      .get(url)
      .then((response) => {
        this.setState({ data: response.data });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPost = async () => {
    delete this.state.form.id_PRODUCTOS;
    await axios
      .post(url, this.state.form)
      .then((response) => {
        this.modalInsertar();
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
        console.log(this.state.form);
      });
  };
  ///revisar aprtir de aqui problema en el url
  peticionPut = () => {
    var urll = url + "/" + this.state.form.id_PRODUCTOS;
    axios
      .put(urll, this.state.form)
      .then((response) => {
        this.modalInsertar();
        this.peticionGet();
      })
      .catch((error) => {
        //console.log( urll, this.state.form.NOMBRE_PRODUCTO);
        console.log(error.message);
      });
  };

  peticionDelete = () => {
    var urll = url + "/" + this.state.form.id_PRODUCTOS;
    axios.delete(urll).then((response) => {
      this.setState({ modalEliminar: false });
      this.peticionGet();
    });
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  seleccionarProductos = (productos) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        id_PRODUCTOS: productos.id_PRODUCTOS,
        nombrE_PRODUCTO: productos.nombrE_PRODUCTO,
        detallE_PRODUCTO: productos.detallE_PRODUCTO,
        linkimageN_PRODUCTO: productos.linkimageN_PRODUCTO,
        type_iD: productos.type_iD,
      },
    });
  };

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  componentDidMount() {
    this.peticionGet();
  }

  render() {
    const { form } = this.state;
    return (
      <div className="App">
        
        <button
          className="btn btn-success"
          onClick={() => {
            this.setState({ form: null, tipoModal: "insertar" });
            this.modalInsertar();
          }}
        >
          Agregar Producto
        </button>
        <br />
        <br />
        <table className="table table-sm">
          <thead>
            <tr className="table-primary">
              <th>ID</th>

              <th>PRODUCTO</th>
              <th>DETALLE</th>
              <th>Imagen</th>
              <th>Categoria REF</th>

              <th>Acciones </th>
 
            </tr>
          </thead>
          <tbody>

            {this.state.data.map((productos) => {
              return (
                <tr>
                  <td>{productos.id_PRODUCTOS}</td>
                  <td>{productos.nombrE_PRODUCTO}</td>

                  <td>{productos.detallE_PRODUCTO} </td>

                  <td> <img src={productos.linkimageN_PRODUCTO} id='imgTable' alt="Error imagen" />  </td>
                  <td>{productos.type_iD} {this.stateC.dataC.map((categoria) => { return(categoria.categoria)})} </td>

                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.seleccionarProductos(productos);
                        this.modalInsertar();
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    {"   "}
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this.seleccionarProductos(productos);
                        this.setState({ modalEliminar: true });
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: "block" }}>
            <span
              style={{ float: "right" }}
              onClick={() => this.modalInsertar()}
            >
              x
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="id_PRODUCTOS">#</label>
              <input
                className="form-control"
                type="text"
                name="id_PRODUCTOS"
                id="id_PRODUCTOS"
                readOnly
                onChange={this.handleChange}
                value={form ? form.id_PRODUCTOS : this.state.data.length + 1}
              />

              <br />
              <label htmlFor="nombrE_PRODUCTO">Productos</label>
              <input
                className="form-control"
                type="text"
                name="nombrE_PRODUCTO"
                id="nombrE_PRODUCTO"
                onChange={this.handleChange}
                value={form ? form.nombrE_PRODUCTO : ""}
              />
              <br />
              <label htmlFor="detallE_PRODUCTO">Detalle</label>
              <input
                className="form-control"
                type="text"
                name="detallE_PRODUCTO"
                id="detallE_PRODUCTO"
                onChange={this.handleChange}
                value={form ? form.detallE_PRODUCTO : ""}
              />
              <br />
              <label htmlFor="linkimageN_PRODUCTO">Link Imagen</label>
              <input
                className="form-control"
                type="text"
                name="linkimageN_PRODUCTO"
                id="linkimageN_PRODUCTO"
                onChange={this.handleChange}
                value={form ? form.linkimageN_PRODUCTO : ""}
              />
              <br />

              <label htmlFor="type_iD">AQUI HAY QUE TRAER LAS CATEGORIAS</label>
              <input
                className="form-control"
                type="text"
                name="type_iD"
                id="type_iD"
                onChange={this.handleChange}
                value={form ? form.type_iD : ""}
              />
              <br />









            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.tipoModal == "insertar" ? (
              <button
                className="btn btn-success"
                onClick={() => this.peticionPost()}
              >
                Insertar
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => this.peticionPut()}
              >
                Actualizar
              </button>
            )}
            <button
              className="btn btn-danger"
              onClick={() => this.modalInsertar()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            Estás seguro que deseas eliminar al producto{" "}
            {form && form.nombrE_PRODUCTO}
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={() => this.peticionDelete()}
            >
              Sí
            </button>
            <button
              className="btn btn-secundary"
              onClick={() => this.setState({ modalEliminar: false })}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Productos;
