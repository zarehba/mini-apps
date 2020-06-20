import React, { useRef, useEffect } from 'react';
import Button from '../../shared/Button';
import ContentEditable from 'react-contenteditable';
import { useForceUpdate } from '../../hooks/useForceUpdate';
import { cardEnlargingOnHover } from '../../shared/styledUtilities';
import styled, { createGlobalStyle } from 'styled-components';

const deepClone = (stuff) => JSON.parse(JSON.stringify(stuff));
const dateNow = () => new Date().toLocaleString();
const generateId = () => +new Date() + Math.random().toString().split('.')[1];

const STORED_NOTES = JSON.parse(localStorage.getItem('notes'));
const DEFAULT_NOTE = [
  {
    id: generateId(),
    date: dateNow(),
    title: 'Sample note title',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit sed porro sint culpa deserunt voluptate sit rem aperiam autem ut.',
  },
];

const NotesApp = () => {
  const notes = useRef(STORED_NOTES?.length ? STORED_NOTES : DEFAULT_NOTE);
  const [forceUpdate] = useForceUpdate();

  useEffect(() => {
    const saveNotesToStorage = () =>
      localStorage.setItem('notes', JSON.stringify(notes.current));

    window.addEventListener('beforeunload', saveNotesToStorage);

    return () => {
      saveNotesToStorage();
      window.removeEventListener('beforeunload', saveNotesToStorage);
    };
  }, []);

  const addNote = () => {
    notes.current = [
      { id: generateId(), date: dateNow(), title: '', content: '' },
      ...notes.current,
    ];
    forceUpdate();
  };

  const deleteNote = (e) => {
    const deletedId = e.currentTarget.dataset.noteId;
    notes.current = notes.current.filter((note) => note.id !== deletedId);
    forceUpdate();
  };

  const updateNote = (updatedId, updatedField, updateValue) => {
    const newNotes = deepClone(notes.current);
    const modifiedIndex = newNotes.findIndex((note) => note.id === updatedId);
    const modifiedNote = newNotes.find((note) => note.id === updatedId);
    newNotes.splice(modifiedIndex, 1, {
      ...modifiedNote,
      [updatedField]: updateValue,
    });

    notes.current = newNotes;
  };

  return (
    <Notepad>
      <Button onClick={addNote}>Add a note</Button>
      <Notes>
        {notes.current.map((note) => (
          <Note key={note.id}>
            <NoteHeading>
              <NoteDate>[{note.date}]</NoteDate>
              <TransparentButton onClick={deleteNote} data-note-id={note.id}>
                <span
                  role="img"
                  aria-label="Delete note"
                  title="Delete this note"
                >
                  🗑
                </span>
              </TransparentButton>

              <ContentEditable
                className="noteTitle"
                tagName="h2"
                html={note.title}
                onChange={(e) => updateNote(note.id, 'title', e.target.value)}
                spellCheck="false"
              />
            </NoteHeading>
            <ContentEditable
              className="noteContent"
              html={note.content}
              onChange={(e) => updateNote(note.id, 'content', e.target.value)}
              spellCheck="false"
            />
          </Note>
        ))}
      </Notes>
      <ContentEditableStyles />
    </Notepad>
  );
};

const Notepad = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;
`;

const Notes = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;
  margin: 1rem auto;
`;

const Note = styled.div`
  padding: 2rem;
  ${cardEnlargingOnHover}
`;

const NoteHeading = styled.div`
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid Var(--color-blue-medium);
  line-height: 150%;
  font-size: 2.5rem;
`;

const NoteDate = styled.span`
  display: block;
  margin-bottom: 0.3rem;
  margin-right: 3.5rem;
  line-height: 0.8em;
  font-size: 0.7em;
  text-align: right;
`;

const contentEditable = `
  :focus {
    outline: 2px solid Var(--color-blue-medium);
  }
`;

const ContentEditableStyles = createGlobalStyle`
  .noteTitle {
    font-size: 1em;
    color: Var(--color-blue-medium);
    text-align: center;
    ${contentEditable}
  }

  .noteContent {
    padding: 0.5rem 1rem;
    line-height: 125%;
    font-size: 2rem;
    ${contentEditable}
  }
`;

const TransparentButton = styled.button`
  position: absolute;
  right: 1.5rem;
  top: 1.6rem;
  padding: 0;
  background: transparent;
  border: none;
  font-size: 3rem;
  cursor: pointer;
  opacity: 0.6;
  transform: scale(0.85);
  transition: all 0.25s ease;

  :hover {
    opacity: 1;
    transform: scale(1);
  }

  :focus {
    outline: 1px dashed Var(--color-blue-medium);
  }

  & > span {
    display: block;
  }
`;

export default NotesApp;
