

  
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
       Music.strings = new StringCollection;
       for(var i=0; i < this.get('nb_strings'); i++){ //we  initialize the strings here, so we can just update them later...
         ar_str[i] = new InstrumentString; // Populate the chord posistion based on the name...
         
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
       n.chord_shape_count = chord_shape.length;
       
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
         s.tuning_note_rel = t_note_rel[i];  //n um, relative to A 440
         s.tuning_diff = t_tuning_diff[i]; // difference with the 'normal' tuning
         
         
         var currentString = Music.strings.at(i);
         console.log(Music.strings.length);
         currentString.set(s);
      }
       
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

    select3: function() {
     alert('selected chord: ' + this.get('name'));
    }

   });


  
  ///////////////////////////////////////
  //  String (model)
  ////////////////////////////////////////
  


InstrumentString = Backbone.Model.extend({ // <<< Singleton
    defaults: {
         tuning_note_name: 'C',
         tuning_note_rel: '0',
         tuning_diff: 0,
         audio: {}
         
         
     },
     initialize: function() {
     },
     change_fret: function(new_fret_pos) { //call when we change chords on the neck...
          // redraw the chord
          this.set('fret' : new_fret_pos);
          // calculate the diff and the note name now, set it as well.
          
          //update interface according to model data.
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
    }
});
       
    