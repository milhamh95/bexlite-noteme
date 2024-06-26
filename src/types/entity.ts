import {t, Static} from "elysia";

export const bodySchema = t.Object({
    content: t.String(),
})

export interface INote {
    id: number;
    content: string;
}

export type TBody = Static<typeof bodySchema>;

