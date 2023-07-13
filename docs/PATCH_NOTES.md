# Patch Notes

**V3.4.2**
- Added logging and a hold on polling the API if the time to process the data completely is greater than the polling interval

**V3.4.1**
- Performance improvements for vMix productions with a large number of inputs
- Fixed an issue with the initial request for Activator data

**V3.4.0**
- Added Process ID logged to Debug at start to aid in debugging/performance tracking
- Fixed missing instance variables for Dynamic Inputs
- Fixed TCP pings on connections not yet established
- Fixed Browser Navigate action parsing variables
- Added Input option for Transition Mix actions, allowing transitioning to a specific input, or Preview if left blank

**V3.3.0**
- Added Feedback for Dynamic Input and Dynamic Values
- Added Start / Stop options for the Output Functions action
- Fixed an issue with changing the vMix IP or Port not working correctly until restarting instance
- Added extra TCP debug logging, and PING messages for Activator and Function sockets

**V3.2.0**
- Added Bus and Input volume meter feedbacks
- Replaced local indicators with indicators from companion-module-utils

**V3.1.1**
- Fixed an issue when specifying a non-existent input for the Overlay State feedback

**V3.1.0**
- Added a variables HTTP endpoint to retrieve all of the current instance variables
- Fixed incorrect parsing of variables for basic commands
- Fixed Meter amplitude to dB math in instance variables

**V3.0.2**
- Added more Action and Feedback descriptions
- Fixed Replay Fastforward/Backward speed and tbar action
- Added Preview and Program options for layer routing
- Cleanup of Instance Variables code
- Added variables for Input List Items - eg `$(vmix:input_X_list_Y_name)`, where x is an input name/number/key, and Y is the list item index (starting from 1)
- Added Instance Variable support for adjusting Pan/Zoom value
- Added Reset Input action
- Selected Index feedback and variables now support Virtual Sets

**V3.0.1**
- Fixed issue with actions not parsing correctly
- Added parsing of instance variables for countdown time/duration
- Added instance variables for mix layers
- Added Bus Select action, and options/variables for the currently selected bus
- Changed mix 2 to 16 to use ActiveInput to cut without changing preview
- Fixed an issue with volume linear rounding
- Minor performance tweaks and updates

**V3.0.0**
- Companion v3 compatibility
- Removed deprecated feedbacks that updated button text
- Removed instance variables for each time format, instead use Expression Functions in Companion v3


**V2.1.3**
- Added HTTP POST endpoint to send actions to a vMix instance
- Minor fixes for v26 support


**V2.1.2**
- Added v26 support for 15 Mixes
- Fixed selected mix on setMultiviewOverlay
- Fixed some missing variables for Mixes


**V2.1.1**
- Fixed some HTTP request types
- Fixed some variable names


**V2.1.0**
- Added support for Companions instance HTTP requests
- Added instance timers to support greater complexity that vMix native countdowns
- Adjusted Audio - Input Mute feedback to use buttons foreground color when not muted


**V2.0.15**
- Fix time parsing for instance variables


**V2.0.14**
- Fix Connection Status Variable not updating when closing vmix


**V2.0.10**
- Rewrite in TypeScript
- Significant overhaul of instance variables
- standardized actions/feedback/variables structure
- 3 TCP sockets to split traffic for XML data, Activators, and Functions
- Better TCP message handling
- Added vMix v25 Actions, Feedback, and Activator handlers
- Added button shifting feature
- Loads more Instance Variables
- Deprecated titleLayer, inputSelectedIndexName, and multiviewLayer Feedbacks
- Deprecated input_volume_${input.number} and input_volume_${inputName} instance variables
- Numerous minor fixees


**V1.2.24**
- Replacement receive buffer extraction to help prevent buffer overflows


**V1.2.23**
- Hotfix for feedbacks that got broken in the last update
- Hotfix for Input names not working in feedbacks


**V1.2.22**
- Added support for variables in all text fields inside Actions
- Added support for variables in all text fields inside Feedbacks


**V1.2.20**
- Added Actions and Feedbacks for Routable "multiview overlays" / "Layers" (Check help guide for more info)
- Updated Help.md file
- Added Presets for new Actions


**V1.2.19**
- Rolled back changed to "Custom Command" so it's identical to in v2.1.2, with no encoding.
- Added a note in the config page about TCP port vs HTTP port in vMix.
- Added option to disable error logs flodding the Log when vmix is closed.
- Added Variables for recording time, both in full duration (Seconds) and in HH:MM:SS format.
- Added some new actions for Browser inputs, like "Browser - Navigate" and more.
- Added Feedback for if input is used on a multiview layer.
- Added Feedback to show what input is selected on a multiview layer.
- Renamed Multiview actions to match v24 and v23 namings.


**V1.2.18**
- Hotfix for "Custom Commands" not working


**v1.2.17**
- Added Action "Audio Plugin On/Off/Toggle/Show On Input"
- Added Action "Channel Matrix Apply Preset"
- Added Action for Dynamic Inputs and Values support
- Added Stinger 3 and 4 to actions and feedbacks
- Added Feedback "Video Call - Video Source"
- Added Feedback "Overlay - Overlay on PGM or PRV"
- Added Variables for overlay 1-4 (PGM, PRV, Input name, Input NR). Variables on Stingers don't give any benefits
- Added Variables For vMix States (recording, streaming, fullscreen, ect)
- Updated Presets with new feedback's and action.
- Bugfix: Fixed custom command not working with the new URI encoding.


