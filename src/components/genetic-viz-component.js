// Genetic-Viz Component

AFRAME.registerComponent('genetic-viz', {
  schema: {
    width: {type: 'number', default: 10},
    depth: {type: 'number', default: 10}
  },
  init: function () {
    var data = this.data
    var el = this.el
    
    console.log("genetic-viz Component inited!")

  },
  update: function (oldData) {

  	var data = this.data
  	var el = this.el

  

  },
  remove: function () {
    this.el.removeObject3D('mesh');
  },
  tick: function (time, timeDelta) {
    

   

  }
});

