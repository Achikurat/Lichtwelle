import { log } from "console";
import { FixtureDefinition } from "../../lib/types";
import * as fs from "fs";

export function handleReloadFixtureDefinitions(
  fixtureDefinitionsLocation: string
): Promise<FixtureDefinition[]> {
  return new Promise<FixtureDefinition[]>((resolve, reject) => {
    if (fs.existsSync(fixtureDefinitionsLocation)) {
      fs.readdir(fixtureDefinitionsLocation, (err, files) => {
        const filteredFiles = files.filter((file) => file.endsWith(".json"));

        if (filteredFiles.length > 0) {
          //TODO: implement actual parsing
          const fixtureDefinitions: FixtureDefinition[] = filteredFiles.map(
            (file): FixtureDefinition => {
              return {
                name: "test",
                channels: [],
                src: file,
              };
            }
          );

          resolve(fixtureDefinitions);
        } else resolve([]);
      });
    } else {
      resolve([]);
    }
  });
}
