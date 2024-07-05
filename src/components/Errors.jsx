export default function Errors({message, data, id}) {
  return (
    <div className="errors" id={id || ''}>
        <h3>{message}</h3>
        <ul>
            {data.map((err, index) =>{
                return <li key={index}>{err.msg}</li>
            })}
        </ul>
    </div>
  )
}
