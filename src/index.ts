import { Elysia, t } from "elysia";
import { client } from "./models/client";

const app = new Elysia()
  .get("/notes", () => {
    const allNotes = client.query("SELECT * FROM notes").all();

    return {data: allNotes}
  })
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
