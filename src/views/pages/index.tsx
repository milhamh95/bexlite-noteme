import { INote } from "../../types/entity";
import { NoteCard } from "../components/note_card";
import { NoteForm } from "../components/note_form";
import { TemplateBase } from "../templates/templateBase";

export const Home = ({notes}: {notes: INote[]}) => {
    return (
        <TemplateBase>
            <div>Notes: </div>
            <NoteForm />
            <div id="notes">{notes.map((note) => {
                return (
                    <NoteCard note={note} />
                );
            })}</div>
        </TemplateBase>
    )
}