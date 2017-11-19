import React, { Component } from 'react';
import './App.css';
import {addUser, getUser, hapususer} from './actions/index'
import {connect} from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inpurl: '',
      inpusername: '',
      inppassword: ''
    }
    this.changeUrl = this.changeUrl.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);

    this.pushtodatabase = this.pushtodatabase.bind(this);
  }

  componentWillMount () {
    this.props.getUser()
  }

  changeUrl (event) {
    this.setState({inpurl: event.target.value});
  }

  changeUsername (event) {
    this.setState({inpusername: event.target.value});
  }

  changePassword (event) {
    this.setState({inppassword: event.target.value});
  }

  setDefauld (event) {
    this.setState({
      inppassword: '',
      inpusername: '',
      inpurl: ''
    });
  }

  tanggal (date) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }


  pushtodatabase (event) {
    let obj = {
      url: this.state.inpurl,
      username: this.state.inpusername,
      password: this.state.inppassword,
      createat: this.tanggal(new Date()),
      editedat: this.tanggal(new Date())
    }
    this.props.addUser(obj)
    console.log(obj)
    this.setDefauld()
    event.preventDefault();
  }

  hapus (id) {
    console.log('makan');
    this.props.hapususer(id)
  }

  render() {
    console.log('dirumah', this.props.usersuccessget)
    return (
      <div className="App">
      <div className="container">

        <form className="form-horizontal" onSubmit={this.pushtodatabase}>
          <div className="form-group">
            <label htmlFor="inpurl" className="col-sm-2 control-label">Input Url</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inpurl" value={this.state.inpurl} onChange={this.changeUrl}></input>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inpusername" className="col-sm-2 control-label">Username</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inpusername" value={this.state.inpusername} onChange={this.changeUsername}></input>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inppassword" className="col-sm-2 control-label">Password</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inppassword"  value={this.state.inppassword} onChange={this.changePassword}></input>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <input type="submit" value="Submit" />
            </div>
          </div>
        </form>


        <table className="table table-hover">
        <thead>
          <tr>
          <th>Url</th>
          <th>Username</th>
          <th>Password</th>
          <th>Tanggal Daftar</th>
          <th>tanggal Edit</th>
          <th>Edit</th>
          <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {this.props.usersuccessget.map((data, index)=> {
            return(
              <tr>
              <td><a href={data.url}>{data.url}</a></td>
              <td>{data.username}</td>
              <td>{data.password}</td>
              <td>{data.createat}</td>
              <td>{data.editedat}</td>
              <td>Edit</td>
              <td><a href="#"><p onClick={()=> this.hapus(data.id)}>Delete</p></a></td>
              </tr>
            )
          })}
        </tbody>
        </table>



      </div>
      </div>
    );
  }
}

const mapState = state => {
  // console.log(state.usersuccessget.usersuccessget.key)
  return {
    usersuccessget: state.usersuccessget.usersuccessget
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (obj) => dispatch(addUser(obj)),
    getUser: () => dispatch(getUser()),
    hapususer: (id) => dispatch(hapususer(id))
  }
}

const app = connect(
  mapState,
  mapDispatchToProps
)(App)

export default app;
