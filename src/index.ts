import { Elysia, t } from "elysia";
import { client } from "./models/client";
import { html } from "@elysiajs/html";
import { get_notes } from "./controllers/note_controller";

const app = new Elysia()
  .use(html())
  .get("/notes", get_notes)
  .post("/notes", ({body}) => {
    const {content} = body;
    client.query("INSERT INTO notes (content) VALUES (?)").run(content);

    return {message: "success"};
  }, {
    body: t.Object({
      content: t.String(),
    })
  })
  .delete("/notes/:id", ({params}) => {
    client.query("DELETE FROM notes WHERE id = ?").run(params.id);

    return {
      message: `Notes has been deleted`
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
