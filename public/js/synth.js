

/*
By: felix menard, iplanwebsites.com
nov 2011 
(c) 
*/


////////////////////////////////
//   Basic Config
/////////////////////////////


// var volume = 1;// float, vary from 0 to 1;
baseFreq = 440; // middle A4 frequency, in hz 
musicScale = 12; //chromatic 12-note pattern
freqRatio  = Math.pow(2, 1/musicScale);  //multiplier of half-tones //returns maginc number : 1.0594630943593 (for 12 scale)
noteDuration = 0.9 //sec // is calculated precisely wiht the tempo...
tempo = 120;
keyDuration = 5; //from 1 - 10

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


scales= {
  "major": { //white keys ratios to one another, one line per octave.
    "q": 0,   "w": 2,  "e": 4,  "r": 5,  "t": 7,  "y": 9, "u": 11, "i": 12, "o": 14, "p": 16,
    "a": 12, "s": 14, "d": 16, "f": 17, "g": 19, "h": 21, "j": 23, "k": 24, "l": 26,
    "z": 24, "x": 26, "c": 28, "v": 29, "b": 31, "n": 33, "m": 35
  }};


myscale_ratios = [ 
{ ratios : [2,2,1,2,2,2,1], name: 'Major'},
 { ratios : [2,1,2,2,2,2,1],
	 name: 'Minor'},
{  ratios : [2,1,2,2,1,3,1],
	 name: 'Harmonic Minor'},
 { ratios : [2,1,2,2,2,2,1],
	 name: 'Melodic Minor'},
 { ratios : [2,3,2,2,3],
	 name: 'Pentatonic Major'},
 { ratios : [3,2,2,3,2],
	 name: 'Pentatonic Minor'},
 { ratios : [3,2,1,1,3],
	 name: 'Pentatonic Blues'},
 { ratios : [2,3,2,3],
	 name: 'Pentatonic Neutral'},
 { ratios : [2,2,1,2,2,2,1],
	 name: 'Ionian'},
 { ratios : [3,2,1,2,2,1,2,2],
	 name: 'Aeolian'},
 { ratios : [2,1,2,2,2,1,2],
	 name: 'Dorian'},
 { ratios : [2,2,1,2,2,1,2],
	 name: 'Mixolydian'},
 { ratios : [1,2,2,2,1,2,2],
	 name: 'Phrygian'},
 { ratios : [2,2,2,1,2,2,1],
	 name: 'Lydian'},
 { ratios : [1,2,2,1,2,2,2],
	 name: 'Locrian'},
 { ratios : [1,2,1,2,1,2,1],
	 name: 'Dim half'},
 { ratios : [2,1,2,1,2,1,2],
	 name: 'Dim whole'},
 { ratios : [2,2,2,2,2],
	 name: 'Whole'},
 { ratios : [3,1,3,1,3],
	 name: 'Augmented'},
 { ratios : [1,1,1,1,1,1,1,1,1,1,1,1],
	 name: 'Chromatic'},
 { ratios : [2,1,3,1,2,1,2],
	 name: 'Roumanian Minor'},
 { ratios : [1,3,1,2,1,2,2],
	 name: 'Spanish Gypsy'},
 { ratios : [3,2,1,1,3,2],
	 name: 'Blues'},
 { ratios : [2,2,3,2,3],
	 name: 'Diatonic'},
 { ratios : [1,3,1,2,1,3,1],
	 name: 'Double Harmonic'},
 { ratios : [1,2,1,1,1,2,2,2],
	 name: 'Eight Tone Spanish'},
 { ratios : [1,3,2,2,2,1,1],
	 name: 'Enigmatic'},
 { ratios : [2,2,2,2,1,1],
	 name: 'Leading Whole Tone'},
 { ratios : [2,2,2,2,1,2,1],
	 name: 'Lydian Augmented'},
 { ratios : [1,2,2,2,2,2,1],
	 name: 'Neoploitan Major'},
 { ratios : [1,2,2,2,1,2,2],
	 name: 'Neopolitan Minor'},
 { ratios : [1,2,3,4,1],
	 name: 'Pelog'},
 { ratios : [2,2,2,3,1,2],
	 name: 'Prometheus'},
 { ratios : [1,3,2,3,1,2],
	 name: 'Prometheus Neopolitan'},
 { ratios : [1,3,1,3,1,3],
	 name: 'Six Tone Symmetrical'},
 { ratios : [1,2,1,2,2,2,2],
	 name: 'Super Locrian'},
 { ratios : [2,2,2,1,1,2,2],
	 name: 'Lydian Minor'},
 { ratios : [2,1,3,1,1,2,2],
	 name: 'Lydian Diminished'},
 { ratios : [2,1,1,2,1,1,1,2,1],
	 name: 'Nine Tone Scale'},
 { ratios : [2,1,2,1,2,1,2,1],
	 name: 'Auxiliary Diminished'},
 { ratios : [2,2,2,2,2,2],
	 name: 'Auxiliary Augmented'},
 { ratios : [1,2,1,2,1,2,1,2],
	 name: 'Auxiliary Diminished Blues'},
 { ratios : [2,2,1,1,2,2,2],
	 name: 'Major Locrian'},
 { ratios : [2,2,2,1,2,1,2],
	 name: 'Overtone'},
 { ratios : [1,2,1,2,2,2,2],
	 name: 'Diminished Whole Tone'},
 { ratios : [2,1,2,2,1,2,2],
	 name: 'Pure Minor'},
 { ratios : [2,3,2,2,1,2],
	 name: 'Dominant 7th'}
];




