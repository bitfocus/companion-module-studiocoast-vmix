# HTTP API
Companion acts as a HTTP server, and can pass requests to specific modules using the `/instance/LABEL/` path, where the `LABEL` is whatever you name the instance. For example, if Companion is running on `http://localhost:8000/`, and you're running an instance of the vMix module with the label `vmix` you could make requests to `http://localhost:8000/instance/vmix/ENDPOINT`, where `ENDPOINT` is one of the API endpoints listed below.

Some endpoints, such as Get Inputs, and Get Timers can be particularly useful as data sources in vMix itself, and because it's served from Companion itself it is fast and performant and so the recommended polling interval for these endpoints is 100ms, where as other endpoints such as Get Gynamics and Get Transitions aren't frequently changing so if you were to include them as a Data Source they can be polled less frequently.

## Get Data
Returns the current data on the state of vMix
<br>GET /instance/LABEL/data

### Required Query Parameters
None

### Optional Query Parameters
None


<br>

## Get Dynamics
Returns Dynamic Inputs and Dynamic Values
<br>GET /instance/LABEL/dynamics

### Required Query Parameters
None

### Optional Query Parameters
None


<br>

## Get Inputs
Returns all inputs, or when input in specified returns data on that speciifc input (and its layers)
<br>GET /instance/LABEL/inputs

### Required Query Parameters
None

### Optional Query Parameters
Only 1, or none, of:
|    Param    |  Default  | Description |
| ----------- | --------- | ----------- |
| key  | "" | Input GUID |
| number  | "" | Input Number |
| title  | "" | Input Short Title, or Title |


<br>

## Get Transitions
Returns the Transitions and the durations of preset transitions
<br>GET /instance/LABEL/transitions

### Required Query Parameters
None

### Optional Query Parameters
|    Param    |  Default  | Description |
| ----------- | --------- | ----------- |
| flat  | false | When true the returned data will be structured as a single object |



