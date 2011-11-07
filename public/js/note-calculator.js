/*

horrible lib from: 
http://www.thewhippinpost.co.uk/tools/note-to-freq.htm
deternote(notemid)

modified so it's a bit more OOP

Original author unkonwn...

The script crashes all browser, garbage...


*/

function stopError() {
  return true;
}
window.onerror = stopError;
          
         function calculate(t1,t2){             // function of two arguments
  var val=Math.round((Math.log(t2/t1)/0.05776227)*100)/100;     // calculate math function
		var isNegitive = false;
		if (val < 0) {isNegitive = true}
                var isPositive = false;
		if (val > 0) {isPositive = true}
		val = Math.abs(val);  // convert 'val' to it's absolute value
		var isDecimal = false;
		if (val < 1) {isDecimal = true}
 	val = "" + val + "";  // convert 'val' to a string
		if (val.length == 3 & isDecimal) {val = "0" + val} // add a zero if val is < 0 and only 3 characters long
		if (isNegitive) {val = " - " + val} // add a "-" if val is negitive
                if (isPositive) {val = " + " + val} // add a "+" if val is negitive
  document.calc.result.value=val;      // put result in text box
}



     function calculate2(t1,t2)
     {             // function of two arguments
     var val=Math.round(100*(t1/t2)*1000)/1000;     // calculate math function
     document.calc2.result.value=val;      // put result in text box
     }
   

     function resultcalc()
     {  
        //return Math.round(Math.pow(x,n)*T1*1000)/1000; 
        document.form.answer.value=Math.round(Math.pow(document.form.x.value,document.form.n.value)*(document.form.T1.value)*1000)/1000;
     }


     function resultcalc3()
     {  
        //return Math.round(Math.pow(x,n)*1000)/1000; 
        document.form3.answer.value=Math.round(Math.pow(document.form3.x.value,document.form3.n.value)*100*1000)/1000;
     }

function Pournote(pourcentnote){

var pour;
var racine=1.05946309436;
var dep=pourcentnote.notedep.value;
var arr=pourcentnote.notearr.value;
ndep=frequence(dep);
narr=frequence(arr);

pour=Math.round(1000*(100+Math.round(1000*(narr-ndep)*100/ndep)/1000))/1000;

pourcentnote.pourcent.value=pour;
}

