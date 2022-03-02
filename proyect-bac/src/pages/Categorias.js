import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { List, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from "axios";

const url = "http://localhost:49153/api/categorias";

class Categorias extends Component {
  state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id_CATEGORIA : '',
    categoria: ''
    
  },
  
}

peticionGet=()=>{
axios.get(url).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}

peticionPost=async()=>{
  delete this.state.form.id_CATEGORIA;
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
  var urll=url+'/'+ this.state.form.id_CATEGORIA;
  axios.put(urll, this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
console.log( urll, this.state.form.categoria);
    console.log(error.message);
   
  })
}

peticionDelete=()=>{
var urll=url+'/'+this.state.form.id_CATEGORIA;
  axios.delete(urll).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

seleccionarCategoria=(categoria)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id_CATEGORIA: categoria.id_CATEGORIA,
      categoria: categoria.categoria,
      
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
    
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Categoria</button>
  <br /> <br />
    <table className="table table-sm">
      <thead>
        <tr className="table-primary">
          <th>ID</th>
          <th>Categoria</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(categoria=>{
          return(
            <tr>
          <td>{categoria.id_CATEGORIA}</td>
          <td>{categoria.categoria}</td>
          
          
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarCategoria(categoria); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarCategoria(categoria); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                    <label htmlFor="id_CATEGORIA">ID</label>
                    <input className="form-control" type="text" name="id_CATEGORIA" id="id_CATEGORIA" readOnly onChange={this.handleChange} value={form?form.id_CATEGORIA: this.state.data.length+1}/>
                    <br />
                    <label htmlFor="categoria">Categoria</label>
                    <input className="form-control" type="text" name="categoria" id="categoria" onChange={this.handleChange} value={form?form.categoria: ''}/>
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
               Estás seguro que deseas eliminar a la categoria {form && form.categoria}
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

export default Categorias;
