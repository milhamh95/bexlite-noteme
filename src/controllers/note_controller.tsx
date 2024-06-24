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
            <div>{currentNote.content}</div>
        </>
    )
}