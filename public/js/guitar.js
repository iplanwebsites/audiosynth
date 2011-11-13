

function drawNeck(nbCorde, cordeType, timeRatio, activeCorde){
  // @ nbCorde: 4 - 12 int
  // @ cordeType: 'bass', "guitar", 'violin'
  // @ timeRatio: ratio, between 0-1, of where we are in th animation. 0 means we are NOT animating: static cordes
  // @activeCorde: the corde that IS vibrating right now (if any)
  
  var canvas = document.getElementById("fret_canvas");
	var context = canvas.getContext("2d");
	
	var topOffset = 10;
	var w = $(canvas).width();
	var h = $(canvas).height();
	
	context.clearRect(0,0,w,h); //erase last img
	
	if(cordeType == "guitar"){
	  var minDiam = 3;
	  var maxDiam = 20;
	}else if(cordeType == "bass"){
  	  var minDiam = 8;
  	  var maxDiam = 30;
	}else{ //violin?
	  var minDiam = 2;
	  var maxDiam = 10;
	}
	
	
	// Draw each cordes:
	var vibDirection =  Math.random()*2 - 1;
	for (var c=0; c<nbCorde; c++) {
	  thickness = ((maxDiam-minDiam) * (c/nbCorde))+minDiam;
	  context.strokeStyle = '#4cc'; 
  	context.fillStyle = '#cee'; 
  	context.lineWidth   = thickness;
  	context.beginPath();
  	
  	posX = (c / (nbCorde+1) * w) + w/7;
  	context.moveTo(posX, 0); // initial positions, lower left
	  
	  if(activeCorde == c){
	    context.strokeStyle = '#499'; 
	    for (var i=0; i<h; i++) { //we find vibrating x pos for 900px high...
    	//	pos = Math.round( i / w * s.length);
    	//	val = (s[pos]/255) *h;
    	freq = thickness /1.5;
    	amplitude = 1 * (thickness/3)+3;
    	amplitude = amplitude * Math.sqrt( Math.pow(i/h , 2));
    	vib  = posX + ( amplitude *  Math.sin(i/freq* (1-timeRatio)));
    	vib += (vibDirection * amplitude) * (1-timeRatio)*5; //this move the corde fomr left to right, simulating bending...
    		context.lineTo(vib, i); //attack peak 
    	}
	  }else{
	    context.lineTo(posX, h); // straight line...
	  }
	  
	  
	  
	  
	  // context.lineTo(w, h+topOffset*2); //end
    context.stroke();
  	// context.fill();
	  
	}
  
}


function update() {
  drawNeck(6, 'guitar', Math.random()*1, 2);
}

auto_refresh = "";
vib_duration = 5; //sec
vib_fps = 30;
function activateCorde(key){
  console.log(key +' + + + +');
  
  
  if (auto_refresh != "") {
      // already set
      return;
  }
    vib_count = 0;
    auto_refresh = setInterval(function() {
      var ratio = (vib_count++ / vib_fps) / vib_duration;
      if (ratio > 1) { 
        clearInterval(auto_refresh); 
        auto_refresh = "";
      }else{
        
        drawNeck(6, 'guitar', ratio, key-1);
      }
    }, 1000/vib_fps);
    
    //play the sound
    note = 0;
    adsr.active = true;
    a = buildSound(note, 'shape', adsr.master, vib_duration, adsr, false);
    a.play();
}

$(document).ready(function(){
  drawNeck(6, 'guitar', Math.random()*1, 2);
  // setInterval(update, 1000/30);
  $('a.key.num').bind('click touch', function(){
    console.log('h');
    var key = $(this).children('span').text();
    activateCorde(key);
  })
  
  
  $(window).keydown(function(e) {
    var key = (e.keyCode) ? e.keyCode : e.which;
    key = key - 48
      //$('.key.c' + key).addClass('keydown');
      
      activateCorde(key);
    });
    
    
});









