import { createStore } from "vuex";
import type { TemplatesProps } from "./templates";
import templates from "./templates";
import type { UserProps } from "./user";
import user from "./user";

export interface GlobalDataProps {
  user: UserProps;
  templates: TemplatesProps;
}

const store = createStore({
  modules: {
    user,
    templates,
  },
});

export default store;
