import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
	let idCount = 1;

	const [noteState, setNoteState] = useState([{
		id: idCount,
		title: "Note title",
		content: "Note content",
	}]);

	function addNote(note) {
		idCount++;

		let {title, content} = note;

		setNoteState( prevState => {
			return [...prevState, {
				id: idCount,
				title,
				content
			}]
		})
	}

	function deleteNote(id) {
		setNoteState(prevState => prevState.filter( note => {
			return note.id !== id
		}))
	}

	return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
			{noteState.map( note => {
				return <Note deleteNote={deleteNote} key={note.id} id={note.id} title={note.title} content={note.content} />;
			})}

      <Footer />
    </div>
  );
}

export default App;
