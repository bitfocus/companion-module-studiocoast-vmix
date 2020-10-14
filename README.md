# companion-module-studiocoast-vmix

Provides essential control over StudioCoast Vmix, for more info look in HELP.md
Go over to [vMix](https://www.vmix.com/) to learn more about the software.

**API Poll Interval**

The majority of vMix data used by Companion for feedback and variables is retrieved through the vMix REST API, the frequency at which this data is polled can be changed in the instance config. All instances prior to 1.2.6 had a poll interval of 100ms, but from 1.2.6 the default has been changed to 250ms. It is recommended that users who need responsive feedbacks and had no previous issues to lower the interval in the config back to 100ms, and for users with a significantly large number of inputs or running on older hardware to either leave the interval at 250ms, or enter a slower interval should the server be insufficient for the number of inputs.

**Using Custom Commands/Shortcodes**

When usin vMix shortcodes, please follow this syntax/layout, with space before the first value:

"ReplayMarkInOut Value=5000"

and if there is more than one parameter use "&" as a separator between them like the example below:

"SetOutput2 Value=Input&Input=3"

**V1.1.3**
* Added overlay functions
* Added set output functions
* Added the option to chose the port used to connect to vmix
* Added the option to chose weather or not to use the ID or the Title of inputs to select them

**V1.1.4**
* Bug fix with feedback (got introduced in V1.1.3)

**V1.1.5**
* Minor change

**V1.1.6**
* Added simple and generic presets for all commands

**V1.2.0**
* Added support for using either input ID or Title and switching at any time
* Added Tally update on first load
* Added Tally polling through API
* Added Support for Audio busses C to G, and Mix 2 to 4, from vMix v23
* Added Feedback for Overlays, Replay, Input/Bus Mute, Solo, Routing, Title text (including countdowns)
* Added action to set/increment/decrement Title text
* Added more presets
* Restructured module code, allowing for easier maintaining of code and future upgrades

**v1.2.1**
* Added feedback and instance variables for bus and input volume

**v1.2.2**
* Added MultiViewOverlay - Commands for setting and toggeling an overlay on/off
* Added SetMultiViewOverlay - Command for setting an Input on a MultiviewOverlay Layer
* Added VirtualSet - Command for Zooming in to one of the four Selected Preset
* Added SelectTitlePreset - Allows for the option to preprogram titles and just select a specific preset.
* Added Next and Previous Title Preset - Allows for the option to go back and fourth between title presets. 
* (note there is no preset or feedback for these commands!)

**v1.2.3**
* Added more preset options for existing commands
* Added a description on how to use Mix 2-4
* Added a Feedback for audio ON/Off (invers mute)
* Added presets for MultiView Overlays
* Added presets for selecting audio and video source for Vmix Calls
* Added presets for toggeling audio On/Off
* Added presets for using and settings Title layers and Presets

**v1.2.4**
* Added the option to select the layer when using actions afecting countdowns
* Added the action TitleBeginAnimation and ChangeCountdown to the list
* Fixed a bug with empty "lists inputs" breaking feedbacks

**v1.2.5**
* Updated some presets, with coresponding feedbacks
* Updated Video Timer feedback to autodetect and use "Mark out" if set
* Added More functions Afecting Video Playback and Marking In and Out's
* Added Presets for Video Playback and Marking In and Out's
* Added Feedback live dB for monitoring Audio on an input or a bus
* Added Varibles that lists the ShortTitle of an imput
* Added Varibles that lists the full title on "list" inputs 
* Updated Audio presets with the new feedbacks

**v1.2.6**
* Added default state values to prevent crashing when feedbacks are checked before the API is polled
* Added API Polling interval config option
* Increased default API poll interval from 100ms to 250ms.

**v1.2.7**
* Added ReplayPlaySelectedEventToOutput and ReplayPlayEventsByIDToOutput to the list of suported functions, with included presets.
* Added SetTransitionEffect and SetTransitionDuration to the list of actions, with presets.