function frequence(note){
var hauteur;
var octave;
var res;
var r=1.05946309436;
var lala=523.251;
var alteration;
var decalage;
hauteur=note.charAt(0);
octave=note.charAt(1);

if (octave=="#" || octave=="b")
	{alteration=octave;
	 octave=eval(note.charAt(2));
	}

if (hauteur=="A" || hauteur=="a")
	res=lala*r*r*r*r*r*r*r*r*r;
if (hauteur=="B" || hauteur=="b")
	res=lala*r*r*r*r*r*r*r*r*r*r*r;
if (hauteur=="C" || hauteur=="c")
	res=lala;
if (hauteur=="D" || hauteur=="d")
	res=lala*r*r;
if (hauteur=="E" || hauteur=="e")
	res=lala*r*r*r*r;
if (hauteur=="F" || hauteur=="f")
	res=lala*r*r*r*r*r;
if (hauteur=="G" || hauteur=="g")
	res=lala*r*r*r*r*r*r*r;

if (alteration=="#")
	res=res*r;
if (alteration=="b")
	res=res/r;

decalage=octave-5;
res=res*Math.pow(2,decalage);
return res;
}

     function findbpm(form) 
     {
	var length = form.Length.value;
	var measure = form.Measure.options[form.Measure.options.selectedIndex].value;
	var beat = form.Beat.options[form.Beat.options.selectedIndex].value;
	form.bpm.value = Math.round(60000/(((length/beat)/measure)/4)*1000)/1000;
     }


     function findbpm2(form) 
     {
	var length = form.Length.value;
	var measure = form.Measure.options[form.Measure.options.selectedIndex].value;
        var rate = form.Rate.options[form.Rate.options.selectedIndex].value;
        var beat = form.Beat.options[form.Beat.options.selectedIndex].value;
	form.bpm.value = Math.round(60000/((((length/rate)*1000/beat)/measure)/4)*1000)/1000;
     }

     
     function notelength(form) 
     {
	var bpm = form.Bpm.value;
	var note = form.Note.options[form.Note.options.selectedIndex].value;
        var rate = form.Rate.options[form.Rate.options.selectedIndex].value;
	form.Length.value = Math.round((((60000*note*rate)/bpm)/1000)*100)/100;
     }


	 function duration(form) 
     {
	var bpm = form.Bpm.value;
	var bars = form.Measures.value;
	var beat = form.Beat.options[form.Beat.options.selectedIndex].value;
	var temp = beat/bpm*bars;
        form.minuts.value = Math.floor(temp);
        form.secondes.value = Math.round((temp - form.minuts.value)*60);
        form.Length.value = Math.round((beat*60/bpm)*bars);

        form.cent.value = Math.round((((beat*60/bpm)*bars) - Math.floor((beat*60/bpm)*bars))*100);        
        form.cent2.value = Math.round((((beat*60/bpm)*bars) - Math.floor((beat*60/bpm)*bars))*100); 
     }


	function bpm() {

		var bpm = window.document.FrmBPM.TxtBPM.value;
		window.document.FrmBPM.TxtHalfDot.value = Math.round((60000/bpm)*3*1000)/1000;
		window.document.FrmBPM.TxtHalf.value = Math.round((60000/bpm)*2*1000)/1000;
            window.document.FrmBPM.TxtQuarterDot.value = Math.round(((60000/bpm)/2)*3*1000)/1000;
		window.document.FrmBPM.TxtQuarter.value = Math.round((60000/bpm)*1000)/1000;
		window.document.FrmBPM.TxtQuarterTrip.value = Math.round(((60000/bpm)*2)/3*1000)/1000;
		window.document.FrmBPM.TxtEighthDot.value = Math.round(((60000/bpm)/4)*3*1000)/1000;
		window.document.FrmBPM.TxtEighth.value = Math.round((60000/bpm)/2*1000)/1000;
		window.document.FrmBPM.TxtEighthTrip.value = Math.round((60000/bpm)/3*1000)/1000;
		window.document.FrmBPM.TxtSixth.value = Math.round((60000/bpm)/4*1000)/1000;
		window.document.FrmBPM.TxtSixthTrip.value = Math.round((60000/bpm)/6*1000)/1000;
		window.document.FrmBPM.Txt32.value = Math.round((60000/bpm)/8*1000)/1000;
		window.document.FrmBPM.SecPerBar.value = Math.round((60000/bpm)*(4/1000)*1000)/1000;
	}

	function freqie() {

		var bpm = window.document.FrmBPM.TxtBPM.value;
		window.document.FrmBPM.TxtHalfDot2.value = Math.round(1000/((60000/bpm)*3)*1000)/1000;
		window.document.FrmBPM.TxtHalf2.value = Math.round(1000/((60000/bpm)*2)*1000)/1000;
            window.document.FrmBPM.TxtQuarterDot2.value = Math.round(1000/(((60000/bpm)/2)*3)*1000)/1000;
		window.document.FrmBPM.TxtQuarter2.value = Math.round(1000/((60000/bpm))*1000)/1000;
		window.document.FrmBPM.TxtQuarterTrip2.value = Math.round(1000/(((60000/bpm)*2)/3)*1000)/1000;
		window.document.FrmBPM.TxtEighthDot2.value = Math.round(1000/(((60000/bpm)/4)*3)*1000)/1000;
		window.document.FrmBPM.TxtEighth2.value = Math.round(1000/((60000/bpm)/2)*1000)/1000;
		window.document.FrmBPM.TxtEighthTrip2.value = Math.round(1000/((60000/bpm)/3)*1000)/1000;
		window.document.FrmBPM.TxtSixth2.value = Math.round(1000/((60000/bpm)/4)*1000)/1000;
		window.document.FrmBPM.TxtSixthTrip2.value = Math.round(1000/((60000/bpm)/6)*1000)/1000;
		window.document.FrmBPM.Txt322.value = Math.round(1000/((60000/bpm)/8)*1000)/1000;
		window.document.FrmBPM.Txtdcpoint2.value = Math.round(1000/(((60000/bpm)/8)*3)*1000)/1000;
	}

	function freqns() {

		var bpm = window.document.FrmBPM.TxtBPM.value;
		window.document.FrmBPM.TxtHalfDot2.value = (Math.round(1000/((60000/bpm)*3)*1000) < 1000) ? "0"+Math.round(1000/((60000/bpm)*3)*1000)/1000 : ""+Math.round(1000/((60000/bpm)*3)*1000)/1000;
		window.document.FrmBPM.TxtHalf2.value =  (Math.round(1000/((60000/bpm)*2)*1000) < 1000) ? "0"+Math.round(1000/((60000/bpm)*2)*1000)/1000 : ""+Math.round(1000/((60000/bpm)*2)*1000)/1000;
            window.document.FrmBPM.TxtQuarterDot2.value = (Math.round(1000/(((60000/bpm)/2)*3)*1000) < 1000) ? "0"+Math.round(1000/(((60000/bpm)/2)*3)*1000)/1000 : ""+Math.round(1000/(((60000/bpm)/2)*3)*1000)/1000;
		window.document.FrmBPM.TxtQuarter2.value = (Math.round(1000/((60000/bpm))*1000) < 1000) ? "0"+Math.round(1000/((60000/bpm))*1000)/1000 : ""+Math.round(1000/((60000/bpm))*1000)/1000;
		window.document.FrmBPM.TxtQuarterTrip2.value = (Math.round(1000/(((60000/bpm)*2)/3)*1000) < 1000) ? "0"+Math.round(1000/(((60000/bpm)*2)/3)*1000)/1000 : ""+Math.round(1000/(((60000/bpm)*2)/3)*1000)/1000;
		window.document.FrmBPM.TxtEighthDot2.value = (Math.round(1000/(((60000/bpm)/4)*3)*1000) < 1000) ? "0"+Math.round(1000/(((60000/bpm)/4)*3)*1000)/1000 : ""+Math.round(1000/(((60000/bpm)/4)*3)*1000)/1000;
		window.document.FrmBPM.TxtEighth2.value = (Math.round(1000/((60000/bpm)/2)*1000) < 1000) ? "0"+Math.round(1000/((60000/bpm)/2)*1000)/1000 : ""+Math.round(1000/((60000/bpm)/2)*1000)/1000;
		window.document.FrmBPM.TxtEighthTrip2.value = (Math.round(1000/((60000/bpm)/3)*1000) < 1000) ? "0"+Math.round(1000/((60000/bpm)/3)*1000)/1000 : ""+Math.round(1000/((60000/bpm)/3)*1000)/1000;
		window.document.FrmBPM.Txtdcpoint2.value = (Math.round(1000/(((60000/bpm)/8)*3)*1000) < 1000) ? "0"+Math.round(1000/(((60000/bpm)/8)*3)*1000)/1000 : ""+Math.round(1000/(((60000/bpm)/8)*3)*1000)/1000;
		window.document.FrmBPM.TxtSixth2.value = (Math.round(1000/((60000/bpm)/4)*1000) < 1000) ? "0"+Math.round(1000/((60000/bpm)/4)*1000)/1000 : ""+Math.round(1000/((60000/bpm)/4)*1000)/1000;
		window.document.FrmBPM.TxtSixthTrip2.value = (Math.round(1000/((60000/bpm)/6)*1000) < 1000) ? "0"+Math.round(1000/((60000/bpm)/6)*1000)/1000 : ""+Math.round(1000/((60000/bpm)/6)*1000)/1000;
		window.document.FrmBPM.Txt322.value = (Math.round(1000/((60000/bpm)/8)*1000) < 1000) ? "0"+Math.round(1000/((60000/bpm)/8)*1000)/1000 : ""+Math.round(1000/((60000/bpm)/8)*1000)/1000;
	}

	function freq()
	{   
	if (navigator.appName == "Netscape")
       		freqns()   
	   else freqie()
	}

	function temp() {

		var bpm = window.document.FrmBPM.TxtBPM.value;
		window.document.FrmBPM.Txtblanpoint.value = Math.round((bpm*3)*1000)/1000;
		window.document.FrmBPM.Txtblan.value = Math.round((bpm*2)*1000)/1000;
                window.document.FrmBPM.Txtnoirpoint.value = Math.round(((bpm*1)+(bpm/2))*1000)/1000;
		window.document.FrmBPM.Txtnoir.value = Math.round(bpm*1000)/1000;
		window.document.FrmBPM.Txtcrochpoint.value = Math.round((bpm-(bpm/4))*1000)/1000;
		window.document.FrmBPM.Txtdcpoint3.value = Math.round((bpm-(bpm/1.60))*1000)/1000;
		window.document.FrmBPM.Txtnoirtriol.value = Math.round((bpm-(bpm/3))*1000)/1000;
		window.document.FrmBPM.Txtcroch.value = Math.round((bpm/2)*1000)/1000;
		window.document.FrmBPM.Txttriolcroch.value = Math.round((bpm/3)*1000)/1000;
		window.document.FrmBPM.Txtdcroch.value = Math.round((bpm/4)*1000)/1000;
		window.document.FrmBPM.Txttrioldcroch.value = Math.round((bpm/6)*1000)/1000;
		window.document.FrmBPM.Txttriplcroch.value = Math.round((bpm/8)*1000)/1000;
	}




