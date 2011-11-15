

## GUITAR

# features

-  alternate chords progress indicator (3 of 5 Dm7)
- Play sound on click
-   mute button

- Search?
- Restyle the neck
- draw frets DOTS on the board.
- animate strings according to the chord position (50px per fret...)...

- make an array of 1 sound per timmer, so we can play multiple string at the same time

- play chord (method that play all chords sequenced by a x delay between strings...)

- fade the end of the cavas (white fader? html5 degrad?)

- FLASH microphone: http://www.mediaboxstudios.com/blog/post/2010/01/21/Anatomy-of-a-Flash-101-Guitar-Tuner-Part-1.aspx



# Quoi  (Intermède technico-expérimentale)
- Un monstre: Aprox 25 pages dactylographié de code
(css:20kb, html:13kb, javascript:25kb)
- Génération d'un fichier son via une page web (sans plugins).
- Synthèse de fréquences.
- Interface de composition minimalement utilisable.
- Enveloppe ADSR gérant l'amplitude des sons dans le temps.
- Durée de son basé sur le tempo (bpm) et la sélection de l'usager

# Sous le capot
- HTML5: Lecture audio, "sliders", affichage des graphiques.
- CSS: Interface, mise en page, transitions, animations, effets. 
- Jquery: gestion du clavier, de l'interface et de l'affichage.
- Javascript: Synthèse du son (math), écriture du fichier son.
-   Ruby + GIT + Heroku: Back-end et hébergement.

# Ensuite
- Alter-dodécaphonisme ( ≠ 12 notes / octave )
- Choix varié d’échelles musicales (Mineur, Pentatonique, Blues)
- Effets supplémentaires (distorsion, "reverb", écho)
- Séquenceur (enregistrer des notes dans le temps)
- Écriture/lecture d'un fichier MIDI (et karaoké - yeah!)
- Design de d'autres instruments ("drum-machine")
- Créer un accordeur de guitare (ex: accorde-mon-banjo.org)
- Battements binauraux (moins utile, plus louche)
- Sono-Spirographe (pas utile, mais si amusant)
- Synthèse au format 16 bit (au lieu de 8bit/44khz)
- Débogage & dé-spaghettification du code (MVC avec backbone.js)
- Me faire des amis et présenter un concert louche (à la sat).

# Open-source + (C)
$ git clone git@github.com:iplanwebsites/audiosynth.git

♥ wikipedia











HTML5 Audio spec implementation (looping and playback)
http://www.w3schools.com/html5/att_audio_loop.asp


music is math - notes + frequencies
http://members.cox.net/mathmistakes/music.htm


Phasing FX.
http://www.math.montana.edu/frankw/ccp/before-calculus/trigonometry/soundtrg/body.htm

Distinction between differents wave type (swatooh, square, and sins)
http://en.wikipedia.org/wiki/Sine_wave

http://en.wikipedia.org/wiki/Harmonics




Phaser FX
http://en.wikipedia.org/wiki/Phaser_(effect)


Binaural recording
http://www.wired.com/threatlevel/2010/07/digital-drugs/
That is one positive use, to quit a drug. Other binaural beats are to help sleeping, positive thoughts, other good things. I've tried Gates of Hades and I couldn't finish listening to it. It is freaky. I-Doser wasn't kidding. I-Doser makes some of the most extreme binaural beats around. I'd like to NOTE that everyone reacts the same to a binaural beats. For example I could listen to a binaural beats like I-Doser's Cliffhanger (meant to feel like I'm on the edge of a clifft) and feel the full effect while someone else who tries it feels nothing. Doesn't work for everyone! Get that through your head

http://en.wikipedia.org/wiki/Binaural_beats

Brain waves
Main article: Electroencephalography
Frequency range	Name	Usually associated with:
> 40 Hz	Gamma waves	Higher mental activity, including perception, problem solving, fear, and consciousness
13–39 Hz	Beta waves	Active, busy or anxious thinking and active concentration, arousal, cognition, and or paranoia
7–13 Hz	Alpha waves	Relaxation (while awake), pre-sleep and pre-wake drowsiness, REM sleep, Dreams
4–7 Hz	Theta waves	deep meditation/relaxation, NREM sleep
< 4 Hz	Delta waves	Deep dreamless sleep, loss of body awareness



// LFO
http://en.wikipedia.org/wiki/Low-frequency_oscillation

An LFO can be routed to control, for example, the frequency of the audio oscillator, its phase, stereo panning, filter frequency, or amplification. When routed to control pitch, an LFO creates vibrato. When an LFO modulates amplitude (volume), it creates tremolo. On most synthesizers and sound modules, LFOs feature several controllable parameters, which often include a variety of different waveforms, a rate control, routing options (as described above), a tempo sync feature, and an option to control how much the LFO will modulate the audio signal.
Electronic musicians use LFO for a variety of applications. They may be used to add simple vibrato or tremolo to a melody, or for more complex applications such as triggering gate envelopes, or controlling the rate of arpeggiation.
Differences between LFO rates also account for a number of commonly heard effects in modern music. A very low rate can be used to modulate a filter's cutoff frequency, thereby providing the characteristic gradual sensation of the sound becoming clearer or closer to the listener. Alternatively, a high rate can be used for bizarre 'rippling' sound effects (indeed, another important use of LFO would be for various sound effects used in films). Such effects are difficult to describe, and are more understandable when heard. Dubstep is a form of electronic music that employs heavy use of LFOs for bass sounds that have a "generic wobble" effect.


<p><a href="http://www.codebase.es">Go home</a></p>

