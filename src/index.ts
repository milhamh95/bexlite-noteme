import { Elysia, t } from "elysia";
import { client } from "./models/client";
import { html } from "@elysiajs/html";
import { create_note, delete_note, get_notes } from "./controllers/note_controller";
import { bodySchema } from "./types/entity";

const app = new Elysia()
  .use(html())
  .get("/notes", get_notes)
  .post("/notes", create_note, {body: bodySchema})
  .delete("/notes/:id", delete_note)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
