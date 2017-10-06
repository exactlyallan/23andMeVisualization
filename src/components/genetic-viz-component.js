// Genetic-Viz Component

AFRAME.registerComponent('genetic-viz-component', {
  schema: {
    chromData: {type: 'array'}
  },
  init: function () {
    // just update
    console.log("genetic-viz-component init")

  },
  update: function (oldData) {
    var data = this.data.chromData;
    var el = this.el;
    var dataLength = data.length // full chrom length

    console.log("chrom data length:", data.length)
    // {gap: 18674, id: "rs10195681", pos: "18674", chrom: "2", value: "CC"}
    // AA GG TT CC (4)
    // AG AT AC A (1)
    // GA GT GC G (1)
    // TA TG TC T (1)
    // CA CG CT C (1)
    // Other (1)
    // Gap (1) TBD

    var radius = 20 // ring radius
    
    this.geometryAA = new THREE.Geometry()
    this.geometryGG = new THREE.Geometry()
    this.geometryTT = new THREE.Geometry()
    this.geometryCC = new THREE.Geometry()
    this.geometryA = new THREE.Geometry()
    this.geometryG = new THREE.Geometry()
    this.geometryT = new THREE.Geometry()
    this.geometryC = new THREE.Geometry()
    this.geometryOther = new THREE.Geometry()

    for(var j=0; j<dataLength; j++){

      var value = data[j].value
      var gap = data[j].gap

      var lineLength = 3;

      var theta = ((2*Math.PI)/radius) * 0.1 //  spaces increments
      var posX1 = radius * Math.cos(theta * (j+gap))
      var posZ1 = radius * Math.sin(theta * (j+gap))
      var posX2 = (radius + lineLength) * Math.cos(theta * (j+gap))
      var posZ2 = (radius + lineLength) * Math.sin(theta * (j+gap))
      var posY = radius/(dataLength *0.1) * (j+gap) // spiral height
      
      var vertexAA1 = new THREE.Vector3()
      var vertexAA2 = new THREE.Vector3()

      var vertexGG1 = new THREE.Vector3()
      var vertexGG2 = new THREE.Vector3()

      var vertexTT1 = new THREE.Vector3()
      var vertexTT2 = new THREE.Vector3()

      var vertexCC1 = new THREE.Vector3()
      var vertexCC2 = new THREE.Vector3()

      var vertexA1 = new THREE.Vector3()
      var vertexA2 = new THREE.Vector3()

      var vertexG1 = new THREE.Vector3()
      var vertexG2 = new THREE.Vector3()

      var vertexT1 = new THREE.Vector3()
      var vertexT2 = new THREE.Vector3()

      var vertexC1 = new THREE.Vector3()
      var vertexC2 = new THREE.Vector3()

      var vertexOther1 = new THREE.Vector3()
      var vertexOther2 = new THREE.Vector3()

      var vertexGap = new THREE.Vector3()


      // add value lines
      if(value == 'AA'){

        vertexAA1.x = posX1
        vertexAA1.y = posY
        vertexAA1.z = posZ1

        vertexAA2.x = posX2
        vertexAA2.y = posY
        vertexAA2.z = posZ2

        this.geometryAA.vertices.push( vertexAA1 );
        this.geometryAA.vertices.push( vertexAA2 );

      } else if(value == 'GG'){

        vertexGG1.x = posX1
        vertexGG1.y = posY
        vertexGG1.z = posZ1

        vertexGG2.x = posX2
        vertexGG2.y = posY
        vertexGG2.z = posZ2

        this.geometryGG.vertices.push( vertexGG1 );
        this.geometryGG.vertices.push( vertexGG2 );

      } else if(value == 'TT'){

        vertexTT1.x = posX1
        vertexTT1.y = posY
        vertexTT1.z = posZ1

        vertexTT2.x = posX2
        vertexTT2.y = posY
        vertexTT2.z = posZ2

        this.geometryTT.vertices.push( vertexTT1 );
        this.geometryTT.vertices.push( vertexTT2 );

      } else if(value == 'CC'){

        vertexCC1.x = posX1
        vertexCC1.y = posY
        vertexCC1.z = posZ1

        vertexCC2.x = posX2
        vertexCC2.y = posY
        vertexCC2.z = posZ2

        this.geometryCC.vertices.push( vertexCC1 );
        this.geometryCC.vertices.push( vertexCC2 );

      } else if(value == 'AG' || value == 'AT' || value == 'AC' || value == 'A' ){

        vertexA1.x = posX1
        vertexA1.y = posY
        vertexA1.z = posZ1

        vertexA2.x = posX2
        vertexA2.y = posY
        vertexA2.z = posZ2

        this.geometryA.vertices.push( vertexA1 );
        this.geometryA.vertices.push( vertexA2 );

      } else if(value == 'GA' || value == 'GT' || value == 'GC' || value == 'G' ){

        vertexG1.x = posX1
        vertexG1.y = posY
        vertexG1.z = posZ1

        vertexG2.x = posX2
        vertexG2.y = posY
        vertexG2.z = posZ2

        this.geometryG.vertices.push( vertexG1 );
        this.geometryG.vertices.push( vertexG2 );

      } else if(value == 'TA' || value == 'TG' || value == 'TC' || value == 'T' ){

        vertexT1.x = posX1
        vertexT1.y = posY
        vertexT1.z = posZ1

        vertexT2.x = posX2
        vertexT2.y = posY
        vertexT2.z = posZ2

        this.geometryT.vertices.push( vertexT1 );
        this.geometryT.vertices.push( vertexT2 );

      } else if(value == 'CA' || value == 'CG' || value == 'CT' || value == 'C' ){

        vertexC1.x = posX1
        vertexC1.y = posY
        vertexC1.z = posZ1

        vertexC2.x = posX2
        vertexC2.y = posY
        vertexC2.z = posZ2

        this.geometryC.vertices.push( vertexC1 );
        this.geometryC.vertices.push( vertexC2 );

      } else {

        vertexOther1.x = posX1
        vertexOther1.y = posY
        vertexOther1.z = posZ1

        vertexOther2.x = posX2
        vertexOther2.y = posY
        vertexOther2.z = posZ2

        this.geometryOther.vertices.push( vertexOther1 );
        this.geometryOther.vertices.push( vertexOther2 );

      }


  
    } // end for loop


    // AA
    this.materialAA = new THREE.LineBasicMaterial( {color: 0x425dbf});
    this.lineAA = new THREE.LineSegments( this.geometryAA, this.materialAA )
    el.setObject3D('AALines', this.lineAA)  

    // GG
    this.materialGG = new THREE.LineBasicMaterial( {color: 0x3595d6});
    this.lineGG = new THREE.LineSegments( this.geometryGG, this.materialGG )
    el.setObject3D('GGLines', this.lineGG)  

    // TT
    this.materialTT = new THREE.LineBasicMaterial( {color: 0x0e9c9c});
    this.lineTT = new THREE.LineSegments( this.geometryTT, this.materialTT )
    el.setObject3D('TTLines', this.lineTT)  

    // CC
    this.materialCC = new THREE.LineBasicMaterial( {color: 0x3ba510});
    this.lineCC = new THREE.LineSegments( this.geometryCC, this.materialCC )
    el.setObject3D('CCLines', this.lineCC)

    // A
    this.materialA = new THREE.LineBasicMaterial( {color: 0x92c746});
    this.lineA = new THREE.LineSegments( this.geometryA, this.materialA )
    el.setObject3D('ALines', this.lineA)

    // G
    this.materialG = new THREE.LineBasicMaterial( {color: 0xf2c100});
    this.lineG = new THREE.LineSegments( this.geometryG, this.materialG )
    el.setObject3D('GLines', this.lineG)
  
    // T
    this.materialT = new THREE.LineBasicMaterial( {color: 0xff6d19});
    this.lineT = new THREE.LineSegments( this.geometryT, this.materialT )
    el.setObject3D('TLines', this.lineT)  

     // C
    this.materialC = new THREE.LineBasicMaterial( {color: 0x9f0f7b});
    this.lineC = new THREE.LineSegments( this.geometryC, this.materialC )
    el.setObject3D('CLines', this.lineC)

    // Other
    this.materialOther = new THREE.LineBasicMaterial( {color: 0x4a1672});
    this.lineOther = new THREE.LineSegments( this.geometryOther, this.materialOther )
    el.setObject3D('lineOther', this.lineOther)



  },
  tick: function () {

  },
  remove: function () {
    var el = this.el;
    el.parentNode.removeChild(el);
  },
  pause: function () {

  },
  play: function () {

  }
});

