import 'ts-jest'
import { mockInstance } from './mock'
import { httpHandler } from '../src/http'


describe('HTTP Handler', () => {
  it('Should return current data', async () => {
    const request = {
      headers: {},
      baseUrl: '',
      hostname: '',
      ip: '',
      method: 'GET',
      originalUrl: '',
      path: 'data',
      query: {}
    }

    const response = await httpHandler(mockInstance as any, request)
    expect(response.status).toEqual(200)
    expect(response.body).toEqual(JSON.stringify(mockInstance.data, null, 2))
  })
  
  it('Should return dynamic inputs and values', async () => {
    const request = {
      headers: {},
      baseUrl: '',
      hostname: '',
      ip: '',
      method: 'GET',
      originalUrl: '',
      path: 'dynamics',
      query: {}
    }

    const response = await httpHandler(mockInstance as any, request)
    expect(response.status).toEqual(200)
    expect(response.body).toEqual(JSON.stringify([
      {
        input1: '1',
        input2: '',
        input3: '',
        input4: '',
        value1: '1',
        value2: '2',
        value3: '3',
        value4: ''
      }
    ], null, 2))
  })

  it('Should return inputs', async () => {
    const requestSingle = {
      headers: {},
      baseUrl: '',
      hostname: '',
      ip: '',
      method: 'GET',
      originalUrl: '',
      path: 'inputs',
      query: {
        title: 'SampleInput1'
      }
    }

    const responseSingle = await httpHandler(mockInstance as any, requestSingle)

    expect(responseSingle.status).toEqual(200)
    expect(responseSingle.body).toEqual(JSON.stringify([
      {
        number: 1,
        title: 'SampleInput1',
        label: '1. SampleInput1',
        key: '2ba7427a-71d6-4973-acfc-52935f3e0b0b',
        type: 'Image',
        state: 'Paused',
        duration: '00:00:00.0',
        position: '00:00:00.0',
        remaining: '00:00:00.0',
        muted: '',
        loop: '',
        layer_1_number: '',
        layer_1_title: '',
        layer_1_label: '',
        layer_1_key: '',
        layer_1_type: '',
        layer_1_state: '',
        layer_1_duration: '',
        layer_1_position: '',
        layer_1_remaining: '',
        layer_1_muted: '',
        layer_1_loop: '',
        layer_2_number: '',
        layer_2_title: '',
        layer_2_label: '',
        layer_2_key: '',
        layer_2_type: '',
        layer_2_state: '',
        layer_2_duration: '',
        layer_2_position: '',
        layer_2_remaining: '',
        layer_2_muted: '',
        layer_2_loop: '',
        layer_3_number: '',
        layer_3_title: '',
        layer_3_label: '',
        layer_3_key: '',
        layer_3_type: '',
        layer_3_state: '',
        layer_3_duration: '',
        layer_3_position: '',
        layer_3_remaining: '',
        layer_3_muted: '',
        layer_3_loop: '',
        layer_4_number: '',
        layer_4_title: '',
        layer_4_label: '',
        layer_4_key: '',
        layer_4_type: '',
        layer_4_state: '',
        layer_4_duration: '',
        layer_4_position: '',
        layer_4_remaining: '',
        layer_4_muted: '',
        layer_4_loop: '',
        layer_5_number: '',
        layer_5_title: '',
        layer_5_label: '',
        layer_5_key: '',
        layer_5_type: '',
        layer_5_state: '',
        layer_5_duration: '',
        layer_5_position: '',
        layer_5_remaining: '',
        layer_5_muted: '',
        layer_5_loop: '',
        layer_6_number: '',
        layer_6_title: '',
        layer_6_label: '',
        layer_6_key: '',
        layer_6_type: '',
        layer_6_state: '',
        layer_6_duration: '',
        layer_6_position: '',
        layer_6_remaining: '',
        layer_6_muted: '',
        layer_6_loop: '',
        layer_7_number: '',
        layer_7_title: '',
        layer_7_label: '',
        layer_7_key: '',
        layer_7_type: '',
        layer_7_state: '',
        layer_7_duration: '',
        layer_7_position: '',
        layer_7_remaining: '',
        layer_7_muted: '',
        layer_7_loop: '',
        layer_8_number: '',
        layer_8_title: '',
        layer_8_label: '',
        layer_8_key: '',
        layer_8_type: '',
        layer_8_state: '',
        layer_8_duration: '',
        layer_8_position: '',
        layer_8_remaining: '',
        layer_8_muted: '',
        layer_8_loop: '',
        layer_9_number: '',
        layer_9_title: '',
        layer_9_label: '',
        layer_9_key: '',
        layer_9_type: '',
        layer_9_state: '',
        layer_9_duration: '',
        layer_9_position: '',
        layer_9_remaining: '',
        layer_9_muted: '',
        layer_9_loop: '',
        layer_10_number: '',
        layer_10_title: '',
        layer_10_label: '',
        layer_10_key: '',
        layer_10_type: '',
        layer_10_state: '',
        layer_10_duration: '',
        layer_10_position: '',
        layer_10_remaining: '',
        layer_10_muted: '',
        layer_10_loop: ''
      }
    ], null, 2))

    const request = {
      headers: {},
      baseUrl: '',
      hostname: '',
      ip: '',
      method: 'GET',
      originalUrl: '',
      path: 'inputs',
      query: {}
    }

    const response = await httpHandler(mockInstance as any, request)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual(JSON.stringify([
      {
        number: 1,
        title: 'SampleInput1',
        label: '1. SampleInput1',
        key: '2ba7427a-71d6-4973-acfc-52935f3e0b0b',
        type: 'Image',
        state: 'Paused',
        duration: '00:00:00.0',
        position: '00:00:00.0',
        remaining: '00:00:00.0',
        muted: '',
        loop: ''
      },
      {
        number: 2,
        title: 'SampleInput2',
        label: '2. SampleInput2',
        key: '9e69f116-85ac-4790-939f-3ff5fb567934',
        type: 'Image',
        state: 'Paused',
        duration: '00:00:00.0',
        position: '00:00:00.0',
        remaining: '00:00:00.0',
        muted: '',
        loop: ''
      }
    ], null, 2))

    const requestFlat = {
      headers: {},
      baseUrl: '',
      hostname: '',
      ip: '',
      method: 'GET',
      originalUrl: '',
      path: 'inputs',
      query: {
        flat: 'true'
      }
    }

    const responseFlat = await httpHandler(mockInstance as any, requestFlat)
    expect(responseFlat.status).toEqual(200)
    expect(responseFlat.body).toEqual(JSON.stringify([
      {
        SampleInput1_number: 1,
        SampleInput1_title: 'SampleInput1',
        SampleInput1_label: '1. SampleInput1',
        SampleInput1_key: '2ba7427a-71d6-4973-acfc-52935f3e0b0b',
        SampleInput1_type: 'Image',
        SampleInput1_state: 'Paused',
        SampleInput1_duration: '00:00:00.0',
        SampleInput1_position: '00:00:00.0',
        SampleInput1_remaining: '00:00:00.0',
        SampleInput1_muted: '',
        SampleInput1_loop: '',
        SampleInput2_number: 2,
        SampleInput2_title: 'SampleInput2',
        SampleInput2_label: '2. SampleInput2',
        SampleInput2_key: '9e69f116-85ac-4790-939f-3ff5fb567934',
        SampleInput2_type: 'Image',
        SampleInput2_state: 'Paused',
        SampleInput2_duration: '00:00:00.0',
        SampleInput2_position: '00:00:00.0',
        SampleInput2_remaining: '00:00:00.0',
        SampleInput2_muted: '',
        SampleInput2_loop: ''
      }
    ], null, 2))
  })


  it('Should return current transitions', async () => {
    const request = {
      headers: {},
      baseUrl: '',
      hostname: '',
      ip: '',
      method: 'GET',
      originalUrl: '',
      path: 'transitions',
      query: {}
    }

    const response = await httpHandler(mockInstance as any, request)
    expect(response.status).toEqual(200)
    expect(response.body).toEqual(JSON.stringify(mockInstance.data.transitions, null, 2))

    const requestFlat = {
      headers: {},
      baseUrl: '',
      hostname: '',
      ip: '',
      method: 'GET',
      originalUrl: '',
      path: 'transitions',
      query: {
        flat: 'true'
      }
    }

    const responseFlat = await httpHandler(mockInstance as any, requestFlat)
    expect(responseFlat.status).toEqual(200)
    expect(responseFlat.body).toEqual(JSON.stringify([
      {
        transition_1_number: 1,
        transition_1_effect: 'Fade',
        transition_1_duration: 500,
        transition_2_number: 2,
        transition_2_effect: 'Merge',
        transition_2_duration: 2000,
        transition_3_number: 3,
        transition_3_effect: 'Wipe',
        transition_3_duration: 1000,
        transition_4_number: 4,
        transition_4_effect: 'CubeZoom',
        transition_4_duration: 1000
      }
    ], null, 2))
  })

  it('Should return current variables', async () => {
    const request = {
      headers: {},
      baseUrl: '',
      hostname: '',
      ip: '',
      method: 'GET',
      originalUrl: '',
      path: 'variables',
      query: {}
    }

    const response = await httpHandler(mockInstance as any, request)
    expect(response.status).toEqual(200)
    expect(response.body).toEqual(JSON.stringify(mockInstance.variables.currentVariables, null, 2))
  })

  it('Should send vMix functions', async () => {
    const request = {
      headers: {},
      baseUrl: '',
      hostname: '',
      ip: '',
      method: 'POST',
      originalUrl: '',
      path: 'actions',
      query: {},
      body: JSON.stringify(['TestAction', 'TestAction2'])
    }

    const response = await httpHandler(mockInstance as any, request)

    expect(mockInstance.log).toHaveBeenCalledWith('info', 'sending command: FUNCTION TestAction')
    expect(mockInstance.tcp.sendCommand).toHaveBeenCalledTimes(2)
    expect(mockInstance.tcp.sendCommand).toHaveBeenCalledWith('FUNCTION TestAction')
    expect(mockInstance.tcp.sendCommand).toHaveBeenCalledWith('FUNCTION TestAction2')
    expect(response.status).toEqual(200)
    expect(response.body).toEqual(JSON.stringify({ status: 200, message: `sent: ${request.body}` }))
  })

  it('Should 404 on not found endpoints', async () => {
    const request = {
      headers: {},
      baseUrl: '',
      hostname: '',
      ip: '',
      method: 'GET',
      originalUrl: '',
      path: 'notfound',
      query: {}
    }

    const response = await httpHandler(mockInstance as any, request)

    expect(response.status).toEqual(404)
    expect(response.body).toEqual(JSON.stringify({ status: 404, message: 'Not Found' }))
  })
});
