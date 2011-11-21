
  
  ///////////////////////////////////////
  //  Neck (model)
  ////////////////////////////////////////


Neck = Backbone.Model.extend({ // <<< Singleton
     defaults: {
         chord_name: 'C',
         chord_name_html: 'C',
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
         ar_str[i] = { num : i+1};
       }
       Music.strings.add(ar_str);
       this.set({strings : ar_str}); //save these 6 models reference.
       
       var slug_tuning = 'normal'
       this.set({ tuning: Music.tunings.find_by_slug(slug_tuning) });

        // get tuning data (arrays)
        var t = this.get('tuning');
       var t_note_rel = t.get('note_rel');
       var t_tuning_diff = t.get('diff');
       var t_note_name = t.get('note');
       
       this.change_chord(this.get('chord_name_slug')); //moved...
        
      this.wire_elements();
 },
 // NECK METHODS
  change: function(t) {
      // set the new tuning data
      console.log('neck has changed!');
      
      
      
  },
 
    // NECK METHODS
     change_tuning: function(t) {
         // set the new tuning data
     },
     change_chord: function(chord_name_slug) {
       // set the new chord data
       // call change position
       console.log('change chord' + chord_name_slug);
       var t = this.get('tuning');
       var t_note_rel = t.get('note_rel');
        var t_tuning_diff = t.get('diff');
        var t_note_name = t.get('note');
        
       var n={}
       
       n.chord_shape =  Music.chords.find_by_note_slug( chord_name_slug  );
       n.chord_shape_count = n.chord_shape.length;

       //set active shape
       n.active_chord_shape = n.chord_shape[ this.get('active_chord_shape_id') ];
       this.set(n);
      
      // get chord data
      var str_shape = n.active_chord_shape.get('fret');
      var shape = str_shape.split(' ');
      if (shape.length != this.get('nb_strings')) alert('Ooops... This chord does not have the right number of string for this instrument...');
     
      

      //  update string instances.
     for(var i=0; i < shape.length; i++){
        var s = {};
        s.fret = shape[i]; //this is the fret where there's a finger or "x".
        
        s.tuning_note_name = t_note_name[i];
        s.tuning_note = t_note_rel[i];  //n um, relative to A 440
        s.tuning_diff = t_tuning_diff[i]; // difference with the 'normal' tuning

        if(i == 0 ){ s.first_last = 'first'; }else if(i == shape.length-1 ){ s.first_last = 'last'; } //for drawing
        var currentString = Music.strings.at(i);
       currentString.set(s);
     }
       
       this.set({chord_name : n.active_chord_shape.get('note'), chord_name_html : n.active_chord_shape.get('note_html'), chord_desc : n.active_chord_shape.get('name')});
       n.active_chord_shape.get('fret');
       //update neck view
       this.update_neck_view();
       
       this.update_alt_shape_view();
       
       
       
       
     },
    change_position: function(pos) {
      alert('selected chord: ' + this.get('name'));
    },
    update_neck_view: function() {
      // var t = this.get('tuning');
 
      var name = this.get('chord_name');
      var desc = this.get('chord_desc');
      var html_name = this.get('chord_name_html');
      
      
     // var formated_name = note_html;
    
      
      $('#guitar_neck h1').html(html_name);
      $('#guitar_neck h3').html(desc);
    },
    update_alt_shape_view: function() {
      var shapes = this.get('chord_shape');
      
      var links = "";
      for(var i=0; i < shapes.length; i++){
        var s = shapes[i];
        //links += '<a href="#'+ 'normal' +'/'+ s.get('note_slug') +'/'+s.get('slug') + '" >'; //active tuning
         links += '<a href="#'+ 'normal' +'/'+ s.get('note_slug') +'/'+i + '" >'; // TODO: active tuning
        links += s.get('fret');
        links += '<canvas width="70" height="53"></canvas>' ;
        links += '</a>';
      }
      $('#guitar_neck #alt_positions nav').html(links);
      if(shapes.length <=1){
        $('#guitar_neck #alt_positions').hide();
      }else{
        $('#guitar_neck #alt_positions').show();
      }
      //draw the little graph for these chords...
      var obj = {};
      for(var i=0; i < shapes.length; i++){
        var s = shapes[i];
        obj.elem =  $('#alt_positions canvas')[i];
        obj.fret = s.get('fret');
        this.draw_chord_icon(obj);
      }
     // n.chord_shape =  Music.chords.find_by_note_slug( chord_name_slug  );
     //  n.chord_shape_count
      },
      
      draw_chord_icon: function(c) {
        var frets = c.fret;
        var fret_pos = frets.split(" ");
        var context = $(c.elem)[0].getContext('2d');
        
        var w = $(c.elem).width();
      	var h = $(c.elem).height();
        var nbCorde = 6;
        var offset = 9; // so fret don't go all the way from L to R
      	context.clearRect(0,0,w,h); //erase last img
        
        
        var dot_frets = [3,5,7,9,12,15,17,19,21];
      	for (var f=0; f<12; f++) {
      	  context.strokeStyle = '#ccc'; 
      	  context.lineWidth   = 1;
      	  if(f == 0){
      	    context.strokeStyle = '#fff'; 
        	  context.lineWidth   = 4;//first bar is thick!
        	}
        	context.beginPath();
        	var y = f*13;
      	  context.moveTo(0+offset, y); 
      	  context.lineTo(w-offset, y);
      	  context.stroke();
        }
        
        // Draw each cordes:
      //	var vibDirection =  Math.random()*2 - 1;
      	for (var c=0; c<6; c++) {
      	  posX = (c / (nbCorde+1) * w) + w/7;
      	  thickness = 4-((c/2.5)+1); //((maxDiam-minDiam) * ((nbCorde-c) / nbCorde)) + minDiam;
      	  context.strokeStyle = '#fff'; 
        	context.fillStyle = '#cee'; 
        	context.lineWidth   = thickness;
        	context.beginPath();
        	context.moveTo(posX, 0); // initial positions, lower left
          context.lineTo(posX, h); // straight line...
      	  context.stroke();
      	    
      	    //DOT:  draw the note-dot, if it'S there...
        	  if(fret_pos[c] != "0" && fret_pos[c] != "x"){
        	    context.beginPath();
          	  context.strokeStyle = '#000'; 
          	  context.fillStyle = '#37f'; 
              context.arc( posX, ((fret_pos[c]*13)-7), 4, 0, Math.PI*2, true);  //x,y,width,heigh
              context.closePath();
              context.fill();
        	  }
        	  
      	  }// eo loop
        
        
        
      },
    wire_elements: function() {
       $('#guitar_neck .string canvas').bind('click touch', function(){
         var num = $(this).parent().attr('data-id');
         var s = Music.strings.find_by_num(num);
         console.log(s);
          s.play();
       });
       $("#guitar_neck .string canvas").mousemove(function(e) {
         var num = $(this).parent().attr('data-id');
         var s = Music.strings.find_by_num(num);
        // var state = s.get('state');
         
         //s.stop_animation(); //if it were playing already, TODO: stop sound too!
         //var e_can = $('canvas', this)[0];
         var e_can = $(this);
         var pos= $(e_can).offset();
         
         var x= e.pageX - pos.left;
         var y= e.pageY - pos.top;
         s.draw_string('bent', {x:x, y:y}, 0);
         
        });
        $("#guitar_neck .string canvas").mouseleave  (function(e) {  //can't rely on mouseleave since mousemove is called too!
          var num = $(this).parent().attr('data-id');
           var s = Music.strings.find_by_num(num);
           // s.draw_string('straight', 0, 0);
          // s.stop_animation(); //restart?
           s.start_animation();
           s.start_sound();
           
           // TODO : start the sound + waving animation!
        });
      }

   });
