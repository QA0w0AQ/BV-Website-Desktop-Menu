class ShapeOverlays {
  constructor(elm) {
    this.elm = elm;
    this.path = elm.querySelectorAll('path');
    this.numPoints = 2;
    this.duration = 600;
    this.delayPointsArray = [];
    this.delayPointsMax = 0;
    this.delayPerPath = 200;
    this.timeStart = Date.now();
    this.isOpened = false;
    this.isAnimating = false;
    this.isHas = false;
  }
  toggle() {
    this.isAnimating = true;
    for (var i = 0; i < this.numPoints; i++) {
      this.delayPointsArray[i] = 0;
    }
    if (this.isOpened === false) {
      this.open();
    } else {
      this.close();
    }
  }
  open() {
    this.isOpened = true;
    this.elm.classList.add('is-opened');
    this.timeStart = Date.now();
    this.renderLoop();
  }
  close() {
    this.isOpened = false;
    this.elm.classList.remove('is-opened');
    this.timeStart = Date.now();
    this.renderLoop();
  }
  updatePath(time) {
    const points = [];
    for (var i = 0; i < this.numPoints; i++) {
      const thisEase = this.isOpened ? 
                        (i == 1) ? ease.cubicOut : ease.cubicInOut:
                        (i == 1) ? ease.cubicInOut : ease.cubicOut;
      points[i] = thisEase(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1)) * 100
    }

    let str = '';
    str += (this.isOpened) ? `M 0 0 V ${points[0]} ` : `M 0 ${points[0]} `;
    for (var i = 0; i < this.numPoints - 1; i++) {
      const p = (i + 1) / (this.numPoints - 1) * 100;
      const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
      str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${points[i + 1]} `;
    }
    str += (this.isOpened) ? `V 0 H 0` : `V 100 H 0`;
    return str;
  }
  render() {
    if (this.isOpened) {
      for (var i = 0; i < this.path.length; i++) {
        this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
      }
    } else {
      for (var i = 0; i < this.path.length; i++) {
        this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
      }
    }
  }
  renderLoop() {
    this.render();
    if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
      requestAnimationFrame(() => {
        this.renderLoop();
      });
    }
    else {
      this.isAnimating = false;
    }
  }
}

(function() {
  const elmHamburger = document.querySelector('.hamburger');
  const gNavItems = document.querySelectorAll('.global-menu__item');
  const elmOverlay = document.querySelector('.shape-overlays');
  const overlay = new ShapeOverlays(elmOverlay);
  const contactlist = document.querySelector('.contacts-social-lists');
  const logo = document.querySelector('.logo');


  elmHamburger.addEventListener('click', () => {
    if (overlay.isAnimating) {
      return false;
    }
    overlay.toggle();
    if (overlay.isOpened === true) {
      elmHamburger.classList.add('is-opened-navi');
      for (var i = 0; i < gNavItems.length; i++) {
        gNavItems[i].classList.add('is-opened');
      }
      contactlist.setAttribute("style", "opacity:1");
      content.setAttribute("style", "opacity:1;");
      logo.setAttribute("style", "opacity:1;");
      menu__item.setAttribute("style", "opacity:1");
    } else {
      elmHamburger.classList.remove('is-opened-navi');
      for (var i = 0; i < gNavItems.length; i++) {
        gNavItems[i].classList.remove('is-opened');
      }
      contactlist.setAttribute("style", "opacity:0");
      logo.setAttribute("style", "opacity:0;");
      content.setAttribute("style", "opacity:0;");
      content.innerHTML=``;
    }

  });
}());

  const projects = document.querySelector('.menu__item-name.projects');
  const medias = document.querySelector('.menu__item-name.medias');
  const capabilities = document.querySelector('.menu__item-name.capabilities');
  const team = document.querySelector('.menu__item-name.team');
  const connect = document.querySelector('.menu__item-name.connect');
  const content = document.getElementById('case-content');
  const overShip = new ShapeOverlays(content);
  
  projects.addEventListener('click', () => {
      content.innerHTML = `<div class='box'>
      <div class='box1'>
        <span>Looper</span><sup style="color:#FFD93E">New</sup><br>
        <span>Arvin</span><sup>COMING SOON</sup><br>
        <span>Giggl</span><sup>COMING SOON</sup><br>
        <span>PritchArt</span><sup>COMING SOON</sup>
      </div>
      <div class='box2'>
        <span>Alpha Crypto</span><sup style="color:#03A6B4">New</sup><br>
        <span>Iraqi Souq</span><sup>COMING SOON</sup><br>
        <span>NextWave Girls</span><sup>COMING SOON</sup><br>
        <span>Kenergy Active</span><sup>COMING SOON</sup>
      </div>
      <div class='box3'>
        <span>Rent Your Ride</span><sup style="color:#F08064">New</sup><br>
        <span>Iungo Social</span><sup>COMING SOON</sup><br>
        <span>Kenergy Ventures</span><sup>COMING SOON</sup><br>
        <span>KenergyLabs</span><sup>COMING SOON</sup>
      </div>
      </div>`
  });

  medias.addEventListener('click', () => {content.innerHTML=``});
  capabilities.addEventListener('click', () => {content.innerHTML=``});
  team.addEventListener('click', () => {content.innerHTML=``});
  connect.addEventListener('click', () => {content.innerHTML=``});

// @media
var x = window.matchMedia("(max-width: 450px)")
const c  = document.getElementById('case-content');
c.innerHTML="";
const menu__item = document.querySelector('.global-menu__wrap');
x.addListener(myFunction);
myFunction(x);
function myFunction(x) {
  if (x.matches) { // If media query matches
    projects.addEventListener('click', ()=>{
      menu__item.setAttribute("style", "opacity:0;");
      c.innerHTML=`<div class='newbox'>
      <div class='box1'>
        <span>Looper</span><sup style="color:#FFD93E">New</sup><br>
        <span>Rent Your Ride</span><sup style="color:#F08064">New</sup><br>    
        <span>Alpha Crypto</span><sup style="color:#03A6B4">New</sup><br>
        <span>PritchArt</span><sup>COMING SOON</sup>
      </div>
      <div class='box2'>
        <span>Giggl</span><sup>COMING SOON</sup><br
        <span>Iraqi Souq</span><sup>COMING SOON</sup><br>
        <span>NextWave Girls</span><sup>COMING SOON</sup><br>
        <span>Kenergy Active</span><sup>COMING SOON</sup>
      </div>
      <div class='box3'>    
      <span>Arvin</span><sup>COMING SOON</sup><br>   
        <span>Iungo Social</span><sup>COMING SOON</sup><br>
        <span>Kenergy Ventures</span><sup>COMING SOON</sup><br>
        <span>KenergyLabs</span><sup>COMING SOON</sup>
      </div>
      </div>`
    })
  } 
}


