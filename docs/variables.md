# Audio Bus Variables

`BusID` = `master`, `headphones`, `a`, `b`, `c`, `d`, `e`, `f`, `g` | `AudioChannel` = `f1` or `f2`

| Variable                                   |
| ------------------------------------------ |
| bus_selected                               |
| bus_any_solo                               |
| bus\_`BusID`\_volume                       |
| bus\_`BusID`\_volume_db                    |
| bus\_`BusID`\_volume_linear                |
| bus\_`BusID`\_meter`AudioChannel`          |
| bus\_`BusID`\_meter`AudioChannel`\_avg_1s  |
| bus\_`BusID`\_meter`AudioChannel`\_avg_3s  |
| bus\_`BusID`\_meter`AudioChannel`\_peak_1s |
| bus\_`BusID`\_meter`AudioChannel`\_peak_3s |
| bus\_`BusID`\_mute                         |
| bus\_`BusID`\_solo                         |
| bus\_`BusID`\_sendtomaster                 |

# Dynamic Input / Value Variables

`X` = 1 to 4 | `MixID` = 1 to 16 | `Z` = Number | `LayerIndex` = 1 to 10 | `TextLayer` = number or string | `AudioChannel` = `f1` or `f2`

| Variable                                           |
| -------------------------------------------------- |
| dynamic_value\_`X`                                 |
| dynamic_input\_`X`                                 |
| dynamic_input\_`X`\_name                           |
| dynamic_input\_`X`\_full_title                     |
| dynamic_input\_`X`\_number                         |
| dynamic_input\_`X`\_guid                           |
| dynamic_input\_`X`\_type                           |
| dynamic_input\_`X`\_mix\_`MixID`\_tally_preview    |
| dynamic_input\_`X`\_mix\_`MixID`\_tally_program    |
| dynamic_input\_`X`\_playing                        |
| dynamic_input\_`X`\_loop                           |
| dynamic_input\_`X`\_mute                           |
| dynamic_input\_`X`\_audio                          |
| dynamic_input\_`X`\_solo                           |
| dynamic_input\_`X`\_duration                       |
| dynamic_input\_`X`\_remaining                      |
| dynamic_input\_`X`\_remaining_ss                   |
| dynamic_input\_`X`\_remaining_ss.ms                |
| dynamic_input\_`X`\_remaining_mm.ss                |
| dynamic_input\_`X`\_remaining_mm.ss.ms             |
| dynamic_input\_`X`\_position_panx                  |
| dynamic_input\_`X`\_position_pany                  |
| dynamic_input\_`X`\_position_zoomx                 |
| dynamic_input\_`X`\_position_zoomy                 |
| dynamic_input\_`X`\_position_cropx1                |
| dynamic_input\_`X`\_position_cropx2                |
| dynamic_input\_`X`\_position_cropy1                |
| dynamic_input\_`X`\_position_cropy2                |
| dynamic_input\_`X`\_cc_hue                         |
| dynamic_input\_`X`\_cc_saturation                  |
| dynamic_input\_`X`\_cc_liftr                       |
| dynamic_input\_`X`\_cc_liftg                       |
| dynamic_input\_`X`\_cc_liftb                       |
| dynamic_input\_`X`\_cc_lifty                       |
| dynamic_input\_`X`\_cc_gammar                      |
| dynamic_input\_`X`\_cc_gammag                      |
| dynamic_input\_`X`\_cc_gammab                      |
| dynamic_input\_`X`\_cc_gammay                      |
| dynamic_input\_`X`\_cc_gainr                       |
| dynamic_input\_`X`\_cc_gaing                       |
| dynamic_input\_`X`\_cc_gainb                       |
| dynamic_input\_`X`\_cc_gainy                       |
| dynamic_input\_`X`\_layer\_`LayerIndex`\_name      |
| dynamic_input\_`X`\_layer\_`LayerIndex`\_number    |
| dynamic_input\_`X`\_layer\_`LayerIndex`\_key       |
| dynamic_input\_`X`\_layer\_`LayerIndex`\_panx      |
| dynamic_input\_`X`\_layer\_`LayerIndex`\_pany      |
| dynamic_input\_`X`\_layer\_`LayerIndex`\_x         |
| dynamic_input\_`X`\_layer\_`LayerIndex`\_y         |
| dynamic_input\_`X`\_layer\_`LayerIndex`\_zoomx     |
| dynamic_input\_`X`\_layer\_`LayerIndex`\_zoomy     |
| dynamic_input\_`X`\_layer\_`LayerIndex`\_width     |
| dynamic_input\_`X`\_layer\_`LayerIndex`\_height    |
| dynamic_input\_`X`\_layer\_`LayerIndex`\_cropx1    |
| dynamic_input\_`X`\_layer\_`LayerIndex`\_cropx2    |
| dynamic_input\_`X`\_layer\_`LayerIndex`\_cropy1    |
| dynamic_input\_`X`\_layer\_`LayerIndex`\_cropy2    |
| dynamic_input\_`X`\_layer\_`TextLayer`\_titletext  |
| dynamic_input\_`X`\_volume                         |
| dynamic_input\_`X`\_volume_db                      |
| dynamic_input\_`X`\_volume_linear                  |
| dynamic_input\_`X`\_volume\_`AudioChannel`         |
| dynamic_input\_`X`\_volume\_`AudioChannel`\_db     |
| dynamic_input\_`X`\_volume\_`AudioChannel`\_linear |
| dynamic_input\_`X`\_meter`AudioChannel`            |
| dynamic_input\_`X`\_meter`AudioChannel`\_avg_1s    |
| dynamic_input\_`X`\_meter`AudioChannel`\_avg_3s    |
| dynamic_input\_`X`\_meter`AudioChannel`\_peak_1s   |
| dynamic_input\_`X`\_meter`AudioChannel`\_peak_3s   |
| dynamic_input\_`X`\_framedelay                     |
| dynamic_input\_`X`\_list\_`Z`\_name                |
| dynamic_input\_`X`\_list\_`Z`\_selected            |
| dynamic_input\_`X`\_selected                       |
| dynamic_input\_`X`\_selectedindex                  |
| dynamic_input\_`X`\_selected_name                  |
| dynamic_input\_`X`\_call_password                  |
| dynamic_input\_`X`\_call_connected                 |
| dynamic_input\_`X`\_call_video_source              |
| dynamic_input\_`X`\_call_audio_source              |

