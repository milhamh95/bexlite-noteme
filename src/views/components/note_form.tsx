import { INote } from "../../types/entity";

export const NoteForm = () => {
    return (
        <form id="noteForm" hx-post="/notes" hx-target="#notes" hx-swap="beforeend" hx-swap-oob="true">
            <textarea name="content"></textarea>
            <button>Create note</button>
        </form>
    )
}

export const NoteFormUpdate = ({id, note}: {id: number; note: INote}) => {
    return (
        <form id="noteForm" hx-put={`/notes/${id}`} hx-target={`#note-${id}`} hx-swap="outerHTML" hx-swap-oob="true">
            <textarea name="content">{note.content}</textarea>
            <button>Update note</button>
        </form>
    )
}