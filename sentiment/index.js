// Include The 'require.async' Module
require("require.async")(require);

/**
 * Tokenizes an input string.
 *
 * @param {String} Input
 *
 * @return {Array}
 */
function tokenize (input) {
    return input
            .replace(/[^a-zA-Z ]+/g, "")
            .replace("/ {2,}/", " ")
            .toLowerCase()
            .split(" ");
}

/**
 * Performs sentiment analysis on the provided input "term".
 *
 * @param {String} Input term
 *
 * @return {Object}
 */
module.exports = function (term, callback) {
	// Split line term to letters only words array
	var words = tokenize(term || "");
	var score = 0;
	var word;
	var rate;
	var i;

	// Include the AFINN Dictionary JSON asynchronously
	require.async("./AFINN.json", function(afinn) {
		console.log("LOADED!!!");
		// Iterate through the words
		for (i = 0; i < words.length; i++) {
			word = words[i];
			
			// Get the word rate from the AFINN dictionary
			rate = afinn[word];
			if (rate) { 
				// Add current word rate to the final calculated sentiment score
				score += rate;
			}
		}
		
		setTimeout(function() {
			callback(null, score);
		}, 0);
	});
};
