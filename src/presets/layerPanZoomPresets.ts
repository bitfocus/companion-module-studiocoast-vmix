import { combineRgb } from '@companion-module/base'
import { graphics } from 'companion-module-utils'
import { VMixPresetArray } from './presets'

export const getLayerPanZoomPresets = (): VMixPresetArray => {
  const layerPanZoomPresets: VMixPresetArray = [
    {
      category: 'Layer Pan/Zoom',
      name: 'Example of Layer Pan / Zoom',
      type: 'text',
      text: 'vMix 27 added the ability for Pan / Zoom layer actions, this makes it ideal to use an input as a layer on another, zoom/pan to sections, and then merge between the original input and the one with the zoomed layer'
    },
    {
      category: 'Layer Pan/Zoom',
      name: '',
      type: 'text',
      text: 'More complex usage can be done by using a Custom Variables, allowing for controlling multiple inputs/layers/zoom levels with a limited number of buttons,'
    },
    {
      category: 'Layer Pan/Zoom',
      name: 'Zoom',
      type: 'text',
      text: 'Adjust the zoom of Layer 1 on Input 1'
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Zoom +`,
      type: 'button',
      style: {
        text: `Zoom +`,
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'Zoom',
                input: '1',
                layer: '1',
                adjustment: 'Increase',
                crop: '',
                crop2: '',
                pan: '',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: '0.1'
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Zoom -`,
      type: 'button',
      style: {
        text: `Zoom -`,
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'Zoom',
                input: '1',
                layer: '1',
                adjustment: 'Decrease',
                crop: '',
                crop2: '',
                pan: '',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: '0.1'
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    }
  ]

  ;[25, 50, 75, 100, 150, 200, 400].forEach((zoom) => {
    const value = zoom / 100

    layerPanZoomPresets.push({
      category: 'Layer Pan/Zoom',
      name: `Zoom ${zoom}%`,
      type: 'button',
      style: {
        text: `Zoom ${zoom}%`,
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'Zoom',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: value.toString()
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    })
  })

  const arrowTopLeft = graphics.toPNG64({
    image: graphics.icon({ width: 50, height: 50, type: 'directionUpLeft' }),
    width: 50,
    height: 50
  })
  const arrowTopCenter = graphics.toPNG64({
    image: graphics.icon({ width: 50, height: 50, type: 'directionUp' }),
    width: 50,
    height: 50
  })
  const arrowTopRight = graphics.toPNG64({
    image: graphics.icon({ width: 50, height: 50, type: 'directionUpRight' }),
    width: 50,
    height: 50
  })
  const arrowMidleLeft = graphics.toPNG64({
    image: graphics.icon({ width: 50, height: 50, type: 'directionLeft' }),
    width: 50,
    height: 50
  })
  const arrowMidleCenter = graphics.toPNG64({
    image: graphics.icon({ width: 50, height: 50, type: 'record' }),
    width: 50,
    height: 50
  })
  const arrowMidleRight = graphics.toPNG64({
    image: graphics.icon({ width: 50, height: 50, type: 'directionRight' }),
    width: 50,
    height: 50
  })
  const arrowBottomLeft = graphics.toPNG64({
    image: graphics.icon({ width: 50, height: 50, type: 'directionDownLeft' }),
    width: 50,
    height: 50
  })
  const arrowBottomCenter = graphics.toPNG64({
    image: graphics.icon({ width: 50, height: 50, type: 'directionDown' }),
    width: 50,
    height: 50
  })
  const arrowBottomRight = graphics.toPNG64({
    image: graphics.icon({ width: 50, height: 50, type: 'directionDownRight' }),
    width: 50,
    height: 50
  })

  layerPanZoomPresets.push(
    {
      category: 'Layer Pan/Zoom',
      name: 'Pan Adjust',
      type: 'text',
      text: 'Progressive panning on each button press'
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Up Left`,
      type: 'button',
      style: {
        text: '',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        png64: arrowTopLeft,
        pngalignment: 'center:center'
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanX',
                input: '1',
                layer: '1',
                adjustment: 'Decrease',
                crop: '',
                crop2: '',
                pan: '0.1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            },
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanY',
                input: '1',
                layer: '1',
                adjustment: 'Increase',
                crop: '',
                crop2: '',
                pan: '0.1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Up`,
      type: 'button',
      style: {
        text: '',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        png64: arrowTopCenter,
        pngalignment: 'center:center'
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanY',
                input: '1',
                layer: '1',
                adjustment: 'Increase',
                crop: '',
                crop2: '',
                pan: '0.1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Top Right`,
      type: 'button',
      style: {
        text: '',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        png64: arrowTopRight,
        pngalignment: 'center:center'
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanX',
                input: '1',
                layer: '1',
                adjustment: 'Increase',
                crop: '',
                crop2: '',
                pan: '0.1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            },
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanY',
                input: '1',
                layer: '1',
                adjustment: 'Increase',
                crop: '',
                crop2: '',
                pan: '0.1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Layer Pan/Zoom',
      name: '',
      type: 'text',
      text: ''
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Left`,
      type: 'button',
      style: {
        text: '',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        png64: arrowMidleLeft,
        pngalignment: 'center:center'
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanX',
                input: '1',
                layer: '1',
                adjustment: 'Decrease',
                crop: '',
                crop2: '',
                pan: '0.1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Center`,
      type: 'button',
      style: {
        text: '',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        png64: arrowMidleCenter,
        pngalignment: 'center:center'
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanX',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '0',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            },
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanY',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '0',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Right`,
      type: 'button',
      style: {
        text: '',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        png64: arrowMidleRight,
        pngalignment: 'center:center'
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanX',
                input: '1',
                layer: '1',
                adjustment: 'Increase',
                crop: '',
                crop2: '',
                pan: '0.1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Layer Pan/Zoom',
      name: '',
      type: 'text',
      text: ''
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Down Left`,
      type: 'button',
      style: {
        text: '',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        png64: arrowBottomLeft,
        pngalignment: 'center:center'
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanX',
                input: '1',
                layer: '1',
                adjustment: 'Decrease',
                crop: '',
                crop2: '',
                pan: '0.1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            },
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanY',
                input: '1',
                layer: '1',
                adjustment: 'Decrease',
                crop: '',
                crop2: '',
                pan: '0.1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Down`,
      type: 'button',
      style: {
        text: '',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        png64: arrowBottomCenter,
        pngalignment: 'center:center'
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanY',
                input: '1',
                layer: '1',
                adjustment: 'Decrease',
                crop: '',
                crop2: '',
                pan: '0.1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Bottom Right`,
      type: 'button',
      style: {
        text: '',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        png64: arrowBottomRight,
        pngalignment: 'center:center'
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanX',
                input: '1',
                layer: '1',
                adjustment: 'Increase',
                crop: '',
                crop2: '',
                pan: '0.1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            },
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanY',
                input: '1',
                layer: '1',
                adjustment: 'Decrease',
                crop: '',
                crop2: '',
                pan: '0.1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    }
  )

  const rect = graphics.rect({
    width: 20,
    height: 20,
    color: combineRgb(0, 0, 255),
    rectWidth: 20,
    rectHeight: 20,
    strokeWidth: 2,
    opacity: 255,
    fillColor: combineRgb(255, 255, 255),
    fillOpacity: 255,
    offsetX: 0,
    offsetY: 0
  })

  const box = graphics.toPNG64({
    image: graphics.icon({
      width: 20,
      height: 20,
      type: 'custom',
      custom: rect,
      offsetX: 0,
      offsetY: 0,
      customHeight: 20,
      customWidth: 20
    }),
    width: 20,
    height: 20
  })

  layerPanZoomPresets.push(
    {
      category: 'Layer Pan/Zoom',
      name: 'Pan Set',
      type: 'text',
      text: 'Set the Pan to specific positions'
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Set Up Left`,
      type: 'button',
      style: {
        text: '',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        png64: box,
        pngalignment: 'left:top'
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanX',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '-1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            },
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanY',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Set Up`,
      type: 'button',
      style: {
        text: '',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        png64: box,
        pngalignment: 'center:top'
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanX',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '0',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            },
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanY',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Set Up Right`,
      type: 'button',
      style: {
        text: '',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        png64: box,
        pngalignment: 'right:top'
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanX',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            },
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanY',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Layer Pan/Zoom',
      name: '',
      type: 'text',
      text: ''
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Set Left`,
      type: 'button',
      style: {
        text: '',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        png64: box,
        pngalignment: 'left:center'
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanX',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '-1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            },
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanY',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '0',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Set Center`,
      type: 'button',
      style: {
        text: '',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        png64: box,
        pngalignment: 'center:center'
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanX',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '0',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            },
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanY',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '0',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Set Right`,
      type: 'button',
      style: {
        text: '',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        png64: box,
        pngalignment: 'right:center'
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanX',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            },
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanY',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '0',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Layer Pan/Zoom',
      name: '',
      type: 'text',
      text: ''
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Set Left`,
      type: 'button',
      style: {
        text: '',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        png64: box,
        pngalignment: 'left:bottom'
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanX',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '-1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            },
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanY',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '-1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Set Bottom Center`,
      type: 'button',
      style: {
        text: '',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        png64: box,
        pngalignment: 'center:bottom'
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanX',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '0',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            },
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanY',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '-1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Set Bottom Right`,
      type: 'button',
      style: {
        text: '',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        png64: box,
        pngalignment: 'right:bottom'
      },
      steps: [
        {
          down: [
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanX',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            },
            {
              actionId: 'setLayerPosition',
              options: {
                setting: 'PanY',
                input: '1',
                layer: '1',
                adjustment: 'Set',
                crop: '',
                crop2: '',
                pan: '-1',
                xy: '',
                heightWidth: '',
                rectangle: '',
                zoom: ''
              }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    }
  )

  return layerPanZoomPresets
}
