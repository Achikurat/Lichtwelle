import { FixtureDefinition, PersistentSettings } from "../../lib/types";
import * as fs from "fs"

export function handleReloadFixtureDefinitions(persistentSettings: PersistentSettings): FixtureDefinition[] {

    fs.readdir(persistentSettings.fixtureDefinitionsLocation, (err, files) => {
        files.forEach(file => {
          console.log(file);
        });
      });

    return [];
}