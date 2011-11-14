

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
	  thickness = ((maxDiam-minDiam) * ((nbCorde-c) / nbCorde)) + minDiam;
	  
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
vib_duration = 1; //sec
vib_fps = 50;

function getTuning(notes){
  var corres = {  "A" : 0,  "A#" : 1,  "B" : 2,  "C" : 3,  "C#" : 4,  "D" : 5,  "D#" : 6,  "E" : 7,  
  "F" : 8,  "F#" : 9,  "G" : 10,  "G#" : 11,  "X" : "X",  "x" : "X" };
  
  var ar = notes.split(" ");
  obj = { "note":[],"note_rel":[],"diff":[] };
   for (var i=0; i<ar.length; i++) { 
     obj.note[i] = ar[i];
     obj.note_rel[i] = corres[ar[i]];
     obj.diff[i] =  obj.note_rel[i] - retular_tuning_rel[i];
     
     // Octave check, to ensure normal octave with strings... better wrap this routine...
     if( obj.diff[i] < -7){
       obj.note_rel[i] += 12;
      obj.diff[i] =  obj.note_rel[i] - retular_tuning_rel[i];
     }
     if( obj.diff[i] > 7){
        obj.note_rel[i] -= 12;
       obj.diff[i] =  obj.note_rel[i] - retular_tuning_rel[i];
      }
  }
  return obj
}


retular_tuning_rel = [-5,0,5,10,14,19]; //used to calculate proximity with notes...
tuning_str = "E A D G B E";
tuning_str = "D A D G B E";
tuning = getTuning(tuning_str); // returns an array...



//console.log('!!! '+ getDiff(tuning));

function activateCorde(key){
  console.log(key +' + + + +');
  
  
  if (auto_refresh != "") {
    clearInterval(auto_refresh);
    if(a != undefined){
      a.pause();
    }
    
      // already set
     // return;
  }
    vib_count = 0; //reset counter...
    
    auto_refresh = setInterval(function() {
      var ratio = (vib_count++ / vib_fps) / vib_duration; // current / total-time
      if (ratio > 1) { 
        clearInterval(auto_refresh); 
        auto_refresh = "";
      }else{
        
        drawNeck(6, 'guitar', ratio, key-1);
      }
    }, 1000/vib_fps);
    
    //play the sound
   // note = tuning.note_rel[ key-1 ]; // return a semi-tone value difference from 440 A.
   if(activeTuning == undefined) {activeTuning=Music.tunings.at(0);}
    var rel = activeTuning.get('note_rel');
    console.log("rel = "+rel);
    note = rel[ key-1 ]; // return a semi-tone value difference from 440 A.
    // note = -2;
    adsr.active = true; //basic envelope
    calculateADSR();
    a = buildSound(note, 'shape', adsr.master, vib_duration, adsr, false);
    a.play();
}

