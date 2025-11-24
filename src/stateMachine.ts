export type timerState = 
    {state: "idle", time: number} |
    {state: "running", time: number} |
    {state: "paused", time: number}

export type timerEvent = 
    {name: "start"} |
    {name: "reset"} |
    {name: "pause"} |
    {name: "tick", amountMS: number}


export function send(event: timerEvent, currentState: timerState): [timerState, boolean]{
    switch(currentState.state){
        case "idle":
            if(event.name == "start"){
                return [{state: "running", time: currentState.time}, true]
            }
            return [currentState, false]
        case "running":
            if(event.name == "pause"){
                return [{state: "paused", time: currentState.time}, true]
            }
            if(event.name == "reset"){
                return [{state: "idle", time: 0}, true]
            }
            if(event.name == "tick"){
                return [{state: "running", time: currentState.time + event.amountMS}, true]
            }
            return [currentState, false]
        case "paused":
            if(event.name == "start"){
                return [{state: "running", time: currentState.time}, true]
            }
            if(event.name == "reset"){
                return [{state: "idle", time: 0}, true]
            }
            return [currentState, false]
    }
}