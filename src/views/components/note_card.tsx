import { INote } from "../../types/entity"

export const NoteCard = ({note, isDisabled = false, withOob = false}: {note: INote, isDisabled?: boolean, withOob?: boolean}) => {
    return (
        <main id={`note-${note.id}`} hx-swap-oob={withOob ? "true": ""}>
            <div>{note.content}</div>
            <button hx-get={`/notes/${note.id}/edit`} hx-swap="none" disabled={isDisabled}>Edit</button>
            <button hx-delete={`/notes/${note.id}`} hx-target="closest main" disabled={isDisabled}>Delete</button>
        </main>
    )
}