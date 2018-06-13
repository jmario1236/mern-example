import React from 'react';

class Navbar extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand">CRUD Personas </a>
                <div className="collapse navbar-collapse">
                    <span className='user-title'>{this.props.userName}</span>
                </div>
            </nav>
        );
    }
}

export default Navbar;