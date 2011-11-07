

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
freqRatio  = Math.pow(2, 1/musicScale);  //multiplier of half-tones //returns maginc number : 1.0594630943593
noteDuration = 0.9 //sec // is calculated precisely wiht the tempo...


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
	//   ADSR
	/////////////////////////////


initAdsr();
initLfo();


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
  keySound(c);
	return false;
});

$('a.key').click(function(){return false});

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
  a = buildSound(note, shape, adsr.master, noteDuration, adsr);
  a.play();
}



////////////////////////////////
//   Sound-building
/////////////////////////////

function buildSound(note, shape, volume, duration, env){ //duration is in seconds
  var waveShape = shape; // square, sin, tri, or swa
  var rndtone = 4+ Math.round(3 * Math.random()); //5 = default
  var sine = []; 
  var freq = getRevertedFreq(note) /baseFreq;
	var totalBeats = duration * 44100; //there's 44100 beats per seconds in the loop... 
  freq = freq * 44.1; // !!! MAGIC NUMBER, arbitrary, I don't know what is the multiplier for 44khz... guessed...


  
  noiseLvl = 0; //1; // peut varier de 0, 0.01, à 20 (après ça ce n'Est que du white-noise)
  if(Math.random()*10 > 7){ //we adda bit of  noise on some instances...
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
			
			if(env.active){ 
				
			if(i < env.pos_a*totalBeats ){
					v = volume * ((i / ranges_a * 1) + 0); //WORKS!!!
				}else if(i < env.pos_d*totalBeats){//D
				//	v = volume * parseFloat(adsr.level_s + 1 - parseFloat(i/ranges_d)*adsr.level_s); //it progress toward the sustain level...
				var ra = 1- env.level_s; //range of amplitude in this curve it goes from 1 to 0,7 (so .3 range).
				var pos = (i - (env.pos_a*totalBeats)); //relative position of the curve in time
				v = volume * ( 1 - (pos/ranges_d*ra) );  
				
				}else if(i < env.pos_s*totalBeats){// S
					v = volume * env.level_s; //sustain is of a fixed volume... //WORKS!

				}else{ // R
					var ra = env.level_s; //range of amplitude in this curve it goes from 0.7 to 0.
					var pos = (i - (env.pos_s*totalBeats));
					v = volume * ( env.level_s - (pos/ranges_r*ra) );  //works!
					
					//console.log('R, ranges_r='+ vol * ((i/totalBeats * ranges_r) + env.level_s) + ', xxxxv='+v+' , '+vol);
				}
			}else{
				v= volume; //no envelopes
			}
			//vs[i] = v;
			// V always 
			var vol = v *255 /2; /// TODO!!!!! 
	
      val = vol+(vol*Math.sin(i * (1/ freq )+noiseRnd )); // 128+(127*Math.sin(i / 5));
      // val = vol+(vol*Math.sin(i * (1/ freq )+noiseRnd )); // 128+(127*Math.sin(i / 5));
      if(square) {val = Math.round(val/255)*255;}
      sine[i] = Math.round(val);
      //160 = low
      // 40 = middle
      // 5 = high pitch
      // donc inversement proportionel à la Fre reelegf
        // SIN returns -127 to 127, so we have a full, 255 (one bit) Amplitude (volume) of sound
  }
s = sine; //tracing purpose only
/*
  sine[0]=0; //avoid pops? 
  sine[sine.length-3] = 0;
  sine[sine.length-2] = 0;
  sine[sine.length-1] = 0;
   sine[sine.length] = 0;*/
  
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




function smartRound(n){
if (n < 2){
	r = Math.round(n*100)/100;
}else if(n < 30){
	r = Math.round(n*10)/10;
}else{
	r = Math.round(n); //big numbers = rounded
}
return r
}