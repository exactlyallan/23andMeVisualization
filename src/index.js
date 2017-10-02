// Enable .html reloading for dev
require('./raw-index.html')

// Get Styles
require('./styles/app.scss')


// A-Frame Requried in Head, import components here
console.log("Starting Custom Aframe Code...")

require('./utility/dna-parser.js')

require('./components/genetic-viz-component.js')

