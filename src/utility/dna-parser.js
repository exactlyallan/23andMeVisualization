// DNA parser
// For 23andMe raw data text file
// https://customercare.23andme.com/hc/en-us/articles/212196868-Accessing-and-Downloading-Your-Raw-Data


// Global dataset
var visualizationDataSet = [];

// https://en.wikipedia.org/wiki/Human_genome
// 0 index spacer, 1-22,X,Y,MT
var totalBPlist = [0, 248956422, 242193529, 198295559, 190214555, 181538259, 170805979, 159345973, 145138636, 138394717, 133797422, 135086622, 133275309, 114364328, 107043718, 101991189, 90338345, 83257441, 80373285, 58617616, 64444167, 46709983, 50818468, 156040895, 57227415, 16569]


// Load DNA file via http://papaparse.com/
var Papa = require('papaparse')

// A-Frame requires head script injection, wait until DOM is loaded to do vanilla JS
// https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
document.addEventListener('DOMContentLoaded', readyToGo)


// Loaded Wrapper
function readyToGo() {

    var input = document.querySelector('#upload-dna-data');
    input.addEventListener('change', getDNAdata);

    // Papa parse file
    function getDNAdata() {
        // if file selected
        if (input.files.length > 0) {

            // Should work with default 23andme downloaded .txt file!
            Papa.parse(input.files[0], {
                delimiter: "	", // tab
                newline: "", // auto-detect
                quoteChar: '"',
                comments: "#",
                header: false,
                skipEmptyLines: true,
                error: function(err, file, inputElem, reason) {
                    console.log("File loading error:", err, reason)

                },
                complete: function(results) {
                    console.log("File loaded: ", results);
                    parseDNA(results.data)
                }
            })
        }

    }

    // Map parsed results to array useable for viz
    // ["rs529520", "1", "29174946", "AA"]
    function parseDNA(rawData) {

        // create array of chromosome array of objects 
        totalBPlist.forEach(function(d, i) {
            visualizationDataSet.push([])
        })

        // parse to visualizationDataSet
        var prevValue = 0;
        var prevChrom = 0;
        rawData.forEach(function(d, i) {

            var curValue = parseInt(d[2])
            var curChrom = 0;

            // parse X / Y / MT as index
            if (parseInt(d[1]) <= 22) {
                curChrom = parseInt(d[1])

            } else if (d[1] == 'X' || d[1] == 'x') {
                curChrom = 23

            } else if ([d[1]] == 'Y' || d[1] == 'y') {
                curChrom = 24

            } else if (d[1] == 'MT' || d[1] == 'mt') {
                curChrom = 25
            } else {
                // error dump
                curChrom = 0;
            }

            // reset gap count on new Chrom
            if (curChrom != prevChrom) {
                prevChrom = curChrom;
                prevValue = 0;
            }

            var obj = {
                gap: curValue - prevValue,
                id: d[0],
                pos: d[2],
                chrom: d[1],
                value: d[3]
            }


            visualizationDataSet[curChrom].push(obj)

            // update prev value
            prevValue = parseInt(d[2])

        })

        // init viz component
        addEntity()

    }

}; // end loaded wrapper


// add genetic-viz-component entity to scene once data is loaded
function addEntity() {

    var sceneEl = document.querySelector('a-scene');

    // remove loading animation
    var loadingEl = sceneEl.querySelector('#loading3D')
    if (loadingEl) {
        sceneEl.removeChild(loadingEl)
    }


    // add dan viz
    var entityEl = document.createElement('a-entity');
    entityEl.setAttribute('genetic-viz-component', '');
    sceneEl.appendChild(entityEl);


}

module.exports.visualizationDataSet = visualizationDataSet;
