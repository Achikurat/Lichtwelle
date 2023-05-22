import { log } from "console";
import { FixtureDefinition } from "../../lib/types";
import * as fs from "fs";
import { parseFixtureJSON } from "./parser";
import path from "path";

export async function handleReloadFixtureDefinitions(
  fixtureDefinitionsLocation: string
): Promise<FixtureDefinition[]> {
  if (fs.existsSync(fixtureDefinitionsLocation)) {
    const files = fs.readdirSync(fixtureDefinitionsLocation);
    const filteredFiles = files.filter((file) => file.endsWith(".json"));

    if (filteredFiles.length > 0) {
      const fixtureDefinitions = Promise.all(
        filteredFiles.map(
          async (file): Promise<FixtureDefinition> =>
            await parseFixtureJSON(path.join(fixtureDefinitionsLocation, file))
        )
      );
      return fixtureDefinitions;
    } else return [];
  } else {
    return [];
  }
}
