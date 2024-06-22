import { client } from "../models/client";
import { Home, INote } from "../views/pages";

export function get_notes () {
    const allNotes = client.query("SELECT * FROM notes").all() as INote[];

    return <Home notes={allNotes} />;
};
