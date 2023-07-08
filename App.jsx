import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
    color: "#333"
  },
  noteContainer: {
    width: "100%",
    maxWidth: "600px",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: "#f5f5f5",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
  },
  noteTitle: {
    marginBottom: theme.spacing(1),
    color: "#333"
  },
  noteContent: {
    color: "#555"
  }
}));

function App() {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await axios.get(
          "https://api.gyanibooks.com/library/get_dummy_notes"
        );
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }
    fetchNotes();
  }, []);

  return (
    <Container className={classes.root}>
      <Typography
        variant="h3"
        component="h1"
        className={classes.title}
        gutterBottom
      >
        Dummy Notes
      </Typography>
      {notes.map((note) => (
        <div className={classes.noteContainer} key={note.id}>
          <Typography
            variant="h5"
            component="h2"
            className={classes.noteTitle}
            gutterBottom
          >
            {note.title}
          </Typography>
          <Typography variant="body1" className={classes.noteContent}>
            {note.content}
          </Typography>
        </div>
      ))}
    </Container>
  );
}

export default App;
