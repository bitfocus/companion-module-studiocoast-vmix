<p align="center">
  <img alt="GitHub package.json version (subfolder of monorepo)" src="https://img.shields.io/github/package-json/v/bitfocus/companion-module-studiocoast-vmix">
  <img alt="GitHub Sponsors" src="https://img.shields.io/github/sponsors/thedist">
</p>

# companion-module-studiocoast-vmix

Provides essential control over StudioCoast vMix.

For more information, look in [HELP.md](https://github.com/bitfocus/companion-module-studiocoast-vmix/blob/main/companion/HELP.md).  
Go over to [the vMix website](https://www.vmix.com/) to learn more about the software.


# API Poll Interval
The majority of vMix data used by Companion for feedback and variables is retrieved through the vMix REST API, the frequency at which this data is polled can be changed in the instance config. All instances prior to 1.2.6 had a poll interval of 100ms, but from 1.2.6 the default has been changed to 250ms. It is recommended that users who need responsive feedbacks and had no previous issues to lower the interval in the config back to 100ms, and for users with a significantly large number of inputs or running on older hardware to either leave the interval at 250ms, or enter a slower interval should the server be insufficient for the number of inputs.


# Using Custom Commands/shortcuts
When using vMix shortcuts, please follow this syntax/layout, with space before the first value:

```
"ReplayMarkInOut Value=5000"
```

If there is more than one parameter, use "&" as a separator between them:

```
"SetOutput2 Value=Input&Input=3"
```


# HTTP API
This module now supports Companions HTTP API, providing endpoints that can be used by 3rd party applications, and as a Data Source in vMix itself. Information on the API endpoints is available in [docs/http_api.md](./docs/http_api.md)


# Recent Patches
**v5.0.0**
- BREAKING CHANGE: Removed the deprecated 'Button Shift' functionality, as it's now redundant with Companion v4.3 native Expression capabilities
- Many Actions/Feedbacks have been updated to support Companions new capability of toggling an option between standard and Expression modes
- Added documentation for a list of vMix Shortcuts and the corresponding Companion Actions, available at [https://github.com/bitfocus/companion-module-studiocoast-vmix/blob/main/docs/shortcut_list.md](https://github.com/bitfocus/companion-module-studiocoast-vmix/blob/main/docs/shortcut_list.md)
- Added more descriptions for Actions/Feedbacks and their options
- Actions:
  - `Output - MultiCorder / Recording / Streaming` Action has been replaced by individual actions for MultiCorder, Recording, Streaming, External, Fullscreen, and FTB
  - Renamed `Media` Actions to `Playback` to better explain their functionality
  - Added `Audio Preset` actions to store the current vMix audio states (such as bus routing, volume, etc...) in Companion which when loaded will send the necessary commands to set vMix back to the selected state
  - Added `General - vMix Connection`, `Config - Set Host`, and `Config - Set Port`, Actions to allow for easily swapping from one vMix instance to another.
  - Added 80 new Actions, resulting in 100% coverage of vMix Shortcut Functions (full list of new actions can be found at [https://github.com/bitfocus/companion-module-studiocoast-vmix/blob/main/docs/patch_notes.md](https://github.com/bitfocus/companion-module-studiocoast-vmix/blob/main/docs/patch_notes.md))
  - Updated `Audio - Route Bus to Master` with an option to choose between Toggle, On, or Off
  - Updated `Title - Start / Stop / Pause Countdown` to now also include an option to Suspend a Countdown
  - Updated `Input - Colour Correction` to include options for Auto and Resetting Colour Correction
  - Updated `Playback - Playback Actions` to include an option to Play/Pause a Live input (such as an NDI/OMT feed)
- Feedbacks:
  - Renamed `Media` Feedbacks to `Playback` to better explain their functionality
- Variables:
  - Added `input_X_position`, `mix_X_preview_position`, and `mix_X_program_position`, variables giving the current position in ms of an input

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


Older patch notes available in [docs/patch_notes.md](./docs/patch_notes.md)
