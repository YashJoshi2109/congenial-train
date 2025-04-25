import React, { Component, Fragment }  from 'react';

export default class MusicianAdmin extends Component {

  state = {
    isEditMode: false,
    updatedFirstName: this.props.firstname,
    updatedLastName: this.props.lastname
  }

  handleMusicianEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateMusician(this.props.id, this.state.updatedFirstName, this.state.updatedLastName);
  }

  onAddMusicianFirstNameChange = event => this.setState({ "updatedFirstName": event.target.value });
  onAddMusicianLastNameChange = event => this.setState({ "updatedLastName": event.target.value });

  render() {
    return (
        <div className="box musician-card notification is-success">
          {
            this.props.isAdmin && 
            <Fragment>
              <button onClick={event => this.props.handleDeleteMusician(this.props.id, event)} className="delete"></button>
            </Fragment>
          }
          {
            this.state.isEditMode 
            ? <div>
                <p>Edit musician name</p>
                <input 
                  className="input is-medium"
                  type="text" 
                  placeholder="Enter first name"
                  value={this.state.updatedFirstName}
                  onChange={this.onAddMusicianFirstNameChange}
                />
                <input 
                  className="input is-medium"
                  type="text" 
                  placeholder="Enter last name"
                  value={this.state.updatedLastName}
                  onChange={this.onAddMusicianLastNameChange}
                />
                <p className="musician-id">id: { this.props.id }</p>
                <button type="submit" 
                  className="button is-info is-small"
                  onClick={ this.handleEditSave }
                >save</button>
              </div>
            : <div>
                <p className="musician-title">{this.props.firstname } {this.props.lastname }</p>
                <p className="musician-id">genre: { this.props.genre }</p>
              </div>
          }
      </div>
    )
  }
}
