

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
	
	//draw frets...
	
	var dot_frets = [3,5,7,9,12,15,17,19,21];
	for (var f=0; f<12; f++) {
	  context.strokeStyle = '#ccc'; 
	  context.lineWidth   = 2;
	  if(f == 0){
	    context.strokeStyle = '#333'; 
  	  context.lineWidth   = 8;//first bar is thick!
  	}
  	if(_.include(dot_frets, f)){ //if it's a dotted fret...
  	  context.beginPath();
  	  context.strokeStyle = '#ccc'; 
  	  context.fillStyle = '#ccc'; 
      context.arc( w/2, (f*100 + 50-15), 10, 0, Math.PI*2, true);  //x,y,width,heigh
      context.closePath();
      context.fill();
  	}
  	context.beginPath();
  	var y = f*100 + 30+50;
	  context.moveTo(0+20, y); 
	  context.lineTo(w-20, y);
	  context.stroke();
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
	    if (Math.random() > 0.5){ var revert = 1 }else{var revert = -1}
	    for (var i=0; i<h; i++) { //we find vibrating x pos for 900px high...
    	//	pos = Math.round( i / w * s.length);
    	//	val = (s[pos]/255) *h;
    	freq = thickness /1.5;
    	amplitude = 1 * (thickness/3)+3;
    	amplitude = amplitude * Math.sqrt( Math.pow(i/h , 2));
    	
    	vib  = posX + ( amplitude *  Math.sin(i/freq* (1-timeRatio)) *revert );
    	vib += (vibDirection * amplitude) * (1-timeRatio)*3; //this move the corde fomr left to right, simulating bending...
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

/*
function update() {
  drawNeck(6, 'guitar', Math.random()*1, 2);
}*/

auto_refresh = "";
vib_duration = 5; //sec !!
vib_fps = 30;
//drawNeck(6, 'guitar', 0, 2);

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
    corres = {  "A" : 0,  "A#" : 1,  "B" : 2,  "C" : 3,  "C#" : 4,  "D" : 5,  "D#" : 6,  "E" : 7,  
    "F" : 8,  "F#" : 9,  "G" : 10,  "G#" : 11,  "X" : "X",  "x" : "X" }; //should be more global...

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
      var fret = this.get('fret');
      var the_note = this.get('note');
      this.set({ slug : slugify(fret),  note_slug : slugify(the_note) });
      
      //this.set({ note_slug : slugify(the_note)});
      
      var cmplx = fret.split(' ');
      var total = 0;
      for(var i = 0; i < cmplx.length; i++) {
                v = parseFloat(cmplx[i]);
                if (v == "x") v=0;
                if (!isNaN(v)) total += v; 
              }
      this.set({ complexity : total});   
     },

    select: function() {
      alert('selected chord: ' + this.get('name'));
    }

  });

 window.ChordsCollection = Backbone.Collection.extend({
        localStorage: new Store("chords"),
  			url: '/chords',
  //URL??? TRY COUCHAPP with Cloudant, ready to go with backbone!
        model: Chord,
    find_by_slug: function(slug) {
       return _.find(Music.chords.models, function(models){ return models['attributes']['slug'] == slug; }) //digg deep directly in the model collection and comapre...
     },
   find_by_note: function(note) {
     //console.log(note);
     // return _.find(Music.chords.models, function(models){ return models['attributes']['note'] == note; }) //digg deep directly in the model collection and comapre...
      return _.filter(Music.chords.models, function(models){ return models['attributes']['note'] == note; }) //digg deep directly in the model collection and comapre...
   
    },
    find_by_note_slug: function(note_slug) {
       //console.log(note);
       // return _.find(Music.chords.models, function(models){ return models['attributes']['note'] == note; }) //digg deep directly in the model collection and comapre...
        return _.filter(Music.chords.models, function(models){ return models['attributes']['note_slug'] == note_slug; }) //digg deep directly in the model collection and comapre...
 },
 get_open: function() {
   return Music.chords.at(0);
 }
    
    
    });
    
    
  
  ///////////////////////////////////////
  //  ROUTES
  ////////////////////////////////////////
  
  AppRouter = Backbone.Router.extend({ 

      routes: {
          "help":                 		"help", // #help
  				"":                 				"home", 
          "tuning/:slug":        			"tuning", 
          "tuning/:slug/:chord":  		"chord", 
          "add":        							"add", 
          "tuning/:slug/:search": 		"search",
  				"browse/*path": 						"browse"
      },
      home: function(slug) {
        // alert('home')
        this.tuning('normal'); //default tuning
      },
      tuning: function(slug, internal) {

          
          //alert('need help?' + slug);
          //Music.tunings.at(i)
  				// setSection('help');
  				//var t = _.find(Music.tunings.models, function(tuni){ return tuni['attributes']['slug'] == 'normal'; });
  				// Find the tuning by slug
  				// var t = _.find(Music.tunings.models, function(tuni){ return tuni['attributes']['slug'] == slug; });
  				//if(slug == "") slug = "normal";
  				
  				var  t = Music.tunings.find_by_slug(slug);
  				activeTuning = t;
  				//if( 1 ){ //so we don'T call it twice for no reasons...
  				
  				 
  				 
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
     				 }
  				   
             //calculate how the chord changes the note...

  				   $('#tuning_title em').text(t.get('name'));
  				   $('#tuning_title span').html(t.get('letters') ); //+ "<br>diff:"+ t.get('diff') + "<br> note_rel:"+ t.get('note_rel')
  				   
  				   //sec active class on tuning nav:
  				   $('#scale_selector a.selected').removeClass('selected');
  				   $('#scale_selector a.'+t.get('slug')).addClass('selected');
  				   
  				   
  				   if(! internal){
  				     buildChordNav(); //refresh chord nav according to new tuning...
               var open_c = Music.chords.find_by_note('Open');
               Music.app_router.draw_chord(  open_c[0] ); //we hard-set the chord to "open" - reset...
               
               if (t.get('slug') == 'normal'){
                 $('#chords').show();
                 $('.key span.chord_pos').show();
                 $('#tuning_title .chord').show();
               }else{
                 $('#chords').hide();
                 $('.key span.chord_pos').hide();
                 $('#tuning_title .chord').hide();
               }
             }
				  // }//end if..
  				}
      },
    chord: function(slug, chord, hover ) {
        this.tuning(slug, 1); //set the tuning first..., 1 stands for "internal"
        //var  c = Music.chords.find_by_slug(chord);
        var  all_c_models = Music.chords.find_by_note_slug(chord);
        c = all_c_models[0];
        this.draw_chord(c);
        
        if(! hover){
          Music.active_chord = c; //we set it only if it's not trigerred by an hover on the button...
           Music.fretVariationCount = 0; //sort of global counter to keep track of variation number to show...
          //if(Music.fretVariationCount > 2){alert('problem with Music.fretVariationCount incrementation...'); Music.fretVariationCount =0;}
          $('#chords a.'+c.get('slug')).bind('click touch', function(){
            Music.app_router.show_next_variation(chord);
          });
        }else{
          $('#chords a.'+c.get('slug')).unbind('click touch'); //clear it!
        }
    },
   /* chord_show: function(slug, chord, hover ) {
      Music.app_router.chord(slug, chord, hover );
    },*/
    show_next_variation: function(chord) {
      var  all_c_models = Music.chords.find_by_note_slug(chord);
      var c = all_c_models[ ++Music.fretVariationCount % all_c_models.length];
      console.log(Music.fretVariationCount + ' / '+all_c_models.length);
      Music.active_chord = c;
      Music.app_router.draw_chord(c);
    },
    draw_chord: function(c) {
      if(c != 0){
      var a_pos =  c.get('fret');
      a_pos = a_pos.split(' ');//position of each strings...
       for(var i=0; i < a_pos.length; i++){
			   if(a_pos[i] == 'x'){ //set classes to color red/green
			     $('.key.c'+(49+i) +' .chord_pos').removeClass('open').addClass('x').text(a_pos[i]);
			   }else if(a_pos[i] == 0){
			     $('.key.c'+(49+i) +' .chord_pos').removeClass('x').addClass('open').text(a_pos[i]);
			   }else{
			     $('.key.c'+(49+i) +' .chord_pos').removeClass('x open').text(a_pos[i]);
			   }
			   $('.key.c'+(49+i) +' .chord_pos').removeClass('f1 f2 f3 f4 f5 f6 f7 f8 f9 f10 f11 f12 f13 f0 fx').addClass('f'+a_pos[i]);
			   // replace letters on the board with offseted ones
   			 var tuning = activeTuning.get('note_rel');
   			 var new_note = Math.round(a_pos[i]) + Math.round(tuning[i]);
   			 console.log(Math.round(a_pos[i]) + " + "+ Math.round(tuning[i]) +" = "+new_note);
   			 if(_.isNaN(new_note)){
   			     letter = "-";
   			   }else{
   			      var key_letters = Music.keys.split(' '); //Music.keys = "Ab A B C Db D Eb E F Gb G";
   			     
        			var letter = key_letters[(new_note +36) % 12];
   			   }
   			 $('.key.c'+(49+i) +' b').text(letter);
			 }
			 
			 
			 
			 
      $('#tuning_title .chord').html(c.get('note') + ', ['+ c.get('fret')+'] <br/>'+c.get('name') );
      
      $('#chords a.selected').removeClass('selected');
		  $('#chords a.'+c.get('slug')).addClass('selected');
	  }
  	 },	

      search: function(slug, search) {
        this.tuning(slug); //set the tuning first...
          alert(' searching note ID:'+id + 'for '+search);
      }
  });
    
  
  ///////////////////////////////////////
  //  INIT
  ////////////////////////////////////////
  
