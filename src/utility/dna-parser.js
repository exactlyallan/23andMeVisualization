// DNA parser
// For 23andMe raw data text file
// https://customercare.23andme.com/hc/en-us/articles/212196868-Accessing-and-Downloading-Your-Raw-Data


// Load DNA file via http://papaparse.com/
var Papa = require('papaparse')


// https://www.ncbi.nlm.nih.gov/grc/human/data?asm=GRCh37.p13
// 0 index spacer, 1-22,X,Y,MT
var totalBPlist = [0, 249250621, 243199373, 198022430, 191154276, 180915260, 171115067, 159138663, 146364022, 141213431, 135534747, 135006516, 133851895, 115169878, 107349540, 102531392, 90354753, 81195210, 78077248, 59128983, 63025520, 48129895, 51304566, 155270560, 59373566, 16569]


// Papa parse file
var papaFile = function(input, callback) {
    // if file selected
    if (input.files.length > 0) {

    	var status = document.querySelector('.chrom-stats')
		status.innerHTML = "Loading Data..."

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
                callback( null )
            },
            complete: function(results) {
                console.log("File loaded: ", results);
               	callback( results.data )
            }
        })
    }


}

// Map parsed results to array useable for viz
// ["rs529520", "1", "29174946", "AA"]
var parseDNAfile = function(rawData) {

	// if error 
	if(rawData === null){
		return (null)
	}

    var allChromData = [[]]; // need inital blank array to offset 1 chrom index
    var prevPos = 0;
    var prevChrom = 0;
    var curPos = 0;
    var curChrom = 0;

    for (var i = 0; i < rawData.length; i++) {

        var d = rawData[i];

        curPos = parseInt(d[2])
        curChrom = 0;

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

        // reset gap count on new Chrom, get end gap, and add new array
        if (curChrom != prevChrom) {

            // calc end gap
            var objGap = {
                gap: (totalBPlist[prevChrom] - prevPos), // get last gap from BPtotal
                id: null,
                pos: null,
                chrom: null,
                value: null
            }

            // add end gap
            allChromData[prevChrom].push(objGap)

            prevChrom = curChrom;
            prevPos = 0;

            // add new array
            allChromData.push([])
        }

        var obj = {
            gap: curPos - prevPos,
            id: d[0],
            pos: d[2],
            chrom: d[1],
            value: d[3]
        }

        // add SNP to chrom
        allChromData[curChrom].push(obj)


        // update previous to current
        prevChrom = curChrom;
        prevPos = curPos;

    }

    return (allChromData)

}


// export
module.exports = {
	papaFile: papaFile,
	parseDNAfile: parseDNAfile
}


