import { CompanionVariableDefinition } from '@companion-module/base'
import VMixInstance from '..'
import { Input } from '../data'
import { InstanceVariableValue } from './variables'

export const overlayDefinitions = (_instance: VMixInstance): CompanionVariableDefinition[] => {
  const definitions: CompanionVariableDefinition[] = []
  const overlays = [1, 2, 3, 4]

  overlays.forEach((overlay) => {
    definitions.push(
      { name: `Overlay ${overlay} Input Short Title`, variableId: `overlay_${overlay}_input_name` },
      { name: `Overlay ${overlay} Input Number`, variableId: `overlay_${overlay}_input` },
      { name: `Overlay ${overlay} Active PGM`, variableId: `overlay_${overlay}_pgm` },
      { name: `Overlay ${overlay} Active PRV`, variableId: `overlay_${overlay}_prv` }
    )
  })

  return definitions
}

export const overlayValues = async (instance: VMixInstance): Promise<InstanceVariableValue> => {
  const variables: InstanceVariableValue = {}

  const getOverlayInput = async (id: number): Promise<Input | null> => {
    const overlay = instance.data.overlays[id - 1]

    return overlay && overlay.input !== null ? await instance.data.getInput(overlay.input) : null
  }

  const overlays = [0, 1, 2, 3]
  for (const id of overlays) {
    if (instance.data.overlays[id] && instance.data.overlays[id].input !== null) {
      const overlay = await getOverlayInput(id + 1)
      variables[`overlay_${id + 1}_input_name`] = overlay?.shortTitle || overlay?.title || ''
      variables[`overlay_${id + 1}_input`] = overlay?.number || ''
      variables[`overlay_${id + 1}_pgm`] = (!instance.data.overlays[id].preview).toString()
      variables[`overlay_${id + 1}_prv`] = instance.data.overlays[id].preview.toString()
    } else {
      variables[`overlay_${id + 1}_input_name`] = ''
      variables[`overlay_${id + 1}_input`] = ''
      variables[`overlay_${id + 1}_pgm`] = 'false'
      variables[`overlay_${id + 1}_prv`] = 'false'
    }
  }

  return variables
}
