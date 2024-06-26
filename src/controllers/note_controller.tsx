import { client } from "../models/client";
import { INote, TBody } from "../types/entity";
import { NoteCard } from "../views/components/note_card";
import { NoteForm, NoteFormUpdate } from "../views/components/note_form";
import { Home } from "../views/pages";
import { Context } from "elysia";

export function get_notes () {
    const allNotes = client.query("SELECT * FROM notes").all() as INote[];

    return <Home notes={allNotes} />;
};

export function create_note({ body }: Context) {
    const {content} = body as TBody;
    const currentNote = client.query("INSERT INTO notes (content) VALUES (?) RETURNING *").get(content) as INote;

    return (
        <>
            <NoteForm />
            <NoteCard note={currentNote}/>
        </>
    )
}

export function delete_note({params}: Context) {
    const {id} = params;

    client.query("DELETE FROM notes WHERE id = ?").run(id);

    return null;
}

export function update_todo({params, body}: Context) {
    const {id} = params;
    const {content} = body as INote;

    client.query("UPDATE notes SET content = ? WHERE id = ?").run(content, id);
    const updatedNote = client.query("SELECT * FROM notes WHERE id = ?").all(id) as INote[];

    return (
        <>
            <NoteForm />
            <NoteCard note={updatedNote[0]}/>
        </>
    )
}

export function update_todo_ui({params}: Context) {
    const {id} = params;

    const currentNote = client.query("SELECT * FROM notes WHERE id = ?").all(id) as INote[];

    return (
        <>
            <NoteFormUpdate id={id} note={currentNote[0]}/> 
            <NoteCard note={currentNote[0]} isDisabled withOob/>
        </>
    )
}