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
**V3.6.0**
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
  - Added more preset categories, such as `Layer Pan/Zoom` showing examples of controlling a layers position, great for doing merg zoom effects.
- Added further automated testing 

**V3.5.5**
- Fix for increasing/decreasing title text and video playhead

**V3.5.4**
- Fix for tally variables on mix 2+

**V3.5.3**
- Fix upgrading config `Cannot read properties of null (reading 'tbar')`



Older patch notes available in [docs/PATCH_NOTES.md](./docs/PATCH_NOTES.md)