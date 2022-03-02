import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { List, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from "axios";

const url = "http://localhost:49153/api/clientes";

class Contactos extends Component {
  state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    
     id_CLIENTE:'',
    nombrE_CLIENTE:'',
    email:'',
  },
  
}

peticionGet=()=>{
axios.get(url).then(response=>{
  this.setState({data: response.data});
    console.log(response.data);

}).catch(error=>{
  console.log(error.message);
})
}

peticionPost=async()=>{
  delete this.state.form.id_CLIENTE;
 await axios.post(url,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();

  }).catch(error=>{
    console.log(error.message);
console.log(this.state.form);
  })
}
///revisar aprtir de aqui problema en el url
peticionPut=()=>{
  var urll=url+'/'+ this.state.form.id_CLIENTE;
  axios.put(urll, this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{

    console.log(error.message);
   
  })
}

peticionDelete=()=>{
var urll=url+'/'+this.state.form.id_CLIENTE;
  axios.delete(urll).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

seleccionarCliente=(cliente)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id_CLIENTE: cliente.id_CLIENTE,
    nombrE_CLIENTE:cliente.nombrE_CLIENTE,
      email: cliente.email,
      
    }
  })
}

handleChange=async e=>{
e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }
});
console.log(this.state.form);
}

  componentDidMount() {
    this.peticionGet();
  }
  

  render(){
    const {form}=this.state;
  return (
    <div className="App">
    
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Contacto</button>
  <br />
    <table className="table table-sm">
      <thead>
        <tr className="table-primary">
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(contacto=>{
          return(
            <tr>
          <td>{contacto.id_CLIENTE}</td>
          <td>{contacto.nombrE_CLIENTE}</td>
          <td>{contacto.email}</td>
          
          
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarCliente(contacto); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarCliente(contacto); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>



    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="id_CLIENTE">ID</label>
                    <input className="form-control" type="text" name="id_CLIENTE" id="id_CLIENTE" readOnly onChange={this.handleChange} value={form?form.id_CLIENTE: this.state.data.length+1}/>
                    <br />
                    <label htmlFor="nombrE_CLIENTE">Nombre Cliente</label>
                    <input className="form-control" type="text" name="nombrE_CLIENTE" id="nombrE_CLIENTE" onChange={this.handleChange} value={form?form.nombrE_CLIENTE: ''}/>
                    <br />
                    <label htmlFor="email">Correo Electronico</label>
                    <input className="form-control" type="text" name="email" id="email" onChange={this.handleChange} value={form?form.email: ''}/>
                    <br />
                    
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar al contacto {form && form.nombrE_CLIENTE} ?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>



  );
}
}

export default Contactos;