# General Variables

| Variable            |
| ------------------- |
| connected_state     |
| ftb_active          |
| playlist_active     |
| fullscreen_active   |
| external_active     |
| multicorder_active  |
| stream_1_active     |
| stream_2_active     |
| stream_3_active     |
| stream_4_active     |
| stream_5_active     |
| recording_active    |
| recording_duration  |
| recording_hms       |
| recording_filename1 |
| recording_filepath1 |
| recording_filename2 |
| recording_filepath2 |
| preset              |

# Input Variables

`InputID` = Input Name, Number, or GUID (depending on config settings) | `MixID` = 1 to 16 | `LayerIndex` = 1 to 10 | `TextLayer` = number or string| `Z` = Number | `ListIndex` = Number | `AudioChannel` = `f1` or `f2`
Note: Input Names in variable IDs support `a to z`, `0 to 9`, `-`, `_`, and `.`. All other characters will be omitted

| Variable                                         |
| ------------------------------------------------ |
| input_any_solo                                   |
| input\_`InputID`\_name                           |
| input\_`InputID`\_full_title                     |
| input\_`InputID`\_guid                           |
| input\_`InputID`\_type                           |
| input\_`InputID`\_number                         |
| input\_`InputID`\_mix\_`MixID`\_tally_preview    |
| input\_`InputID`\_mix\_`MixID`\_tally_program    |
| input\_`InputID`\_playing                        |
| input\_`InputID`\_loop                           |
| input\_`InputID`\_mute                           |
| input\_`InputID`\_audio                          |
| input\_`InputID`\_solo                           |
| input\_`InputID`\_duration                       |
| input\_`InputID`\_remaining                      |
| input\_`InputID`\_remaining_ss                   |
| input\_`InputID`\_remaining_ss.ms                |
| input\_`InputID`\_remaining_mm.ss                |
| input\_`InputID`\_remaining_mm.ss.ms             |
| input\_`InputID`\_layer\_`LayerIndex`\_name      |
| input\_`InputID`\_layer\_`LayerIndex`\_number    |
| input\_`InputID`\_layer\_`LayerIndex`\_key       |
| input\_`InputID`\_layer\_`LayerIndex`\_panx      |
| input\_`InputID`\_layer\_`LayerIndex`\_pany      |
| input\_`InputID`\_layer\_`LayerIndex`\_x         |
| input\_`InputID`\_layer\_`LayerIndex`\_y         |
| input\_`InputID`\_layer\_`LayerIndex`\_zoomx     |
| input\_`InputID`\_layer\_`LayerIndex`\_zoomy     |
| input\_`InputID`\_layer\_`LayerIndex`\_width     |
| input\_`InputID`\_layer\_`LayerIndex`\_height    |
| input\_`InputID`\_layer\_`LayerIndex`\_cropx1    |
| input\_`InputID`\_layer\_`LayerIndex`\_cropx2    |
| input\_`InputID`\_layer\_`LayerIndex`\_cropy1    |
| input\_`InputID`\_layer\_`LayerIndex`\_cropy2    |
| input\_`InputID`\_layer\_`TextLayer`\_titletext  |
| input\_`InputID`\_layer\_`TextLayer`\_titlecolor |
| input\_`InputID`\_layer\_`TextLayer`\_titleimage |
| input\_`InputID`\_selected                       |
| input\_`InputID`\_selectedindex                  |
| input\_`InputID`\_selected_name                  |
| input\_`InputID`\_list\_`ListIndex`\_name        |
| input\_`InputID`\_list\_`ListIndex`\_selected    |
| input\_`InputID`\_call_password                  |
| input\_`InputID`\_call_connected                 |
| input\_`InputID`\_call_video_source              |
| input\_`InputID`\_call_audio_source              |
| input\_`InputID`\_volume                         |
| input\_`InputID`\_volume_db                      |
| input\_`InputID`\_volume_linear                  |
| input\_`InputID`\_framedelay                     |
| input\_`InputID`\_volume\_`AudioChannel`         |
| input\_`InputID`\_volume\_`AudioChannel`\_db     |
| input\_`InputID`\_volume\_`AudioChannel`\_linear |
| input\_`InputID`\_meter`AudioChannel`            |
| input\_`InputID`\_meter`AudioChannel`\_avg_1s    |
| input\_`InputID`\_meter`AudioChannel`\_avg_3s    |
| input\_`InputID`\_meter`AudioChannel`\_peak_1s   |
| input\_`InputID`\_meter`AudioChannel`\_peak_3s   |
| input\_`InputID`\_position_panx                  |
| input\_`InputID`\_position_pany                  |
| input\_`InputID`\_position_zoomx                 |
| input\_`InputID`\_position_zoomy                 |
| input\_`InputID`\_position_cropx1                |
| input\_`InputID`\_position_cropx2                |
| input\_`InputID`\_position_cropy1                |
| input\_`InputID`\_position_cropy2                |
| input\_`InputID`\_cc_hue                         |
| input\_`InputID`\_cc_saturation                  |
| input\_`InputID`\_cc_liftr                       |
| input\_`InputID`\_cc_liftg                       |
| input\_`InputID`\_cc_liftb                       |
| input\_`InputID`\_cc_lifty                       |
| input\_`InputID`\_cc_gammar                      |
| input\_`InputID`\_cc_gammag                      |
| input\_`InputID`\_cc_gammab                      |
| input\_`InputID`\_cc_gammay                      |
| input\_`InputID`\_cc_gainr                       |
| input\_`InputID`\_cc_gaing                       |
| input\_`InputID`\_cc_gainb                       |
| input\_`InputID`\_cc_gainy                       |

