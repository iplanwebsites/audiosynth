
function play(audio) {
  if (!audio.paused) { // if playing stop and rewind
    audio.pause();
    audio.currentTime = 0;
  }
  audio.play();
}






// NOISE
var noise = []; for (var i=0; i<10000; i++) noise[i] = Math.round(128*Math.random());
var wave1 = new RIFFWAVE(noise);
var audio1 = new Audio(wave1.dataURI);



// EFFECT
var effect = []; for (var i=0; i<35000; i++) effect[i] = 64+Math.round(32*(Math.cos(i*i/2000)+Math.sin(i*i/4000)));
var wave3 = new RIFFWAVE();
wave3.header.sampleRate = 22000;
wave3.Make(effect);
var audio3 = new Audio(wave3.dataURI);

// STEREO
var wave4 = new RIFFWAVE();
wave4.header.sampleRate = 44100;
wave4.header.numChannels = 2;
var i = 0;
var stereo = [];
while (i<100000) {
  stereo[i++] = 0;
  stereo[i++] = 128+Math.round(127*Math.sin(i/50));
}
while (i<200000) {
  stereo[i++] = 128+Math.round(127*Math.sin(i/50));
  stereo[i++] = 0;
}
wave4.Make(stereo);
var audio4 = new Audio(wave4.dataURI);
