import _ from 'lodash';
import './style.css';
import Icon from './icon.svg';
import Home from './views/home'

function component() {
    const element = document.createElement('div');
  
    element.innerHTML = Home();
    element.classList.add('container');
  
    return element;
  }
  
  document.body.appendChild(component());