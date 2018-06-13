import React from 'react';

class Table extends React.Component {
    constructor(){
        super();
    }
    render(){
        return(
            <table className="table">
                <thead>
                    <tr>
                        { this.props.headers.map((header) => {
                            return (<th>{header}</th>);
                        }) }
                    </tr>
                </thead>
                <tbody>
                    { this.props.personas.map((persona) => {
                        return(
                            <tr key={persona._id}>
                                <td>{persona.name}</td>
                                <td>{persona.lastname}</td>
                                <td>{persona.phone}</td>
                                <td>
                                    <button className="btn btn-primary my-1 mx-3" onClick={() => {this.props.editPersona(persona._id)}}>Edit</button>
                                    <button className="btn btn-danger my-1 mx-3" onClick={() => {this.props.deletePersona(persona._id)}}>Remove</button>
                                </td>
                            </tr>
                        );
                    })  }
                </tbody>
            </table>
        );
    };
}

export default Table;