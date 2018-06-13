import React from 'react';

import Navbar from './navbar';
import Table from './table';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            buttonUpdate: 'Add',
            _id: '',
            name: '',
            lastname: '',
            phone: '',
            personas: []
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.addPersona = this.addPersona.bind(this);
        this.deletePersona = this.deletePersona.bind(this);
        this.editPersona = this.editPersona.bind(this);
    }

    componentWillMount(){
        this.fetchPersonas();
    }

    handleOnChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]:value
        })
    }
    addPersona(e){
        e.preventDefault();
        if(this.state.buttonUpdate === 'Update'){
            fetch(`/api/personas/${this.state._id}`,{
                method: 'PUT',
                body: JSON.stringify({
                    name: this.state.name,
                    lastname: this.state.lastname,
                    phone: this.state.phone
                }),
                headers:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            }).then(res => res.json())
            .then(data => {
                this.setState({
                    buttonUpdate: 'Add',
                     _id: '',
                    name: '',
                    lastname: '',
                    phone: '',
                });
                this.fetchPersonas();
            });
        }else{
            fetch('/api/personas', {
                method:'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            }).then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    name: '',
                    lastname: '',
                    phone: '',
                });
                this.fetchPersonas();
            })
        }
        
    }
    deletePersona(id){
        console.log(id);
        if(confirm('Are you sure you want to delete it?')) {
            fetch(`/api/personas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(data => {
                console.log(data);
                this.fetchPersonas();
            })
        }
    }

    fetchPersonas(){
        fetch('/api/personas')
        .then(res => res.json())
        .then(data => {
            this.setState({personas: data});
            console.log(this.state.personas);
          });
    }


    editPersona(id){
        console.log(id);
        this.setState({
            buttonUpdate: 'Update',
        });
        fetch(`/api/personas/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                name: data.name,
                lastname: data.lastname,
                phone: data.phone,
                _id: data._id
            });            
          });
    }

    

    render(){
        let p = {name: 'julio', lastname: 'del rio', phone:'32432', option:''};
        return (
            <div>
                <Navbar userName='Julio'/>
                    <div className="container">
                     <div className="card my-2">
                        <div className="card-body">
                        <div className="card">
                            <div className="card-body">
                            <form onSubmit={this.addPersona}>
                                <div className="form-group">
                                    <label htmlFor="input-name">Enter name:</label>
                                    <input onChange={this.handleOnChange} className="form-control" id="input-name" value={this.state.name} name="name" type="text"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="input-lastname">Enter Last name:</label>
                                    <input onChange={this.handleOnChange} className="form-control" value={this.state.lastname} id="input-lastname" name="lastname" type="text"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="input-phone">Enter Phone number:</label>
                                    <input onChange={this.handleOnChange} className="form-control" id="input-phone" value={this.state.phone} name="phone" type="text"/>
                                </div>
                                <button className="btn btn-primary my-3">{ this.state.buttonUpdate }</button>
                            </form>
                            </div>
                            </div>
                            <Table headers={Object.keys(p)} personas={this.state.personas} editPersona={this.editPersona} 
                            deletePersona= {this.deletePersona}/>
                        </div>
                     </div>
                    </div>

            
            </div>
            
            
        );
    }
}

export default App;