## StudioCoast vMix

Go over to [vMix](https://www.vmix.com/) to learn more about the software.

vMix is a Software Video Mixer and Switcher that utilises the latest advances in computer hardware to provide live HD video mixing, a task previously only possible on expensive dedicated hardware mixers.

vMix also functions as live streaming software that allows you to publish your live productions directly to the Internet!.

vMix runs on Windows 7, Windows 8 and Windows 10 platforms.

vMix is a complete live video production software solution with features including LIVE mixing, switching, recording and LIVE streaming of SD, full HD and 4K video sources including cameras, video files, DVDs, images, Powerpoint and much much more.

---

### API Polling Interval

The majority of vMix data used by Companion for feedback and variables is retrieved through the vMix REST API, the frequency at which this data is polled can be changed in the instance config.

All instances prior to 1.2.6 had a poll interval of 100ms, but from 1.2.6 the default has been changed to 250ms. It is recommended that users who need responsive feedbacks and had no previous issues to lower the interval in the config back to 100ms, and for users with a significantly large number of inputs or running on older hardware to either leave the interval at 250ms, or enter a slower interval should the server be insufficient for the number of inputs.

If you experience high vMix CPU usage while this Companion instance is enabled, increase the interval delay value to slow down the API Polling.

Default: 250ms <br />
Minimum: 100ms <br />
Set to 0 to disable API Polling.

---

### Functions

Most commonly used vMix commands have been made available as actions to Companion users, as well as feedback which includes Tally for Mixes 1 to 4, Audio muting, solo, and routing, time remaining countdown for video inputs, title input feedback, and more.

For commands not natively available in this module, you can access the full list of commands either through the vMix shortcuts screen, or at this [vMix API Util](https://util.dist.dev/vmixapi). These commands can either be sent as a HTTP GET request, or with a custom command as documented below.

For additional actions please raise a feature request at [github](https://github.com/bitfocus/companion-module-studiocoast-vmix)

---

### Using More Than One Mix (Mix 2-4)

If you want to use more than one video Mix in Vmix, make sure you create them as inputs. It's not obvious how this works, and a Mix is not synonymous with an Output. To add Mix 2-4 to your setup please proceed to add them as inputs in Vmix. after this, you could select different Mix's to different outputs if you want to.

---

### Using Custom Commands/Shortcodes

When usin vMix shortcodes, please follow this syntax/layout, with space before the first value:

**_"ReplayMarkInOut Value=5000"_**

and if there is more than one parameter use "&" as a separator between them like this example:

**_"SetOutput2 Value=Input&Input=3"_**

---

### t-bar function from a variable

When using a xkeys with a t-bar you'll notice a variable t-bar is set to use. This module can use that function, enable it in the instance config. You can create an offset incase the xkeys is not calibrated correctly.

---

### Routable "Layers" / "multiview overlays"

From version 1.2.20 of this module and forward, you will have the option to set up Routable "multiview overlays" -/ "Layers" in a standard X Y pattern just like you are used to with other video hubs and similar products.

![Routable Layers Demo](images/RoutableLayersDemo.gif?raw=true 'Routable Layers Demo')

In short, you have three new Actions with three new Feedbacks to follow them, and this will allow you to build a setup similar to the above gif. Each row of buttons serves its own function:

- Top row selects what Input you want to affect.
- Middle row selects what "Layer / Multiview" to change on the Input selected above.
- The last row is the Input you want to place on the Input and layer selected above. This is also the only button that sends anything to vMix. So you can change the other two as much as you want before setting the change.

The tree buttons are build like this:

- Top Button - Select Destanation Input
    - **Action:** Layers / MultiView - Set Destination Input for Routable Multiview Overlay Layer
    - **Feedback:** Layers / MultiView - check selected destination input
- Middle Button - Select Destination Layer
    - **Action:** Layers / MultiView - Set Destination Layer for Routable Multiview Overlay Layer
    - **Feedback:** Layers / MultiView - check selected destination layer
- The Last Button - Select Source Input
    - **Action:** Layers / MultiView - Set Source Input for Routable Multiview Overlay Layer
    - **Feedback:** Layers / MultiView - check if input in on destination Layer / MultiView of destination input