Music = {};
Music.fretVariationCount = 0;
// Music.keys = "Ab A B C Db D Eb E F Gb G";
Music.keys = "A Bb B C Db D Eb E F Gb G Ab";
function initBackbone(){
// ROUTES
/**/
app_router = new AppRouter;
Music.app_router = app_router;

//Models
Music.tunings = new TuningCollection;
Music.chords = new ChordsCollection;
Music.chords.comparator = function(c) {
  return c.get("complexity");
};

wire_view_all_button();

//alert("d");
pullData(function(){
  Backbone.history.start({pushState: false, root: "/guitar"}); // Start the engines!
});
}

///////////////////////////////////////
//  AJAX LOAD...
////////////////////////////////////////

// load tunning JSON.
// For each tuning, create a model, add it to the colleciton...
function pullData(callback){
$.getJSON('data/guitar_tunings.json', function(data) {
  //alert(data)
  Music.tunings.add(data);
  //  alert(Music.tunings.length);
  buildTuningNav();
  
  
  $.getJSON('data/guitar_chords.json', function(data2) {
    //alert(data)
    Music.chords.add(data2);
    Music.chords.sort(); //ordered by complexity
     callback(); //starts backbone...
    buildChordNav();
     // alert(Music.chords.length);
    
  });
  
  
});




}



