export const PLTMH_TAG = {
    field: {
        pelton: "peltonButton",
        crossFlow: "crossButton",
        kaplan: "kaplanButton",
        francis: "francisButton",
        turbinWaterFlow: "turbinWaterFlow",
        pumpStep: "pumpStep",
        pumpSpeed: "pumpSpeed",
        pumpWaterFlow: "pumpWaterFlow",
        pressure: "Pressure",
        voltage: "voltage",
        current: "current",  
        rpm:"rpm",
        flow:"flow",      
    },
    command: {
        pelton: "SOL_PELTON",
        crossFlow: "SOL_CROSS",
        kaplan: "SOL_KAPLAN",
        francis: "SOL_FRANCIS",
        pumpUp: "PUMP_UP",
        pumpDown: "PUMP_DOWN",
        pumpStep: "PUMP_STEP",
        maxStep: "MAX_STEP",
        stepMultiply: "STEP_MULTIPLY",
    }
}