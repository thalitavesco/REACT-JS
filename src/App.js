import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import { domainToASCII } from 'url';


const data = [
  { id: 1, tipo: "Cerveja", marca: "Skol" },
  { id: 2, tipo: "Vinho", marca: "São Braz" },
  { id: 3, tipo: "Vodca", marca: "Stolichnaya" },
  { id: 4, tipo: "Cerveja", marca: "Itaipava" },
  { id: 5, tipo: "Rum", marca: "Bacardi" },
  { id: 6, tipo: "Cerveja", marca: "Brahma" },
];

class App extends React.Component {
  state = {
    data: data,
    form:{
      id:'',
      tipo:'',
      marca:''
    },
    modalInserir: false,
    modalEditar: false,
  };

  handleChange=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }

  mostrarModalInserir=()=>{
    this.setState({modalInserir: true});
  }
  ocultarModalInserir=()=>{
    this.setState({modalInserir: false});
  }
  
  mostrarModalEditar=(registro)=>{
    this.setState({modalEditar: true, form: registro});
  }
  ocultarModalEditar=()=>{
    this.setState({modalEditar: false});
  }    
  inserir=()=>{
    var novoValor={...this.state.form};
    novoValor.id=this.state.data.length+1;
    var lista=this.state.data;
    lista.push(novoValor);
    this.setState({data: lista, modalInserir: false});
  }
  editar=(dato)=>{
    var contador = 0;
    var lista = this.state.data;
    lista.map((registro)=>{
      if(dato.id==registro.id){
        lista[contador].tipo=dato.tipo;
        lista[contador].marca=dato.marca;
      }
      contador++;
    });
    this.setState({data: lista, modalEditar: false});
  }
  eliminar=(dato)=>{
    var opcao= window.confirm("Realmente deseja excluir a bebida " +dato.id);
    if(opcao){
      var contador = 0;
      var lista = this.state.data;
      lista.map((registro)=>{
        if(registro.id==dato.id){
          lista.splice(contador, 1);
        }
        contador ++;
      });
      this.setState({data: lista});
    }
  }
  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="primary" onClick={()=>this.mostrarModalInserir()}>Inserir Bebida</Button>
          <br /><br />

          <Table>
            <thead><tr><th>Id</th>
              <th>Tipo</th>
              <th>Marca</th>
              <th>Ações</th></tr></thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.tipo}</td>
                  <td>{elemento.marca}</td>
                  <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button></td>
                  <td><Button color="danger" onClick={()=>this.eliminar(elemento)}>Excluir</Button></td>
                </tr>
              ))}

            </tbody>
          </Table>
        </Container>
        <Modal isOpen={this.state.modalInserir}>
          <ModalHeader>
            <div><h3>Inserir Bebida</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.data.length+1}></input>
            </FormGroup>

            <FormGroup>
              <label>Tipo:</label>
              <input className="form-control" name="tipo" type="text" onChange={this.handleChange}></input>
            </FormGroup>

            <FormGroup>
              <label>Marca:</label>
              <input className="form-control" name="marca" type="text" onChange={this.handleChange}></input>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={()=>this.inserir()}>Inserir</Button>
            <Button color="danger" onClick={()=>this.ocultarModalInserir()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        
        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div><h3>Editar Bebida</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.form.id}/>
            </FormGroup>

            <FormGroup>
              <label>Tipo:</label>
              <input className="form-control" name="tipo" type="text" onChange={this.handleChange} value={this.state.form.tipo}></input>
            </FormGroup>

            <FormGroup>
              <label>Marca:</label>
              <input className="form-control" name="marca" type="text" onChange={this.handleChange} value={this.state.form.marca}></input>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={()=>this.editar(this.state.form)}>Editar</Button>
            <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>



      </>)
  }
}

export default App;
