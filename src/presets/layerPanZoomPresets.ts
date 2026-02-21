import { combineRgb } from '@companion-module/base'
import { graphics } from 'companion-module-utils'
import type { VMixPresetArray } from './presets'

const panPNG64 = {
  topLeft:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kb9Lw0AcxV9TRZGqQwuKOASsTnZREcdSxSJYKG2FVh1MLv0FTRqSFBdHwbXg4I/FqoOLs64OroIg+APEP0CcFF2kxO8lhRYxHhz34d29x907QGhUmGp2RQFVs4xUPCZmc6tizysEBDGAIYxJzNQT6cUMPMfXPXx8vYvwLO9zf45+JW8ywCcSR5luWMQbxLObls55nzjESpJCfE48adAFiR+5Lrv8xrnosMAzQ0YmNU8cIhaLHSx3MCsZKvEMcVhRNcoXsi4rnLc4q5Uaa92TvzCQ11bSXKc5ijiWkEASImTUUEYFFiK0aqSYSNF+zMM/4viT5JLJVQYjxwKqUCE5fvA/+N2tWZiecpMCMaD7xbY/xoGeXaBZt+3vY9tungD+Z+BKa/urDWDuk/R6WwsfAYPbwMV1W5P3gMsdYPhJlwzJkfw0hUIBeD+jb8oBwVugb83trbWP0wcgQ10t3wAHh8BEkbLXPd7d29nbv2da/f0AqxtyvXVwF8gAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfqAhMOIwWHOpexAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAERJREFUaN7t0SEOADAIBEHo//989bU1JMzIEyQbqoDJ+h2S5Otgd08MPVs+KlSoUKFChQoVKlSoUKEAAAAAAAAAALDVBaa7BCC5HEL7AAAAAElFTkSuQmCC',
  topCenter:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kb9Lw0AcxV9TRZGqQwuKOASsTnZREcdSxSJYKG2FVh1MLv0FTRqSFBdHwbXg4I/FqoOLs64OroIg+APEP0CcFF2kxO8lhRYxHhz34d29x907QGhUmGp2RQFVs4xUPCZmc6tizysEBDGAIYxJzNQT6cUMPMfXPXx8vYvwLO9zf45+JW8ywCcSR5luWMQbxLObls55nzjESpJCfE48adAFiR+5Lrv8xrnosMAzQ0YmNU8cIhaLHSx3MCsZKvEMcVhRNcoXsi4rnLc4q5Uaa92TvzCQ11bSXKc5ijiWkEASImTUUEYFFiK0aqSYSNF+zMM/4viT5JLJVQYjxwKqUCE5fvA/+N2tWZiecpMCMaD7xbY/xoGeXaBZt+3vY9tungD+Z+BKa/urDWDuk/R6WwsfAYPbwMV1W5P3gMsdYPhJlwzJkfw0hUIBeD+jb8oBwVugb83trbWP0wcgQ10t3wAHh8BEkbLXPd7d29nbv2da/f0AqxtyvXVwF8gAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfqAhMOJAnBzU1dAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAENJREFUaN7t0YEJACAMA8HW/XeOQ6gg9G6AkqdVwM/6xdEkORrVfX3XmvJRoUKFChUqVKhQoUKFCgUAAAAAAAAAgKk2lqwEIEd+VJ8AAAAASUVORK5CYII=',
  topRight:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kb9Lw0AcxV9TRZGqQwuKOASsTnZREcdSxSJYKG2FVh1MLv0FTRqSFBdHwbXg4I/FqoOLs64OroIg+APEP0CcFF2kxO8lhRYxHhz34d29x907QGhUmGp2RQFVs4xUPCZmc6tizysEBDGAIYxJzNQT6cUMPMfXPXx8vYvwLO9zf45+JW8ywCcSR5luWMQbxLObls55nzjESpJCfE48adAFiR+5Lrv8xrnosMAzQ0YmNU8cIhaLHSx3MCsZKvEMcVhRNcoXsi4rnLc4q5Uaa92TvzCQ11bSXKc5ijiWkEASImTUUEYFFiK0aqSYSNF+zMM/4viT5JLJVQYjxwKqUCE5fvA/+N2tWZiecpMCMaD7xbY/xoGeXaBZt+3vY9tungD+Z+BKa/urDWDuk/R6WwsfAYPbwMV1W5P3gMsdYPhJlwzJkfw0hUIBeD+jb8oBwVugb83trbWP0wcgQ10t3wAHh8BEkbLXPd7d29nbv2da/f0AqxtyvXVwF8gAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfqAhMOIjTP/6bKAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAEJJREFUaN7t0bENACAMA8GE/Xc2NTVNpNxN4JergMl66rAk+QrrftrOlkeFChUqVKhQoUKFChUqFAAAAAAAAAAAtrqGnQQgZzm5/AAAAABJRU5ErkJggg==',
  middleLeft:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kb9Lw0AcxV9TRZGqQwuKOASsTnZREcdSxSJYKG2FVh1MLv0FTRqSFBdHwbXg4I/FqoOLs64OroIg+APEP0CcFF2kxO8lhRYxHhz34d29x907QGhUmGp2RQFVs4xUPCZmc6tizysEBDGAIYxJzNQT6cUMPMfXPXx8vYvwLO9zf45+JW8ywCcSR5luWMQbxLObls55nzjESpJCfE48adAFiR+5Lrv8xrnosMAzQ0YmNU8cIhaLHSx3MCsZKvEMcVhRNcoXsi4rnLc4q5Uaa92TvzCQ11bSXKc5ijiWkEASImTUUEYFFiK0aqSYSNF+zMM/4viT5JLJVQYjxwKqUCE5fvA/+N2tWZiecpMCMaD7xbY/xoGeXaBZt+3vY9tungD+Z+BKa/urDWDuk/R6WwsfAYPbwMV1W5P3gMsdYPhJlwzJkfw0hUIBeD+jb8oBwVugb83trbWP0wcgQ10t3wAHh8BEkbLXPd7d29nbv2da/f0AqxtyvXVwF8gAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfqAhMOJRHLuuRKAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAERJREFUaN7t0SEOADAIBEHo//989bU1JMzIEyQbqgAAAABgqX6HJPk62N0TQ8+WjwoVKlSoUKFChQoVKlQoAAAAADDaBd9UBCBhXGkiAAAAAElFTkSuQmCC',
  middleCenter:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kb9Lw0AcxV9TRZGqQwuKOASsTnZREcdSxSJYKG2FVh1MLv0FTRqSFBdHwbXg4I/FqoOLs64OroIg+APEP0CcFF2kxO8lhRYxHhz34d29x907QGhUmGp2RQFVs4xUPCZmc6tizysEBDGAIYxJzNQT6cUMPMfXPXx8vYvwLO9zf45+JW8ywCcSR5luWMQbxLObls55nzjESpJCfE48adAFiR+5Lrv8xrnosMAzQ0YmNU8cIhaLHSx3MCsZKvEMcVhRNcoXsi4rnLc4q5Uaa92TvzCQ11bSXKc5ijiWkEASImTUUEYFFiK0aqSYSNF+zMM/4viT5JLJVQYjxwKqUCE5fvA/+N2tWZiecpMCMaD7xbY/xoGeXaBZt+3vY9tungD+Z+BKa/urDWDuk/R6WwsfAYPbwMV1W5P3gMsdYPhJlwzJkfw0hUIBeD+jb8oBwVugb83trbWP0wcgQ10t3wAHh8BEkbLXPd7d29nbv2da/f0AqxtyvXVwF8gAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfqAhMOJTMe2qWuAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAENJREFUaN7t0YEJACAMA8HW/XeOQ6gg9G6AkqdVAAAAADBUvziaJEejuq/vWlM+KlSoUKFChQoVKlSoUKEAAAAAwNc2z0UEILORrvYAAAAASUVORK5CYII=',
  middleRight:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kb9Lw0AcxV9TRZGqQwuKOASsTnZREcdSxSJYKG2FVh1MLv0FTRqSFBdHwbXg4I/FqoOLs64OroIg+APEP0CcFF2kxO8lhRYxHhz34d29x907QGhUmGp2RQFVs4xUPCZmc6tizysEBDGAIYxJzNQT6cUMPMfXPXx8vYvwLO9zf45+JW8ywCcSR5luWMQbxLObls55nzjESpJCfE48adAFiR+5Lrv8xrnosMAzQ0YmNU8cIhaLHSx3MCsZKvEMcVhRNcoXsi4rnLc4q5Uaa92TvzCQ11bSXKc5ijiWkEASImTUUEYFFiK0aqSYSNF+zMM/4viT5JLJVQYjxwKqUCE5fvA/+N2tWZiecpMCMaD7xbY/xoGeXaBZt+3vY9tungD+Z+BKa/urDWDuk/R6WwsfAYPbwMV1W5P3gMsdYPhJlwzJkfw0hUIBeD+jb8oBwVugb83trbWP0wcgQ10t3wAHh8BEkbLXPd7d29nbv2da/f0AqxtyvXVwF8gAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfqAhMOJBncel05AAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAEJJREFUaN7t0bENACAMA8GE/Xc2NTVNpNxN4JerAAAAAGCpnjosSb7Cup+2s+VRoUKFChUqVKhQoUKFCgUAAAAARru/NgQgE7PdWgAAAABJRU5ErkJggg==',
  bottomLeft:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kb9Lw0AcxV9TRZGqQwuKOASsTnZREcdSxSJYKG2FVh1MLv0FTRqSFBdHwbXg4I/FqoOLs64OroIg+APEP0CcFF2kxO8lhRYxHhz34d29x907QGhUmGp2RQFVs4xUPCZmc6tizysEBDGAIYxJzNQT6cUMPMfXPXx8vYvwLO9zf45+JW8ywCcSR5luWMQbxLObls55nzjESpJCfE48adAFiR+5Lrv8xrnosMAzQ0YmNU8cIhaLHSx3MCsZKvEMcVhRNcoXsi4rnLc4q5Uaa92TvzCQ11bSXKc5ijiWkEASImTUUEYFFiK0aqSYSNF+zMM/4viT5JLJVQYjxwKqUCE5fvA/+N2tWZiecpMCMaD7xbY/xoGeXaBZt+3vY9tungD+Z+BKa/urDWDuk/R6WwsfAYPbwMV1W5P3gMsdYPhJlwzJkfw0hUIBeD+jb8oBwVugb83trbWP0wcgQ10t3wAHh8BEkbLXPd7d29nbv2da/f0AqxtyvXVwF8gAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfqAhMOIh2NTT6mAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAERJREFUaN7t0SEOACAMBMGW///58NgiSJiRJ5psWgUAAAAAAAAAALf1OSTJ6GB3vxi6fvmoUKFChQoVKlSoUKFChQLMbRf8BCAr7g4OAAAAAElFTkSuQmCC',
  bottomCenter:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kb9Lw0AcxV9TRZGqQwuKOASsTnZREcdSxSJYKG2FVh1MLv0FTRqSFBdHwbXg4I/FqoOLs64OroIg+APEP0CcFF2kxO8lhRYxHhz34d29x907QGhUmGp2RQFVs4xUPCZmc6tizysEBDGAIYxJzNQT6cUMPMfXPXx8vYvwLO9zf45+JW8ywCcSR5luWMQbxLObls55nzjESpJCfE48adAFiR+5Lrv8xrnosMAzQ0YmNU8cIhaLHSx3MCsZKvEMcVhRNcoXsi4rnLc4q5Uaa92TvzCQ11bSXKc5ijiWkEASImTUUEYFFiK0aqSYSNF+zMM/4viT5JLJVQYjxwKqUCE5fvA/+N2tWZiecpMCMaD7xbY/xoGeXaBZt+3vY9tungD+Z+BKa/urDWDuk/R6WwsfAYPbwMV1W5P3gMsdYPhJlwzJkfw0hUIBeD+jb8oBwVugb83trbWP0wcgQ10t3wAHh8BEkbLXPd7d29nbv2da/f0AqxtyvXVwF8gAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfqAhMOJDXuojHaAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAEJJREFUaN7t0cENADAIAzHo/junQ0BftQdAOVEFAAAAAAAAAADb+sXRJBmN6l7fdX75qFChQoUKFSpUqFChQoUCzF0H7QQgeTH5vwAAAABJRU5ErkJggg==',
  bottomright:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kb9Lw0AcxV9TRZGqQwuKOASsTnZREcdSxSJYKG2FVh1MLv0FTRqSFBdHwbXg4I/FqoOLs64OroIg+APEP0CcFF2kxO8lhRYxHhz34d29x907QGhUmGp2RQFVs4xUPCZmc6tizysEBDGAIYxJzNQT6cUMPMfXPXx8vYvwLO9zf45+JW8ywCcSR5luWMQbxLObls55nzjESpJCfE48adAFiR+5Lrv8xrnosMAzQ0YmNU8cIhaLHSx3MCsZKvEMcVhRNcoXsi4rnLc4q5Uaa92TvzCQ11bSXKc5ijiWkEASImTUUEYFFiK0aqSYSNF+zMM/4viT5JLJVQYjxwKqUCE5fvA/+N2tWZiecpMCMaD7xbY/xoGeXaBZt+3vY9tungD+Z+BKa/urDWDuk/R6WwsfAYPbwMV1W5P3gMsdYPhJlwzJkfw0hUIBeD+jb8oBwVugb83trbWP0wcgQ10t3wAHh8BEkbLXPd7d29nbv2da/f0AqxtyvXVwF8gAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfqAhMOIims+coTAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAENJREFUaN7t0bENACAMA8GE/Xc2NXUokLibwC9XAQAAAAAAAADAbf3qsCQZhXUfbeuXR4UKFSpUqFChQoUKFSoUYG4D988EIA7E220AAAAASUVORK5CYII=',
}

