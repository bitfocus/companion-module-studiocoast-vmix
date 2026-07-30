# Sponsors

This module, like Companion, will always be free and open source. Sponsorship helps make continued development and maintenance possible, not just for this module, but also for projects such as vMix, Google Sheets, Twitch, Discord, and more.

If you'd like to support my work, you can sponsor me on [GitHub](https://github.com/sponsors/thedist), buy me a coffee on [Ko-fi](https://ko-fi.com/thedist), or subscribe on [Twitch](https://www.twitch.tv/subs/dist).


# API Polling Interval<br />

The majority of vMix data used by Companion for feedback and variables is retrieved through the vMix REST API, the frequency at which this data is polled can be changed in the instance config.

All instances prior to 1.2.6 had a poll interval of 100ms, but from 1.2.6 the default has been changed to 250ms. It is recommended that users who need responsive feedbacks and had no previous issues to lower the interval in the config back to 100ms, and for users with a significantly large number of inputs or running on older hardware to either leave the interval at 250ms, or enter a slower interval should the server be insufficient for the number of inputs.

If you experience high vMix CPU usage while this Companion instance is enabled, increase the interval delay value to slow down the API Polling.

Default: 250ms <br />
Minimum: 100ms <br />
Set to 0 to disable API Polling.

# Functions / Shortcuts<br />

All vMix shortcuts can be achieved through Actions (see [https://github.com/bitfocus/companion-module-studiocoast-vmix/blob/main/docs/shortcut_list.md](https://github.com/bitfocus/companion-module-studiocoast-vmix/blob/main/docs/shortcut_list.md) for the full list of which Shortcuts relate to which Actions), but should you wish you can also use these commands can either sent as a HTTP GET request, or with a Custom Command action as documented below.

**Using Custom Commands/shortcuts**<br />
When using vMix shortcuts, please follow this syntax/layout, with space before the first value:

**_ReplayMarkInOut Value=5000_**

and if there is more than one parameter use "&" as a separator between them like this example:

**_SetOutput2 Value=Input&Input=3_**

# HTTP API<br />

This module supports Companions HTTP API, providing endpoints that can be used by 3rd party applications, and as a Data Source in vMix itself. Information on the API endpoints is available in [docs/http_api.md](./docs/http_api.md)
