**StudioCoast vMix**

Go over to [vMix](https://www.vmix.com/) to learn more about the software.

vMix is a Software Video Mixer and Switcher that utilises the latest advances in computer hardware to provide live HD video mixing, a task previously only possible on expensive dedicated hardware mixers.

vMix also functions as live streaming software that allows you to publish your live productions directly to the Internet!.

vMix runs on Windows 7, Windows 8 and Windows 10 platforms.

vMix is a complete live video production software solution with features including LIVE mixing, switching, recording and LIVE streaming of SD, full HD and 4K video sources including cameras, video files, DVDs, images, Powerpoint and much much more.

**Functions**

Most commonly used vMix commands have been made available as actions to Companion users, as well as feedback which includes Tally for Mixes 1 to 4, Audio muting, solo, and routing, time remaining countdown for video inputs, title input feedback, and more.

For commands not natively available in this module, you can access the full list of commands either through the vMix shortcuts screen, or at this [vMix API Util](https://util.dist.dev/vmixapi). These commands can either be sent as a HTTP GET request, or with a custom command as documented below.

For additional actions please raise a feature request at [github](https://github.com/bitfocus/companion-module-studiocoast-vmix)


**Using Custom Commands/Shortcodes**

When usin vMix shortcodes, please follow this syntax/layout, with space before the first value:

***"ReplayMarkInOut Value=5000"***

and if there is more than one parameter use "&" as a separator between them like this example:

***"SetOutput2 Value=Input&Input=3"***
