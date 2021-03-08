import React from "react";
const NewNote = () => {
  return (
    <div className="container">
      <h1 className="heading">New Note</h1>
      <div className="newnote-page ">
        <form>
          <div className="field">
            <label className="label">Note Title</label>
            <div className="control">
              <input className="input" type="text" placeholder="Note Title" />
            </div>
          </div>
          <div class="field">
            <label class="label">Note Content</label>
            <div class="control">
              <textarea class="textarea" rows="10" cols="40" placeholder="Note Content here"></textarea>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-link">Add Note</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default NewNote;