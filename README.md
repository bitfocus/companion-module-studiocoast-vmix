<p align="center">
  <img alt="GitHub package.json version (subfolder of monorepo)" src="https://img.shields.io/github/package-json/v/bitfocus/companion-module-studiocoast-vmix">
  <img alt="GitHub Sponsors" src="https://img.shields.io/github/sponsors/thedist">
</p>

# Companion Module - Studiocoast vMix

Provides essential control over StudioCoast vMix.

For more information, look in [HELP.md](https://github.com/bitfocus/companion-module-studiocoast-vmix/blob/main/companion/HELP.md).  
Go over to [the vMix website](https://www.vmix.com/) to learn more about the software.

# Sponsors

This module, like Companion, will always be free and open source. Sponsorship helps make continued development and maintenance possible, not just for this module, but also for projects such as vMix, Google Sheets, Twitch, Discord, and more.

If you'd like to support my work, you can sponsor me on [GitHub](https://github.com/sponsors/thedist), buy me a coffee on [Ko-fi](https://ko-fi.com/thedist), or subscribe on [Twitch](https://www.twitch.tv/subs/dist).

**Sponsor Showcase**<br />
<a href="https://cloudflexbroadcast.com/" target="_blank"><img src="https://avatars.githubusercontent.com/u/198860892" width="48" alt="CLOUDflex Broadcast"></a><br>
<a href="https://cloudflexbroadcast.com/" target="_blank">CLOUDflex Broadcast</a><br>


# Recent Patches
**v5.0.4**
- Fixed a bug with the `Util - Select Mix` Action and related performance issues with variable generation
- ADded missing linear variables for input meters to allow easy use of Companion v5 gauges

**v5.0.3**
- Fixed a bug with the `Layer - Set Layer (Animated)` Action not working correctly
- Tweaked some presets to allow for better readability of the text and more accurate Feedbacks

**v5.0.2**
- Fixed a bug with the `Layers - check if X input is a Layer on input Y` Feedback not correctly updating
- Fixed a bug with the `Start / Stop / Toggle Streaming` Action where the incorrect stream values were being used

**v5.0.1**
- Fixed a bug with connecting to remote vMix machines
- Added more data to the TCP connection logs

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
  - Added `dynamic_input_X_json`, `streams`, `recording`, `input_X_json`, `mix_X_preview_json`, `mix_X_program_json`, `output_X_json`, `overlay_X_json`, and `replay_json`, variables to give JSON data for use in Expressions


Older patch notes available in [docs/patch_notes.md](./docs/patch_notes.md)
