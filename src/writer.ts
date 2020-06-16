
// This file is the same as the writeFileSync and writeJsonSync within the deno std package
// because for some reason, importing it gives many errors

export function writeFile(filepath: string, data: string){
    const encoder = new TextEncoder();
    Deno.writeFileSync(filepath, encoder.encode(data));
}

type Replacer = (key: string, value: any) => any;

export interface WriteJsonOptions {
    spaces?: number | string;
    replacer?: Array<number | string> | Replacer;
  }

export function writeJson(
    filePath: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    object: any,
    options: WriteJsonOptions = {}
  ): void {
    let contentRaw = "";
  
    try {
      contentRaw = JSON.stringify(
        object,
        options.replacer as string[],
        options.spaces
      );
    } catch (err) {
      err.message = `${filePath}: ${err.message}`;
      throw err;
    }
  
    Deno.writeFileSync(filePath, new TextEncoder().encode(contentRaw));
  }