
function initAdsr(){
	
adsr = {};
adsr.duration = "1";
adsr.master = "1"; //100% volume
adsr.active = false;
	
createAdsrSlider('adsr_a');
createAdsrSlider('adsr_d');
createAdsrSlider('adsr_s_level');
createAdsrSlider('adsr_r');

createMasterVolume("master_volume");

calculateADSR();

$('.adsr_on').change(function(){
	var on = $(this).attr('checked');
	adsr.active = on;
});


}



function createAdsrSlider(id_s){
	console.log(id_s);
	var elem = document.getElementById(id_s)

	
fdSlider.createSlider({
  // Associate an input
  inp: elem,
  // Declare a step
  step:0.001, 
  // Min value
  min:0,
  // Max value
  max:1,
	classNames:"h-adsr",
	hideInput:true,
  // Use the "tween to click point" animation
  animation:"tween",
	callbacks:{
		'change':  [function(c){ refreshAdsrView(); }]
	},
  // Force the associated input to have a valid value
  forceValue:true
});

fdSlider.addEvent(elem, "change", function(e) {
  alert('b342342');
});

fdSlider.change =  function(){alert('b');};

}


function createMasterVolume(id_s){
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
			'change':  [function(c){ refreshAdsrView(); }]
		},
    // Give it the className "v-s2" which will make the slider 160px in height
    classNames:"v-150"
    });
}

function refreshAdsrView(){
	calculateADSR(); //throttle this?
}

function calculateADSR(){
	
	// Times sliders
	adsr.slider_a = parseFloat($('#adsr_a').val());
	adsr.slider_d = parseFloat($('#adsr_d').val());
	adsr.slider_s = parseFloat($('#adsr_s').val()); //this duration is hardcoded in an hidden input...
	adsr.slider_r = parseFloat($('#adsr_r').val());
	
	// Amplitudes
	adsr.level_s = $('#adsr_s_level').val();
	adsr.master = $('#master_volume').val();
	

	sliders_total = adsr.slider_a + adsr.slider_d + adsr.slider_s + adsr.slider_r;


adsr.ratio_a = adsr.slider_a / sliders_total;
adsr.ratio_d = adsr.slider_d / sliders_total;
adsr.ratio_s = adsr.slider_s / sliders_total;
adsr.ratio_r = adsr.slider_r / sliders_total;
//the sum of all these ratios equal one
	
	

adsr.pos_a = adsr.ratio_a; //relative position of the attack time, 0 -1
adsr.pos_d = adsr.ratio_a + adsr.ratio_d; //relative position of the decay time, 0 -1
adsr.pos_s = adsr.ratio_a + adsr.ratio_d + adsr.ratio_s; //relative position of the sustain time, 0 -1
adsr.pos_r = 1; 

drawAdsrGraph();

}




function drawAdsrGraph(){
	var canvas = document.getElementById("adsr_graph");
	var context = canvas.getContext("2d");
	
	var w = $(canvas).width();
	var h = $(canvas).height();
	var v = adsr.master; // master volume 0 - 1
	context.clearRect(0,0,w,h);
	
	
	//gridlines
	context.strokeStyle = '#fff'; 
	context.lineWidth   = 1;
	// A
	context.beginPath();
	context.moveTo(adsr.pos_a*w, h);
	context.lineTo(adsr.pos_a*w, 0);
	context.stroke();
	// D
	context.beginPath();
	context.moveTo((adsr.pos_d)*w, h);
	context.lineTo((adsr.pos_d)*w, 0);
	context.stroke();
	// S
	context.beginPath();
	context.moveTo(adsr.pos_s*w, h);
	context.lineTo(adsr.pos_s*w, 0);
	context.stroke();
	
	//MAIN STROKE
	context.strokeStyle = '#4cc'; 
	context.fillStyle = '#cee'; 
	context.lineWidth   = 4;
	context.beginPath();
	context.moveTo(0, h); // initial positions, lower left

	context.lineTo( adsr.pos_a*w, h-(v*h)); //attack peak 
	context.lineTo( (adsr.pos_d)*w, h-((v*adsr.level_s)*h) ); //d
	context.lineTo( (adsr.pos_s)*w, h-((v*adsr.level_s)*h) ); //s
	context.lineTo( (adsr.pos_r)*w, h);//lower right corder
	
  context.lineTo(w, h); //end
  context.stroke();
	context.fill();

	
}


