// Music

#ifndef _4K_SONANT_MUSIC_
#define _4K_SONANT_MUSIC_

#include "sonant.h"

static song songdata = {4593,
	{ // Instruments
		{ // 0
			// Oscillator 1
			7, // Octave knob
			0, // Detune knob
			0, // Actual detune knob
			0, // Multiply freq by envelope
			192, // Volume knob
			2, // Wave form
			// Oscillator 2
			8, // Octave knob
			0, // Detune knob
			0, // Actual detune knob
			0, // Multiply freq by envelope
			157, // Volume knob
			3, // Wave form
			// Noise oscillator
			0, // Amount of noise to add
			// Envelope
			100, // Attack
			2727, // Sustain
			22727, // Release
			185, // Master volume knob
			// Effects
			2, // Hi/lo/bandpass or notch toggle
			11024, // FX Frequency
			240, // FX Resonance
			6, // Delay time
			132, // Delay amount
			0, // Panning frequency
			171, // Panning amount
			// LFO
			0, // Modify osc1 freq (FM) toggle
			1, // Modify fx freq toggle
			0, // LFO freq
			207, // LFO amount
			0, // LFO waveform
			// Patterns
			{1,2,1,3,1,2,1,3,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,3,4,5,4,6,4,5,4,6,1,2,1,3,4,5,4,6,1,2,1,3,4,5,4,6}, // Pattern order
			//{0}, // Mute
			{ // Columns
				{{152,  0,  0,  0,  0,  0,154,  0,  0,  0,  0,  0,155,  0,  0,  0,150,  0,  0,  0,  0,  0,157,  0,  0,  0,  0,  0,159,  0,  0,  0,}},
				{{148,  0,  0,  0,  0,  0,155,  0,  0,  0,  0,  0,154,  0,  0,  0,150,  0,  0,  0,  0,  0,157,  0,  0,  0,  0,  0,159,  0,  0,  0,}},
				{{148,  0,  0,  0,  0,  0,155,  0,  0,  0,  0,  0,154,  0,  0,  0,150,  0,  0,  0,  0,  0,157,  0,  0,  0,162,  0,157,  0,159,  0,}},
				{{152,  0,  0,  0,  0,  0,  0,  0,  0,  0,145,  0,150,  0,143,  0,  0,  0,145,  0,  0,  0,  0,  0,  0,  0,  0,  0,150,  0,  0,  0,}},
				{{148,  0,  0,  0,  0,  0,  0,  0,  0,  0,155,  0,154,  0,150,  0,  0,  0,157,  0,  0,  0,  0,  0,155,  0,157,  0,162,  0,164,  0,}},
				{{148,  0,  0,  0,  0,  0,  0,  0,  0,  0,155,  0,154,  0,150,  0,  0,  0,157,  0,  0,  0,  0,  0,155,155,154,150,157,162,164,167,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
			}
		},
		{ // 1
			// Oscillator 1
			6, // Octave knob
			0, // Detune knob
			0, // Actual detune knob
			1, // Multiply freq by envelope
			59, // Volume knob
			3, // Wave form
			// Oscillator 2
			6, // Octave knob
			0, // Detune knob
			0, // Actual detune knob
			1, // Multiply freq by envelope
			223, // Volume knob
			3, // Wave form
			// Noise oscillator
			0, // Amount of noise to add
			// Envelope
			39090, // Attack
			8181, // Sustain
			100000, // Release
			233, // Master volume knob
			// Effects
			0, // Hi/lo/bandpass or notch toggle
			0, // FX Frequency
			240, // FX Resonance
			6, // Delay time
			170, // Delay amount
			0, // Panning frequency
			0, // Panning amount
			// LFO
			1, // Modify osc1 freq (FM) toggle
			0, // Modify fx freq toggle
			2, // LFO freq
			69, // LFO amount
			0, // LFO waveform
			// Patterns
			{0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0}, // Pattern order
			//{0}, // Mute
			{ // Columns
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,140,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
			}
		},
		{ // 2
			// Oscillator 1
			4, // Octave knob
			0, // Detune knob
			0, // Actual detune knob
			0, // Multiply freq by envelope
			223, // Volume knob
			2, // Wave form
			// Oscillator 2
			4, // Octave knob
			0, // Detune knob
			0, // Actual detune knob
			1, // Multiply freq by envelope
			240, // Volume knob
			0, // Wave form
			// Noise oscillator
			0, // Amount of noise to add
			// Envelope
			100, // Attack
			10909, // Sustain
			100, // Release
			180, // Master volume knob
			// Effects
			2, // Hi/lo/bandpass or notch toggle
			11024, // FX Frequency
			240, // FX Resonance
			6, // Delay time
			3, // Delay amount
			0, // Panning frequency
			0, // Panning amount
			// LFO
			0, // Modify osc1 freq (FM) toggle
			1, // Modify fx freq toggle
			7, // LFO freq
			80, // LFO amount
			0, // LFO waveform
			// Patterns
			{0,0,3,4,1,2,1,2,5,6,5,6,5,6,5,6,5,6,5,6,7,8,7,8,0,0,0,0,5,6,5,6,1,2,1,2,7,8,7,8,7,8,7,8,0,0,0,0}, // Pattern order
			//{0}, // Mute
			{ // Columns
				{{152,152,164,152,164,164,152,164,152,152,164,152,164,164,152,164,155,155,167,155,167,167,155,167,157,157,169,157,169,169,157,169,}},
				{{160,160,172,160,172,172,160,172,160,160,172,160,172,172,160,172,162,162,174,162,174,174,162,174,167,167,179,167,179,179,167,179,}},
				{{152,  0,  0,  0,  0,  0,164,  0,  0,  0,164,  0,162,  0,164,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,148,  0,  0,  0,}},
				{{160,  0,  0,  0,  0,  0,148,  0,  0,  0,148,  0,136,  0,148,  0,154,154,  0,  0,166,154,154,166,166,166,167,167,157,157,169,169,}},
				{{164,176,  0,164,  0,  0,152,  0,  0,  0,  0,  0,  0,  0,  0,  0,162,174,  0,174,  0,  0,162,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{160,172,  0,172,  0,  0,160,  0,  0,  0,  0,  0,  0,  0,  0,  0,155,167,  0,167,  0,  0,154,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{164,164,152,164,152,152,164,152,164,164,152,164,152,152,164,152,162,162,174,162,174,174,162,174,162,162,174,162,174,174,162,174,}},
				{{160,160,172,160,172,172,160,172,160,160,172,160,172,172,160,172,155,155,167,155,167,167,155,167,154,154,166,154,166,166,154,166,}},
				{{140,  0,  0,140,  0,  0,140,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
			}
		},
		{ // 3
			// Oscillator 1
			9, // Octave knob
			0, // Detune knob
			0, // Actual detune knob
			1, // Multiply freq by envelope
			192, // Volume knob
			2, // Wave form
			// Oscillator 2
			9, // Octave knob
			7, // Detune knob
			0, // Actual detune knob
			1, // Multiply freq by envelope
			176, // Volume knob
			1, // Wave form
			// Noise oscillator
			0, // Amount of noise to add
			// Envelope
			600, // Attack
			7272, // Sustain
			1818, // Release
			81, // Master volume knob
			// Effects
			3, // Hi/lo/bandpass or notch toggle
			7824, // FX Frequency
			240, // FX Resonance
			6, // Delay time
			106, // Delay amount
			7, // Panning frequency
			254, // Panning amount
			// LFO
			0, // Modify osc1 freq (FM) toggle
			1, // Modify fx freq toggle
			1, // LFO freq
			199, // LFO amount
			0, // LFO waveform
			// Patterns
			{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,2,1,2,1,2,4,0,0,0,0,0,0,0,0,0,0,0,1,2,1,2,1,2,1,2,1,2,1,3}, // Pattern order
			//{0}, // Mute
			{ // Columns
				{{152,  0,  0,147,  0,  0,150,  0,  0,152,  0,  0,147,  0,150,  0,152,  0,  0,147,  0,  0,152,  0,  0,155,  0,  0,154,  0,150,  0,}},
				{{145,  0,  0,147,  0,  0,143,  0,  0,145,  0,  0,147,  0,150,  0,152,  0,  0,154,  0,  0,155,  0,  0,157,  0,  0,154,  0,150,  0,}},
				{{145,  0,  0,147,  0,  0,143,  0,  0,145,  0,  0,147,  0,150,  0,152,  0,  0,154,  0,  0,155,  0,  0,157,  0,  0,162,  0,164,  0,}},
				{{152,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
			}
		},
		{ // 4
			// Oscillator 1
			7, // Octave knob
			0, // Detune knob
			0, // Actual detune knob
			1, // Multiply freq by envelope
			238, // Volume knob
			3, // Wave form
			// Oscillator 2
			4, // Octave knob
			0, // Detune knob
			0, // Actual detune knob
			1, // Multiply freq by envelope
			6, // Volume knob
			0, // Wave form
			// Noise oscillator
			0, // Amount of noise to add
			// Envelope
			2727, // Attack
			42727, // Sustain
			97272, // Release
			122, // Master volume knob
			// Effects
			1, // Hi/lo/bandpass or notch toggle
			11024, // FX Frequency
			240, // FX Resonance
			6, // Delay time
			124, // Delay amount
			3, // Panning frequency
			254, // Panning amount
			// LFO
			0, // Modify osc1 freq (FM) toggle
			1, // Modify fx freq toggle
			5, // LFO freq
			254, // LFO amount
			0, // LFO waveform
			// Patterns
			{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,4,1,4,1,4,3,0}, // Pattern order
			//{0}, // Mute
			{ // Columns
				{{164,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,162,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{160,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,155,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{164,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{167,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,169,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
			}
		},
		{ // 5
			// Oscillator 1
			7, // Octave knob
			0, // Detune knob
			0, // Actual detune knob
			1, // Multiply freq by envelope
			255, // Volume knob
			0, // Wave form
			// Oscillator 2
			7, // Octave knob
			0, // Detune knob
			0, // Actual detune knob
			1, // Multiply freq by envelope
			255, // Volume knob
			0, // Wave form
			// Noise oscillator
			0, // Amount of noise to add
			// Envelope
			100, // Attack
			0, // Sustain
			3636, // Release
			254, // Master volume knob
			// Effects
			2, // Hi/lo/bandpass or notch toggle
			500, // FX Frequency
			254, // FX Resonance
			0, // Delay time
			27, // Delay amount
			0, // Panning frequency
			0, // Panning amount
			// LFO
			0, // Modify osc1 freq (FM) toggle
			0, // Modify fx freq toggle
			0, // LFO freq
			0, // LFO amount
			0, // LFO waveform
			// Patterns
			{0,0,1,2,3,4,3,4,1,0,1,0,5,5,5,6,3,4,3,4,3,4,3,4,1,0,0,7,1,1,1,2,3,4,3,4,3,4,3,4,3,4,3,4,1,1,1,1}, // Pattern order
			//{0}, // Mute
			{ // Columns
				{{147,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{147,  0,  0,  0,  0,  0,147,  0,  0,  0,147,  0,  0,  0,  0,147,147,  0,147,  0,147,  0,147,  0,147,147,147,147,147,147,147,147,}},
				{{147,  0,  0,  0,147,  0,  0,  0,147,  0,  0,  0,147,  0,  0,  0,147,  0,  0,  0,147,  0,  0,  0,147,  0,  0,  0,147,  0,  0,147,}},
				{{147,  0,  0,  0,147,  0,  0,  0,147,  0,  0,  0,147,  0,  0,  0,147,  0,  0,  0,147,147,  0,  0,147,  0,  0,147,147,  0,147,147,}},
				{{147,  0,  0,147,  0,147,  0,  0,  0,147,  0,147,  0,  0,147,  0,147,147,  0,147,  0,147,  0,  0,  0,147,147,147,  0,  0,147,147,}},
				{{147,  0,  0,147,  0,147,  0,  0,  0,147,  0,147,  0,  0,147,  0,147,147,  0,147,  0,147,  0,  0,  0,147,147,147,147,147,147,147,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,147,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
			}
		},
		{ // 6
			// Oscillator 1
			8, // Octave knob
			0, // Detune knob
			0, // Actual detune knob
			1, // Multiply freq by envelope
			221, // Volume knob
			0, // Wave form
			// Oscillator 2
			8, // Octave knob
			0, // Detune knob
			0, // Actual detune knob
			1, // Multiply freq by envelope
			210, // Volume knob
			0, // Wave form
			// Noise oscillator
			255, // Amount of noise to add
			// Envelope
			50, // Attack
			150, // Sustain
			15454, // Release
			229, // Master volume knob
			// Effects
			3, // Hi/lo/bandpass or notch toggle
			11024, // FX Frequency
			240, // FX Resonance
			6, // Delay time
			24, // Delay amount
			0, // Panning frequency
			20, // Panning amount
			// LFO
			0, // Modify osc1 freq (FM) toggle
			1, // Modify fx freq toggle
			7, // LFO freq
			64, // LFO amount
			0, // LFO waveform
			// Patterns
			{0,0,0,0,1,2,1,3,0,0,0,4,5,5,5,6,1,2,1,3,1,2,1,3,0,0,0,0,0,0,0,0,1,2,1,3,1,2,1,3,1,2,1,3,0,0,0,0}, // Pattern order
			//{0}, // Mute
			{ // Columns
				{{  0,  0,  0,  0,147,  0,  0,  0,  0,  0,  0,  0,147,  0,  0,  0,  0,  0,  0,  0,147,  0,  0,  0,  0,  0,  0,  0,147,  0,  0,  0,}},
				{{  0,  0,  0,  0,147,  0,  0,  0,  0,  0,  0,147,147,  0,  0,  0,  0,  0,  0,  0,147,  0,  0,  0,  0,  0,  0,  0,147,  0,147,147,}},
				{{  0,  0,  0,  0,147,  0,  0,  0,  0,  0,  0,  0,147,  0,  0,147,  0,  0,  0,  0,147,  0,147,147,  0,147,147,  0,147,147,147,147,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,147,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,147,  0,  0,  0,  0,  0,147,  0,  0,147,  0,  0,  0,  0,  0,  0,147,  0,  0,  0,  0,  0,147,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,147,  0,  0,  0,  0,  0,147,  0,  0,147,  0,  0,  0,  0,  0,  0,147,  0,  0,  0,  0,  0,147,147,147,147,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
			}
		},
		{ // 7
			// Oscillator 1
			8, // Octave knob
			0, // Detune knob
			0, // Actual detune knob
			0, // Multiply freq by envelope
			0, // Volume knob
			0, // Wave form
			// Oscillator 2
			8, // Octave knob
			0, // Detune knob
			0, // Actual detune knob
			0, // Multiply freq by envelope
			0, // Volume knob
			0, // Wave form
			// Noise oscillator
			255, // Amount of noise to add
			// Envelope
			100, // Attack
			1000, // Sustain
			100, // Release
			75, // Master volume knob
			// Effects
			1, // Hi/lo/bandpass or notch toggle
			11024, // FX Frequency
			240, // FX Resonance
			6, // Delay time
			96, // Delay amount
			4, // Panning frequency
			255, // Panning amount
			// LFO
			0, // Modify osc1 freq (FM) toggle
			1, // Modify fx freq toggle
			5, // LFO freq
			173, // LFO amount
			0, // LFO waveform
			// Patterns
			{0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,0,0}, // Pattern order
			//{0}, // Mute
			{ // Columns
				{{147,147,  0,147,  0,147,  0,147,147,  0,147,  0,147,  0,147,147,147,147,  0,147,  0,147,  0,147,147,147,147,  0,147,147,147,147,}},
				{{147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
				{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},
			}
		},
	}
};
// Empty column
//{{  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,}},

//#define _4K_SONANT_FASTFORWARD_ 0 // In pattern lengths
#define _4K_SONANT_ENDPATTERN_ 49 // End pattern

#endif
