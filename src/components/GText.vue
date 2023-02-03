<script lang="ts">
const defaultProps = transformToComponentProps(textDefaultProps);
</script>

<script lang="ts" setup>
import {
  transformToComponentProps,
  textDefaultProps,
  textStylePropNames,
} from "@/defaultProps";
import useComponentCommon from "@/hooks/useComponentCommon";

const props = defineProps({
  tag: { type: String, default: "div" },
  ...defaultProps,
});

const { styleProps, handleClick } = useComponentCommon(
  props,
  textStylePropNames
);
</script>

<template>
  <component
    :is="tag"
    :style="styleProps"
    class="g-text-component"
    @click="handleClick"
  >
    {{ text }}
  </component>
</template>

<style scoped>
h2.g-text-component,
p.g-text-component {
  margin-bottom: 0;
}
button.g-text-component {
  padding: 5px 10px;
  cursor: pointer;
}
/* .g-text-component {
  box-sizing: border-box;
  white-space: pre-wrap;
  position: relative !important;
} */
</style>
