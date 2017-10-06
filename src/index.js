// Enable .html reloading for dev
require('./raw-index.html')

// Get Styles
require('./styles/app.scss')


// A-Frame Requried in Head, import components here
var DNAParse = require('./utility/dna-parser.js')

require('./components/genetic-viz-component.js')


// A-Frame requires head script injection, wait until DOM is loaded to do vanilla JS
// https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
document.addEventListener('DOMContentLoaded', readyToGo)


// Loaded Wrapper
function readyToGo() {

	// Event listener on file load
	var input = document.querySelector('#upload-dna-data');
 	input.addEventListener('change', (event)=>{

 		// Load DNA input file 
 		DNAParse.papaFile(input, (dataFile)=>{
 			// async once loaded parse
 			var dnaData = DNAParse.parseDNAfile(dataFile)

 			buildChroms(dnaData, 1)

 		})
 		
 	});



}


// add genetic-viz-component entities to scene once data is loaded
function buildChroms(dnaData, chromNum) {

    var sceneEl = document.querySelector('a-scene');

    // remove loading animation
    var loadingEl = sceneEl.querySelector('#loading3D')
    if (loadingEl) {
        sceneEl.removeChild(loadingEl)
    }

    // NOTE: only load 1 chromosome at a time, too large for browser to handle! 
	var entityEl = document.createElement('a-entity');
	entityEl.setAttribute('genetic-viz-component', {chromData: dnaData[chromNum]});
	entityEl.setAttribute('position', {x:0, y:0, z:0})
	//entityEl.setAttribute('animation', {property: 'rotation', dur:'2000', to:'0 360 0', repeat:'indefinite', fill:'forwards'})

	sceneEl.appendChild(entityEl);


}



