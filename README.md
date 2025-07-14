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
This module now supports Companions HTTP API, providing endpoints that can be used by 3rd party applications, and as a Data Source in vMix itself. Information on the API endpoints is available in [docs/http_api.md](./docs/http_api.md)


# Recent Patches
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
- Added Variable list doc [docs/variables.md](./docs/variables.md)
- Added `preset` variable for the currently loaded preset
- Added `input_X_full_title`, `mix_X_preview_full_title`, `mix_X_program_full_title`, `dynamic_input_X_full_title` variables, which for inputs such as Lists contain the short title and the name of the current item
- Added `input_X_selectedindex` variable for Photo, VideoList, and VirtualSet, input types
- `input_X_remaining_mm:ss` renamed to `input_X_remaining_mm.ss`
- `input_X_remaining_mm:ss.ms` renamed to `input_X_remaining_mm.ss.ms`
- Fixed missing Stream 4 and 5 options in actions/feedbacks
- Added Local Variable support (such as $(this:page), $(this:row), etc...) to Actions that support parsing variables
- Better support for Sequential Action Group (keep in mind vMix only acknowledges receiving a command, not that the command execution is complete, so some use of Wait actions may still be required in an Action Group sequence)


Older patch notes available in [docs/patch_notes.md](./docs/patch_notes.md)
