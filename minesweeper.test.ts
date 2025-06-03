import { assertEquals } from "jsr:@std/assert";
import { minesweeper } from "./minesweeper.ts";

Deno.test("Grille 1x1", () => {
    assertEquals(minesweeper("."),"0");
});
