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
**V3.5.0**
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



Older patch notes available in [docs/PATCH_NOTES.md](./docs/PATCH_NOTES.md)