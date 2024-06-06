import { useState } from "react";
import Errors from "../../components/Errors";

export default function AddMovie() {
  const [errors, setErrors] = useState({
    message: '',
    data: []
  });

  async function handleSubmit(){

  }

  return (
    <div>
        <h1 className="page-title">Add Movie</h1>
        <form>
            <label className="form-label">Title</label>
            <input type="text" className="form-input" name="title"></input>
            <label className="form-label">Description</label>
            <textarea className="form-input" name="description"></textarea>
            <label className="form-label">Year Of Release</label>
            <input type="number" className="form-input" name="year"></input>
            <label className="form-label">Movie Poster</label>
            <input type="file" className="form-input" name="moviePoster"></input>
            <button type="button" className="form-btn" onClick={handleSubmit}>Submit</button>
            {errors.message && <Errors message={errors.message} data={errors.data} />}
        </form>
    </div>
  )
}
