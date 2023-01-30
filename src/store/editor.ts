import { v4 as uuidv4 } from "uuid";
import type { Module } from "vuex";
import type { GlobalDataProps } from ".";

export interface EditorProps {
  components: ComponentData[];
  currentElement: string;
}

interface ComponentData {
  props: { [key: string]: any };
  id: string;
  name: string;
}

export const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: "g-text",
    props: { text: "hello", fontSize: "20px", color: "red" },
  },
  {
    id: uuidv4(),
    name: "g-text",
    props: { text: "hello2", fontSize: "10px", fontWeight: "bold" },
  },
  {
    id: uuidv4(),
    name: "g-text",
    props: {
      text: "hello3",
      fontSize: "15px",
      actionType: "url",
      url: "https://www.baidu.com",
    },
  },
];

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: "",
  },
  mutations: {
    addComponent(state, props) {
      const newComponent: ComponentData = {
        id: uuidv4(),
        name: "g-text",
        props,
      };
      state.components.push(newComponent);
    },
  },
};

export default editor;
