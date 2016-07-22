const React = require('react');
const FormGroup = require('react-bootstrap/lib/FormGroup.js');
const FormControl = require('react-bootstrap/lib/FormControl.js');
const Button = require('react-bootstrap/lib/Button.js');
const Modal = require('react-bootstrap/lib/Modal.js');
const ControlLabel = require('react-bootstrap/lib/ControlLabel.js');
const ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar.js');
const remote = window.electron.remote;
const ENTER = 13;
const path = require('path');
const {dialog} = remote;

const bookMap = require('../BooksOfBible');

const ProjectName = React.createClass({
  getInitialState: function() {
    return {
      projectName:this.props.projectName,
      saveLocation: ''
    }
  },
  setProjectName: function (e) {
    this.setState({
      projectname: e.target.value
    });
    if (e.charCode == ENTER) {
    }
  },
  sendBackSaveLocation: function() {
    var _this = this;
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, function(filename) {
      if (filename !== undefined) {
        // FileImport(filename[0]);
        _this.setState({saveLocation: path.join(filename[0], _this.state.projectname)});
        _this.props.passBack(path.join(filename[0], _this.state.projectname));
      }
    });
  },

  setBookName: function(e) {
    this.value = e.target.value;
  },

  getBookName: function() {
    if (!this.value) {
      console.error("We can't find the value for the book abbr!");
    }
    else {
      var bookName = this.value;
      var bookAbbr = this.getBookAbbr(bookName);
      if (bookAbbr) {
        return bookAbbr;
      }
    }
  },

  getBookAbbr: function(bookName) {
    for (var key in bookMap) {
      if (bookName.toLowerCase() == bookMap[key].toLowerCase() || bookName.toLowerCase() == key) {
        return key;
      }
    }
    return null;
  },

  render: function() {
    return (
      <div>
      <Modal.Header>
      <Modal.Title>{this.props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <FormGroup>
      <ControlLabel>Enter Project Name</ControlLabel>
      <FormControl type="text" placeholder={"John 1 Jay Scott"} onChange={this.setProjectName} />
      </FormGroup>
      <FormGroup>
      <ControlLabel>Enter Book Name</ControlLabel>
      <FormControl type="text" placeholder={"2 Timothy"} onChange={this.setBookName} />
      </FormGroup>
      <div>
      <Button onClick={this.sendBackSaveLocation}>Choose Save Location</Button>
      <ControlLabel>{this.state.saveLocation}</ControlLabel>

      </div>
      </Modal.Body>
      </div>
    )}
});
module.exports = ProjectName;