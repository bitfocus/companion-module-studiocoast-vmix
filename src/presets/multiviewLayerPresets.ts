import type { CompanionPresetDefinitions, CompanionPresetGroup, CompanionPresetSection } from '@companion-module/base'
import { type VMixInstanceTypes } from '../utils.js'

export const getMultiviewLayersDefinitions = (): CompanionPresetDefinitions<VMixInstanceTypes> => {
  const multiviewLayersDefinitions: CompanionPresetDefinitions<VMixInstanceTypes> = {
    multiviewLayers_setTargetInput: {
      name: `Set Target Input`,
      type: 'simple',
      style: {
        text: `Set Target Input`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setMultiViewOverlayDestinationInput', options: { destinationInput: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'selectedDestinationInput',
          options: { input: '' },
          style: {
            color: 0x000000,
            bgcolor: 0x0ffff00,
          },
        },
      ],
    },

    multiviewLayers_setDestinationLayer: {
      name: `Set Input on Layer`,
      type: 'simple',
      style: {
        text: `Set Input on Layer`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setMultiViewOverlayDestinationLayer', options: { destinationLayer: '1' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'selectedDestinationLayer',
          options: { selectedIndex: '1' },
          style: {
            color: 0x000000,
            bgcolor: 0x0ffff00,
          },
        },
      ],
    },

    multiviewLayers_setSourceInput: {
      name: `Set Input on Layer`,
      type: 'simple',
      style: {
        text: `Set Input on Layer`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setMultiViewOverlaySourceInput', options: { sourceIndex: '1' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'routableMultiviewLayer',
          options: { input: '1' },
          style: {
            color: 0x000000,
            bgcolor: 0x0ffff00,
          },
        },
      ],
    },
  }

  for (let i = 1; i < 11; i++) {
    multiviewLayersDefinitions[`multiviewLayers_toggleLayer${i}`] = {
      name: `Toggle Layer ${i}`,
      type: 'simple',
      style: {
        text: `Toggle Layer ${i}`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlay', input: '', value: i.toString() } }],
          up: [],
        },
      ],
      feedbacks: [],
    }

    multiviewLayersDefinitions[`multiviewLayers_setLayer${i}On`] = {
      name: `Set Layer ${i} On`,
      type: 'simple',
      style: {
        text: `Set Layer ${i} On`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOn', input: '', value: i.toString() } }],
          up: [],
        },
      ],
      feedbacks: [],
    }

    multiviewLayersDefinitions[`multiviewLayers_setLayer${i}Off`] = {
      name: `Set Layer ${i} Off`,
      type: 'simple',
      style: {
        text: `Set Layer ${i} Off`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOff', input: '', value: i.toString() } }],
          up: [],
        },
      ],
      feedbacks: [],
    }

    multiviewLayersDefinitions[`multiviewLayers_setLayer${i}Input`] = {
      name: `Set Layer ${i} Input`,
      type: 'simple',
      style: {
        text: `Set Layer ${i} Input`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setMultiViewOverlay', options: { input: '', layer: i, layerInput: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'inputOnMultiview',
          options: { inputX: '', inputY: '', layer: `${i}` },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    }
  }

  return multiviewLayersDefinitions
}

export const getMultviewLayerStructure = (): CompanionPresetSection<VMixInstanceTypes>[] => {
  const layerGroups: CompanionPresetGroup<VMixInstanceTypes>[] = []

  const layerToggle: CompanionPresetGroup<VMixInstanceTypes> = {
    id: `layerToggle`,
    type: 'simple',
    name: `Layer Toggle`,
    description: 'Toggle a Layer On/Off on an Input',
    presets: [],
  }

  const layerOn: CompanionPresetGroup<VMixInstanceTypes> = {
    id: `layerOn`,
    type: 'simple',
    name: `Layer On`,
    description: 'Set a Layer On',
    presets: [],
  }

  const layerOff: CompanionPresetGroup<VMixInstanceTypes> = {
    id: `layerOff`,
    type: 'simple',
    name: `Layer Off`,
    description: 'Set a Layer off',
    presets: [],
  }

  const layerInput: CompanionPresetGroup<VMixInstanceTypes> = {
    id: `layerInput`,
    type: 'simple',
    name: `Set Layer Input`,
    description: 'Sets the source Input being sent to a Layer',
    presets: [],
  }

  for (let layer = 1; layer < 11; layer++) {
    layerToggle.presets.push(`multiviewLayers_toggleLayer${layer}`)
    layerOn.presets.push(`multiviewLayers_setLayer${layer}On`)
    layerOff.presets.push(`multiviewLayers_setLayer${layer}Off`)
    layerInput.presets.push(`multiviewLayers_setLayer${layer}Input`)
  }

  layerGroups.push(layerToggle, layerOn, layerOff, layerInput)

  const structure: CompanionPresetSection<VMixInstanceTypes>[] = [
    {
      id: 'multiviewLayerStructure',
      name: 'Input Layer Routing',
      description: 'Set which source Inputs are set to a Layer on an Input, and set their on/off state',
      definitions: [
        {
          id: 'layerSelection',
          type: 'simple',
          name: 'Input, Layer, and Source input',
          description: 'Set a target Input, target Layer, and a source to be set as that target',
          presets: ['multiviewLayers_setTargetInput', 'multiviewLayers_setDestinationLayer', 'multiviewLayers_setSourceInput'],
        },
        ...layerGroups,
      ],
    },
  ]

  return structure
}
