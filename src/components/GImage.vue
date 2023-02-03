<script lang="ts">
const defaultProps = transformToComponentProps(imageDefaultProps);
</script>

<script lang="ts" setup>
import useComponentCommon from "@/hooks/useComponentCommon";
import {
  transformToComponentProps,
  imageDefaultProps,
  imageStylePropNames,
} from "@/defaultProps";

const props = defineProps({
  ...defaultProps,
});

const { styleProps, handleClick } = useComponentCommon(
  props,
  imageStylePropNames
);
</script>

<template>
  <img
    :style="styleProps"
    class="g-image-component"
    @click.prevent="handleClick"
    :src="src"
  />
</template>

<style></style>