$(document).ready(function(){
 // drawNeck(6, 'guitar', Math.random()*1, 2);
  
  initBackbone();
  
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



function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();
  
  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;#";
  var to   = "aaaaeeeeiiiioooouuuunc-------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}








///////////////////////////////////////
//  MODEL :  Tunnings
////////////////////////////////////////
var Tuning = Backbone.Model.extend({
  defaults: {
      name: 'Regular',
      note: ["E", "A", "D", "G", "B", "E"],
      note_rel : [-5,0,5,10,14,19],
      diff : [0,0,0,0,0,0]
  },
  initialize: function() { 
    var name = this.get('name');
    this.set({ slug : slugify(name)});
   },

  select: function() {
    alert('selected tuning: ' + this.get('name'));
  },
  calculateTuning: function(){
    var corres = {  "A" : 0,  "A#" : 1,  "B" : 2,  "C" : 3,  "C#" : 4,  "D" : 5,  "D#" : 6,  "E" : 7,  
    "F" : 8,  "F#" : 9,  "G" : 10,  "G#" : 11,  "X" : "X",  "x" : "X" };

    var notes = this.get('letters')
    var ar = notes.split(" ");
    var obj = { "note":[],"note_rel":[],"diff":[] }; //our temporary object...
     for (var i=0; i<ar.length; i++) { 
       //obj.letter[i] = ar[i];
       obj.note[i] = ar[i];
       obj.note_rel[i] = corres[ar[i]];
       obj.diff[i] =  obj.note_rel[i] - retular_tuning_rel[i];

       // Octave check, to ensure normal octave with strings... better wrap this routine...

       if( obj.diff[i] < -7){
         obj.note_rel[i] += 12;
        obj.diff[i] =  obj.note_rel[i] - retular_tuning_rel[i];
       }
       if( obj.diff[i] > 7){
          obj.note_rel[i] -= 12;
         obj.diff[i] =  obj.note_rel[i] - retular_tuning_rel[i];
        }
    }
     this.set(obj); //works!
    },


  allowedToEdit: function(account) {
    return true;
  }

});

  window.TuningCollection = Backbone.Collection.extend({
      localStorage: new Store("tunings"),
			url: '/tunings',
      model: Tuning,
  find_by_slug: function(slug) {
     return _.find(Music.tunings.models, function(tuni){ return tuni['attributes']['slug'] == slug; }) //digg deep directly in the model collection and comapre...
   }
 });
  
  
  ///////////////////////////////////////
  //  MODEL :  Chord
  ////////////////////////////////////////
  var Chord = Backbone.Model.extend({
    defaults: {
        name: 'Open',
        fret : [0,0,0,0,0,0],
        note: 'A'
    },
    initialize: function() { 
      var name = this.get('name');
      this.set({ slug : slugify(name)});
     },

    select: function() {
      alert('selected chord: ' + this.get('name'));
    }

  });

 window.ChordsCollection = Backbone.Collection.extend({
        localStorage: new Store("chords"),
  			url: '/chords',
  //URL??? TRY COUCHAPP with Cloudant, ready to go with backbone!
        model: Chord
    });
    
    
  
  ///////////////////////////////////////
  //  ROUTES
  ////////////////////////////////////////
  
  AppRouter = Backbone.Router.extend({ 

      routes: {
          "help":                 		"help", // #help
  				"":                 				"tuning", // #help
          "tuning/:slug":        			"tuning", 
          "add":        							"add", 
          "note/:id/search/:find": 		"search",
  				"browse/*path": 						"browse"
      },
      tuning: function(slug) {

          //alert('need help?' + slug);
          //Music.tunings.at(i)
  				// setSection('help');
  				//var t = _.find(Music.tunings.models, function(tuni){ return tuni['attributes']['slug'] == 'normal'; });
  				// Find the tuning by slug
  				// var t = _.find(Music.tunings.models, function(tuni){ return tuni['attributes']['slug'] == slug; });
  				var  t = Music.tunings.find_by_slug(slug);
  				 activeTuning = t;//save for public access
  				 
  				 
  				 if(t != undefined){
  				   t.calculateTuning();
  				   var diff = t.get('diff');
  				   var note = t.get('note');
     				 for(var i=0; i < 6; i++){
     				   $('.key.c'+(49+i) +' b').text(note[i]);
     				   if(diff[i] > 0){ //set classes to color red/green
      				     $('.key.c'+(49+i) +' em').removeClass('neg').addClass('pos').text('+'+diff[i]);;
      				   }else if(diff[i] < 0){
      				     $('.key.c'+(49+i) +' em').removeClass('pos').addClass('neg').text(diff[i]);;
      				   }else{
      				     $('.key.c'+(49+i) +' em').removeClass('pos neg').text('-');
      				   }
     				   //$('.key.c'+(49+i) +' em')
     				   
     				 }
  				   
  				   $('#tuning_title em').text(t.get('name'));
  				   $('#tuning_title span').html(t.get('letters') ); //+ "<br>diff:"+ t.get('diff') + "<br> note_rel:"+ t.get('note_rel')
  				   
  				   //sec active class on tuning nav:
  				   $('#scale_selector a.selected').removeClass('selected');
  				   $('#scale_selector a.'+t.get('slug')).addClass('selected');
  				}
      },
  		

      search: function(id, search) {
          alert(' searching note ID:'+id + 'for '+search);
      }
  });
    
  
  ///////////////////////////////////////
  //  INIT
  ////////////////////////////////////////
  
Music = {};

function initBackbone(){
// ROUTES
/**/
app_router = new AppRouter;
Music.app_router = app_router;

//Models
Music.tunings = new TuningCollection;
Music.chords = new ChordsCollection;
Backbone.history.start({pushState: false, root: "/guitar"}); // Start the engines!
//alert("d");
pullData();
}

///////////////////////////////////////
//  AJAX LOAD...
////////////////////////////////////////

// load tunning JSON.
// For each tuning, create a model, add it to the colleciton...
function pullData(){
$.getJSON('data/guitar_tunings.json', function(data) {
  //alert(data)
  Music.tunings.add(data);
  //  alert(Music.tunings.length);
  buildTuningNav();
});

$.getJSON('data/guitar_chords.json', function(data) {
  //alert(data)
  Music.chords.add(data);
   // alert(Music.chords.length);
});


}



function buildTuningNav(){
  var html = "";
  html += '<a href="#" class="more"><em>More</em> View all... </a> ';
  for(var i=0; i < Music.tunings.length; i++){
    var t = Music.tunings.at(i);
    html += '<a href="#tuning/'+t.get('slug')+'" class="'+t.get('slug')+'"><em>'+t.get('name')+'</em> '+ t.get('letters') +'</a> ';
  }
  $('#scale_selector').html(html);
  $('#scale_selector a.more').bind('click touch', function(){
    $('#scale_selector').addClass('view_all');
  });
}
