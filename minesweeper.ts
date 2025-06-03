import { assertEquals } from "jsr:@std/assert";

export function minesweeper(input : string): string{

    if (!input.includes("\n")){
        return input.split("").map((c, i, arr) => {
           if(c === "*") return "*";
           let count = 0;
           if(arr[i + 1] === "*") count++;
           if(arr[i - 1] === "*") count++;
           return count.toString();
        }).join("");
    }
    const rows = input.split("\n").map((r) => r.split(""));
    const height = rows.length;
    const width = rows[0].length;
    let result = "";

    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            result += rows[y][x];
        }
    }
    return result;
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

Deno.test("Grille 2x2 avec 1 mine", () => {
    const input = ".*\n..";
    const expected ="1*\n11";
    assertEquals(minesweeper(input),expected);
});