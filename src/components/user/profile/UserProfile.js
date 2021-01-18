import React from "react";

const UserProfile = () => {
  // const { username, email, firstName, lastName } = 1;

  // const renderEdit = () => {
  //   return <div>edit</div>;
  // };

  // const renderView = () => {
  //   return <div>view</div>;
  // };

  return (
    <div className='ui container'>
      <h1 className='ui header'>Profile</h1>
      <div className='ui divider'></div>
      <div className='ui content'>
        <div className='avatar'>
          <img
            className='ui left floated small circular image'
            src='https://semantic-ui.com/images/wireframe/square-image.png'
            alt=''></img>
        </div>
        <div className='ui two column relaxed grid'>
          <div className='column'>
            <div>First Name</div>
            <div>Last Name</div>
            <div>Username</div>
            <div>Email</div>
          </div>
          <div className='column'>
            <div>Jacob</div>
            <div>Miller</div>
            <div>jacobmiller22</div>
            <div>jacobmiller22@vt.edu</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
