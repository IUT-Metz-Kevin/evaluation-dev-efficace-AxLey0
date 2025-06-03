import { assertEquals } from "jsr:@std/assert";

export function minesweeper(input : string): string{
    return input === "*" ? "*" : "0";
}

Deno.test("Grille 1x1", () => {
    assertEquals(minesweeper("."),"0");
});

Deno.test("Grille 1x1 avec mine", () => {
    assertEquals(minesweeper("*"),"*");
});

Deno.test("Ligne simple", () => {
    assertEquals(minesweeper(".*."),"1*1");
});