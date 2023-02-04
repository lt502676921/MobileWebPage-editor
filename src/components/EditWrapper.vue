<script lang="ts" setup>
import { pick } from "lodash-es";
import { computed, ref, nextTick } from "vue";

type ResizeDirection =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

interface OriginalPosition {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  props: {
    type: Object,
  },
});

const emit = defineEmits(["set-active", "update-position"]);

const editWrapper = ref<null | HTMLElement>(null);

const onItemClick = (id: string) => {
  emit("set-active");
};

const gap = {
  x: 0,
  y: 0,
};
let isMoving = false;
const calculateMovePosition = (e: MouseEvent) => {
  const container = document.getElementById("canvas-area") as HTMLElement;
  const left = e.clientX - gap.x - container.offsetLeft;
  const top = e.clientY - gap.y - container.offsetTop + container.scrollTop;
  return { left, top };
};
const calculateSize = (
  direction: ResizeDirection,
  e: MouseEvent,
  position: OriginalPosition
) => {
  const { clientX, clientY } = e;
  const { left, right, top, bottom } = position;
  const container = document.getElementById("canvas-area") as HTMLElement;
  const rightWidth = clientX - left;
  const leftWidth = right - clientX;
  const bottomHeight = clientY - top;
  const topHeight = bottom - clientY;
  const topOffset = clientY - container.offsetTop + container.scrollTop;
  const leftOffset = clientX - container.offsetLeft;
  switch (direction) {
    case "top-left":
      return {
        width: leftWidth,
        height: topHeight,
        top: topOffset,
        left: leftOffset,
      };
    case "top-right":
      return {
        width: rightWidth,
        height: topHeight,
        top: topOffset,
      };
    case "bottom-left":
      return {
        width: leftWidth,
        height: bottomHeight,
        left: leftOffset,
      };
    case "bottom-right":
      return {
        width: rightWidth,
        height: bottomHeight,
      };
    default:
      break;
  }
};
const styles = computed(() =>
  pick(props.props, ["position", "top", "left", "width", "height"])
);
const startResize = (direction: ResizeDirection) => {
  const currentElement = editWrapper.value as HTMLElement;
  const { left, right, top, bottom } = currentElement.getBoundingClientRect();
  const handleMove = (e: MouseEvent) => {
    const size = calculateSize(direction, e, { left, right, top, bottom });
    const { style } = currentElement;
    if (size) {
      style.width = size.width + "px";
      style.height = size.height + "px";
      if (size.left) {
        style.left = size.left + "px";
      }
      if (size.top) {
        style.top = size.top + "px";
      }
    }
  };
  const handleMouseUp = (e: MouseEvent) => {
    document.removeEventListener("mousemove", handleMove);
    const size = calculateSize(direction, e, { left, right, top, bottom });
    emit("update-position", { ...size, id: props.id });
    nextTick(() => {
      document.removeEventListener("mouseup", handleMouseUp);
    });
  };
  document.addEventListener("mousemove", handleMove);
  document.addEventListener("mouseup", handleMouseUp);
};
const startMove = (e: MouseEvent) => {
  const currentElement = editWrapper.value;
  if (currentElement) {
    const { left, top } = currentElement.getBoundingClientRect();
    gap.x = e.clientX - left;
    gap.y = e.clientY - top;
    const handleMove = (e: MouseEvent) => {
      const { left, top } = calculateMovePosition(e);
      isMoving = true;
      if (currentElement) {
        currentElement.style.top = top + "px";
        currentElement.style.left = left + "px";
      }
    };
    const handleMouseUp = (e: MouseEvent) => {
      document.removeEventListener("mousemove", handleMove);
      if (isMoving) {
        const { left, top } = calculateMovePosition(e);
        emit("update-position", { left, top, id: props.id });
        isMoving = false;
      }
      nextTick(() => {
        document.removeEventListener("mouseup", handleMouseUp);
      });
    };
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleMouseUp);
  }
};
</script>

<template>
  <div
    ref="editWrapper"
    class="edit-wrapper"
    :style="styles"
    @mousedown="startMove"
    @click="onItemClick(id)"
    :class="{ active: active }"
  >
    <slot></slot>
    <div class="resizers">
      <div class="resizer top-left" @mousedown.stop="startResize('top-left')" />
      <div
        class="resizer top-right"
        @mousedown.stop="startResize('top-right')"
      />
      <div
        class="resizer bottom-left"
        @mousedown.stop="startResize('bottom-left')"
      />
      <div
        class="resizer bottom-right"
        @mousedown.stop="startResize('bottom-right')"
      />
    </div>
  </div>
</template>

<style>
.edit-wrapper {
  padding: 0px;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
  box-sizing: content-box !important;
}
.edit-wrapper > * {
  position: static !important;
  height: 100% !important;
  width: 100% !important;
}
.edit-wrapper:hover {
  border: 1px dashed #ccc;
}
.edit-wrapper.hidden {
  display: none;
}
.edit-wrapper.active {
  border: 1px solid #1890ff;
  user-select: none;
  z-index: 1500;
}
.edit-wrapper .resizers {
  display: none;
}
.edit-wrapper.active .resizers {
  display: block;
}
.edit-wrapper.active .resizers .resizer {
  width: 10px;
  height: 10px;
  border-radius: 50%; /*magic to turn square into circle*/
  background: white;
  border: 3px solid #1890ff;
  position: absolute;
  display: block;
}
.edit-wrapper .resizers .resizer.top-left {
  left: -5px;
  top: -5px;
  cursor: nwse-resize; /*resizer cursor*/
}
.edit-wrapper .resizers .resizer.top-right {
  right: -5px;
  top: -5px;
  cursor: nesw-resize;
}
.edit-wrapper .resizers .resizer.bottom-left {
  left: -5px;
  bottom: -5px;
  cursor: nesw-resize;
}
.edit-wrapper .resizers .resizer.bottom-right {
  right: -5px;
  bottom: -5px;
  cursor: nwse-resize;
}
</style>
