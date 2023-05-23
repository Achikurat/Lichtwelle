import { FixtureDefinition } from "../../lib/types";
import { fixtureFromFile } from "../openFixtureLibrary/lib/model";
import { Capability, Channel } from "../../lib/types/app";

export async function parseFixtureJSON(
  path: string
): Promise<FixtureDefinition> {
  const fixture = await fixtureFromFile(path);

  const channels = fixture.availableChannels.flatMap(
    (coarseChannel): Channel[] => {
      const linkedChannels = [];
      const capabilities = coarseChannel.capabilities.map(
        (capability): Capability => {
          return {
            valueRange: [capability.dmxRange.start, capability.dmxRange.end],
            label: capability.type,
          };
        }
      );
      linkedChannels.push({
        name: coarseChannel.name,
        defaultValue: coarseChannel.defaultValue,
        capabilities: capabilities,
      });
      if (coarseChannel.fineChannels !== undefined) {
        linkedChannels.push({
          name: coarseChannel.name + " Fine",
          defaultValue: coarseChannel.defaultValue,
          capabilities: capabilities,
          isFine: true,
        });
      }

      return linkedChannels;
    }
  );

  const modes = fixture.modes.map((mode) => {
    return [mode.name, mode.channelKeys];
  });

  const keyedModes = Object.fromEntries(modes);
  const keyedChannels = Object.fromEntries(
    channels.map((ch) => [ch.name.toString(), ch])
  );

  return {
    name: fixture.name,
    channels: keyedChannels,
    modes: keyedModes,
    src: path,
  };
}
