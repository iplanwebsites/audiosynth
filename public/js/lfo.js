function initLfo(){
	
	lfo = {};
	lfo.vol = "1"; //100% volume
	lfo.active = true;
	lfo.freq_slider = "-12";
	lfo.freq_locked = true;
	lfo.waveform = "sine";
	
	initLfoVolume('lfo_vol');

	//on/off switch
	$('.lfo_on').change(function(){
		var on = $(this).attr('checked');
		//var lfoId = $(this).attr('data-lfo');
		lfo.active = on;
	});
	
	$('.chk_even').change(function(){
		var on = $(this).attr('checked');
		lfo.freq_locked = on;
	});
	
	
	var e_freq = $('.lfo_freq'); 
	createLfoFreqSlider( e_freq );
	
}


function lfoChange(){
	console.log('change');
	lfo.freq = $('.lfo_freq').val();
	
}


function createLfoFreqSlider(e){

fdSlider.createSlider({
  // Associate an input
  inp: e,
  // Declare a step
  step:0.001, 
  // Min value
  min:-36,
  // Max value
  max:-12,
	classNames:"h-adsr",
	hideInput:true,
  // Use the "tween to click point" animation
  animation:"tween",
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
    animation:"tween",
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
				}]
		},
    // Give it the className "v-s2" which will make the slider 160px in height
    classNames:"v-150"
    });
}
