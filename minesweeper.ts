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

    function countMines(x: number, y: number): number{
        let count = 0;
        for(let dy = -1; dy <= 1; dy++){
            for(let dx = -1; dx <=1; dx++){
                if(dx === 0 && dy === 0)continue;
                    const ny = y + dy;
                    const nx = x + dx;
                    if(ny >= 0 && ny < height && nx >= 0 && nx < width){
                    if (rows[ny][nx] === "*")count++;
                }
            }
        }
        return count;
    }
    return rows.map((row,y) =>
        row.map((cell, x) => (cell === "*" ? "*" : countMines(x, y).toString())).join("")
    ).join("\n");
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