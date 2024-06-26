export default function Errors({message, data}) {
  return (
    <div className="errors">
        <h3>{message}</h3>
        <ul>
            {data.map((err, index) =>{
                return <li key={index}>{err.msg}</li>
            })}
        </ul>
    </div>
  )
}
