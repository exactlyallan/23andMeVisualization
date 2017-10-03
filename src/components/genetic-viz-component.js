// Genetic-Viz Component

// Get the parsed data, probably a much better way to do this...
var dnAParser = require('../utility/dna-parser.js')
var visualizationDataSet = dnAParser.visualizationDataSet;


AFRAME.registerComponent('genetic-viz-component', {
  init: function () {
    console.log("genetic-viz got data: ", visualizationDataSet );
  },
  update: function (oldData) {
    var data = this.data;
    var el = this.el;

    console.log("el:", el, data)
    
    this.geometry = new THREE.PlaneBufferGeometry( 5, 20, 32 );
    this.material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    this.plane = new THREE.Mesh( this.geometry, this.material );
    
    el.setObject3D('plane', this.plane);


  },
  tick: function () {

  },
  remove: function () {

  },
  pause: function () {

  },
  play: function () {

  }
});

