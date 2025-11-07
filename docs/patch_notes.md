# Patch Notes

**v4.2.0**
- Added support for vMix 29
- Actions:
  - Updated `Overlay - Functions` to support 8 overlays, and added the capability to select more than one mix.
  - Updated `Transition - Auto/Stinger Transition` to support 8 stingers
  - Updated `Transition - Transition Mix` and `Transition - Set Auto Transition Effect` to support the new AlphaFade transition
  - Updated `Audio - Set Bus Volume` to include support for adjusting Headphones volume
  - Updated `Title - Begin Animation Page` to support variables for animation selection
  - Added `Input - GO Action` to start the GO action on an input
  - Added `Replay - Quad View` Action to Toggle, set On, or set Off, Quad View mode
  - Added `Replay - Set/Append Event Text` and `Replay - Clear Event Text` Actions for setting, appending, or clearing, text on an Replay Event
- Feedbacks:
  - Added `Replay - Quad View` Feedback for the new Replay Quad View mode
  - Updated `General - Output NDI/SRT Status` is now `General - Output NDI/OMT/SRT Status`, and supports showing if OMT is enabled on an output
- Variables:
  - Added `output_X_omt` variables to show OMT status on outputs 1 to 4
  - Updated Overlay variables to support 8 overlays
  - Added `replay_quad_view` variable to show if Quad View mode is enabled
  - Added `input_X_layer_Y_titleimage` and `input_X_layer_Y_titlecolor` variables for title inputs image and color values, similar to the titletext variable
  - Added more support for Local Variables
- Fixed `preset` variable not always updating
- Fixed an issue with Transition feedback/variables not updating under certain conditions

**v4.1.2**
- Fixed an issue with Mix variables not correctly updating if the Preview or Program was set to none

**v4.1.1**
- Fixed several issues relating to Variable generation

**v4.1.0**
- Added `Title - Set title Image` and `Title - Set title Image Visibility` Actions for setting images in a Title input and adjusting their visibility
- Added `Replay - Play Events by ID` Action, allowing playing 1 or more events by ID rather than the current `Replay - Play Events` Action which uses Event Number
- Added a Config option to control if Input Variables should be generated with a lowercase name or match the case in vMix (with special characters still removed)
- Added `output_X_type` and `output_X_input_name` Variables for the 4 vMix outputs. When the type is `Input` the `output_X_input_name` Variable will show the name of the input as opposed to `output_X_source` which only shows `Input19` for example.
- Fixed feedback on an inputs playing state being updated by Activator data, improving responsiveness in slow API poll rate environments

**v4.0.4**
- Fixed a crash when running upgrade scripts on certain Companion versions

**v4.0.3**
- Fixed an issue with certain config fields resetting themselves due to a bug with Companion Core

**v4.0.2**
- Fixed an issue with missing Dynamic Input variables

**v4.0.1**
- Removed now redundant logging of PID
- Fixed one debug option not being hidden when debug options are hidden
- Fixed several typos

**v4.0.0**
- Changes to Variable generation based on config options allowing granular control over what variables are generated, resulting in significant performance benefits by only generating the variables a user plans to use
- Added Variable list doc [docs/variables.md](./variables.md)
- Added `preset` variable for the currently loaded preset
- Added `input_X_full_title`, `mix_X_preview_full_title`, `mix_X_program_full_title`, `dynamic_input_X_full_title` variables, which for inputs such as Lists contain the short title and the name of the current item
- Added `input_X_selectedindex` variable for Photo, VideoList, and VirtualSet, input types
- `input_X_remaining_mm:ss` renamed to `input_X_remaining_mm.ss`
- `input_X_remaining_mm:ss.ms` renamed to `input_X_remaining_mm.ss.ms`
- Fixed missing Stream 4 and 5 options in actions/feedbacks
- Added Local Variable support (such as $(this:page), $(this:row), etc...) to Actions that support parsing variables
- Better support for Sequential Action Group (keep in mind vMix only acknowledges receiving a command, not that the command execution is complete, so some use of Wait actions may still be required in an Action Group sequence)

**v3.9.6**
- Fixed an issue with the upgrade script migrating existing `Overlay - Functions` actions to support the new parameters in vMix 28

**v3.9.5**
- Fixed issue with mix preview/program variables not migrating to latest version
- Fixed issue relating to some audio Actions and Feedbacks set to the `selected` bus

**v3.9.4**
- Fixed issue with selected mix variable

**v3.9.3**
- Fixed issue with mix preview/program variables

**v3.9.2**
- Fixed missing MultiView2 and Mix options from `Output - Set Output Source` action

**v3.9.1**
- Fixed missing `General - Output Status` and  `General - Output NDI/SRT Status` feedbacks

