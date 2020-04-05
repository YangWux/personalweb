
import React from 'react';
import ReactDOM from 'react-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import './style.css';
import Particle from './Component/Particle_Text';
import PDF from './Component/Resume.pdf'
import Arrow from './image.svg';
import Image from './Component/Particle_Image';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faFilePdf } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faCheckSquare, faFilePdf)


class Welcome extends React.Component {
onLeave(origin, destination, direction) {
    console.log('Leaving section ' + origin.index);
  }
  // eslint-disable-next-line space-before-function-paren
  afterLoad(origin, destination, direction) {
    console.log('After load: ' + destination.index);
  }
render(){
    return (
      <ReactFullpage
        anchors={['firstPage', 'secondPage']}
        sectionsColor={['#fdfeff', '#fdfeff']}
        scrollOverflow={false}
        navigation
        onLeave={this.onLeave.bind(this)}
        afterLoad={this.afterLoad.bind(this)}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage-wrapper">
              <div className="section ">
              <a href="https://github.com/YangWux" target="_blank" id="github" width = {50} height = {50}>
                   <FontAwesomeIcon icon={['fab','github']} size="2x" />
                </a>
                <a href={PDF}id="Resume" target="_blank" width = {50} height = {50}>
                  <FontAwesomeIcon icon="file-pdf"  size="2x"/>
                </a>
                <a href="https://www.linkedin.com/in/yang-wu-9233a3a8/" target="_blank" id="Linkedin" width = {50} height = {50}>
                 <FontAwesomeIcon icon={['fab','linkedin']}  size="2x"/>
                </a>
              <Particle />
                <button onClick={() => fullpageApi.moveSectionDown()}>
                  <Arrow id="svg" width = {50} height = {50} />
                </button>
              </div>
              <div className="section">
                <div className="section2">To Be Continue</div>
            
              
              </div>
            
            </div>
          );
        }}
      />
    );
  }
}
ReactDOM.render(<Welcome />, document.getElementById('root'));
