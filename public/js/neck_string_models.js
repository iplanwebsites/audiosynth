

  
  ///////////////////////////////////////
  //  Neck (model)
  ////////////////////////////////////////


Neck = Backbone.Model.extend({ // <<< Singleton
     defaults: {
         chord_name: 'C',
         chord_name_slug: 'c',
         chord_desc: 'major triad',
         nb_strings : 6,
         strings: [{ }],
         tuning: {},
         mode: 'chord', //can either be tuning or chord
         chord_shape: [{ }], //link to models
         active_chord_shape: { },
         active_chord_shape_id: 0, //id of the current used ID
         chord_shape_count:1
         
  },
  initialize: function() { 
       var n = { }; //neck update object
       
       var ar_str = [];
       var myObject = {};
       Music.strings = new StringCollection;
       for(var i=0; i < this.get('nb_strings'); i++){ //we  initialize the strings here, so we can just update them later...
         // ar_str[i] = new InstrumentString; // Populate the chord posistion based on the name...
         ar_str[i] = { num : i+1};
       }
       Music.strings.add(ar_str);
       this.set({strings : ar_str}); //save these 6 models reference.
       
       
       
      // console.log(this.get('strings'));
       //console.log(Music.ne)
      //this.set({ tuning: Music.tunings.find_by_slug('normal') });
       //this.set({ tuning: Music.tunings.at(0) });
       var slug_tuning = 'normal'
       this.set({ tuning: Music.tunings.find_by_slug(slug_tuning) });
       //alert(activeTuning);
       //set chord (by slug)
       
       n.chord_shape =  Music.chords.find_by_note_slug( this.get('chord_name_slug') );
       n.chord_shape_count = n.chord_shape.length;
       
       //set active shape
       n.active_chord_shape = n.chord_shape[ this.get('active_chord_shape_id') ];
       
        // get tuning data (arrays)
        var t = this.get('tuning');
       var t_note_rel = t.get('note_rel');
       var t_tuning_diff = t.get('diff');
       var t_note_name = t.get('note');
       
       // get chord data
       var str_shape = n.active_chord_shape.get('fret');
       var shape = str_shape.split(' ');
       if (shape.length != this.get('nb_strings')) alert('Ooops... This chord does not have the right number of string for this instrument...');
       

       // create / update string instances.
      for(var i=0; i < shape.length; i++){
         var s = {};
         s.fret = shape[i]; //this is the fret where there's a finger or "x".
         
         s.tuning_note_name = t_note_name[i];
         s.tuning_note = t_note_rel[i];  //n um, relative to A 440
         s.tuning_diff = t_tuning_diff[i]; // difference with the 'normal' tuning
         
         
         
        // s.num = i+1;
         if(i == 0 ){
           s.first_last = 'first';
         }else if(i == shape.length-1 ){
           s.first_last = 'last';
         }
         var currentString = Music.strings.at(i);
         //console.log(Music.strings.length);
        currentString.set(s);
       //currentString.change_fret();
      }
      this.wire_elements();
       
       //this.set({ complexity : total});   
 },
 
    // NECK METHODS
     change_tuning: function(t) {
         // set the new tuning data
     },
     change_chord: function(chord_name_slug) {
       // set the new chord data
       // call change position
       
       
       
       
       
       
       
       
       
       
       
       
       
       
     },
    change_position: function(pos) {
      alert('selected chord: ' + this.get('name'));
    },
    

    wire_elements: function() {
       $('#guitar_neck .string').bind('click touch', function(){
         var num = $(this).attr('data-id');
        
         var s = Music.strings.find_by_num(num);
         console.log(s);
          s.play();
       })
      }

   });


  
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
       
    