**v3.9.0**
- Added Mix support for `Transition - Auto/Stinger Transition` action when using a Stinger transition
- Added `Transition - Transition Effect / Duration` Feedback to check what effect (and optionally duration) is set to Transitions 1 to 4
- Added `transition_X_effect` and `transition_X_duration` variables (X = 1 to 4)

**v3.8.0**
- Updated module to Node.JS 22.8.0 and rebuilt dependencies
- Refactored module structure
- Removed duplicate Position action

**v3.7.1**
- Fixed typo in stream 4 and 5 variable definitions
- Better handling of vMix's undocumented XML processing instructions added to the XML API

**v3.7.0**
- Update for vMix 28 beta features
- Added Actions:
  - `Audio - Fade Bus Volume`
  - `Audio - Set Input Channel Volume` (for separate mono inputs)
  - `Title - Adjust title text Color`
  - `Title - Adjust title text visibility`
  - `VideoCall - Connect / Reconnect`, `Zoom - Join Meeting`
- Added Feedbacks:
  - `General - Output Status`
  - `General - Output NDI/SRT Status`
- Added Variables:
  - `fullscreen_X_source` (X = 1 or 2)
  - `output_X_source`, `output_X_ndi`, `output_X_srt` (X = 1 to 4)
  - `stream_4_active`, `stream_5_active`
  - `input_X_volume_f1`, `input_X_volume_f1_db`, `input_X_volume_f1_linear`, `input_X_volume_f2`, `input_X_volume_f2_db`, `input_X_volume_f2_linear` (volume_f1 and volume_f2 variables are for inputs with separate mono enabled)
  - `input_X_layer_NAME_titletext` (Previously the titletext variables only used layer Index, now they can also use Layer Name instead. Note: Some special characters in the name may not be supported)
- Updated `Overlay - Functions` Action to include options to select Mix for the Overlay
- Updated `Output - MultiCorder / Recording / Streaming` Action, and `vMix - Status` Feedback, to support up to 5 streams
- Updated `Transition - Set Auto Transition Effect` Action to support setting a GT Input to a Stinger transition
- Updated `Audio - Input Volume Meters` feedback to support displaying individual channels of a separated mono input
- Updated `input_X_selected`, `input_X_selected_name`, `dynamic_input_X_selected`, `dynamic_input_X_selected_name` Variables, and `Slides/List - Change Colors Based On Selected Slide/Index/Virtual Set`, `Slides/List - Change style based on an inputs Selected Index` Feedbacks to support Photo index types (0 base index)

**v3.6.7**
- Fixed an issue with undefined titles being returned as `'undefined'`, rather than an empty string as intended

**v3.6.6**
- Fixed an issue with `Layer - Position` failing on certain layer selection situations and added more logging for invalid input/layer selections

**v3.6.5**
- Fixed an issue with `true` or `false` used as input names or title values being parsed as boolean rather than strings

**v3.6.4**
- Fixed the `Select Index` Preset having the wrong action

**v3.6.3**
- Fixed a bug with preview/program activator data for mix 2+

**v3.6.2**
- Fixed a bug with PTZ Stop action

**v3.6.1**
- Fixed a bug with Start Streaming and Stop Streaming actions not targeting specific vMix streams

**v3.6.0**
- Significantly more Boolean type feedbacks where applicable (allow individual styling, and use in Triggers)
- Support for referencing mix by variable in actions/feedbacks
- Support for more variable parsing in actions/feedbacks, and indicators added for where they're supported
- Added Actions
  - `Lists - Auto Play First`
  - `Lists - Auto Play Next`
  - `Lists - Shuffle List`
  - `Zoom - Mute Self`
  - `Zoom - Select Participant by Name`
- Added Feedbacks
  - `Audio - Bus Send to Master`
- Added Variables
  - `bus_X_sendtomaster`
  - `input_X_selected` support for Photos and PowerPoint input types
- Revamped Presets!
  - Added boolean feedbacks to more presets, allowing for more custom styling
  - Added more preset categories, such as `Layer Pan/Zoom` showing examples of controlling a layers position, great for doing merge zoom effects.
- Added further automated testing 

**v3.5.5**
- Fix for increasing/decreasing title text and video playhead

**v3.5.4**
- Fix for tally variables on mix 2+

**v3.5.3**
- Fix upgrading config `Cannot read properties of null (reading 'tbar')`

**v3.5.2**
- Added definitions for more mix variables
- Added actions for `Audio - Show / Hide Audio Mixer`, `Replay - Play Last Event to Output`, `Replay - Play all Events to Output`, `Replay - Stop Events`, and `Replay - Show / Hide Replay`
- Fix for duration variables

**v3.5.0**
- Added actions:
  - Undo closing Input
  - Input Effects, Input Loop toggle, Input Colour Correction, Input Zoom/Crop/Pan, Input Layer Zoom/Crop/Pan, Input Frame Delay
  - Replay Set Speed (with t-bar support)
  - Setting Volume Channel mixer
  - Audio - Solo All Off
  - PTZ - Movement, Focus, Zoom, and Create/Update Virtual Inputs
