import { useState } from "react";

export function useInputState(initialValues: any) {
  const [inputState, setInputState] =
    useState<typeof initialValues>(initialValues);

  const handleChange = (event: React.ChangeEvent) => {};

  const inputProps = {
    onChange: handleChange,
  };

  return [inputProps];
}