function buildTuningNav(){
  
  drawNeck(6, 'guitar', 0, -1);
  
  var html = "";
  html += '<h1> ~ Tunings ~ </h1>';
  html += '<a href="#" class="more"><em>More</em> View all... </a> ';

  for(var i=0; i < Music.tunings.length; i++){
    var t = Music.tunings.at(i);
    html += '<a href="#tuning/'+t.get('slug')+'" class="'+t.get('slug')+'"><em>'+t.get('name')+'</em> '+ t.get('letters') +'</a> ';
  }
 
 
  $('#scale_selector').html(html);
  
  $('#scale_selector a.more').bind('click', function(event){
    event.preventDefault();
    if( $('#scale_selector').hasClass('view_all') ){
      $('#scale_selector').removeClass('view_all');
      $('#scale_selector a.more').text('VIEW All!');
    }else{
      $('#scale_selector').addClass('view_all');
      $('#scale_selector a.more').text('Hide extra...');
    }
    return false;
    
  });
}



function buildChordNav(){
  
  var html = "";
//  html += '<a href="#" class="more"><em>More</em> View all... </a> ';
  
  
  /*
  Full listing...
  for(var i=0; i < Music.chords.length; i++){
    var c = Music.chords.at(i);
    html += '<a href="#tuning/'+ activeTuning.get('slug')+'/'+c.get('slug')+'" class="'+c.get('slug')+'" alt="'+c.get('name')+'"><em>'+c.get('name')+'</em> </a> ';
  }*/
  
  
  var keys = Music.keys.split(' ');//make an array... 

  var shapes = "- m 7 m7 5 6 m6 maj7 sus sus2 dim7 7sus4 add9 9 m9 /Ab /A /B /C /Db /D /Eb /E /F /Gb /G m/Ab m/A m/B m/C m/Db m/D m/Eb m/E m/F m/Gb m/G";
  shapes= shapes.split(' ');
  shapes[0] = '';//overide
  
  for(var k=0; k < keys.length; k++){
    if(k % 2 == 1){ var alt =" alt";}else{var alt ="";}
    html += '<div class="col '+ keys[k] + alt +'"><h1>'+keys[k]+'</h1>';
      for(var s=0; s < shapes.length; s++){
         //var c = Music.chords.at(i);
         var classes = "";
         var all_chords = Music.chords.find_by_note(keys[k] + shapes[s]); //returns all matched chords in an array.
            for(var i=0; i < all_chords.length; i++){
                 classes += " "+ all_chords[i].get('slug');
         }
         var c = all_chords[0]; //set the active chord...
         
         if(c != undefined){
           if (s > 5){ classes += " extra "; }
           if (s == 0){ classes += " maj "; }
           if (s == 1){ classes += " minor "; }
           classes += c.get('note_slug');
           html += '<a href="#tuning/'+ activeTuning.get('slug')+'/'+c.get('note_slug')+'" class="'+c.get('slug')  + classes+ '" title="'+keys[k]+' '+c.get('name')+'" data-note-slug="'+c.get('note_slug')+'"><em>'+keys[k]+'</em>'+shapes[s]+'</a> ';
          }else{
            var spacerClass = "";
            if(s > 5){ spacerClass += " extra"}
            html += '<div class="no_chord'+spacerClass+'">-</div> ';
          }
      }
    html += '</div>'; //eo .col
  }
  
  
  $('#chords').html(html);



 $('#chords a').hover(function(){
//hover...
  var note_slug = $(this).attr('data-note-slug');
 // console.log('note_slug = '+note_slug);
  var tuning = 'normal';
  var c= Music.chords.find_by_note_slug(note_slug);
  c = c[0];
  //Music.fretVariationCount =1; //so we show the 'next one on click...
    Music.app_router.draw_chord(c );
  }, function(){ 
//out
    //Music.fretVariationCount =0;
    if(Music.active_chord != 0 && Music.active_chord != undefined){
      Music.app_router.draw_chord( Music.active_chord );
      
     // alert(Music.active_chord);
    }else{ //set OPEN chord...
      var open_c = Music.chords.find_by_note('Open');
      Music.app_router.draw_chord(  open_c[0] );
      //alert('op');
    }
    // out...
  });



}


function wire_view_all_button(){
// more chords button
$('#more_chords').click(function(){
  if($('#chords_wrap').hasClass('view_all')){
    $('#chords_wrap').removeClass('view_all');
    $('#more_chords').text('View all chords');
  }else{
    $('#chords_wrap').addClass('view_all');
    $('#more_chords').text('View Basic chords only');
  }
 // console.log('viewall')
});
}



