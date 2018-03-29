
var allText = '';


for (var i = 0, len = data.length; i < len; i++) {

    if (data[i].caption === null) {
        // console.log("");
    } else {
        //console.log (allText[i].caption.text);
        split(data[i]);
    }
}

function split(element) {
    var oneText = element.caption.text + " ";
    allText += oneText
        .split(" ")
        .map(function (word) {
        return word.replace(/[, #:()]+/g, "").toLowerCase(); // this is to take symbls out eg:.replace(/[, #:()]+/g, "") you add them inside of []
    });

}


var arrayOfAllText = allText.split(","); // this is where we merge all the arrays, we r join then after the "," 


console.log(arrayOfAllText);

var wordsCount = {};

//wordsCount['berlin'] = 1;
arrayOfAllText.forEach(function(x) {
    //console.log(x);
    wordsCount[x] = ((wordsCount[x] || 0)+1) / arrayOfAllText.length; 
}); 



console.log(wordsCount);




//https://www.w3schools.com/jsref/jsref_regexp_exec.asp   /// is to find a word match
//function myFunction() {
// var str = "The best things in life are free";
//  var patt = new RegExp("e");
//  var res = patt.exec(str);
//  document.getElementById("demo").innerHTML = res;
//}
