import { client } from "../models/client";
import { TBody } from "../types/entity";
import { Home, INote } from "../views/pages";
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
            <form id="noteForm" hx-post="/notes" hx-target="#notes" hx-swap="beforeend" hx-swap-oob="true">
                <textarea name="content"></textarea>
                <button>Create note</button>
            </form>
            <main id={`note-${currentNote.id}`}>
                <div>{currentNote.content}</div>
                <button hx-get={`/notes/${currentNote.id}/edit`} hx-swap="none">Edit</button>
                <button hx-delete={`/notes/${currentNote.id}`} hx-target="closest main">Delete</button>
            </main>
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
            <form id="noteForm" hx-post="/notes" hx-target="#notes" hx-swap="beforeend" hx-swap-oob="true">
                <textarea name="content"></textarea>
                <button>Create note</button>
            </form>
            <main id={`note-${updatedNote[0].id}`}>
                <div>{updatedNote[0].content}</div>
                <button hx-get={`/notes/${updatedNote[0].id}/edit`} hx-swap="none">Edit</button>
                <button hx-delete={`/notes/${updatedNote[0].id}`} hx-target="closest main">Delete</button>
            </main>
        </>
        
    )
}

export function update_todo_ui({params}: Context) {
    const {id} = params;

    const currentNote = client.query("SELECT * FROM notes WHERE id = ?").all(id) as INote[];

    return (
        <>
            <form id="noteForm" hx-put={`/notes/${id}`} hx-target={`#note-${id}`} hx-swap="outerHTML" hx-swap-oob="true">
                <textarea name="content">{currentNote[0].content}</textarea>
                <button>Update note</button>
            </form>
        </>
    )
}