import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotes, createNote, deleteNote, updateNote } from '../services/noteService';
import { Container, Box, Paper, Typography, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';

function Dashboard(){
    const navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [notes, setNotes] = useState([]);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    const fetchNotes = async () => {
        try {
            const response = await getNotes();
            setNotes(response.data);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch notes");
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleNotesSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            toast.warning("Title and content are required");
            return;
        }

        try {
            const response = await createNote({ title: title.trim(), content: content.trim() });
            console.log(response.data);
            toast.success("Note created successfully");
            setTitle("");
            setContent("");
            fetchNotes();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to create note");
            console.log(error);
        }
    };

    const startEditNote = (note) => {
        setEditingNoteId(note._id);
        setEditTitle(note.title);
        setEditContent(note.content);
    };

    const cancelEdit = () => {
        setEditingNoteId(null);
        setEditTitle("");
        setEditContent("");
    };

    const handleUpdateNote = async (id) => {
        if (!editTitle.trim() || !editContent.trim()) {
            toast.warning("Title and content are required");
            return;
        }

        try {
            const response = await updateNote(id, { title: editTitle.trim(), content: editContent.trim() });
            console.log(response.data);
            toast.success("Note updated successfully");
            setEditingNoteId(null);
            setEditTitle("");
            setEditContent("");
            fetchNotes();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update note");
            console.log(error);
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            const response = await deleteNote(id);
            console.log(response.data);
            toast.success("Note deleted successfully");
            fetchNotes();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete note");
            console.log(error);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
        navigate("/login");
    };

    return(
        <Container maxWidth="lg">
            <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2, pr: 1 }}>
                <Button variant="outlined" color="error" onClick={handleLogout}>Logout</Button>
            </Box>
            <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", margin: 4 }}>Welcome to the Dashboard</Typography>
            <Box sx={{ display: "flex", justifyContent: "center"}}>
                <Paper component="form" elevation={0} sx={{ padding: 4, display: "flex", flexDirection: "column", gap: 2, width: 700, borderRadius: "10px" }} onSubmit={handleNotesSubmit}>
                    <TextField label="Note Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <TextField label="Note Content" variant="outlined" multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
                    <Button variant="contained" color="primary" type="submit">
                        Add Note
                    </Button>
                </Paper>
            </Box>
        {/* Display notes */}
        <Box sx={{ marginTop: 4, display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
            {notes.map((note) => (
                <Paper key={note._id} sx={{ padding: 2, marginBottom: 2, width: 260 }}>
                    {editingNoteId === note._id ? (
                        <>
                            <TextField
                                label="Title"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                sx={{ mb: 1 }}
                            />
                            <TextField
                                label="Content"
                                variant="outlined"
                                size="small"
                                fullWidth
                                multiline
                                rows={3}
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                sx={{ mb: 1 }}
                            />
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Button variant="contained" color="primary" size="small" onClick={() => handleUpdateNote(note._id)}>
                                    Save
                                </Button>
                                <Button variant="outlined" color="inherit" size="small" onClick={cancelEdit}>
                                    Cancel
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Typography variant="h6">{note.title}</Typography>
                            <Typography variant="body1">{note.content}</Typography>
                            <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                                <Button variant="contained" color="info" size="small" onClick={() => startEditNote(note)}>
                                    Edit
                                </Button>
                                <Button variant="contained" color="error" size="small" onClick={() => handleDeleteNote(note._id)}>
                                    Delete
                                </Button>
                            </Box>
                        </>
                    )}
                </Paper>
            ))}
        </Box>
    </Container>
    )
}

export default Dashboard;