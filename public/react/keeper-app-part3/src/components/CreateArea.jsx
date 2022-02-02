import React, {useState} from "react";

function CreateArea(props) {
	const [note, setNote] = useState({
		title: '',
		content: '',
	});

	function handleChange(e) {
		let {name, value} = e.target;

		if (name !== 'title' && name !== 'content') {
			return;
		}

		setNote( prevState => {
			return {
				...prevState,
				[name]: value
			}
		})
	}

	return (
    <div>
      <form>
        <input onChange={handleChange} name="title" placeholder="Title" value={note.title} />
        <textarea onChange={handleChange} name="content" placeholder="Take a note..." value={note.content} rows="3" />
        <button onClick={ (e) => {
					e.preventDefault();
					props.addNote(note);

					setNote({
						title: '',
						content: ''
					})
				}}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
