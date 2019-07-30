import React from 'react';

class ProfileField extends React.Component {

  constructor(props){
    super(props);
    this.state=({
      userField: '',
      isFieldEditing: false,
      buffer: ''
    });

    this.switchToEdit = this.switchToEdit.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.changeInput = this.changeInput.bind(this);
  }
  componentDidMount(){
    this.setState({
      userField: this.props.value,
      buffer: this.props.value
    });
  }

  switchToEdit(){
    this.setState({
      isFieldEditing: true
    });
  }

  saveEdit(){
    this.setState({
      isFieldEditing: false,
      buffer: this.state.userField
    });
  }

  cancelEdit(){
    this.setState({
      isFieldEditing: false,
      userField: this.state.buffer
    });
  }


  renderInfo(){
    return(
      <div>
          <p className="ProfileField-values">{this.props.fieldName}: {this.state.userField} </p> 
          <i onClick={this.switchToEdit} className="fas fa-sm fa-pencil-alt FontAwesomeIcon"></i>
        </div>
    );
  }

  renderEditableInput(){
    return(
    <div> 
          <input value={this.state.userField} 
                 onChange = {this.changeInput}
                 className="ProfileField-input"/>
          <button onClick = {this.saveEdit} 
                  className = "ProfileField-button ProfileField-button-save">Save</button>
          <button onClick = {this.cancelEdit} 
                  className = "ProfileField-button ProfileField-button-cancel">Cancel</button>
    </div>);
  }

  changeInput(e){
    this.setState({
      userField: e.target.value
    });
  }

  render(){
    return(
      <div>
        {this.state.isFieldEditing? this.renderEditableInput() : this.renderInfo()}
        </div>
    )
  }
}

export default ProfileField;