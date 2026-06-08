import type { UIComponentsNS } from "@/types/types.ts";

export namespace LoginPopupNS {
  export type Mode = "login" | "register" | "code";
  export type StringFormFields =
    | "email"
    | "password"
    | "passwordRepeat"
    | "firstName"
    | "lastName"
    | "code";
  export type BooleanFormFields = "privacy" | "advertisingAgreement";

  export type Form = Record<StringFormFields, string> &
    Record<BooleanFormFields, boolean>;
  export type FormField = {
    type: "input" | "code";
    label: string;
    id: StringFormFields;
    placeholder: string;
  };
  export type Object = {
    data: {
      mode: Mode;
      form: Form;
      errors: Partial<Record<StringFormFields | BooleanFormFields, string>>;
      loading: boolean;
      tabs: UIComponentsNS.Tabs.Props<Mode>;
    };
    functions: {
      submit(): Promise<void>;
      clean(): void;
      validate(): boolean;
      handleTabChange(mode: Mode): void;
      onClose(): void;
      handleModelValue(value: string, id: StringFormFields): void;
      handleCheckbox(value: boolean, id: BooleanFormFields): void;
    };
  };
}