/*
major, 
the three minors (natural, harmonic, melodic), 
chromatic, 
pentatonic, 
blues, 
octatonic (also known as diminished), 
whole tone, and 
all the modes (except for Locrian which I understand is seldom used)."

*/

$(document).ready(function() {
	////////////////////////////////
	//   ADSR
	/////////////////////////////


initAdsr();
initLfo();
initTempo();
initScaleSelector();
// replace switches


$(".cb-enable").live('click', function () {
var parent = $(this).parents('.switch');
$('.cb-disable', parent).removeClass('selected');
$(this).addClass('selected');
$('.checkbox', parent).attr('checked', true);
$('.checkbox', parent).change();
});
$(".cb-disable").live('click',function () {
var parent = $(this).parents('.switch');
$('.cb-enable', parent).removeClass('selected');
$(this).addClass('selected');
$('.checkbox', parent).attr('checked', false);
$('.checkbox', parent).change();
});





////////////////////////////////
//   KEYBOARD Styles and functions
/////////////////////////////

$(window).keydown(function(e) {

   
   
  var key = (e.keyCode) ? e.keyCode : e.which;
  $('.key.c' + key).addClass('keydown');
  if(isNumKey(key)){
    console.log(key +'=====');
    $('.num.key.selected').removeClass('selected');
    $('.key.c' + key).addClass('selected');
  }else{
    
      
      $('.key.c' + key).addClass('playing').delay(noteDuration*1000).queue(function(next){ //TODO: use a timmer instead, cause double note removes highlight too quickly...
      $(this).removeClass('playing');
    		next();
     }); //eo queue
  }

   /*
   $('.key.c' + key).addClass('playing');
   var elem = $('.key.c' + key);
   if(elem.highlightT) clearTimeout(elem.highlightT);
    elem.highlightT = setTimeout(function() {
        $(this).removeClass('playing');
     }, 1000); //throttle: time to wait after the resize is done...
     */
});

$(window).keyup(function(e) {
    var key = (e.keyCode) ? e.keyCode : e.which;
    $('.key.c' + key).removeClass('keydown');
});


$('a.key').mousedown(function(e){
  var c= $(this).text(); //this return "a" for A key...
 // TODO: get key number by text
 if($(this).hasClass('num')){
   c = $(this).children('span').text();
    numKey(c); 
  }else{
    keySound(c);
  }
  //$(this).trigger('keypress');
	return false;
});

$('a.key').click(function(){return false});

$(document).keypress(function(e) {  //for an obscure reason, there are weird eventing bug with the window.keydown event bellow...
     if ( (e.which == 13)|| (e.which == 9) ) { //enter, tab...
         event.preventDefault();
       }else if(e.which == 32 ){ //spacebar
         //TODO: Stop All audio!
         a.stop();
       }else{

         var key = (e.keyCode) ? e.keyCode : e.which;
         if(isNumKey(key) == true ){
           numKey(key-48); //key zero is 48...
         }else{
           var c = String.fromCharCode(key);//alert(c +" - " + e.which);
           console.log(key + ' - '+ c);
           keySound(c);
         }
      }
});


}); //eo doc ready...


