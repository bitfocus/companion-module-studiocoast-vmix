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

- Added overlay functions
- Added set output functions
- Added the option to chose the port used to connect to vmix
- Added the option to chose weather or not to use the ID or the Title of inputs to select them

**V1.1.4**

- Bug fix with feedback (got introduced in V1.1.3)

**V1.1.5**

- Minor change

**V1.1.6**

- Added simple and generic presets for all commands

**V1.2.0**

- Added support for using either input ID or Title and switching at any time
- Added Tally update on first load
- Added Tally polling through API
- Added Support for Audio busses C to G, and Mix 2 to 4, from vMix v23
- Added Feedback for Overlays, Replay, Input/Bus Mute, Solo, Routing, Title text (including countdowns)
- Added action to set/increment/decrement Title text
- Added more presets
- Restructured module code, allowing for easier maintaining of code and future upgrades

**v1.2.1**

- Added feedback and instance variables for bus and input volume

**v1.2.2**

- Added MultiViewOverlay - Commands for setting and toggeling an overlay on/off
- Added SetMultiViewOverlay - Command for setting an Input on a MultiviewOverlay Layer
- Added VirtualSet - Command for Zooming in to one of the four Selected Preset
- Added SelectTitlePreset - Allows for the option to preprogram titles and just select a specific preset.
- Added Next and Previous Title Preset - Allows for the option to go back and fourth between title presets.
- (note there is no preset or feedback for these commands!)

**v1.2.3**

- Added more preset options for existing commands
- Added a description on how to use Mix 2-4
- Added a Feedback for audio ON/Off (invers mute)
- Added presets for MultiView Overlays
- Added presets for selecting audio and video source for Vmix Calls
- Added presets for toggeling audio On/Off
- Added presets for using and settings Title layers and Presets

**v1.2.4**

- Added the option to select the layer when using actions afecting countdowns
- Added the action TitleBeginAnimation and ChangeCountdown to the list
- Fixed a bug with empty "lists inputs" breaking feedbacks

**v1.2.5**

- Updated some presets, with coresponding feedbacks
- Updated Video Timer feedback to autodetect and use "Mark out" if set
- Added More functions Afecting Video Playback and Marking In and Out's
- Added Presets for Video Playback and Marking In and Out's
- Added Feedback live dB for monitoring Audio on an input or a bus
- Added Varibles that lists the ShortTitle of an imput
- Added Varibles that lists the full title on "list" inputs
- Updated Audio presets with the new feedbacks

**v1.2.6**

- Added default state values to prevent crashing when feedbacks are checked before the API is polled
- Added API Polling interval config option
- Increased default API poll interval from 100ms to 250ms.

**v1.2.7**

- Added ReplayPlaySelectedEventToOutput and ReplayPlayEventsByIDToOutput to the list of suported functions, with included presets.
- Added SetTransitionEffect and SetTransitionDuration to the list of actions, with presets.

**v1.2.8**

- Changed API Polling from HTTP to the TCP connection
- Removed HTTP Port, Username, and Password, config fields
- Removed dependency `got`

**v1.2.9**

- Fixed a bug with preset send input to program buttons which would use `Cut` instead of `CutDirect`
- Fixed a bug with audio toggle on Master Bus, and added Toggle/On/Off action.
- Added GUID Support in feedbacks, GUID can now be used in the input field in both actions and feedbacks.
- Fixed a bug where XML data containing a carriage return would break parsing

**v1.2.10**

- Added support for vMix Activators, allowing some feedbacks to be more responsive
- Added support for up to 8 replay cameras
- Added vMix Call audio source feedback
- Fixed a bug with the SelectPlayList actions missing param name

**v1.2.11**

- Added 'Layer Indicator' option for input Preview/Program feedback to show if an input is in a layer or overlay going to Preview/Program
- Fixed a bug that caused a crash if vMix version was v22 or older

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

**V1.2.13**

- Added ON/OFF/Togle option to solo and bus solo action
- Hotfix: LiveBusVolume feedback not updating corectly

**V1.2.14**

- Hotfix: Make sure data.status is defined

**V1.2.15**

- Added SetMultiViewOverlayOnPreview and SetMultiViewOverlayOnProgram
- Bug Fixed: Missing URI encoding on inputs and variables has now been added

**V1.2.16**

- Bug fix: T-bar reworked

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

**V1.2.18**

- Hotfix for "Custom Commands" not working

**V1.2.19**

- Rolled back changed to "Custom Command" so it's identical to in v2.1.2, with no encoding.
- Added a note in the config page about TCP port vs HTTP port in vMix.
- Added option to disable error logs flodding the Log when vmix is closed.
- Added Variables for recording time, both in full duration (Seconds) and in HH:MM:SS format.
- Added some new actions for Browser inputs, like "Browser - Navigate" and more.
- Added Feedback for if input is used on a multiview layer.
- Added Feedback to show what input is selected on a multiview layer.
- Renamed Multiview actions to match v24 and v23 namings.

**V1.2.20**

- Added Actions and Feedbacks for Routable "multiview overlays" / "Layers" (Check help guide for more info)
- Updated Help.md file
- Added Presets for new Actions

**V1.2.22**

- Added support for variables in all text fields inside Actions
- Added support for variables in all text fields inside Feedbacks

**V1.2.23**

- Hotfix for feedbacks that got broken in the last update
- Hotfix for Input names not working in feedbacks

**V1.2.24**

- Replacement receive buffer extraction to help prevent buffer overflows