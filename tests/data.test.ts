import 'ts-jest'
import { mockInstance } from './mock'
import { VMixData } from '../src/data'

const sampleXML = `<vmix><version>27.0.0.61</version><edition>Pro NFR</edition><preset>C:\Users\jeff\AppData\Roaming\last.vmix</preset><inputs><input key="2ba7427a-71d6-4973-acfc-52935f3e0b0b" number="1" type="Image" title="SampleInput1" shortTitle="SampleInput1" state="Paused" position="0" duration="0" loop="False">SampleInput1</input><input key="9e69f116-85ac-4790-939f-3ff5fb567934" number="2" type="Image" title="SampleInput2" shortTitle="SampleInput2" state="Paused" position="0" duration="0" loop="False">SampleInput2</input></inputs><overlays><overlay number="1" /><overlay number="2" /><overlay number="3" /><overlay number="4" /><overlay number="5" /><overlay number="6" /><overlay number="7" /><overlay number="8" /></overlays><preview>2</preview><active>1</active><fadeToBlack>False</fadeToBlack><transitions><transition number="1" effect="Fade" duration="500" /><transition number="2" effect="Merge" duration="2000" /><transition number="3" effect="Wipe" duration="1000" /><transition number="4" effect="CubeZoom" duration="1000" /></transitions><recording>False</recording><external>False</external><streaming>False</streaming><playList>False</playList><multiCorder>False</multiCorder><fullscreen>False</fullscreen><audio><master volume="100" muted="False" meterF1="0" meterF2="0" headphonesVolume="100" /><busA volume="100" muted="False" meterF1="0" meterF2="0" solo="False" sendToMaster="False" /><busB volume="100" muted="False" meterF1="0" meterF2="0" solo="False" sendToMaster="False" /><busC volume="100" muted="False" meterF1="0" meterF2="0" solo="False" sendToMaster="False" /><busD volume="100" muted="False" meterF1="0" meterF2="0" solo="False" sendToMaster="False" /><busE volume="100" muted="False" meterF1="0" meterF2="0" solo="False" sendToMaster="False" /><busF volume="100" muted="False" meterF1="0" meterF2="0" solo="False" sendToMaster="False" /><busG volume="100" muted="False" meterF1="0" meterF2="0" solo="False" sendToMaster="False" /></audio><dynamic><input1>1</input1><input2></input2><input3></input3><input4></input4><value1>1</value1><value2>2</value2><value3>3</value3><value4></value4></dynamic></vmix>`

describe('Data', () => {
  const data = new VMixData(mockInstance as any)

  it(`Should parse XML`, async () => {
    expect(data.loaded).toBe(false)
    await data.update(sampleXML)
    expect(data.loaded).toBe(true)
    expect(data.version).toBe('27.0.0.61')
    expect(data.majorVersion).toBe(27)
    expect(mockInstance.apiProcessing.parsed).toBeGreaterThan(0)
  })

  it(`Should return an Audio Bus`, async () => {
    await data.update(sampleXML)
    const master = data.getAudioBus('Master')
    const a = data.getAudioBus('A')
    const z = data.getAudioBus('Z')

    expect(master?.bus).toBe('master')
    expect(a?.bus).toBe('busA')
    expect(z).toBeNull()
  })

  it(`Should return an input`, async () => {
    await data.update(sampleXML)
    const inputByName = await data.getInput('SampleInput1')
    const inputByNumber = await data.getInput(1)
    const inputByKey = await data.getInput('2ba7427a-71d6-4973-acfc-52935f3e0b0b')
    const nullInput = await data.getInput('1234')

    expect(inputByName).not.toBeNull()
    expect(inputByNumber).not.toBeNull()
    expect(inputByKey).not.toBeNull()
    expect(nullInput).toBeNull()
  })

  it(`Should return an inputs title`, async () => {
    await data.update(sampleXML)
    const inputByKey = await data.getInputTitle('2ba7427a-71d6-4973-acfc-52935f3e0b0b')
    expect(inputByKey).toBe('SampleInput1')
  })
})
