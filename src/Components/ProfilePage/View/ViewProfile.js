import React from 'react';
import Header from '../../Header/Header.js';
import './ViewProfile.scss';
import Chart from '../../Chart/Chart.js';
import ProfileField from './ProfileField.js';

class ViewProfile extends React.Component {

  constructor(props){
    super(props);
    this.state=({
      userName: 'Vasya',
      userAge: 33,
      isNameEditing: false,
      isAgeEditing: false,
      buffer: ''
    });
  }

  render(){
    const data = this.props.wheels ? 
    this.props.wheels :
    {health: 1, finance: 30, career: 140, leisure: 20, relatives: 20},

     labelsList = Object.keys(data),
     series = Object.values(data).map(val => val*2),
     options = {
      labels: labelsList
    };

  return (
      <div>
        <Header />
        <div className="ProfilePage">
        <Chart options={options} series={series}/>
          <div className="infoColumn">
            <h1>My Wheel Of Life Profile</h1>
            <ProfileField fieldName='Name' value={this.state.userName}/>

            <ProfileField fieldName='Age' value={this.state.userAge}/>

            <ProfileField fieldName='Registration Date' value="3/3/2019"/>
            </div>
          </div>
        </div>
      

  );
}
}

export default ViewProfile;