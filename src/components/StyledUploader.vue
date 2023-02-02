<script lang="ts" setup>
import { FileImageOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import Uploader from "./Uploader.vue";
import { commonUploadCheck } from "../helper";

const emit = defineEmits(["success"]);

const handleUploadSuccess = (response: any) => {
  emit("success", response);
};
</script>

<template>
  <uploader
    class="styled-uploader"
    action="http://127.0.0.1:8888/upload_single"
    :showUploadList="false"
    :beforeUpload="commonUploadCheck"
    @success="
      (data) => {
        handleUploadSuccess(data.response);
      }
    "
  >
    <div class="uploader-container">
      <FileImageOutlined />
      <h4>上传图片</h4>
    </div>
    <template #loading>
      <div class="uploader-container">
        <LoadingOutlined spin />
        <h4>上传中</h4>
      </div>
    </template>
    <template #uploaded>
      <div class="uploader-container">
        <FileImageOutlined />
        <h4>上传图片</h4>
      </div>
    </template>
  </uploader>
</template>

<style lang="scss">
.styled-uploader {
  .uploader-container {
    width: 100px;
    padding: 10px;
    color: #fff;
    background: #1890ff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .uploader-container:hover {
    background: #40a9ff;
  }
  .uploader-container h4 {
    color: #fff;
    margin-bottom: 0;
    margin-left: 10px;
  }
}
</style>