function isNumKey(k){
  return ((k >= 48) && (k < 58) )
}
function numKey(num){ //receive a number from 0 -9, the top keyboard keys...
  // console.log(num);
  if (num == 0) num = 10;
  keyDuration = num;
  calculateDuration();
}


function keySound(c){
  
  //Highlight on keyboard duration
  /*$('.key.c' + key).addClass('playing').delay(noteDuration*1000).queue(function(next){ //TODO: use a timmer instead, cause double note removes highlight too quickly...
  $(this).removeClass('playing');
		next();
    }); //eo queue*/


  // var note = keyNotes[c.toLowerCase()];
  var note = scales['major'][c.toLowerCase()];
  note -= 12; //we re-center the freq...
  
  console.log(note);
  
  if (c == c.toLowerCase()){  //TODO: instead check if caps locks or Shift is ennforced... that will work wit clicks as we...
    // The character is lowercase
    var shape = 'sine';
  }else{
    // The character is uppercase
    var shape = 'square';
  }
  a = buildSound(note, shape, adsr.master, noteDuration, adsr, false);
  a.play();
}



////////////////////////////////
//   Sound-building - the hardcore part
/////////////////////////////

function buildSound(note, shape, volume, duration, env, noise){ //duration is in seconds, noise is a bool
  var waveShape = shape; // square, sin, tri, or swa
  var rndtone = 4+ Math.round(3 * Math.random()); //5 = default
  var sine = []; 
  var freq = getRevertedFreq(note) /baseFreq;
	var totalBeats = duration * 44100; //there's 44100 beats per seconds in the loop... 
  freq = freq * 44.1; // !!! MAGIC NUMBER, arbitrary, I don't know what is the multiplier for 44khz... guessed...


  
  noiseLvl = 0; //1; // peut varier de 0, 0.01, à 20 (après ça ce n'Est que du white-noise)
  if(noise && (Math.random()*10 > 7)){ //we adda bit of  noise on some instances...
    noiseLvl = Math.random()*0.05;
  }

	if(env.active){ //adsr
		//TODO: Define all the points here, get their maginc number (range calculations)
		// ranges are float between 0 - 1 
		/*
		 ranges_a = adsr.ratio_a * totalBeats * 1; //we know origin is 0/0, and that it's peak volume (1/1)
		ranges_d = adsr.ratio_d * totalBeats  * (adsr.level_s - 1 );
		 ranges_r = adsr.ratio_r * totalBeats * (0 - adsr.level_s);
		*/
		 ranges_a = adsr.ratio_a * totalBeats; //* 1; //we know origin is 0/0, and that it's peak volume (1/1)
		ranges_d = adsr.ratio_d * totalBeats;  //* (adsr.level_s - 1 );
		 ranges_r = adsr.ratio_r * totalBeats; //* (0 - adsr.level_s);
	}
	if(waveShape == 'square'){
		var square = 1;
  }
//totalBeats =50;
//vs = []; //tracing only... delete plz
//pos = [];
  for (var i=0; i<totalBeats; i++) {
      noiseRnd =  (Math.random()*noiseLvl) - (noiseLvl /2); //on ajoute ou soustrait une valeur au hasard
			
			
		//ADSR Envelope
			//We calculate the volume at this point in time, according to the ADSR envelope settings.
		if(! env.active){
			v= volume; //no envelopes
		}else{
				if(i <= env.pos_a*totalBeats ){
					v = volume * ((i / ranges_a * 1) + 0);
				}else if(i <= env.pos_d*totalBeats){//D
					var ra = 1- env.level_s; //range of amplitude in this curve it goes from 1 to 0,7 (so .3 range).
					var pos = (i - (env.pos_a*totalBeats)); //relative position of the curve in time
					v = volume * ( 1 - (pos/ranges_d*ra) );  
				}else if(i <= env.pos_s*totalBeats){// S
					v = volume * env.level_s; //sustain is of a fixed volume... 
				}else{ // R
					var ra = env.level_s; //range of amplitude in this curve it goes from 0.7 to 0.
					var pos = (i - (env.pos_s*totalBeats));
					v = volume * ( env.level_s - (pos/ranges_r*ra) ); 
				}
		}//eo adsr
		
			var vol = v *255 /2; 
			// 127
	
	
	var zeroBase = false;
	if(zeroBase){
      val = vol + (vol*Math.sin(i * (1/ freq )+noiseRnd )); // 128+(127*Math.sin(i / 5));
      // I think this line create the "pop" craquement...
		}else{
		  val = (255/2) + (vol*Math.sin(i * (1/ freq )+noiseRnd ));
	
		}
		
		if(val < 15){
		  val = 15;
		}
		if(val > 240){
		  val = 240;
		}
// !!!! HERE it is!!!!



/**/
      
			
			//we center the curve in the amplitude lvl, so overlaping doesn't create square waves...
      if(square) {val = Math.round(val/255)*255;} //TODO: SQUARE forms doens't have any envelopes!

			// 16 bits??
			// val = Math.pow(val, 2); //transform a 8bit value into a 16one
			
			//val = val * 250; //transform a 8bit value into a 16one
			
      sine[i] = Math.round(val);
      //160 = low
      // 40 = middle
      // 5 = high pitch
      // donc inversement proportionel à la Fre reelegf
     // SIN returns -127 to 127, so we have a full, 255 (one bit) Amplitude (volume) of sound
  }
s = sine; //tracing purpose only
drawSineGraph(sine);

  
   var wave2 = new RIFFWAVE();
  wave2.header.sampleRate = 44100; // set sample rate to 44KHz
 // wave5.header.numChannels = 1; // two channels (stereo)
  // wave2.header.bitsPerSample = 16; //Buggy...
	wave2.header.bitsPerSample = 8; //!!
  wave2.Make(sine);
  var audio2 = new Audio(wave2.dataURI);
  audio2.loop=0;

  return audio2;  
}


