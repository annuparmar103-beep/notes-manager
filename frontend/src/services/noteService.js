import API from "./api";

// get notes
export const getNotes = async () => {
    return await API.get("/notes");
}

// create note
export const createNote = async (noteData) => {
    return await API.post("/notes", noteData);
}

// update note
export const updateNote = async (id, noteData) => {
    return await API.put(`/notes/${id}`, noteData);
}

// delete note
export const deleteNote = async (id) => {
    return await API.delete(`/notes/${id}`);
}

