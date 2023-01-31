import type { UserProps } from "./user";
import type { TemplatesProps } from "./templates";
import type { EditorProps } from "./editor";

export interface GlobalDataProps {
  user: UserProps;
  templates: TemplatesProps;
  editor: EditorProps;
}
