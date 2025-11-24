export type timerContext = {
    time: number
    color: string
}

export type timerState = 
    {state: "idle", context: timerContext} |
    {state: "running", context: timerContext} |
    {state: "paused", context: timerContext}

export type timerEvent = 
    {name: "start"} |
    {name: "reset"} |
    {name: "pause"} |
    {name: "tick", amountMS: number}


function setContext(this: timerContext, context: Partial<timerContext>){
    return {...this, ...context}
}
export function send(event: timerEvent, currentState: timerState): [timerState, boolean]{
    const setCtx = setContext.bind(currentState.context)
    
    switch(currentState.state){
        case "idle":
            if(event.name == "start"){
                return [{
                        state: "running", 
                        context: setCtx({color: "green"})
                    }, 
                    true
                ]
            }
            return [currentState, false]
        case "running":
            if(event.name == "pause"){
                return [{
                        state: "paused", 
                        context: setCtx({color: "orange"})
                    }, 
                    true
                ]
            }
            if(event.name == "reset"){
                return [{
                        state: "idle", 
                        context: setCtx({time: 0, color: "red"})
                    }, 
                    true
                ]
            }
            if(event.name == "tick"){
                return [{
                        state: "running", 
                        context: setCtx({time: currentState.context.time + event.amountMS})
                    }, 
                    true
                ]
            }
            return [currentState, false]
        case "paused":
            if(event.name == "start"){
                return [{
                        state: "running", 
                        context: setCtx({color: "green"})
                    }, 
                    true
                ]
            }
            if(event.name == "reset"){
                return [{
                        state: "idle", 
                        context: setCtx({time: 0, color: "red"})
                    }, 
                    true
                ]
            }
            return [currentState, false]
    }
}