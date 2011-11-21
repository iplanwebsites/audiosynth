


  
  ///////////////////////////////////////
  //  String (model)
  ////////////////////////////////////////
  


InstrumentString = Backbone.Model.extend({ // <<< Singleton
    defaults: {
         tuning_note_name: 'A',
         tuning_note: 0,
         tuning_diff: 0,
         note: 0,
         note_name: 'A',
         num: 0, //it's id
         audio: {}, //sound object.
         first_last: 0, // 'first' or 'last'
         vib_count: 0
     },
     initialize: function() {
       var id_s = this.get('num') ;
       var e = $('#string'+id_s );
       this.set({e: e});
     },
     change: function(new_fret_pos) { //call when we change chords on the neck...
       // console.log('change...')
          // redraw the chord
         // this.set({'fret' : new_fret_pos} );
          // calculate the diff and the note name now, set it as well.
          
          
            
          var fret = this.get('fret');
          var baseNote =  this.get('tuning_note'); //0 if A , -5 if E
          if(fret == "x"){
            //we don't play anything...
            actualNote = "x";
          }else if(fret == "0" || fret == 0){
            var actualNote = baseNote;
          }else{
            var actualNote = baseNote + parseInt(fret);
          }
          //var nam
          console.log('Change String! '+actualNote);
          
          this.set({
            note : actualNote, 
            note_name: get_note_name_by_num(actualNote)
            });
          this.refresh_view();
          this.draw_string('straight', 0, 0);
          
         // 
          
          // update the name as well...
         // var key_letters = Music.keys.split(' '); //Music.keys = "Ab A B C Db D Eb E F Gb G";
    		//	var letter = key_letters[(new_note +36) % 12];
    			
         // var new_audio = buildsound(); //... 
         // this.set({ audio: new_audio })
          //update interface according to model data.
      }, //eo change chord
      
      play: function() { //cald from click..
           // redraw canvas according to new values + time...
          // console.log('play:'+this.get('num'));
           this.refresh_view();
       },
     start_sound: function() {
         var a = this.get('audio');
         //a.play();
         this.build_sound(); //there's a loop happening...
     },
     build_sound: function(){
       //if(activeTuning == undefined) {activeTuning=Music.tunings.at(0);}
         //var rel = activeTuning.get('note_rel');
        // console.log("rel = "+rel);
        // note = rel[ key-1 ]; // return a semi-tone value difference from 440 A.
         // note = -2;
         var note = this.get('note');
         adsr.active = true; //basic envelope
         calculateADSR();
         a = buildSound(note, 'sine', adsr.master, 1.5, adsr, false);
         
        // this.set({audio: a});
         //a.play();
     },
     stop_sound: function() {
        var a = this.get('audio');
        a.pause();
     },
     redraw: function() {
         // redraw canvas according to new values + time...
     },
     draw_string: function( mode, point, timeRatio) {
       // mode: 'straight, wave, bent'
         // point: x, y object, of where the bent should be (if mode == 'bent')

         // @ cordeType: 'bass', "guitar", 'violin'
         // @ timeRatio: ratio, between 0-1, of where we are in th animation. 0 means we are NOT animating: static cordes
         // @activeCorde: the corde that IS vibrating right now (if any)

// alert(this.get('num'));

        // var canvas = document.getElementById("fret_canvas");
       //	var context = canvas.getContext("2d");
       var e_can = $('canvas', this.get('e'))[0];
       var context = $(e_can)[0].getContext('2d');
       	var topOffset = 10;
       	var fretHeight = 75; //px
       	var fret = this.get('fret');
       	var fret = this.get('fret');
       	var w = $(e_can).width();
       	var h = $(e_can).height();

       	context.clearRect(0,0,w,h); //erase last img
/*
       	if(cordeType == "guitar"){
       	  var minDiam = 3;
       	  var maxDiam = 20;
       	}else if(cordeType == "bass"){
         	  var minDiam = 8;
         	  var maxDiam = 30;
       	}else{ //violin?
       	  var minDiam = 2;
       	  var maxDiam = 10;
       	}*/

       	//draw frets...
        //////////////////////////////////
       	var dot_frets = [3,5,7,9,12,15,17,19,21];
       	for (var f=0; f<12; f++) {
       	  context.strokeStyle = '#ccc'; 
       	  context.lineWidth   = 2;
       	  if(f == 0){
       	    context.strokeStyle = '#555'; 
         	  context.lineWidth   = 20;//first bar is thick!
         	}
         	
         /*	if(_.include(dot_frets, f)){ //if it's a dotted fret...
         	  context.beginPath();
         	  context.strokeStyle = '#ccc'; 
         	  context.fillStyle = '#ccc'; 
             context.arc( w/2, (f*100 + 50-15), 10, 0, Math.PI*2, true);  //x,y,width,heigh
             context.closePath();
             context.fill();
         	}*/
         	
         	context.beginPath();
         	var y = f * fretHeight ;
         	if(this.get('first_last') == 'first'){
       	    context.moveTo(w/2, y);  //if it's the first string, only draw half of the fret...
       	  }else{
       	    context.moveTo(0, y); 
       	  }
       	  if(this.get('first_last') == 'last'){
       	    context.lineTo(w/2, y);
       	  }else{
       	    context.lineTo(w, y);
       	  }
       	  context.stroke();
         }

       	// Draw each cordes:
       	var vibDirection =  Math.random()*2 - 1;
       	//for (var c=0; c<nbCorde; c++) {
       	 // thickness = ((maxDiam-minDiam) * ((nbCorde-c) / nbCorde)) + minDiam;
          thickness = 3; //TODO
         var thickness = 1.4 * (6-this.get('num')) +2; //TODO
       	  context.strokeStyle = '#fff'; 
         	context.fillStyle = '#cee'; 
         	context.lineWidth   = thickness;
         	context.beginPath();

         	//posX = (c / (nbCorde+1) * w) + w/7;
         	posX = w/2; 
         	context.moveTo(posX, 0); // initial positions, lower left

       	  if(mode == 'wave'){
       	    context.strokeStyle = '#4cc'; // blue active color
       	    if (Math.random() > 0.5){ var revert = 1 }else{var revert = -1}
       	    for (var i=0; i<h; i+=10) { //we find vibrating x pos for 900px high...
       	      if ( i < fret * fretHeight){
       	        //draw staight before the active fret...
       	        context.lineTo(posX, i);
       	      }else{
       	        
       	      
       	      
           	    freq = thickness /1.5;
           	    amplitude = 1 * (thickness/3)+3;
           	   // amplitude = amplitude * Math.sqrt( Math.pow(i/h , 2)); // TODO: account fret pos...
           	    var dist_fret = (fret*fretHeight); //
           	    var active_range = h - dist_fret;
           	    amplitude = amplitude * Math.sqrt( Math.pow( (i - dist_fret) /(  active_range) , 2)); 
               // console.log((i - dist_fret) +' / ' + (  active_range));
           	    vib  = posX + ( amplitude *  Math.sin(i/freq* (1-timeRatio)) *revert );
           	    vib += (vibDirection * amplitude) * (1-timeRatio)*3; //this move the corde fomr left to right, simulating bending...
           		  context.lineTo(vib, i); //attack peak 
              }//end if
           	}//end loop
       	  }else if(mode == 'straight'){
       	    context.lineTo(posX, h); // straight line...
       	  }else if(mode == 'bent'){
       	    context.strokeStyle = '#4cc'; // blue active color
       	      if(point.x <0)point.x=0;
       	      if(point.y <0)point.y=0;
       	      if(point.x > w)point.x= w;
       	      context.lineTo(point.x, point.y); //bent point
       	      var x_pos_f = (point.x + posX) / 2; //we make an average between the bent point, and the middle, so the sting doesn't look attached to the bottom fret...
         	    context.lineTo(x_pos_f, h); // straight line...
         	 }




       	  // context.lineTo(w, h+topOffset*2); //end
           context.stroke();
         	// context.fill();

      // }

     },
     start_animation: function() { 
       // console.log('start anim');
      // var timer = setInterval(function(this) {
        this.count =0;
        if(this.timer != 0  )clearInterval(this.timer); //delete in case it already exists...
        this.timer = setInterval( (function(self){
        	return function(){
        	  self.set({vib_count: 0});
        	  self.repeat_animation();
       	}
     	})(this), 1000/30 ); //30 fps
       //this.set({timer: timer}); //save the interval object...
     },
     stop_animation: function() { 
       //console.log('STOP anim');
       // only execute if currently animating...
       //  timer = this.get('timer');
         clearInterval(this.timer); //TODO: not sure it'S cleared correctly... NOTT!!
         this.timer =0;
        // this.set({vib_count: 0, timer: 0});
      },
     repeat_animation: function() { 
       //console.log('Rpeat anim');
       // var t = this.get('timer_count');
       //check wherther or not the ratio is over
       //var vib_duration = 5;
      // var count = this.get('vib_count');
       var count = this.count ++;
      // this.count = this.count + 1; 
      // count++
       
       var vib_fps = 30;
       var ratio = (count / vib_fps) / vib_duration; // current / total-time
       //console.log('r= '+ratio + ', c='+count);
      if (ratio > 1) { 
        this.stop_animation();
      }else{
       this.set({vib_count: count +1 });
       this.draw_string('wave', 0, ratio);
      }
       
     },
     refresh_view: function(pos) {  //the jquery stuff...
      // console.log( this.get('num') );
      var fret = this.get('fret') ;
      var finger = fret; // TODO: build actual finger data!
       var id_s = this.get('num') ;
       
       var e = this.get('e');
     // $(e).children('.icon').text('note: '+ this.get('note'));
     // $(e).children('.dot').text('tune rel: '+ this.get('note_name'));
      $(e).children('.note').text(this.get('note_name'));
      
       if(fret == 'x'){ //set classes on string dot (so it moves!)
		     $(e).removeClass('open').addClass('x');
		     $(e).children('.icon').text('×'); //○
		   }else if(fret == '0'){ //it's open...
		     $(e).removeClass('x').addClass('open');
		     $(e).children('.icon').text('○'); //○
		   }else{
		     $(e).removeClass('x open');
		     $(e).children('.icon').text(fret);
		   }
		   $(e).children('.dot').removeClass('f1 f2 f3 f4 f5 f6 f7 f8 f9 f10 f11 f12 f13 f0 fx').addClass('f'+ fret);
		   $(e).children('.dot').text(finger); //set the number in the dot
     }

   });
   
   StringCollection = Backbone.Collection.extend({
           localStorage: new Store("InstrumentString"),
     			url: '/InstrumentString',
     //URL??? TRY COUCHAPP with Cloudant, ready to go with backbone!
           model: InstrumentString,
       get_playing: function(slug) {
          return _.filter(Music.chords.models, function(models){ return models['attributes']['playing'] == 1; }) //digg deep directly in the model collection and comapre...
        },
    get_open: function() {
      return Music.chords.at(0);
    },
    find_by_num: function(num) {
       return _.find(Music.strings.models, function(models){ return models['attributes']['num'] == num; }) //digg deep directly in the model collection and comapre...
     },
});
       
    