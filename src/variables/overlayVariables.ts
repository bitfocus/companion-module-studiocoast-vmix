import type { CompanionVariableDefinitions, JsonValue } from '@companion-module/base'
import type VMixInstance from '../index.js'
import type { Input } from '../data.js'

export type OverlayVariablesSchema = Partial<{
  [key: `overlay_${number}_input_name`]: string
  [key: `overlay_${number}_input`]: number | ''
  [key: `overlay_${number}_pgm`]: string
  [key: `overlay_${number}_prv`]: string
  [key: `overlay_${number}_json`]: JsonValue
}>

export const overlayDefinitions = (instance: VMixInstance): CompanionVariableDefinitions<OverlayVariablesSchema> => {
  const definitions: CompanionVariableDefinitions = {}
  const overlays = [1, 2, 3, 4, 5, 6, 7, 8]

  if (!instance.config.variablesShowOverlays) return definitions

  overlays.forEach((overlay) => {
    definitions[`overlay_${overlay}_input_name`] = { name: `Overlay ${overlay} Input Short Title` }
    definitions[`overlay_${overlay}_input`] = { name: `Overlay ${overlay} Input Number` }
    definitions[`overlay_${overlay}_pgm`] = { name: `Overlay ${overlay} Active PGM` }
    definitions[`overlay_${overlay}_prv`] = { name: `Overlay ${overlay} Active PRV` }
    definitions[`overlay_${overlay}_json`] = { name: `Overlay ${overlay} JSON data` }
  })

  return definitions
}

export const overlayValues = async (instance: VMixInstance): Promise<OverlayVariablesSchema> => {
  const variables: OverlayVariablesSchema = {}

  if (!instance.config.variablesShowOverlays) return variables

  const getOverlayInput = async (id: number): Promise<Input | null> => {
    const overlay = instance.data.overlays[id - 1]

    return overlay && overlay.input !== null ? await instance.data.getInput(overlay.input) : null
  }

  const overlays = [0, 1, 2, 3, 4, 5, 6, 7]
  for (const id of overlays) {
    variables[`overlay_${id + 1}_json`] = instance.data.overlays[id] as unknown as JsonValue
    if (instance.data.overlays[id] && instance.data.overlays[id].input !== null) {
      const overlay = await getOverlayInput(id + 1)
      variables[`overlay_${id + 1}_input_name`] = overlay?.shortTitle ?? overlay?.title ?? ''
      variables[`overlay_${id + 1}_input`] = overlay?.number ?? ''
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
