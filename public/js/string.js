


  
  ///////////////////////////////////////
  //  String (model)
  ////////////////////////////////////////
  


InstrumentString = Backbone.Model.extend({ // <<< Singleton
    defaults: {
         tuning_note_name: 'C',
         tuning_note: 0,
         tuning_diff: 0,
         num: 0,
         audio: {},
         first_last: 0 // 'first' or 'last'
     },
     initialize: function() {
       var id_s = this.get('num') ;
       var e = $('#string'+id_s );
       this.set({e: e});
     },
     change: function(new_fret_pos) { //call when we change chords on the neck...
       console.log('change...')
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
          console.log(actualNote);
          
          this.set({
            note : actualNote, 
            note_name: get_note_name_by_num(actualNote)
            });
          this.refresh_view();
          this.draw_string('straight', 0, 0);
          
          // update the name as well...
         // var key_letters = Music.keys.split(' '); //Music.keys = "Ab A B C Db D Eb E F Gb G";
    		//	var letter = key_letters[(new_note +36) % 12];
    			
         // var new_audio = buildsound(); //... 
         // this.set({ audio: new_audio })
          //update interface according to model data.
      },
      
      play: function() { //cald from click..
           // redraw canvas according to new values + time...
           console.log('play:'+this.get('num'));
           this.refresh_view();
       },
     start_sound: function() {
         var a = this.get('audio');
         a.play();
     },
     stop_sound: function() {
        var a = this.get('audio');
        a.pause();
     },
     redraw: function() {
         // redraw canvas according to new values + time...
     },
     start_sound: function() {
         alert('selected : ' + this.get('name'));
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
         	var y = f*100 + 30+50;
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
       	  context.strokeStyle = '#4cc'; 
         	context.fillStyle = '#cee'; 
         	context.lineWidth   = thickness;
         	context.beginPath();

         	//posX = (c / (nbCorde+1) * w) + w/7;
         	posX = w/2; 
         	context.moveTo(posX, 0); // initial positions, lower left

       	  if(mode == 'wave'){
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
       	  }else if(mode == 'straight'){
       	    context.lineTo(posX, h); // straight line...
       	  }else if(mode == 'bent'){
       	      context.lineTo(point.x, point.y); //bent point
       	      var x_pos_f = (point.x + posX) / 2; //we make an average between the bent point, and the middle, so the sting doesn't look attached to the bottom fret...
         	    context.lineTo(x_pos_f, h); // straight line...
         	 }




       	  // context.lineTo(w, h+topOffset*2); //end
           context.stroke();
         	// context.fill();

      // }

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
       
    