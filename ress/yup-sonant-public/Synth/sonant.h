// Sonant Header

#ifndef _4K_SONANT_
#define _4K_SONANT_

#define WIN32_LEAN_AND_MEAN
#define WIN32_EXTRA_LEAN

#include <windows.h>
#include <mmsystem.h>

// Structs
// Columns
typedef struct {
    // Notes
    unsigned char   n[32];          // Notes (pattern length is 32)
} column;

// Instrument
typedef struct {
    // Oscillator 1
    unsigned char   osc1_oct;       // Octave knob
    unsigned char   osc1_det;       // Detune knob
    unsigned char   osc1_detune;    // Actual detune knob
    unsigned char   osc1_xenv;      // Multiply freq by envelope
    unsigned char   osc1_vol;       // Volume knob
    unsigned char   osc1_waveform;  // Wave form
    // Oscillator 2
    unsigned char   osc2_oct;       // Octave knob
    unsigned char   osc2_det;       // Detune knob
    unsigned char   osc2_detune;    // Actual detune knob
    unsigned char   osc2_xenv;      // Multiply freq by envelope
    unsigned char   osc2_vol;       // Volume knob
    unsigned char   osc2_waveform;  // Wave form
    // Noise oscillator
    unsigned char   noise_fader;    // Amount of noise to add
    // Envelope
    unsigned int    env_attack;     // Attack
    unsigned int    env_sustain;    // Sustain
    unsigned int    env_release;    // Release
    unsigned char   env_master;     // Master volume knob
    // Effects
    unsigned char   fx_filter;      // Hi/lo/bandpass or notch toggle
            float   fx_freq;        // FX Frequency
    unsigned char   fx_resonance;   // FX Resonance
    unsigned char   fx_delay_time;  // Delay time
    unsigned char   fx_delay_amt;   // Delay amount
    unsigned char   fx_pan_freq;    // Panning frequency
    unsigned char   fx_pan_amt;     // Panning amount
    // LFO
    unsigned char   lfo_osc1_freq;  // Modify osc1 freq (FM) toggle
    unsigned char   lfo_fx_freq;    // Modify fx freq toggle
    unsigned char   lfo_freq;       // LFO freq
    unsigned char   lfo_amt;        // LFO amount
    unsigned char   lfo_waveform;   // LFO waveform
    // Patterns
             char   p[48];          // Pattern order (Maximum 32 patterns)
    // Columns
    column          c[10];          // Columns (10 maximum)
} instrument;

// Songs
typedef struct {
    // Instruments
    instrument      i[8];           // Instruments (8 maximum)
} song;

#endif
