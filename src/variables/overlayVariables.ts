import type { CompanionVariableDefinition } from '@companion-module/base'
import type VMixInstance from '..'
import type { Input } from '../data'

type VariablesOverlayIDs = `overlay_${number}_input_name` | `overlay_${number}_input` | `overlay_${number}_pgm` | `overlay_${number}_prv`
type VariablesOverlayValues = Record<VariablesOverlayIDs, string | number | undefined>

export const overlayDefinitions = (instance: VMixInstance): CompanionVariableDefinition[] => {
  const definitions: CompanionVariableDefinition[] = []
  const overlays = [1, 2, 3, 4, 5, 6, 7, 8]

  if (!instance.config.variablesShowOverlays) return definitions

  overlays.forEach((overlay) => {
    definitions.push(
      { name: `Overlay ${overlay} Input Short Title`, variableId: `overlay_${overlay}_input_name` },
      { name: `Overlay ${overlay} Input Number`, variableId: `overlay_${overlay}_input` },
      { name: `Overlay ${overlay} Active PGM`, variableId: `overlay_${overlay}_pgm` },
      { name: `Overlay ${overlay} Active PRV`, variableId: `overlay_${overlay}_prv` },
    )
  })

  return definitions
}

export const overlayValues = async (instance: VMixInstance): Promise<VariablesOverlayValues> => {
  const variables: VariablesOverlayValues = {}

  if (!instance.config.variablesShowOverlays) return variables

  const getOverlayInput = async (id: number): Promise<Input | null> => {
    const overlay = instance.data.overlays[id - 1]

    return overlay && overlay.input !== null ? await instance.data.getInput(overlay.input) : null
  }

  const overlays = [0, 1, 2, 3, 4, 5, 6, 7]
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
