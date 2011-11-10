function initLfo(){
	
	lfo = {};
	lfo.vol = "1"; //100% volume
	lfo.active = false;
	lfo.freq_slider = "-12";
	lfo.freq_rel = "-12";
	lfo.hz_freq = "440"; //hz
	lfo.freq_locked = true;
	lfo.waveform = "sine";
	lfo.a = new Audio
	lfo.duration = 10; //30 seconds!
	
	initLfoVolume('lfo_vol');

	//on/off switch
	$('.lfo_on').change(function(){
		var on = $(this).attr('checked');
		//var lfoId = $(this).attr('data-lfo');
		lfo.active = on;
		if(on){
			lfoPlay();
			$('#lfo1.box').addClass('on');
		}else{
			lfo.a.pause();
			$('#lfo1.box').removeClass('on');
		}
	});
	
	$('.chk_even').change(function(){
		var on = $(this).attr('checked');
		lfo.freq_locked = on;
		lfoChange(); //activate snaping
	});
	
	
	var e_freq = document.getElementById('lfo_freq')
	createLfoFreqSlider( e_freq );
	
}


//////////////////////////
// Controling
//////////////////////////

function lfoChange(){
	
	lfo.freq_slider = $('#lfo_freq').val();
	
	// rounding frequence
	if (lfo.freq_locked){
		lfo.freq_rel = Math.round(lfo.freq_slider);
	}else{
		lfo.freq_rel = lfo.freq_slider;
	}
	lfo.hz_freq = getFreq(lfo.freq_rel);
	//lfo.note = deternote(lfo.freq_rel); //this will populate note.name, and note.num
	
	$('#lfos .actual_freq').text(smartRound(lfo.hz_freq));
	/*if(lfo.freq_locked){
		$('#lfos .note_name').show().text(lfo.note.name + '('+lfo.note.num +')');
	}else{
		$('#lfos .note_name').hide();
	}*/
	
	
	//play if active
	if(lfo.active){
		lfoPlay(); //play LFO with new data!
	}else{
		lfo.a.pause(); //just in case it isn'T stopped already...
	}
	console.log(lfo.freq_rel);
}

function lfoPlay(){
//	$.throttle( 250, true, function(e){
		lfo.a.pause();//stop the old sound...
		lfo.a = buildSound(lfo.freq_rel, lfo.waveform, lfo.vol, lfo.duration, 0, false); //0 envelopes..., false=no noise.
		lfo.a.loop = true;
  	lfo.a.play();
	//})
}


//////////////////////////
// UI Stuff
//////////////////////////

function createLfoFreqSlider(e){
fdSlider.createSlider({
  // Associate an input
  inp: e,
  // Declare a step
  step:0.001, 
  // Min value
  min:-96,
  // Max value
  max:-12,
	classNames:"h_lfo_freq",
	hideInput:true,
  // Use the "tween to click point" animation
  animation:"jump",
	callbacks:{
		'change':  [function(c){ lfoChange(); }]
	},
  // Force the associated input to have a valid value
  forceValue:true
});
}



function initLfoVolume(id_s){
	fdSlider.createSlider({
    // Associate the select list
    inp:document.getElementById(id_s),
    // Use the tween animation
    animation:"jump",
    // Min value
    min:0,
    // Max value
    max:1,
		step:0.001,
    // Keep the form element, in this case a select list, visible
    hideInput:true,
    // Create a vertical slider
    vertical:true,
		callbacks:{
			'change':  [function(c){ 
					lfo.vol= $('#lfo_vol').val(); 
					lfoChange();
				}]
		},
    // Give it the className "v-s2" which will make the slider 160px in height
    classNames:"v-lfo"
    });
}



///////////////////////////////////
// Scale 10 / 12 note per octave
///////////////////////////////////
function updateScaleFreq(){
	freqRatio  = Math.pow(2, 1/musicScale);
}

function initScaleSelector(){
//UI chkbox
	$('.chk_freq_scale').change(function(){
		var on = $(this).attr('checked');
		if(on){
			musicScale = 10;
		}else{
			musicScale = 12;
		}
		updateScaleFreq();
	});

	$('.chk_freq_scale').trigger('change'); //explicitely call the event
	updateScaleFreq();
}



///////////////////////////////////
// TEMPO + DUration Controls
///////////////////////////////////

function initTempo(){
 // initTempoSlider('s_tempo');
	//initDurationSlider('s_duration');
	$('#input_bpm').bind('change click focus blur keypress', function(){
    calculateDuration();
  })
  
	calculateDuration();
}

function calculateDuration(){
	//tempo = $('#s_tempo').val();
	tempo = $('#input_bpm').val();
	
	//var rel = 25 - $('#s_duration').val(); // so it's 15 to 0 now
	var rel = keyDuration; //between 1-10
	rel = rel +2; // OFFSET
	var pow = Math.pow(2, rel*-1);
	/*
	if(pow > 1){
		var friendlyDuration = '1/'+ pow + ' sec.' 
	}*/
	
	var duration = (1/pow) / tempo;
	noteDuration = duration; //in seconds
	
	$('.actual_note_duration').text(smartRound(duration));
	$('.actual_tempo').text(tempo);
	console.log('duration='+duration);
	console.log('pow='+pow);
}


function initTempoSlider(id_s){  //USELESS FUNCTION...
	fdSlider.createSlider({
    inp:document.getElementById(id_s),
    animation:"tween",
    min:1,
    max:240,
		step:1,
    hideInput:true, 
    vertical:false,
		callbacks:{
			'change':  [function(c){ 
					calculateDuration();
				}]
		},
    classNames:"h-150"
    });
}

/*
function initDurationSlider(id_s){
	fdSlider.createSlider({
    inp:document.getElementById(id_s),
    animation:"tween",
    min:1,
    max:12,
		step:1,
    hideInput:true, 
    vertical:false,
		callbacks:{
			'change':  [function(c){ 
					calculateDuration();
				}]
		},
    classNames:"h-150"
    });
}*/



