# companion-module-studiocoast-vmix

Provides essential control over StudioCoast Vmix, for more info look in HELP.md
Go over to [vMix](https://www.vmix.com/) to learn more about the software.

**Using Custom Commands/Shortcodes**

When usin vMix shortcodes, please follow this syntax/layout, with space before the first value:

"ReplayMarkInOut Value=5000"

and if there is more than one parameter use "&" as a separator between them like the example below:

"SetOutput2 Value=Input&Input=3"

**v1.2.2**
* Added MultiViewOverlay Commands for setting and toggeling an overlay on/off
* Added SetMultiViewOverlay Command for setting an Input on a MultiviewOverlay Layer

**v1.2.1**
* Added feedback and instance variables for bus and input volume

**V1.2.0**
* Added support for using either input ID or Title and switching at any time
* Added Tally update on first load
* Added Tally polling through API
* Added Support for Audio busses C to G, and Mix 2 to 4, from vMix v23
* Added Feedback for Overlays, Replay, Input/Bus Mute, Solo, Routing, Title text (including countdowns)
* Added action to set/increment/decrement Title text
* Added more presets
* Restructured module code, allowing for easier maintaining of code and future upgrades

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
