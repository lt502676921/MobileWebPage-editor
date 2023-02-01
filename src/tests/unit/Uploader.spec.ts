import { describe, beforeAll, test, expect, vi } from "vitest";
import { flushPromises, shallowMount, type VueWrapper } from "@vue/test-utils";
import axios from "axios";
import Uploader from "@/components/Uploader.vue";

vi.mock("axios");
const mockedAxios = axios;
let wrapper: VueWrapper<any>;
const testFile = new File(["xyz"], "test.png", { type: "image/png" });

describe("Uploader component", () => {
  beforeAll(() => {
    wrapper = shallowMount(Uploader, {
      props: {
        action: "test.url",
      },
    });
  });
  test("basic layout before uploading", () => {
    expect(wrapper.find("button").exists()).toBeTruthy();
    expect(wrapper.get("button span").text()).toBe("点击上传");
    expect(wrapper.get("input").isVisible()).toBeFalsy();
  });
  test("upload process should works fine", async () => {
    // change e.target.files
    // create a file
    mockedAxios.post.mockResolvedValueOnce({ status: "success" });
    const fileInput = wrapper.get("input").element as HTMLInputElement;
    const files = [testFile] as any;
    Object.defineProperty(fileInput, "files", {
      value: files,
      writable: false,
    });
    await wrapper.get("input").trigger("change");
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(wrapper.get("button span").text()).toBe("正在上传");
    await flushPromises();
    expect(wrapper.get("button span").text()).toBe("上传成功");
    // fileInput.files = files;
  });
  test("should return error text when post is rejected", async () => {
    mockedAxios.post.mockRejectedValueOnce({ error: "error" });
    await wrapper.get("input").trigger("change");
    expect(mockedAxios.post).toHaveBeenCalledTimes(2);
    expect(wrapper.get("button span").text()).toBe("正在上传");
    await flushPromises();
    expect(wrapper.get("button span").text()).toBe("上传失败");
  });
});
