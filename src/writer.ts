
export function writeFile(filepath: string, data: string){
    const encoder = new TextEncoder();
    Deno.writeFileSync(filepath, encoder.encode(data));
}
