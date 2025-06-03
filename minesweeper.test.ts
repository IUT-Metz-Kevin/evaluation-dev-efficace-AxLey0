import { assertEquals } from "jsr:@std/assert";

Deno.test("Grille 1x1", () => {
    assertEquals(minesweeper("."),"0");
});