**V1.2.16**
- Bug fix: T-bar reworked


**V1.2.15**
- Added SetMultiViewOverlayOnPreview and SetMultiViewOverlayOnProgram
- Bug Fixed: Missing URI encoding on inputs and variables has now been added


**V1.2.14**
- Hotfix: Make sure data.status is defined


**V1.2.13**
- Added ON/OFF/Togle option to solo and bus solo action
- Hotfix: LiveBusVolume feedback not updating corectly


**v1.2.12**
- Added config option to display volume variables/feedback as a linear value (this will match the slider position within vMix, rather than the actual volume level)
- Fixed serveral input/bus volume variables/feedbacks not correctly updating
- Fixed handling of a bug where replay data from the API may be incomplete if polled at during load/unload of the input
- Fixed a bug where variable definitions was being updated on any change to any input
- Added Action "SelectIndex" to select specific slides and videos in list inputs
- Added Feedbacks: inputSelectedIndex and inputSelectedIndexName, provides feedbacks depending on selected index in a list or powerpoints
- Added Variables: input_X_selected_name and input_X_selected
- Added Variables for mix 1-4 program and preview, these can be used with the new trigger menu to press buttons in companion
- Added Variables for Video call password, call connected, audio source and video source
- Added input GUID's as variables, for ease of use
- Added presets for the new additions


**v1.2.11**
- Added 'Layer Indicator' option for input Preview/Program feedback to show if an input is in a layer or overlay going to Preview/Program
- Fixed a bug that caused a crash if vMix version was v22 or older


**v1.2.10**
- Added support for vMix Activators, allowing some feedbacks to be more responsive
- Added support for up to 8 replay cameras
- Added vMix Call audio source feedback
- Fixed a bug with the SelectPlayList actions missing param name


**v1.2.9**
- Fixed a bug with preset send input to program buttons which would use `Cut` instead of `CutDirect`
- Fixed a bug with audio toggle on Master Bus, and added Toggle/On/Off action.
- Added GUID Support in feedbacks, GUID can now be used in the input field in both actions and feedbacks.
- Fixed a bug where XML data containing a carriage return would break parsing


**v1.2.8**
- Changed API Polling from HTTP to the TCP connection
- Removed HTTP Port, Username, and Password, config fields
- Removed dependency `got`


**v1.2.7**
- Added ReplayPlaySelectedEventToOutput and ReplayPlayEventsByIDToOutput to the list of suported functions, with included presets.
- Added SetTransitionEffect and SetTransitionDuration to the list of actions, with presets.


**v1.2.6**
- Added default state values to prevent crashing when feedbacks are checked before the API is polled
- Added API Polling interval config option
- Increased default API poll interval from 100ms to 250ms.


**v1.2.5**
- Updated some presets, with coresponding feedbacks
- Updated Video Timer feedback to autodetect and use "Mark out" if set
- Added More functions Afecting Video Playback and Marking In and Out's
- Added Presets for Video Playback and Marking In and Out's
- Added Feedback live dB for monitoring Audio on an input or a bus
- Added Variables that lists the ShortTitle of an imput
- Added Variables that lists the full title on "list" inputs 
- Updated Audio presets with the new feedbacks


**v1.2.4**
- Added the option to select the layer when using actions affecting countdowns
- Added the action TitleBeginAnimation and ChangeCountdown to the list
- Fixed a bug with empty "lists inputs" breaking feedbacks


**v1.2.3**
- Added more preset options for existing commands
- Added a description on how to use Mix 2-4
- Added a Feedback for audio ON/Off (invers mute)
- Added presets for MultiView Overlays
- Added presets for selecting audio and video source for Vmix Calls
- Added presets for toggeling audio On/Off
- Added presets for using and settings Title layers and Presets


**v1.2.2**
- Added MultiViewOverlay - Commands for setting and toggling an overlay on/off
- Added SetMultiViewOverlay - Command for setting an Input on a MultiviewOverlay Layer
- Added VirtualSet - Command for Zooming in to one of the four Selected Preset
- Added SelectTitlePreset - Allows for the option to preprogram titles and just select a specific preset.
- Added Next and Previous Title Preset - Allows for the option to go back and forth between title presets. 
- (note there is no preset or feedback for these commands!)


**v1.2.1**
- Added feedback and instance variables for bus and input volume


**V1.2.0**
- Added support for using either input ID or Title and switching at any time
- Added Tally update on first load
- Added Tally polling through API
- Added Support for Audio busses C to G, and Mix 2 to 4, from vMix v23
- Added Feedback for Overlays, Replay, Input/Bus Mute, Solo, Routing, Title text (including countdowns)
- Added action to set/increment/decrement Title text
- Added more presets
- Restructured module code, allowing for easier maintaining of code and future upgrades


**V1.1.6**
- Added simple and generic presets for all commands


**V1.1.5**
- Minor change


**V1.1.4**
- Bug fix with feedback (got introduced in V1.1.3)


**V1.1.3**
- Added overlay functions
- Added set output functions
- Added the option to chose the port used to connect to vmix
- Added the option to chose weather or not to use the ID or the Title of inputs to select them