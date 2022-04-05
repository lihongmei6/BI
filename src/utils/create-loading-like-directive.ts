import { createApp } from "vue";
import { addClass, removeClass } from "@/utils/dom";

const relativeCls = "g-relative";

export default function createLoadingLikeDirective(Comp: any) {
  return {
    mounted(el: HTMLElement, binding: any) {
      const app = createApp(Comp);
      const instance = app.mount(document.createElement("div"));
      const name = Comp.name;
      if (!el[name]) {
        el[name] = {};
      }
      el.style.position = "relative";
      el[name].instance = instance;
      if (binding.value) {
        append(el);
      }
    },
    updated(el: HTMLElement, binding: any) {
      const title = binding.arg;
      const name = Comp.name;
      if (!el[name]) {
        el[name] = {};
      }
      if (typeof title !== "undefined") {
        el[name].instance.setTitle(title);
      }
      if (!!binding.value !== !!binding.oldValue) {
        binding.value ? append(el) : remove(el);
      }
    },
  };
  function append(el: HTMLElement) {
    const style = getComputedStyle(el);
    const name = Comp.name;
    if (["absolute", "fixed", "relative"].indexOf(style.position) === -1) {
      addClass(el, relativeCls);
    }
    el.appendChild(el[name].instance.$el);
  }
  function remove(el: HTMLElement) {
    const name = Comp.name;
    removeClass(el, relativeCls);
    try {
      el.removeChild(el[name].instance.$el);
    } catch (error) {
      console.log(error);
    }
  }
}
