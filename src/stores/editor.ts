import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import type { ImageComponentProps, TextComponentProps } from "@/defaultProps";
import type { GlobalDataProps } from ".";

export interface EditorProps {
  components: ComponentData[];
  currentElement: string;
}

export interface ComponentData {
  props: Partial<TextComponentProps | ImageComponentProps>;
  id: string;
  name: string;
}

export const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: "g-text",
    props: {
      text: "hello",
      fontSize: "20px",
      color: "#1890ff",
      lineHeight: "1",
      textAlign: "left",
      fontFamily: "",
      width: "100px",
      height: "100px",
      top: "10px",
      left: "10px",
      position: "absolute",
      backgroundColor: "#cccccc",
    },
  },
  {
    id: uuidv4(),
    name: "g-text",
    props: {
      text: "hello2",
      fontSize: "10px",
      fontWeight: "bold",
      lineHeight: "2",
      textAlign: "left",
      fontFamily: "",
    },
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

export const useEditorStore = defineStore("editor", {
  state: () => {
    return { components: testComponents, currentElement: "" };
  },

  actions: {
    addComponent(component: ComponentData) {
      this.components.push(component);
    },
    setActive(currentId: string) {
      this.currentElement = currentId;
    },
    updateComponent({ key, value, id }) {
      const updateComponent = this.components.find(
        (component) => component.id === this.currentElement
      );
      if (updateComponent) {
        updateComponent.props[key as keyof TextComponentProps] = value;
      }
    },
  },
  getters: {
    getCurrentElement: (state) => {
      return state.components.find(
        (component) => component.id === state.currentElement
      );
    },
  },
});