export const getLayerPanZoomPresets = (): VMixPresetArray => {
  const layerPanZoomPresets: VMixPresetArray = [
    {
      category: 'Layer Pan/Zoom',
      name: 'Example of Layer Pan / Zoom',
      type: 'text',
      text: 'vMix 27 added the ability for Pan / Zoom layer actions, this makes it ideal to use an input as a layer on another, zoom/pan to sections, and then merge between the original input and the one with the zoomed layer',
    },
    {
      category: 'Layer Pan/Zoom',
      name: '',
      type: 'text',
      text: 'More complex usage can be done by using a Custom Variables, allowing for controlling multiple inputs/layers/zoom levels with a limited number of buttons,',
    },
    {
      category: 'Layer Pan/Zoom',
      name: 'Zoom',
      type: 'text',
      text: 'Adjust the zoom of Layer 1 on Input 1',
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Zoom +`,
      type: 'button',
      style: {
        text: `Zoom +`,
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
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
                zoom: '0.1',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Layer Pan/Zoom',
      name: `Zoom -`,
      type: 'button',
      style: {
        text: `Zoom -`,
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
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
                zoom: '0.1',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
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
        bgcolor: combineRgb(0, 0, 0),
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
                zoom: value.toString(),
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    })
  })

  const arrowTopLeft = graphics.toPNG64({
    image: graphics.icon({ width: 50, height: 50, type: 'directionUpLeft' }),
    width: 50,
    height: 50,
  })
  const arrowTopCenter = graphics.toPNG64({
    image: graphics.icon({ width: 50, height: 50, type: 'directionUp' }),
    width: 50,
    height: 50,
  })
  const arrowTopRight = graphics.toPNG64({
    image: graphics.icon({ width: 50, height: 50, type: 'directionUpRight' }),
    width: 50,
    height: 50,
  })
  const arrowMiddleLeft = graphics.toPNG64({
    image: graphics.icon({ width: 50, height: 50, type: 'directionLeft' }),
    width: 50,
    height: 50,
  })
  const arrowMiddleCenter = graphics.toPNG64({
    image: graphics.icon({ width: 50, height: 50, type: 'record' }),
    width: 50,
    height: 50,
  })
  const arrowMiddleRight = graphics.toPNG64({
    image: graphics.icon({ width: 50, height: 50, type: 'directionRight' }),
    width: 50,
    height: 50,
  })
  const arrowBottomLeft = graphics.toPNG64({
    image: graphics.icon({ width: 50, height: 50, type: 'directionDownLeft' }),
    width: 50,
    height: 50,
  })
  const arrowBottomCenter = graphics.toPNG64({
    image: graphics.icon({ width: 50, height: 50, type: 'directionDown' }),
    width: 50,
    height: 50,
  })
  const arrowBottomRight = graphics.toPNG64({
    image: graphics.icon({ width: 50, height: 50, type: 'directionDownRight' }),
    width: 50,
    height: 50,
  })

  layerPanZoomPresets.push(
    {
      category: 'Layer Pan/Zoom',
      name: 'Pan Adjust',
      type: 'text',
      text: 'Progressive panning on each button press',
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
        pngalignment: 'center:center',
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
                zoom: '',
              },
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
                zoom: '',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
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
        pngalignment: 'center:center',
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
                zoom: '',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
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
        pngalignment: 'center:center',
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
                zoom: '',
              },
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
                zoom: '',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Layer Pan/Zoom',
      name: '',
      type: 'text',
      text: '',
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
        png64: arrowMiddleLeft,
        pngalignment: 'center:center',
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
                zoom: '',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
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
        png64: arrowMiddleCenter,
        pngalignment: 'center:center',
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
                zoom: '',
              },
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
                zoom: '',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
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
        png64: arrowMiddleRight,
        pngalignment: 'center:center',
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
                zoom: '',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Layer Pan/Zoom',
      name: '',
      type: 'text',
      text: '',
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
        pngalignment: 'center:center',
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
                zoom: '',
              },
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
                zoom: '',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
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
        pngalignment: 'center:center',
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
                zoom: '',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
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
        pngalignment: 'center:center',
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
                zoom: '',
              },
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
                zoom: '',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
  )

  layerPanZoomPresets.push(
    {
      category: 'Layer Pan/Zoom',
      name: 'Pan Set',
      type: 'text',
      text: 'Set the Pan to specific positions',
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
        png64: panPNG64.topLeft,
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
                zoom: '',
              },
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
                zoom: '',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
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
        png64: panPNG64.topCenter,
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
                zoom: '',
              },
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
                zoom: '',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
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
        png64: panPNG64.topRight,
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
                zoom: '',
              },
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
                zoom: '',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Layer Pan/Zoom',
      name: '',
      type: 'text',
      text: '',
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
        png64: panPNG64.middleLeft,
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
                zoom: '',
              },
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
                zoom: '',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
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
        png64: panPNG64.middleCenter,
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
                zoom: '',
              },
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
                zoom: '',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
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
        png64: panPNG64.middleRight,
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
                zoom: '',
              },
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
                zoom: '',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Layer Pan/Zoom',
      name: '',
      type: 'text',
      text: '',
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
        png64: panPNG64.bottomLeft,
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
                zoom: '',
              },
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
                zoom: '',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
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
        png64: panPNG64.bottomCenter,
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
                zoom: '',
              },
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
                zoom: '',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
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
        png64: panPNG64.bottomright,
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
                zoom: '',
              },
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
                zoom: '',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
  )

  return layerPanZoomPresets
}
