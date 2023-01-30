import { createStore } from "vuex";
import type { TemplatesProps } from "./templates";
import templates from "./templates";
import type { UserProps } from "./user";
import user from "./user";
import type { EditorProps } from "./editor";
import editor from "./editor";

export interface GlobalDataProps {
  user: UserProps;
  templates: TemplatesProps;
  editor: EditorProps;
}

const store = createStore({
  modules: {
    user,
    templates,
    editor,
  },
});

export default store;
