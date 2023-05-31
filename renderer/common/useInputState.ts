import { InputProps } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

type initalValues = { [name: string]: string | number };

export function useInputState(
  initialValues: initalValues
): [
  { [name: string]: InputProps },
  { [name: string]: string | number },
  Dispatch<SetStateAction<initalValues>>
] {
  const [inputState, setInputState] = useState<initalValues>(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const min = event.target.min ? Number(event.target.min) : -1000;
    const max = event.target.max ? Number(event.target.max) : 1000;
    const name = event.target.name;
    const type = typeof initialValues[name];
    const value = event.target.value;

    if (type === "number") {
      if (/[0-9]/.test(value)) {
        const numberValue = Number(value);
        if (Number(value) >= min && Number(value) <= max) {
          setInputState({ ...inputState, [name]: numberValue });
        } else if (value === "") {
          setInputState({ ...inputState, [name]: "" });
        }
      } else {
        setInputState({ ...inputState, [name]: value });
      }
    } else {
      if (value.length <= max) {
        setInputState({ ...inputState, [name]: value });
      }
    }
  };

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      !/[0-9.+-]/.test(e.key) && e.preventDefault();
    },
    []
  );

  const inputProps = Object.assign(
    {},
    ...Object.keys(initialValues).map((key) => ({
      [key]: {
        onChange: handleChange,
        onKeyPress:
          typeof initialValues[key] === "number" ? handleKeyPress : undefined,
        value: inputState[key],
        name: key,
      },
    }))
  );

  return [inputProps, inputState, setInputState];
}