- Added feedbacks:
  - Media - Input Loop
- Added variables:
  - `bus_any_solo`, `input_any_solo`, and `solo` suffix for inputs and dynamic inputs (eg, `$(vmix:input_test_solo)`)
  - `panx`, `pany`, `zoomx`, `zoomy`, `cropx1`, `cropx2`, `cropy1`, and `cropy2`, suffixes for input position variables (eg, `$(vmix:input_test_position_panx)`)
  - `hue`, `saturation`, `liftr`, `liftg`, `liftb`, `lifty`, `gammar`, `gammag`, `gammab`, `gammay`, `gainr`, `gaing`, `gainb`, and `gainy`, suffixes for input colour correction variables (eg, `$(vmix:input_test_cc_hue)`)
  - `panx`, `pany`, `x`, `y`, `zoomx`, `zoomy`, `width`, `height`, `cropx1`, `cropx2`, `cropy1`, and `cropy2`, suffixes for input layer variables (eg, `$(vmix:input_test_layer_1_panx)`)
  - `recording_filename1`, `recording_filepath1`, `recording_filename2`, `recording_filepath2`
  - `replay_recording`, `replay_live`, `replay_forward`, `replay_channel_mode`, `replay_events`, `replay_eventsa`, `replay_eventsb`, `replay_cameraa`, `replay_camerab`, `replay_speed`, `replay_speeda`, `replay_speedb`, `replay_timecode`, `replay_timecodea`, `replay_timecodeb`
- Fixes:
  - Added an `Encode Value` option for `Title - Adjust title text` action, for when the text contains special characters that would otherwise break the TCP command
  - Added support for instance variables in the t-bar position action
  - Fixed a bug where changing config for IP or Port did not correctly kill connection attempts to the previous location
