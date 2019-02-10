import { ChangeEvent, Component } from "react";

export function onFormFieldChange(
  context: Component,
  fieldName: string
): (event: ChangeEvent<HTMLInputElement>) => void {
  return (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      context.setState({ [fieldName]: event.target.value });
    }
  };
}