# Layer Routing Variables

| Variable            |
| ------------------- |
| layer_routing_input |
| layer_routing_layer |

# Mix Variables

`X` = 1 to 16 or `selected` | `Y` = `preview` or `program` | `Z` = 1 to 10 | `AudioChannel` = `f1` or `f2` | `LayerIndex` = 1 to 10

| Variable                                    |
| ------------------------------------------- |
| mix\_`X`\_`Y`                               |
| mix\_`X`\_`Y`\_name                         |
| mix\_`X`\_`Y`\_full_title                   |
| mix\_`X`\_`Y`\_guid                         |
| mix\_`X`\_`Y`\_playing                      |
| mix\_`X`\_`Y`\_loop                         |
| mix\_`X`\_`Y`\_audio                        |
| mix\_`X`\_`Y`\_mute                         |
| mix\_`X`\_`Y`\_framedelay                   |
| mix\_`X`\_`Y`\_meter`AudioChannel`          |
| mix\_`X`\_`Y`\_meter`AudioChannel`\_avg_1s  |
| mix\_`X`\_`Y`\_meter`AudioChannel`\_avg_3s  |
| mix\_`X`\_`Y`\_meter`AudioChannel`\_peak_1s |
| mix\_`X`\_`Y`\_meter`AudioChannel`\_peak_3s |
| mix\_`X`\_`Y`\_duration                     |
| mix\_`X`\_`Y`\_remaining                    |
| mix\_`X`\_`Y`\_position_panx                |
| mix\_`X`\_`Y`\_position_pany                |
| mix\_`X`\_`Y`\_position_zoomx               |
| mix\_`X`\_`Y`\_position_zoomy               |
| mix\_`X`\_`Y`\_position_cropx1              |
| mix\_`X`\_`Y`\_position_cropx2              |
| mix\_`X`\_`Y`\_position_cropy1              |
| mix\_`X`\_`Y`\_position_cropy2              |
| mix\_`X`\_`Y`\_cc_hue                       |
| mix\_`X`\_`Y`\_cc_saturation                |
| mix\_`X`\_`Y`\_cc_liftr                     |
| mix\_`X`\_`Y`\_cc_liftg                     |
| mix\_`X`\_`Y`\_cc_liftb                     |
| mix\_`X`\_`Y`\_cc_lifty                     |
| mix\_`X`\_`Y`\_cc_gammar                    |
| mix\_`X`\_`Y`\_cc_gammag                    |
| mix\_`X`\_`Y`\_cc_gammab                    |
| mix\_`X`\_`Y`\_cc_gammay                    |
| mix\_`X`\_`Y`\_cc_gainr                     |
| mix\_`X`\_`Y`\_cc_gaing                     |
| mix\_`X`\_`Y`\_cc_gainb                     |
| mix\_`X`\_`Y`\_cc_gainy                     |
| mix\_`X`\_`Y`_layer_`LayerIndex`\_number    |
| mix\_`X`\_`Y`_layer_`LayerIndex`\_name      |
| mix\_`X`\_`Y`_layer_`LayerIndex`\_key       |
| mix\_`X`\_`Y`_layer_`LayerIndex`\_panx      |
| mix\_`X`\_`Y`_layer_`LayerIndex`\_pany      |
| mix\_`X`\_`Y`_layer_`LayerIndex`\_x         |
| mix\_`X`\_`Y`_layer_`LayerIndex`\_y         |
| mix\_`X`\_`Y`_layer_`LayerIndex`\_zoomx     |
| mix\_`X`\_`Y`_layer_`LayerIndex`\_zoomy     |
| mix\_`X`\_`Y`_layer_`LayerIndex`\_width     |
| mix\_`X`\_`Y`_layer_`LayerIndex`\_height    |
| mix\_`X`\_`Y`_layer_`LayerIndex`\_cropx1    |
| mix\_`X`\_`Y`_layer_`LayerIndex`\_cropx2    |
| mix\_`X`\_`Y`_layer_`LayerIndex`\_cropy1    |
| mix\_`X`\_`Y`_layer_`LayerIndex`\_cropy2    |
| mix_selected                                |

