<p align="center">
  <img alt="GitHub package.json version (subfolder of monorepo)" src="https://img.shields.io/github/package-json/v/bitfocus/companion-module-studiocoast-vmix">
  <img alt="GitHub Sponsors" src="https://img.shields.io/github/sponsors/thedist">
</p>

# companion-module-studiocoast-vmix

Provides essential control over StudioCoast Vmix, for more info look in HELP.md
Go over to [vMix](https://www.vmix.com/) to learn more about the software.


# API Poll Interval
The majority of vMix data used by Companion for feedback and variables is retrieved through the vMix REST API, the frequency at which this data is polled can be changed in the instance config. All instances prior to 1.2.6 had a poll interval of 100ms, but from 1.2.6 the default has been changed to 250ms. It is recommended that users who need responsive feedbacks and had no previous issues to lower the interval in the config back to 100ms, and for users with a significantly large number of inputs or running on older hardware to either leave the interval at 250ms, or enter a slower interval should the server be insufficient for the number of inputs.


# Using Custom Commands/shortcuts
When using vMix shortcuts, please follow this syntax/layout, with space before the first value:

"ReplayMarkInOut Value=5000"

and if there is more than one parameter use "&" as a separator between them like the example below:

"SetOutput2 Value=Input&Input=3"


# Button Shifting
The ability to modify the action and feedback options by using the Toggle Shift action, which will split text inputs by the configured Shift Delimiter and determine which value to use based on the state of the Shift Action.

For some feedback, such as Tally and Layer Routing it's possible to enable 'blinking' which causes the feedback to indicate a solid color if the current Shift layer is active, or flash that color if it's an one of the inactive Shift layers that is showing feedback. For example, if you have a feedback to show the preview with the input set to "Cam1/Cam2", when shift is not toggled it would show a solid green when "Cam1" is in preview, or flash if "cam2" is in preview, and when Shift is toggled on the reverse would happen.


# HTTP API
This module now supports Companions HTTP API, providing endpoints that can be used by 3rd party applications, and as a Data Source in vMix itself. Information on the API endpoints is available in [docs/HTTP_API.md](./docs/HTTP_API.md)


# Recent Patches
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



Older patch notes available in [docs/PATCH_NOTES.md](./docs/PATCH_NOTES.md)