- Misc:
  - Added sponsor links on [Github](https://github.com/sponsors/thedist) and [Ko-Fi](https://ko-fi.com/thedist) for those who have asked to tip me for this continued development work.

**v3.4.3**
- Fixed upgrade scripts for Companion v3
- Added missing Loop and Playing feedback/variables

**v3.4.2**
- Added logging and a hold on polling the API if the time to process the data completely is greater than the polling interval

**v3.4.1**
- Performance improvements for vMix productions with a large number of inputs
- Fixed an issue with the initial request for Activator data

**v3.4.0**
- Added Process ID logged to Debug at start to aid in debugging/performance tracking
- Fixed missing instance variables for Dynamic Inputs
- Fixed TCP pings on connections not yet established
- Fixed Browser Navigate action parsing variables
- Added Input option for Transition Mix actions, allowing transitioning to a specific input, or Preview if left blank

**v3.3.0**
- Added Feedback for Dynamic Input and Dynamic Values
- Added Start / Stop options for the Output Functions action
- Fixed an issue with changing the vMix IP or Port not working correctly until restarting instance
- Added extra TCP debug logging, and PING messages for Activator and Function sockets

**v3.2.0**
- Added Bus and Input volume meter feedbacks
- Replaced local indicators with indicators from companion-module-utils

**v3.1.1**
- Fixed an issue when specifying a non-existent input for the Overlay State feedback

**v3.1.0**
- Added a variables HTTP endpoint to retrieve all of the current instance variables
- Fixed incorrect parsing of variables for basic commands
- Fixed Meter amplitude to dB math in instance variables

**v3.0.2**
- Added more Action and Feedback descriptions
- Fixed Replay Fastforward/Backward speed and tbar action
- Added Preview and Program options for layer routing
- Cleanup of Instance Variables code
- Added variables for Input List Items - eg `$(vmix:input_X_list_Y_name)`, where x is an input name/number/key, and Y is the list item index (starting from 1)
- Added Instance Variable support for adjusting Pan/Zoom value
- Added Reset Input action
- Selected Index feedback and variables now support Virtual Sets

**v3.0.1**
- Fixed issue with actions not parsing correctly
- Added parsing of instance variables for countdown time/duration
- Added instance variables for mix layers
- Added Bus Select action, and options/variables for the currently selected bus
- Changed mix 2 to 16 to use ActiveInput to cut without changing preview
- Fixed an issue with volume linear rounding
- Minor performance tweaks and updates

**v3.0.0**
- Companion v3 compatibility
- Removed deprecated feedbacks that updated button text
- Removed instance variables for each time format, instead use Expression Functions in Companion v3


**v2.1.3**
- Added HTTP POST endpoint to send actions to a vMix instance
- Minor fixes for v26 support


**v2.1.2**
- Added v26 support for 15 Mixes
- Fixed selected mix on setMultiviewOverlay
- Fixed some missing variables for Mixes


**v2.1.1**
- Fixed some HTTP request types
- Fixed some variable names


**v2.1.0**
- Added support for Companions instance HTTP requests
- Added instance timers to support greater complexity that vMix native countdowns
- Adjusted Audio - Input Mute feedback to use buttons foreground color when not muted


**v2.0.15**
- Fix time parsing for instance variables


**v2.0.14**
- Fix Connection Status Variable not updating when closing vmix


**v2.0.10**
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
- Numerous minor fixes


**v1.2.24**
- Replacement receive buffer extraction to help prevent buffer overflows


**v1.2.23**
- Hotfix for feedbacks that got broken in the last update
- Hotfix for Input names not working in feedbacks


**v1.2.22**
- Added support for variables in all text fields inside Actions
- Added support for variables in all text fields inside Feedbacks


**v1.2.20**
- Added Actions and Feedbacks for Routable "multiview overlays" / "Layers" (Check help guide for more info)
- Updated Help.md file
- Added Presets for new Actions


**v1.2.19**
- Rolled back changed to "Custom Command" so it's identical to in v2.1.2, with no encoding.
- Added a note in the config page about TCP port vs HTTP port in vMix.
- Added option to disable error logs flooding the Log when vmix is closed.
- Added Variables for recording time, both in full duration (Seconds) and in HH:MM:SS format.
- Added some new actions for Browser inputs, like "Browser - Navigate" and more.
- Added Feedback for if input is used on a multiview layer.
- Added Feedback to show what input is selected on a multiview layer.
- Renamed Multiview actions to match v24 and v23 namings.


**v1.2.18**
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


**v1.2.16**
- Bug fix: T-bar reworked


**v1.2.15**
- Added SetMultiViewOverlayOnPreview and SetMultiViewOverlayOnProgram
- Bug Fixed: Missing URI encoding on inputs and variables has now been added


**v1.2.14**
- Hotfix: Make sure data.status is defined


**v1.2.13**
- Added ON/OFF/Toggle option to solo and bus solo action
- Hotfix: LiveBusVolume feedback not updating correctly


**v1.2.12**
- Added config option to display volume variables/feedback as a linear value (this will match the slider position within vMix, rather than the actual volume level)
- Fixed several input/bus volume variables/feedbacks not correctly updating
- Fixed handling of a bug where replay data from the API may be incomplete if polled at during load/unload of the input
- Fixed a bug where variable definitions was being updated on any change to any input
- Added Action "SelectIndex" to select specific slides and videos in list inputs
- Added Feedbacks: inputSelectedIndex and inputSelectedIndexName, provides feedbacks depending on selected index in a list or powerpoint
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
- Added ReplayPlaySelectedEventToOutput and ReplayPlayEventsByIDToOutput to the list of supported functions, with included presets.
- Added SetTransitionEffect and SetTransitionDuration to the list of actions, with presets.


**v1.2.6**
- Added default state values to prevent crashing when feedbacks are checked before the API is polled
- Added API Polling interval config option
- Increased default API poll interval from 100ms to 250ms.


**v1.2.5**
- Updated some presets, with corresponding feedbacks
- Updated Video Timer feedback to autodetect and use "Mark out" if set
- Added More functions Affecting Video Playback and Marking In and Out's
- Added Presets for Video Playback and Marking In and Out's
- Added Feedback live dB for monitoring Audio on an input or a bus
- Added Variables that lists the ShortTitle of an input
- Added Variables that lists the full title on "list" inputs 
- Updated Audio presets with the new feedbacks


**v1.2.4**
- Added the option to select the layer when using actions affecting countdowns
- Added the action TitleBeginAnimation and ChangeCountdown to the list
- Fixed a bug with empty "lists inputs" breaking feedbacks


**v1.2.3**
- Added more preset options for existing commands
- Added a description on how to use Mix 2-4
- Added a Feedback for audio ON/Off (inverse mute)
- Added presets for MultiView Overlays
- Added presets for selecting audio and video source for Vmix Calls
- Added presets for toggling audio On/Off
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


**v1.2.0**
- Added support for using either input ID or Title and switching at any time
- Added Tally update on first load
- Added Tally polling through API
- Added Support for Audio busses C to G, and Mix 2 to 4, from vMix v23
- Added Feedback for Overlays, Replay, Input/Bus Mute, Solo, Routing, Title text (including countdowns)
- Added action to set/increment/decrement Title text
- Added more presets
- Restructured module code, allowing for easier maintaining of code and future upgrades


**v1.1.6**
- Added simple and generic presets for all commands


**v1.1.5**
- Minor change


**v1.1.4**
- Bug fix with feedback (got introduced in V1.1.3)


**v1.1.3**
- Added overlay functions
- Added set output functions
- Added the option to chose the port used to connect to vmix
- Added the option to chose weather or not to use the ID or the Title of inputs to select them
