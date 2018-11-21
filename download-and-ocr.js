var Tesseract = require('tesseract.js');
var request = require('request');
var fs = require('fs');
var url = 'https://vignette.wikia.nocookie.net/uncyclopedia/images/2/25/Receipt.jpg/revision/latest?cb=20090818184610';
var filename = 'pic.png';

var writeFile = fs.createWriteStream(filename); // Creates a local copy of the URL image

request(url).pipe(writeFile).on('close', function() {
    console.log(url, 'saved to', filename)
    Tesseract.recognize(filename)
        .progress(function(p) {
            console.log('progress', p)
        })
        .catch(err => console.error(err))
        .then(function(result) {
            console.log(result.text) // Prints the OCR results in the console
            fs.writeFileSync('result.txt', result.text) // Creates a text file with the OCR result
            process.exit(0)
        })
});