import { CompanionInstanceHTTPRequest, CompanionInstanceHTTPResponse } from '../../../instance_skel_types'
import VMixInstance from './index'
import { VMixData, Input } from './data'
import { formatTime } from './utils'

interface DataSourceInput {
  number: number
  title: string
  label: string
  key: string
  type: string
  state: string
  duration: string
  position: string
  remaining: string
  muted: 'Muted' | ''
  loop: 'Loop' | ''
}

interface Endpoints {
  GET: {
    [endpoint: string]: () => void
  }

  [method: string]: {
    [endpoint: string]: () => void
  }
}

/**
 * @returns HTTP Request
 * @description Creates a basic HTTP request to be used internally to call the HTTP handler functions
 */
export const defaultHTTPRequest = (): CompanionInstanceHTTPRequest => {
  return { method: 'GET', path: '', headers: {}, baseUrl: '', hostname: '', ip: '', originalUrl: '', query: {} }
}

/**
 * @param input input from existing data
 * @returns input data for a datasource
 * @description Structures input data in a way that's suitable for use in a vMix Data Source
 */
const parseInput = (input: Input): DataSourceInput => {
  return {
    number: input.number,
    title: input.shortTitle || input.title,
    label: `${input.number}. ${input.shortTitle || input.title}`,
    key: input.key,
    type: input.type,
    state: input.state,
    duration: input.duration > 0 ? formatTime(input.duration, 'ms', 'hh:mm:ss.ms') : '00:00:00.0',
    position: input.duration > 0 ? formatTime(input.position, 'ms', 'hh:mm:ss.ms') : '00:00:00.0',
    remaining: input.duration > 0 ? formatTime(input.duration - input.position, 'ms', 'hh:mm:ss.ms') : '00:00:00.0',
    muted: input.muted ? 'Muted' : '',
    loop: input.loop ? 'Loop' : '',
  }
}

/**
 * @param instance vMix Instance
 * @param request HTTP request
 * @returns HTTP response
 * @description Checks incoming HTTP requests to the instance for an appropriate handler or returns a 404
 */
export const httpHandler = async (
  instance: VMixInstance,
  request: CompanionInstanceHTTPRequest
): Promise<CompanionInstanceHTTPResponse> => {
  const response: CompanionInstanceHTTPResponse = {
    status: 404,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: 404, message: 'Not Found' }),
  }

  //  Returns data as structured by this module
  const getData = () => {
    const data: Partial<VMixData> = { ...instance.data }
    delete data.instance

    response.status = 200
    response.body = JSON.stringify(data, null, 2)
  }

  // Returns values of current dynamic inputs and dynamic values
  const getDynamics = () => {
    const data = {
      input1: instance.data.dynamicInput[0].value,
      input2: instance.data.dynamicInput[1].value,
      input3: instance.data.dynamicInput[2].value,
      input4: instance.data.dynamicInput[3].value,
      value1: instance.data.dynamicValue[0].value,
      value2: instance.data.dynamicValue[1].value,
      value3: instance.data.dynamicValue[2].value,
      value4: instance.data.dynamicValue[3].value,
    }

    response.status = 200
    response.body = JSON.stringify([data], null, 2)
  }

  // Returns all inputs data, structured for a vMix Data Source
  const getInputs = () => {
    if (request.query.key || request.query.id || request.query.number || request.query.title) {
      const selectedInput = instance.data.inputs.find((input) => {
        const keyCheck = input.key === request.query.key || input.key === request.query.id
        const numberCheck = input.number.toString() === request.query.number
        const titleCheck =
          input.shortTitle === request.query.title || input.title === request.query.SelectTitlePresetCallback

        return keyCheck || numberCheck || titleCheck
      })

      const data: any[] = []

      if (!selectedInput) {
        response.status = 200
        response.body = JSON.stringify(data)
      } else {
        data[0] = parseInput(selectedInput)

        for (let i = 0; i < 10; i++) {
          const findLayer = selectedInput.overlay?.find((layer) => layer.index === i)
          const layerInput = findLayer ? instance.data.getInput(findLayer.key) : null

          if (layerInput !== null) {
            const parsedInput = parseInput(layerInput)

            Object.entries(parsedInput).forEach(([key, value]) => {
              data[0][`layer_${i + 1}_${key}`] = value
            })
          } else {
            data[0][`layer_${i + 1}_number`] = ''
            data[0][`layer_${i + 1}_title`] = ''
            data[0][`layer_${i + 1}_label`] = ''
            data[0][`layer_${i + 1}_key`] = ''
            data[0][`layer_${i + 1}_type`] = ''
            data[0][`layer_${i + 1}_state`] = ''
            data[0][`layer_${i + 1}_duration`] = ''
            data[0][`layer_${i + 1}_position`] = ''
            data[0][`layer_${i + 1}_remaining`] = ''
            data[0][`layer_${i + 1}_muted`] = ''
            data[0][`layer_${i + 1}_loop`] = ''
          }
        }

        selectedInput.overlay?.forEach((layer) => {
          const layerInput = instance.data.getInput(layer.key)

          if (layerInput) {
            const parsedInput = parseInput(layerInput)

            Object.entries(parsedInput).forEach(([key, value]) => {
              data[0][`layer_${layer.index + 1}_${key}`] = value
            })
          }
        })

        response.status = 200
        response.body = JSON.stringify(data, null, 2)
      }
    } else {
      const inputData = instance.data.inputs.map(parseInput)
      const flatData: any[] = [{}]

      inputData.forEach((input) => {
        Object.entries(input).forEach(([key, value]) => {
          flatData[0][`${input.title}_${key}`] = value
        })
      })

      response.status = 200
      response.body = JSON.stringify(request.query.flat === 'true' ? flatData : inputData, null, 2)
    }
  }

  // Returns data for existing instance timers
  const getTimers = () => {
    const timers: any = []
    request.query.defaultValue = request.query.default

    instance.timers.forEach((timer) => {
      timers.push(timer.get(request.query))
    })

    response.status = 200
    response.body = JSON.stringify(timers, null, 2)
  }

  // Returns preset transition types and durations
  const getTransitions = () => {
    const data = instance.data.transitions
    const flatData: any[] = [{}]

    data.forEach((transition) => {
      Object.entries(transition).forEach(([key, value]) => {
        flatData[0][`transition_${transition.number}_${key}`] = value
      })
    })

    response.status = 200
    response.body = JSON.stringify(request.query.flat ? flatData : data, null, 2)
  }

  // Send API functions to vMix
  const postActions = () => {
    try {
      let body = JSON.parse(request.body || '')

      body.forEach((action: string) => {
        console.log(action)
        if (instance.tcp) {
          instance.tcp.sendCommand(`FUNCTION ${action}`)
        }
      })

      response.status = 200
      response.body = JSON.stringify({ status: 200, message: `sent: ${request.body}` })
    }
    catch (err) {
      response.status = 500
      response.body = JSON.stringify({ status: 500, message: `err: ${err}` })

      console.warn(err)
    }
  }

  const endpoints: Endpoints = {
    GET: {
      data: getData,
      dynamics: getDynamics,
      inputs: getInputs,
      transitions: getTransitions,
      timers: getTimers,
    },
    POST: {
      actions: postActions
    }
  }

  const endpoint = request.path.replace('/', '').toLowerCase()

  if (endpoints[request.method][endpoint]) endpoints[request.method][endpoint]()

  return response
}
