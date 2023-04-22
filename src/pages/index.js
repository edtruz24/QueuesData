import { useState } from "react";

export default function Home() {
  const [queues, setQueues] = useState([])
  const [preparing, setPreparing] = useState({
    number: '',
    index: -1,
    isServing: false
  })

  const numChange = (e) => {
    setPreparing({...preparing, number: e.target.value})
  }

  const addClicked = () => {
    setQueues([...queues, preparing])
    setPreparing({number: '', isServing: false})
  }

  function serveClicked(index) {
    let checkPreparing = queues.filter((data, queuesindex) => {
      if (index === queuesindex){
        data.isServing = true
      }
        return data;
    })

    setQueues(checkPreparing)
  }

  function deleteClicked(index){
    let modifedQueues = queues.filter((data, queuesindex) => {
        if(index !== queuesindex)
            return data;
    })
    setQueues(modifedQueues)
  }

  return (
    <div className="flex justify-center items-center py-10">
      <div>
        <div>
          <input type="number"
          placeholder="Enter Number"
          onChange={numChange}
          className="border border-solid border-black rounded-sm px-1"/>
          <button onClick={addClicked} 
          className="ml-10 px-5 font-bold bg-blue-300 hover:bg-blue-100 rounded-sm">ADD</button>
        </div>
        <div class="grid grid-cols-2 py-5">
          <h1 className="p-2 bg-red-400 text-white text-center font-bold">Now Serving...</h1>
          <h1 className="p-2 bg-black text-white text-center font-bold">Now Preparing...</h1>
        </div>
        <div className="grid grid-cols-2">
          <ul className="h-[300px] flex flex-col flex-wrap gap-4">
          {queues.map((preparing, index) => {
            if (preparing.isServing == true){
              return(
                <li key={index}>
                  <div className="grow">
                    <button className="font-bold text-2xl" onClick={() => deleteClicked(index)}>{preparing.number}</button>
                  </div>
                </li>
              )
            }
            }
            )}
          </ul>
          <ul className="h-[300px] flex flex-col flex-wrap gap-4 ">
            {queues.map((preparing, index) => {
              if (preparing.isServing != true){
                return(
                  <li key={index}>
                    <div className="grow">
                      <button className="font-bold text-2xl" onClick={() => serveClicked(index, preparing)}>{preparing.number}</button>
                    </div>
                  </li>
                )
              }
            }
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