///////////////////////////////////
function deternote(freq){

var r=1.05946309436;
var lala=523.251;
var notetest= freq; // our frequence in HZ
var ref=lala;
var hauteur=1;
var octave=4;
var alteration;
var supinf=0;
var compteur=0;
var hautnb=1;
var noteton;
var ref1=0;
var ref2=0;
var temp;
var flag=0;
var nmidi=72;
tableau=new Array();



while (notetest<ref){
	ref=Math.floor(1000*ref/r)/1000;
	compteur=compteur+1;
	supinf=-1;
	flag=1;
	ref1=ref;}	

while (notetest>ref){
	ref=Math.floor(1000*ref*r)/1000;
	compteur=compteur-1;
	supinf=1;
	ref2=ref;}


if (Math.abs(notetest-ref1)<Math.abs(notetest-ref2))
	{supinf=-1;
	 compteur=compteur+1;
	}
else
	{if (flag==1)
		{supinf=-1;
	 	}
	}

if (ref1==0)
	{ref1=Math.floor(1000*ref/r)/1000;
	 if (Math.abs(notetest-ref1)<Math.abs(notetest-ref2))
		{compteur=compteur+1;
	 	 supinf=1;}
	}

	
compteur=Math.abs(compteur);

while (compteur != 0 ){
	if ((hautnb==1 && supinf==-1) || (hautnb==12 && supinf==1) )
		{octave=octave+eval(supinf);
		 if (supinf==1)
			hautnb=0;
		 if (supinf==-1)
			hautnb=13;
		}
	hautnb=hautnb+supinf;
	nmidi=nmidi+supinf;
	compteur=compteur-1;
			}

hauteur=eval(hautnb);
if (hauteur==1)
	noteton="C";
if (hauteur==2)
	noteton="C#";
if (hauteur==3)
	noteton="D";
if (hauteur==4)
	noteton="D#";
if (hauteur==5)
	noteton="E";
if (hauteur==6)
	noteton="F";
if (hauteur==7)
	noteton="F#";
if (hauteur==8)
	noteton="G";
if (hauteur==9)
	noteton="G#";
if (hauteur==10)
	noteton="A";
if (hauteur==11)
	noteton="A#";
if (hauteur==12)
	noteton="B";

tableau[0]=noteton;
tableau[1]=octave.toString(10);



theNote = {
	name: tableau.join(" "),
	num: nmidi
	}
//notemid.note.value= tableau.join(" ");
//notemid.numero.value= nmidi;
return theNote

}