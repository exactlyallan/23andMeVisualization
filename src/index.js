// Enable .html reloading for dev
require('./raw-index.html')

// Get Styles
require('./styles/app.scss')


// A-Frame Requried in Head, import components here
var DNAParse = require('./utility/dna-parser.js')
require('./components/genetic-viz-component.js')
require('aframe-animation-component')


// A-Frame requires head script injection, wait until DOM is loaded to do vanilla JS
// https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
document.addEventListener('DOMContentLoaded', readyToGo)


var dnaData = null;
// Loaded Wrapper
function readyToGo() {

	// Event listener on file load
	var input = document.querySelector('#upload-dna-data');
 	input.addEventListener('change', (event)=>{

 		// Load DNA input file 
 		DNAParse.papaFile(input, (dataFile)=>{
 			
 			// async update once loaded parsed data
 			dnaData = DNAParse.parseDNAfile(dataFile)

 			// build chrom selector
 			buildChromBTN()
 		})
 	})
};

// add chrom button nav
function buildChromBTN(){

	var chromBtn = document.querySelector('.chrom-button-wrap');

	// clear
	chromBtn.innerHTML = '';
	var sceneEl = document.querySelector('a-scene');
	var entityElold = document.querySelector('.chrom-viz');
    if(entityElold != null){
    	sceneEl.removeChild(entityElold)
    }



	// add button for each chrom
	for(var i=1; i<26; i++){

		var newEl = document.createElement('div');
		addClass(newEl, 'chrom-button')
		newEl.setAttribute('data-index', i);

		if(i === 23){
			newEl.innerHTML = 'XX'
		} else if(i === 24){
			newEl.innerHTML = 'YY'
		} else if(i === 25){
			newEl.innerHTML = 'MT'
		} else if(i <10){
			newEl.innerHTML = '0'+i;
		} else if(i>-10){
			newEl.innerHTML = i;
		}
	
		chromBtn.appendChild(newEl)

		// hide intro
		var intro = document.querySelector('.intro')
		addClass(intro, 'no-display')

		var status = document.querySelector('.chrom-stats')
		status.innerHTML = "Select chromosome..."

		// show buttons
		if (hasClass(chromBtn, 'zero-opacity')) removeClass(chromBtn, 'zero-opacity');

		// add click event
		newEl.addEventListener('click', (event)=>{

			var index = event.target.getAttribute('data-index')

			// remove high light
			var classList = document.getElementsByClassName('chrom-button');
			for (var i=0; i<classList.length; i++){
				if(hasClass(classList[i],'selected')){
					removeClass(classList[i],'selected')
				}
			}

			// add high light
			addClass(event.target,'selected')

			// show key
			var key = document.querySelector('.chrom-key-wrap')
			removeClass(key, 'zero-opacity')

			// build 3D
			buildChroms(dnaData, index)
		})

	}

}


// add genetic-viz-component entities to scene once data is loaded
function buildChroms(dnaData, chromNum) {

	console.log("Selected: ", chromNum)

    var sceneEl = document.querySelector('a-scene');

    // remove loading animation
    var loadingEl = sceneEl.querySelector('#loading3D')
    if (loadingEl) {
        sceneEl.removeChild(loadingEl)
    }

    // remove previous chrom
    var entityElold = document.querySelector('.chrom-viz');
    if(entityElold != null){
    	sceneEl.removeChild(entityElold)
    }

    // calc height to animate to
    var height = -(dnaData[chromNum].length/20) * 0.4 // NOTE: match values with genetic-viz-component col, but use SNP length not Chrom length
    var heightPos = '0 ' + height + ' 0'

    // calc how long it should take, min of 10 sec
    var timePos = Math.max(10000, -height * 70);

    // add selected chrom
   	var entityEl = document.createElement('a-entity');
   	addClass(entityEl, 'chrom-viz')
	entityEl.setAttribute('genetic-viz-component', {chromData: dnaData[chromNum]});
	entityEl.setAttribute('position', {x:0, y:-10, z:0})
	entityEl.setAttribute('animation', {property:'rotation', delay:'0', dur:'78000', to:'0 360 0', easing:'linear', loop:true})
	entityEl.setAttribute('animation__2', {property:'position', delay:'500', dur:timePos, to:heightPos, easing:'easeInOutSine', loop:true, dir:'alternate'})

	sceneEl.appendChild(entityEl);


}


// nav button class helpers
// https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
}


