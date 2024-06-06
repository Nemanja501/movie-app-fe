export default function Errors({message, data}) {
  return (
    <div className="errors">
        <h4>{message}</h4>
        <ul>
            {data.map((err, index) =>{
                return <li key={index}>{err.msg}</li>
            })}
        </ul>
    </div>
  )
}
