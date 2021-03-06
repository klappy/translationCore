import React from 'react';
import ToolDescription from './ToolDescription';

class SwitchCheck extends React.Component {

  render() {
    let { toolsMetadata } = this.props;
    let buttons = [];
    if (toolsMetadata.length == 0 ) {
      return (
          <div style={{backgroundColor: "var(--reverse-color)", textAlign: "center", verticalAlign: "middle", height: "520px"}}>No tC default tools found.</div>
      );
    } else if (!this.props.projectSaveLocation || !this.props.manifest) {
      return (
      <div style={{backgroundColor: "var(--reverse-color)", padding: "10px", height: "520px"}}>
        <h3 style={{marginTop: "0px", textAlign: 'center', fontWeight: 'bold', padding: '55px 0'}}>
          Please <span onClick={this.props.showLoad} style={{cursor: 'pointer', color: 'var(--accent-color)'}}>
          load a project </span> before choosing a tool
        </h3>
      </div>
      );
    } else {
      for (let i in toolsMetadata) {
        const metadata = toolsMetadata[i];
        if (metadata.title == "translationWords (Part 1)") {
          buttons.push(<ToolDescription key={i} metadata={metadata} {...this.props} />);
        }
      }
    }
    return (
      <div style={{backgroundColor: "var(--reverse-color)", padding: "10px", height: "520px", overflowY: "auto"}}>
          {buttons}
      </div>
    );
  }
}

export default SwitchCheck;
