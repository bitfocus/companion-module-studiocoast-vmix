import fs from 'fs'
import * as vMix from '@distdev/vmix-utils'
import { getActions, vMixFunctions } from '../dist/actions/actions.js'

const actions = getActions({})
const categories = {}
let coverage = 0
let functionDoc = `
# vMix Shortcut List\n\n
## Description\n
This is a list of vMix Shortcuts and the appropriate Companion Action that utilizes them. Whilst all vMix Shortcuts can be run manually through the \`Scripting - Run custom command\` Action,
the Actions designed for specific shortcuts can include validation, and more appropriately warn when there are issues, to help prevent sending malformed messages to vMix.\n\n
## Categories\n`

vMix.functions.forEach((func) => {
  if (!categories[func.category]) {
    categories[func.category] = {}
    functionDoc += `[${func.category}](#${func.category})  \n`
  }
  categories[func.category][func.id] = []
})

functionDoc += '\n\n'

Object.entries(vMixFunctions).forEach(([action, ids]) => {
  ids.forEach((funcID) => {
    const cat = vMix.functions.find((x) => x.id === funcID).category
    categories[cat][funcID].push(action)
  })
})

Object.entries(categories).forEach(([cat, funcs]) => {
  functionDoc += `## ${cat}\n| Shortcuts | Actions |\n| --- | --- |\n`
  Object.entries(funcs).forEach(([id, actionIDs]) => {
    const actionList = actionIDs.map((x) => actions[x].name)

    functionDoc += `| ${id} | ${actionList.join(', ')} |\n`
    if (actionList.length > 0) coverage++
  })
  functionDoc += '\n\n'
})

fs.writeFileSync('./docs/shortcut_list.md', functionDoc)

console.log(`Finished generating Shortcut Docs - Coverage: ${coverage} / ${vMix.functions.length}`)
