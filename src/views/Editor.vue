<script lang="ts">
import GText from "../components/GText.vue";
export default {
  components: {
    GText,
  },
};
</script>

<script lang="ts" setup>
import { computed } from "vue";
import { useEditorStore } from "../stores/editor";
import type { GlobalDataProps } from "@/stores";
import type { ComponentData } from "../stores/editor";
import { defaultTextTemplates } from "@/defaultTemplates";

import ComponentsList from "@/components/ComponentsList.vue";
import EditWrapper from "@/components/EditWrapper.vue";
import PropsTable from "@/components/PropsTable.vue";
// import PropsTable from "@/components/PropsTable";
import StyledUploader from "@/components/StyledUploader.vue";

const editorStore = useEditorStore();
const components = computed(() => editorStore.components);
const currentElement = computed(() => editorStore.getCurrentElement);

const addItem = (props: any) => {
  editorStore.addComponent(props);
};

const setActive = (id: string) => {
  editorStore.setActive(id);
};

const handleChange = (e: any) => {
  editorStore.updateComponent(e);
};
</script>

<template>
  <div class="editor" id="editor-layout-main">
    <a-layout>
      <a-layout-sider width="300" style="background: #fff">
        <div class="sidebar-container">组件列表</div>
        <components-list
          :list="defaultTextTemplates"
          @onItemClick="addItem"
        ></components-list>
        <StyledUploader></StyledUploader>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area">
            <edit-wrapper
              @setActive="setActive(component.id)"
              v-for="component in components"
              :key="component.id"
              :id="component.id"
              :active="component.id === (currentElement && currentElement.id)"
            >
              <component :is="component.name" v-bind="component.props" />
            </edit-wrapper>
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider
        width="300"
        style="background: #fff"
        class="settings-panel"
      >
        组件属性
        <props-table
          v-if="currentElement && currentElement.props"
          :props="currentElement.props"
          @change="handleChange"
        ></props-table>
        <pre>
          {{ currentElement && currentElement.props }}
        </pre>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<style>
.header {
  display: flex;
  justify-content: space-between;
}
.header .logo-img {
  margin-right: 20px;
  height: 40px;
}
.page-title {
  display: flex;
}
.header h4 {
  color: #ffffff;
}
.editor-spinner {
  position: fixed;
  right: 50%;
  top: 10px;
}
.preview-container {
  padding: 24px;
  margin: 0;
  min-height: 90vh !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
.preview-list.active {
  border: 1px solid #1890ff;
}
.preview-list.canvas-fix .g-text-component,
.preview-list.canvas-fix .g-image-component,
.preview-list.canvas-fix .g-shape-component {
  box-shadow: none !important;
}
.preview-list.canvas-fix {
  position: absolute;
  max-height: none;
}
.sidebar-container {
  padding: 20px;
}
.body-container {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.page-settings {
  padding: 16px;
}
.settings-panel .ant-tabs-top-content {
  max-height: calc(100vh - 68px - 56px);
  overflow-y: auto;
}
.final-preview {
  position: absolute;
  width: calc(100% - 400px);
  height: 100%;
  background: transparent;
  top: 0;
  left: 0;
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
}
.final-preview-inner {
  width: 430px;
  height: 870px;
  padding: 60px 28px;
  position: relative;
  background: url("~@/assets/phone-back.png") no-repeat;
  background-size: cover;
}
.final-preview-inner .preview-title {
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-weight: bold;
}
.iframe-container {
  width: 100%;
  height: 706px;
  overflow-y: auto;
  overflow-x: hidden;
}
.iframe-placeholder {
  background: url("~@/assets/loading.svg") 50% 50% no-repeat;
  background-size: 50px;
}
.settings-panel .ant-list-bordered {
  border-radius: 0;
}
.settings-panel .ant-collapse {
  border-radius: 0;
}
.ant-collapse-header,
.ant-collapse-item {
  border-radius: 0 !important;
}
.settings-panel .ant-tabs-tab {
  border-radius: 0 !important;
}
</style>
