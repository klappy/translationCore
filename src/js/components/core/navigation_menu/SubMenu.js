// SubMenu.js//
//api imports
const api = window.ModuleApi;
const React = api.React;
const ReactBootstrap = api.ReactBootstrap;
const CoreStore = require('../../../stores/CoreStore.js');
const SubMenuItem = require('./SubMenuItem');


class SubMenu extends React.Component {
  constructor(){
    super();
    this.currentCheckIndex = null;
    this.currentGroupIndex = null;
    this.updateSubMenuItem = this.updateSubMenuItem.bind(this);
    this.goToCheck = this.goToCheck.bind(this);
    this.goToNext = this.goToNext.bind(this);
    this.goToPrevious = this.goToPrevious.bind(this);
  }

  updateSubMenuItem(params){
    if(params){
      var menuItem = this.refs[params.groupIndex.toString() + ' ' + params.checkIndex.toString()];
      menuItem.getItemStatus(params.checkStatus);
    }
  }

  goToCheck(params) {
    this.unselectOldMenuItem();
    this.currentGroupIndex = params.groupIndex;
    this.currentCheckIndex = params.checkIndex;
    this.selectNewMenuItem();
  }

  goToNext(){
    let currentNamespace = CoreStore.getCurrentCheckNamespace();
    let groupName = api.getCurrentGroupName();
    let groups = api.getDataFromCheckStore(currentNamespace, 'groups');
    if(groups){
      let foundGroup = groups.find(arrayElement => arrayElement.group === groupName);
      this.unselectOldMenuItem();
      //if we need to move to the next group
      if (this.currentCheckIndex >= foundGroup.checks.length - 1) {
      // if we're not on the last group
        if (this.currentGroupIndex < foundGroup.length - 1) {
          this.currentGroupIndex++;
          this.currentCheckIndex = 0;
        }
      }else { // if we still have more in the group*/
      this.currentCheckIndex++;
      }
      this.selectNewMenuItem();
    }
  }

  goToPrevious() {
    let currentNamespace = CoreStore.getCurrentCheckNamespace();
    let groupName = api.getCurrentGroupName();
    let groups = api.getDataFromCheckStore(currentNamespace, 'groups');
    if(groups){
      let foundGroup = groups.find(arrayElement => arrayElement.group === groupName);
      this.unselectOldMenuItem();
      //if we need to move to the previous group
      if (this.currentCheckIndex <= 0) {
        //if we're not on the first group
        if (this.currentGroupIndex > 0) {
          this.currentGroupIndex--;
          this.currentCheckIndex = foundGroup.checks.length - 1;
        }
      }else {  //if we still have more in the group*/
        this.currentCheckIndex--;
      }
      this.selectNewMenuItem();
    }
  }

  selectNewMenuItem() {
    
    this.refs[`${this.currentGroupIndex} ${this.currentCheckIndex}`].setIsCurrentCheck(true);
  }

  render() {
    this.currentCheckIndex = this.props.currentCheckIndex;
    this.currentGroupIndex = this.props.currentGroupIndex;
    let subMenuItems = [];
    let currentNamespace = CoreStore.getCurrentCheckNamespace();
    let bookName = api.getDataFromCheckStore(currentNamespace, 'book');
    let groupIndex = api.getCurrentGroupIndex();
    if(groupIndex !== null){
      for(var i in this.props.subMenuItemsArray){
        const item = this.props.subMenuItemsArray[i];
        item.checkStatus = item.checkStatus || "UNCHECKED";
        item.isCurrentItem = item.isCurrentItem || false;
        subMenuItems.push(
          <SubMenuItem key={i} {...item} id={i} {...this.props.subMenuItemsProps}
            checkClicked={this.props.handleItemSelection}
            bookName={bookName}
            groupIndex={groupIndex}
            checkIndex={i}
            currentNamespace={currentNamespace}
            ref={groupIndex.toString() + ' ' + i.toString()}/>
        );
      }
    }
    return (
      <table>
        <tbody>
          {subMenuItems}
        </tbody>
      </table>
    );
  }
}

module.exports = SubMenu;
