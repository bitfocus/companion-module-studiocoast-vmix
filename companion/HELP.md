**Sponsor**<br />
This module, as with Companion, is free and open source, but if you'd like to support the continued development of this and my other modules (Google Sheets, Twitch, Discord, Voicemeeter, and more) tips will always be appreciated either on [Github](https://github.com/sponsors/thedist), [Ko-Fi](https://ko-fi.com/thedist), or Subscribe to me on Twitch [https://www.twitch.tv/subs/dist](https://www.twitch.tv/subs/dist).

**API Polling Interval**<br />
The majority of vMix data used by Companion for feedback and variables is retrieved through the vMix REST API, the frequency at which this data is polled can be changed in the instance config.

All instances prior to 1.2.6 had a poll interval of 100ms, but from 1.2.6 the default has been changed to 250ms. It is recommended that users who need responsive feedbacks and had no previous issues to lower the interval in the config back to 100ms, and for users with a significantly large number of inputs or running on older hardware to either leave the interval at 250ms, or enter a slower interval should the server be insufficient for the number of inputs.

If you experience high vMix CPU usage while this Companion instance is enabled, increase the interval delay value to slow down the API Polling.

Default: 250ms <br />
Minimum: 100ms <br />
Set to 0 to disable API Polling.


**Functions**<br />
For commands not natively available in this module, you can access the full list of commands either through the vMix shortcuts screen, or at this [vMix API Util](https://util.dist.dev/vmixapi). These commands can either be sent as a HTTP GET request, or with a custom command as documented below.

For additional actions please raise a feature request at [github](https://github.com/bitfocus/companion-module-studiocoast-vmix)


**Using Custom Commands/shortcuts**<br />
When using vMix shortcuts, please follow this syntax/layout, with space before the first value:

***ReplayMarkInOut Value=5000***

and if there is more than one parameter use "&" as a separator between them like this example:

***SetOutput2 Value=Input&Input=3***
