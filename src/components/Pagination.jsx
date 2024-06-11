import { useEffect, useState } from "react"

export default function Pagination({totalItems, setPage}) {
  const [buttons, setButtons] = useState([]);
  const perPage = 4

  useEffect(()=>{
    const array = [];
    const limit = Math.ceil(totalItems / perPage);
    for(let i = 1; i <= limit; i++){
        array.push(i);
    }
    setButtons(array);
  }, [totalItems])

  return (
    <div className="pagination">{buttons.map((btn, index) =>{
        return (<button className="pagination-btn" onClick={() => setPage(index + 1)} key={index + 1}>{index + 1}</button>);
    })}</div>
  )
}
