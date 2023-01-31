import { defineStore } from "pinia";
import type { GlobalDataProps } from "./index";

export interface TemplateProps {
  id: number;
  title: string;
  coverImg: string;
  author: string;
  copiedCount: number;
}

const testData: TemplateProps[] = [
  {
    id: 1,
    coverImg:
      "https://oss01-zb01-hz-external.test.geely.com/jpgs-shopfile/e99f142dea5a4aa3b3a1b6c6372d890eu16215730581853208727fm199app68fJPEG.jpg",
    title: "可乐1",
    author: "Gary1",
    copiedCount: 1,
  },
  {
    id: 2,
    coverImg:
      "https://oss01-zb01-hz-external.test.geely.com/jpgs-shopfile/94c423efae734ceb85b06baccb40eb06u39590922112047135632fm199app68fJPEG.jpg",
    title: "可乐2",
    author: "Gary2",
    copiedCount: 2,
  },
  {
    id: 3,
    coverImg:
      "https://oss01-zb01-hz-external.test.geely.com/jpgs-shopfile/4cf1217e84f945c48de858d7b6493285u1876445518768631450fm199app68fJPEG.jpg",
    title: "可乐3",
    author: "Gary3",
    copiedCount: 3,
  },
  {
    id: 4,
    coverImg:
      "https://oss01-zb01-hz-external.test.geely.com/jpgs-shopfile/c004c5d05ae14ea58ff6353ff6b823e9u2052649606681357603fm199app68fJPEG.jpg",
    title: "可乐4",
    author: "Gary4",
    copiedCount: 4,
  },
  {
    id: 5,
    coverImg:
      "https://oss01-zb01-hz-external.test.geely.com/jpgs-shopfile/c9e08a9bbb5645b2a40298b6ce490e21联想笔记本.png",
    title: "可乐5",
    author: "Gary5",
    copiedCount: 5,
  },
  {
    id: 6,
    coverImg:
      "https://oss01-zb01-hz-external.test.geely.com/jpgs-shopfile/0b9feb930fb24f829d0b828d0de91d80联想笔记本1.png",
    title: "可乐6",
    author: "Gary6",
    copiedCount: 6,
  },
];

export interface TemplatesProps {
  data: TemplateProps[];
}

export const useTemplatesStore = defineStore("templates", {
  state: () => {
    return { data: testData };
  },
  getters: {
    getTemplateById: (state) => (id: number) => {
      return state.data.find((t) => t.id === id);
    },
  },
});
