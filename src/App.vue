<!-- <script lang="ts" setup>
import Uploader from "./components/Uploader.vue";
</script> -->

<template>
  <div id="app">
    <!-- <Uploader
      action="http://127.0.0.1:8888/upload_single"
      drag
      list-type="picture"
    >
      <div class="uploader-container">
        <h4>上传图片</h4>
      </div>
      <template #loading>
        <div class="uploader-container">
          <h4>上传中</h4>
        </div>
      </template>
      <template #uploaded="{ uploadedData }">
        <div class="uploader-area">
          <img :src="uploadedData.servicePath" />
          <h4>点击重新上传</h4>
        </div>
      </template>
    </Uploader> -->
    <router-view />
  </div>
</template>

<style lang="scss">
.page-title {
  color: #fff;
}
// .file-upload .upload-area {
//   background: #efefef;
//   border: 1px dashed #ccc;
//   border-radius: 4px;
//   cursor: pointer;
//   padding: 20px;
//   width: 360px;
//   height: 180px;
//   text-align: center;
//   &:hover {
//     border: 1px dashed #1890ff;
//   }
//   &.is-dragover {
//     border: 2px dashed #1890ff;
//     background: rgba(#1890ff, 0.2);
//   }
// }
// .upload-area img {
//   height: 100px;
// }
</style>
