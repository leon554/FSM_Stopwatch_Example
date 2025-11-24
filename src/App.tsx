import { useEffect, useState } from "react"
import { type timerState, type timerEvent, send} from "./stateMachine"

function App() {
    const [currentState, setCurrentState] = useState<timerState>({
        state: "idle", 
        context: {time: 0, color: "red"}
    })

    function sendEvent(event: timerEvent){
        setCurrentState(prev => {
            let [state, isSucceful] = send(event, prev)
            if(!isSucceful) alert("Error")
            return state
        })
    }

    useEffect(() => {
        if(currentState.state != "running") return

        const intervalID = setInterval(() => {
            sendEvent({name: "tick", amountMS: 100})
        }, 100)

        return () => clearInterval(intervalID)
    }, [currentState.state])

    return (
        <div className="flex flex-col m-auto items-center gap-3">
            <h1>State: {currentState.state}</h1>
            <p style={{color: currentState.context.color}}>
                Time: {Math.round(currentState.context.time/1000*100)/100}s
            </p>
            <div className="flex gap-3">
                {currentState.state == "paused" || currentState.state == "idle" ?
                    <button className="bg-blue-300 px-5 rounded-md py-1 hover:cursor-pointer"
                        onClick={() => {
                            sendEvent({name: "start"})
                        }}>
                        Start
                    </button> : null
                }
                {currentState.state == "running" ?
                    <button className="bg-blue-300 px-5 rounded-md py-1 hover:cursor-pointer"
                        onClick={() => {
                            sendEvent({name: "pause"})
                        }}>
                        Pause
                    </button> : null
                }
                {currentState.state == "paused" || currentState.state == "running" ?
                    <button className="bg-blue-300 px-5 rounded-md py-1 hover:cursor-pointer"
                        onClick={() => {
                            sendEvent({name: "reset"})
                        }}>
                        Reset
                    </button> : null
                }
            </div>
        </div>
    )
}

export default App
