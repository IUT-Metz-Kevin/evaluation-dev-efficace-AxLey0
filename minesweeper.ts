import { assertEquals } from "jsr:@std/assert";

export function minesweeper(input : string): string{ //Fonction de résolution du démineur

    if (!input.includes("\n")){
        return input.split("").map((c, i, arr) => {
           if(c === "*") return "*"; // Si la case est une mine on revoie la meme chose
           let count = 0;
           if(arr[i + 1] === "*") count++; // On verifie la case de droite
           if(arr[i - 1] === "*") count++; // On verifie la case de gauche
           return count.toString(); // Ca retourne le nombre de mines autours des cases
        }).join("");
    }

    // Je part du principe qu'il est plus simple de découper la grille en tableau
    const rows = input.split("\n").map((r) => r.split(""));
    const height = rows.length;
    const width = rows[0].length;

    // Cette fonction permet d'incrementer le nombre en fonction de la position de la mine
    function countMines(x: number, y: number): number{
        let count = 0;
        // Je parcours les 8 cases autour de la mine
        for(let dy = -1; dy <= 1; dy++){
            for(let dx = -1; dx <=1; dx++){
                // J'ignore la case ou ce situe la mine
                if(dx === 0 && dy === 0)continue;
                    const ny = y + dy;  // Nouvelle ligne
                    const nx = x + dx;  // Nouvelle colonne
                    if(ny >= 0 && ny < height && nx >= 0 && nx < width){ // Je verifie si la case et bien dans les bornes
                    if (rows[ny][nx] === "*")count++; // Si on trouve la mine, on incremente
                }
            }
        }
        return count;
    }
    return rows.map((row,y) =>
        row.map((cell, x) => (cell === "*" ? "*" : countMines(x, y).toString())).join("") // on reconctruit le resultat final pour retrouver son format initial
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

Deno.test("Grille 3x3 avec 1 mine au centre", () => {
    const input = "...\n.*.\n...";
    const expected ="111\n1*1\n111";
    assertEquals(minesweeper(input),expected);
});

Deno.test("Grille 3x3 avec 1 mine en haut a gauche", () => {
    const input = "..*\n...\n...";
    const expected ="01*\n011\n000";
    assertEquals(minesweeper(input),expected);
});

Deno.test("Grille 3x3 avec 1 mine en bas a droite", () => {
    const input = "...\n...\n*..";
    const expected ="000\n110\n*10";
    assertEquals(minesweeper(input),expected);
});

Deno.test("Grille 3x3 avec 2 mines", () => {
    const input = "*..\n...\n*..";
    const expected ="*10\n220\n*10";
    assertEquals(minesweeper(input),expected);
});

Deno.test("Grille 4x3 avec 2 mines", () => {
    const input = ".*..\n....\n..*.";
    const expected ="1*10\n1221\n01*1";
    assertEquals(minesweeper(input),expected);
});

Deno.test("Grille 5x3 avec 4 mines", () => {
    const input = "..*.*\n*....\n...*.";
    const expected ="12*2*\n*2232\n111*1";
    assertEquals(minesweeper(input),expected);
});

Deno.test("Test Final", () => {
    const input = ".*.**.\n....*.\n..*...";
    const expected ="1*2**2\n1234*2\n01*211";
    assertEquals(minesweeper(input),expected);
});
