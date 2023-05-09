import { Fixture } from "../../lib/types";
import { useSessionStore } from "./store/sessionStore";

export function addFixtures(fixtures: Fixture[]) {
  const [sessionFixtures, updateSessionState] = useSessionStore((state) => [
    state.fixtures,
    state.updateSessionState,
  ]);

  updateSessionState({ fixtures: [...sessionFixtures, ...fixtures] });
}

export function createFixtures() {}
