# companion-module-studiocoast-vmix

Provides essential control over StudioCoast Vmix, for more info look in HELP.md
Go over to [vMix](https://www.vmix.com/) to learn more about the software.

**Using Custom Commands/Shortcodes**

When usin vMix shortcodes, please follow this syntax/layout, with space before the first value:

"ReplayMarkInOut Value=5000"

and if there is more than one parameter use "&" as a separator between them like the example below:

"SetOutput2 Value=Input&Input=3"

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
