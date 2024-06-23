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
    client.query("INSERT INTO notes (content) VALUES (?)").run(content);

    const currentNote = client.query("SELECT * FROM notes ORDER BY id DESC LIMIT 1").all() as INote[];

    return <div>{currentNote[0].content}</div>
}