

/*
By: felix menard, iplanwebsites.com
nov 2011 
(c) 
*/


////////////////////////////////
//   Basic Config
/////////////////////////////


var volume = 1;// float, vary from 0 to 1;
baseFreq = 440; // middle A frequency, in hz
musicScale = 12; //chromatic 12-note pattern
freqRatio  = Math.pow(2, 1/musicScale);  //multiplier of half-tones //returns maginc number : 1.0594630943593



keyNotes = {
  "1": -24,
  "2": -27,
  "3": -30,
  "4": -34,
  "5": -32,
  "6": -36,
  "7": -24,
  "8": -22,
  "9": -18,
  "0": -14,
  "q": -12,
  "w": -9,
  "e": -8,
  "r": -6,
  "t": -5,
  "y": -4,
  "u": -2,
  "i": 0,
  "o": 2,
  "p": 3,
  "a": 0,
  "s": 7,
  "d": 8,
  "f": 9,
  "g": 12,
  "h": 14,
  "j": 15,
  "k": 24,
  "l": 29,
  "z": 36,
  "x": 37,
  "c": 38,
  "v": 39,
  "b": 40,
  "n": 44,
  "m": 48
}




$(document).ready(function() {

////////////////////////////////
//   KEYBOARD Styles and functions
/////////////////////////////

$(window).keydown(function(e) {
    key = (e.keyCode) ? e.keyCode : e.which;
    $('.key.c' + key).addClass('keydown');
    console.log(key);
});

$(window).keyup(function(e) {
    key = (e.keyCode) ? e.keyCode : e.which;
    $('.key.c' + key).removeClass('keydown');
});


$('a.key').mousedown(function(){
  var c= $(this).text();
  alert
  keySound(c);
});

$(document).keypress(function(e) {
  //if(count){ a.stop(); }
  if ( e.which == 13 ) { //enter...
     event.preventDefault();
   }else if(e.which == 32 ){ //spacebar
     //TODO: Stop All audio!
     a.stop();
   }else{
  var c = String.fromCharCode(e.which);//alert(c +" - " + e.which);
  keySound(c);
  }
});


}); //eo doc ready...




function keySound(c){
  var note = keyNotes[c.toLowerCase()];
  if (c == c.toLowerCase()){
    // The character is lowercase
    var shape = 'sine';
  }else{
    // The character is uppercase
    var shape = 'square';
  }
  a = buildSound(note, shape);
  a.play();
}



////////////////////////////////
//   Sound-building
/////////////////////////////

function buildSound(note, shape){
  var waveShape = shape; // square, sin, tri, or swa
  var rndtone = 4+ Math.round(3 * Math.random()); //5 = default
  var sine = []; 
  var freq = getFreq(note) /baseFreq;
  freq = freq * 44.1; // !!! MAGIC NUMBER, arbitrary, I don't know what is the multiplier for 44khz... guessed...


  var vol = volume *255 /2;
  noiseLvl = 0; //1; // peut varier de 0, 0.01, à 20 (après ça ce n'Est que du white-noise)
  if(Math.random()*10 > 7){ //we adda bit of  noise on some instances...
    noiseLvl = Math.random()*0.05;
  }
  for (var i=0; i<50000; i++) {
      noiseRnd =  (Math.random()*noiseLvl) - (noiseLvl /2); //on ajoute ou soustrait une valeur au hasard
      val = vol+(vol*Math.sin(i * (1/ freq )+noiseRnd )); // 128+(127*Math.sin(i / 5));
      if(waveShape == 'square'){
        val = Math.round(val/255)*255;
      }

      sine[i] = Math.round(val);
      //160 = low
      // 40 = middle
      // 5 = high pitch
      // donc inversement proportionel à la Fre reelegf
        // SIN returns -127 to 127, so we have a full, 255 (one bit) Amplitude (volume) of sound
  }
  sine[0]=0; //avoid pops? 
  sine[sine.length-3] = 0;
  sine[sine.length-2] = 0;
  sine[sine.length-1] = 0;
   sine[sine.length] = 0;
  
   var wave2 = new RIFFWAVE();
  wave2.header.sampleRate = 44100; // set sample rate to 44KHz
 // wave5.header.numChannels = 1; // two channels (stereo)
  //wave2.header.bitsPerSample = 16;
  wave2.Make(sine);
  var audio2 = new Audio(wave2.dataURI);
  audio2.loop=0;

  return audio2;
  
  
  
}


////////////////////////////////
//   UTILS
/////////////////////////////


function getFreq(noteDiff){
  //This function return a note frequency based on the number of half-tone increments received (-100 to 100)
  noteDiff = noteDiff * -1; //twisted way to have them vary the other way around...
  // !! NASTY
  var freqDiff = Math.pow(freqRatio, noteDiff);
  var newFreq = freqDiff * baseFreq;
  return newFreq;
}

