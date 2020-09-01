**StudioCoast vMix**

Go over to [vMix](https://www.vmix.com/) to learn more about the software.

vMix is a Software Video Mixer and Switcher that utilises the latest advances in computer hardware to provide live HD video mixing, a task previously only possible on expensive dedicated hardware mixers.

vMix also functions as live streaming software that allows you to publish your live productions directly to the Internet!.

vMix runs on Windows 7, Windows 8 and Windows 10 platforms.

vMix is a complete live video production software solution with features including LIVE mixing, switching, recording and LIVE streaming of SD, full HD and 4K video sources including cameras, video files, DVDs, images, Powerpoint and much much more.

**API Polling Interval**
The majority of vMix data used by Companion for feedback and variables is retrieved through the vMix REST API, the frequency at which this data is polled can be changed in the instance config. All instances prior to 1.2.6 had a poll interval of 100ms, but from 1.2.6 the default has been changed to 500ms. It is recommended that users who need responsive feedbacks and had no previous issues to lower the interval in the config back to 100ms, and for users with a significantly large number of inputs or running on older hardware to either leave the interval at 500ms, or enter a slower interval should the server be insufficient for the number of inputs.

Default: 500ms
Minimum: 100ms
Set to 0 to disable API Polling.


**Functions**

Most commonly used vMix commands have been made available as actions to Companion users, as well as feedback which includes Tally for Mixes 1 to 4, Audio muting, solo, and routing, time remaining countdown for video inputs, title input feedback, and more.

For commands not natively available in this module, you can access the full list of commands either through the vMix shortcuts screen, or at this [vMix API Util](https://util.dist.dev/vmixapi). These commands can either be sent as a HTTP GET request, or with a custom command as documented below.

For additional actions please raise a feature request at [github](https://github.com/bitfocus/companion-module-studiocoast-vmix)

**Using More Than One Mix (Mix 2-4)**

If you want to use more than one video Mix in Vmix, make sure you create them as inputs. It's not obvious how this works, and a Mix is not synonymous with an Output. To add Mix 2-4 to your setup please proceed to add them as inputs in Vmix. after this, you could select different Mix's to different outputs if you want to.

**Using Custom Commands/Shortcodes**

When usin vMix shortcodes, please follow this syntax/layout, with space before the first value:

***"ReplayMarkInOut Value=5000"***

and if there is more than one parameter use "&" as a separator between them like this example:

***"SetOutput2 Value=Input&Input=3"***
