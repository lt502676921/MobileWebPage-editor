<script lang="ts" setup>
import { computed, reactive, ref, type PropType } from "vue";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { last } from "lodash-es";
import {
  DeleteOutlined,
  LoadingOutlined,
  FileOutlined,
} from "@ant-design/icons-vue";

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadStatus;
  raw: File;
  response?: any;
  url?: string;
}

export type UploadStatus = "ready" | "loading" | "success" | "error";
type FileListType = "picture" | "text";
type CheckUpload = (file: File) => boolean | Promise<File>;

const props = defineProps({
  action: {
    type: String,
    required: true,
  },
  beforeUpload: {
    type: Function as PropType<CheckUpload>,
  },
  drag: {
    type: Boolean,
    default: false,
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
  listType: {
    type: String as PropType<FileListType>,
    default: "text",
  },
  showUploadList: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["success"]);

const fileInput = ref<null | HTMLInputElement>(null);
const fileList = ref<UploadFile[]>([]);
const isDragOver = ref(false);
const isUploading = computed(() => {
  return fileList.value.some((file) => file.status === "loading");
});
const lastFileData = computed(() => {
  const lastFile = last(fileList.value);
  if (lastFile) {
    return {
      loaded: lastFile.status === "success",
      data: lastFile.response,
    };
  }
  return false;
});

const removeFile = (id: string) => {
  fileList.value = fileList.value.filter((file) => file.uid !== id);
};

const triggerUpload = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const postFile = (readyFile: UploadFile) => {
  const formData = new FormData();
  formData.append("file", readyFile.raw);
  formData.append("filename", readyFile.name);
  // formData.append(uploadedFile.name, uploadedFile);
  readyFile.status = "loading";
  axios
    .post(props.action, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res.data);
      readyFile.status = "success";
      readyFile.response = res.data;
      emit("success", {
        response: res.data,
        file: readyFile,
        list: fileList.value,
      });
    })
    .catch(() => {
      readyFile.status = "error";
    })
    .finally(() => {
      if (fileInput.value) {
        fileInput.value.value = "";
      }
    });
};

// addFileToList
const addFileToList = (uploadedFile: File) => {
  const fileObj = reactive<UploadFile>({
    uid: uuidv4(),
    size: uploadedFile.size,
    name: uploadedFile.name,
    status: "ready",
    raw: uploadedFile,
  });
  if (props.listType === "picture") {
    // URL.createObjectURL;
    try {
      fileObj.url = URL.createObjectURL(uploadedFile);
    } catch (error) {
      console.error("upload File error", error);
    }

    // FileReader
    // const fileReader = new FileReader();
    // fileReader.readAsDataURL(uploadedFile);
    // fileReader.addEventListener("load", () => {
    //   fileObj.url = fileReader.result as string;
    // });
  }
  fileList.value.push(fileObj);
  if (props.autoUpload) {
    postFile(fileObj);
  }
};

const beforeUploadCheck = (files: null | FileList) => {
  if (files) {
    const uploadedFile = files[0];
    if (props.beforeUpload) {
      const result = props.beforeUpload(uploadedFile);
      if (result && result instanceof Promise) {
        result
          .then((processedFile) => {
            if (processedFile instanceof File) {
              addFileToList(processedFile);
            } else {
              throw new Error("beforeUpload Promise should return File object");
            }
          })
          .catch((e) => {
            console.error(e);
          });
      } else if (result === true) {
        addFileToList(uploadedFile);
      }
    } else {
      addFileToList(uploadedFile);
    }
  }
};

const uploadFiles = () => {
  fileList.value
    .filter((file) => file.status === "ready")
    .forEach((readyFile) => postFile(readyFile));
};

let events: { [key: string]: (e: any) => void } = {
  click: triggerUpload,
};

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  beforeUploadCheck(target.files);
};

const handleDrag = (e: DragEvent, over: boolean) => {
  e.preventDefault();
  isDragOver.value = over;
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  isDragOver.value = false;
  if (e.dataTransfer) {
    beforeUploadCheck(e.dataTransfer.files);
  }
};

if (props.drag) {
  events = {
    ...events,
    dragover: (e: DragEvent) => {
      handleDrag(e, true);
    },
    dragleave: (e: DragEvent) => {
      handleDrag(e, false);
    },
    drop: handleDrop,
  };
}
</script>

<template>
  <div class="file-upload">
    <div
      class="upload-area"
      :class="{ 'is-dragover': drag && isDragOver }"
      v-on="events"
    >
      <slot name="loading" v-if="isUploading">
        <button class="btn btn-primary" disabled>正在上传</button>
      </slot>
      <slot
        name="uploaded"
        v-else-if="lastFileData && lastFileData.loaded"
        :uploadedData="lastFileData.data"
      >
        <button class="btn btn-primary">点击上传</button>
      </slot>
      <slot name="default" v-else>
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      ref="fileInput"
      type="file"
      :style="{ display: 'none' }"
      @change="handleFileChange"
    />
    <ul :class="`upload-list upload-list-${listType}`" v-if="showUploadList">
      <li
        :class="`uploaded-file upload-${file.status}`"
        v-for="file in fileList"
        :key="file.uid"
      >
        <img
          v-if="file.url && listType === 'picture'"
          class="upload-list-thumbnail"
          :src="file.url"
          :alt="file.name"
        />
        <span v-if="file.status === 'loading'" class="file-icon">
          <LoadingOutlined />
        </span>
        <span v-else class="file-icon"><FileOutlined /></span>
        <span class="filename">{{ file.name }}</span>
        <button class="delete-icon" @click="removeFile(file.uid)">
          <DeleteOutlined />
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.upload-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.upload-list li {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  font-size: 14px;
  line-height: 1.8;
  margin-top: 5px;
  box-sizing: border-box;
  border-radius: 4px;
  min-width: 200px;
  position: relative;
  &:first-child {
    margin-top: 10px;
  }
  .file-icon {
    svg {
      margin-right: 5px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
  .filename {
    margin-left: 5px;
    margin-right: 40px;
  }
  &.upload-error {
    color: #f5222d;
    svg {
      color: #f5222d;
    }
  }
  .file-status {
  }
}
.upload-list-thumbnail {
  width: 70px;
  height: 70px;
  position: relative;
  z-index: 1;
  background-color: #fff;
  display: inline-block;
  vertical-align: middle;
  object-fit: cover;
}

.upload-loading {
  color: yellow;
}
.upload-success {
  color: green;
}
.upload-error {
  color: red;
}
</style>
