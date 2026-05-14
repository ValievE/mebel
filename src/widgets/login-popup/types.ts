import type { UIComponentsNS } from "@/types/types.ts";

export namespace LoginPopupNS {
  export type Mode = "login" | "register" | "code";
  export type FormFields =
    | "email"
    | "password"
    | "passwordRepeat"
    | "firstName"
    | "lastName"
    | "code";
  export type Form = Record<FormFields, string>;
  export type FormField = {
    type: "input" | "code";
    label: string;
    id: FormFields;
    placeholder: string;
  };
  export type Object = {
    data: {
      mode: Mode;
      form: Form;
      errors: Partial<Form>;
      loading: boolean;
      tabs: UIComponentsNS.Tabs.Props<Mode>;
    };
    functions: {
      submit(): Promise<void>;
      clean(): void;
      validate(): boolean;
      handleTabChange(mode: Mode): void;
      onClose(): void;
      handleModelValue(value: string, id: FormFields): void;
    };
  };
}