# Output Variables

`FullScreenID` = 1 or 2 | `OutputID` = 1 to 4

| Variable                           |
| ---------------------------------- |
| fullscreen\_`FullScreenID`\_source |
| output\_`OutputID`\_source         |
| output\_`OutputID`\_omt            |
| output\_`OutputID`\_ndi            |
| output\_`OutputID`\_srt            |
| output\_`OutputID`\_type           |
| output\_`OutputID`\_input_name     |

# Overlay Variables

`OverlayID` = 1 to 8

| Variable                         |
| -------------------------------- |
| overlay\_`OverlayID`\_input_name |
| overlay\_`OverlayID`\_input      |
| overlay\_`OverlayID`\_pgm        |
| overlay\_`OverlayID`\_prv        |

# Replay Variables

| Variable            |
| ------------------- |
| replay_recording    |
| replay_live         |
| replay_forward      |
| replay_channel_mode |
| replay_events       |
| replay_eventsa      |
| replay_eventsb      |
| replay_cameraa      |
| replay_camerab      |
| replay_quad_view    |
| replay_speed        |
| replay_speeda       |
| replay_speedb       |
| replay_timecode     |
| replay_timecodea    |
| replay_timecodeb    |

# Transition Variables

`TransitionID` = 1 to 4

| Variable                             |
| ------------------------------------ |
| transition\_`TransitionID`\_effect   |
| transition\_`TransitionID`\_duration |