////////////////////////////////
//   Draw Sine graph
/////////////////////////////

function drawSineGraph(s){  // s = the large sine array of 0-255 values
	var canvas = document.getElementById("sine_graph");
	var context = canvas.getContext("2d");
	
	var w = $(canvas).width();
	var h = $(canvas).height();
	var v = 1;
	context.clearRect(0,0,w,h);
	
	
	//MAIN STROKE
	context.strokeStyle = '#4cc'; 
	context.fillStyle = '#cee'; 
	context.lineWidth   = 1;
	context.beginPath();
	context.moveTo(0, h); // initial positions, lower left

var pos = 0;
var val = 0;
	for (var i=0; i<w; i++) {
		pos = Math.round( i / w * s.length);
		val = (s[pos]/255) *h;
		context.lineTo(i, h-val); //attack peak 
	}
  context.lineTo(w, h); //end
  context.stroke();
	context.fill();
}


////////////////////////////////
//   UTILS
/////////////////////////////

function getFreq(noteDiff){
  //This function return a note frequency based on the number of half-tone increments received (-100 to 100)
  var freqDiff = Math.pow(freqRatio, noteDiff);
  var newFreq = freqDiff * baseFreq;
  return newFreq; //return freq hz
}

function getRevertedFreq(noteDiff){  //Opposite of previous funcion
  //This function return a note frequency based on the number of half-tone increments received (-100 to 100)
  noteDiff = noteDiff * -1; //twisted way to have them vary the other way around...
  // !! NASTY
  var freqDiff = Math.pow(freqRatio, noteDiff);
  var newFreq = freqDiff * baseFreq;
  return newFreq;
}




function smartRound(n){ //rounding for display purpose only
if (n < 2){
	r = Math.round(n*100)/100;
}else if(n < 30){
	r = Math.round(n*10)/10;
}else{
	r = Math.round(n); //big numbers = rounded
}
return r
}