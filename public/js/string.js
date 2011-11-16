


  
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
     start_sound: function() {
       alert('selected : ' + this.get('name'));
     },
     refresh_view: function(pos) {  //the jquery stuff...
      // console.log( this.get('num') );
      var fret = this.get('fret') ;
      var finger = fret; // TODO: build actual finger data!
       var id_s = this.get('num') ;
       var e = $('#string'+id_s );
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
       
    