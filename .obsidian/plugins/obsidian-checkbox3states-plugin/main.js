/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ThirdState
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  touchduration: 300,
  baseColor: "#ff930a",
  hoverColor: "#c77a0f"
};
var timer;
var longTouchDone = false;
var ThirdState = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.onlongtouch = function(checkbox) {
      longTouchDone = true;
      if (checkbox.dataset.task !== "/") {
        checkbox.dataset.task = "/";
        Object(checkbox.closest(".HyperMD-list-line")).dataset.task = "/";
        "/";
      } else {
        checkbox.dataset.task = " ";
        Object(checkbox.closest(".HyperMD-list-line")).dataset.task = " ";
      }
      new import_obsidian.Notice("Third state checkbox toggled!");
    };
    this.onCheckBoxChange = function(checkbox) {
      if (checkbox.dataset.task !== "/") {
        checkbox.dataset.task = "/";
        Object(checkbox.closest(".HyperMD-list-line")).dataset.task = "/";
      } else {
        checkbox.dataset.task = " ";
        Object(checkbox.closest(".HyperMD-list-line")).dataset.task = " ";
      }
    };
  }
  async onload() {
    await this.loadSettings();
    this.addStyle();
    this.addSettingTab(new SampleSettingTab(this.app, this));
    this.registerDomEvent(document, "click", (evt) => {
      const checkbox = Object(evt.target);
      if (evt.shiftKey && checkbox.className === "task-list-item-checkbox") {
        evt.preventDefault();
        this.onCheckBoxChange(checkbox);
      }
    });
    this.registerDomEvent(document, "touchstart", (evt) => {
      const checkbox = Object(evt.target);
      if (checkbox.className === "task-list-item-checkbox") {
        timer = setTimeout(this.onlongtouch, this.settings.touchduration, checkbox);
      }
    }, { passive: false });
    this.registerDomEvent(document, "touchend", (evt) => {
      const checkbox = Object(evt.target);
      if (checkbox.className === "task-list-item-checkbox") {
        if (timer)
          clearTimeout(timer);
        if (longTouchDone) {
          evt.preventDefault();
          longTouchDone = false;
          return;
        }
      }
    });
  }
  onunload() {
    this.removeStyle();
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
    this.updateStyle();
  }
  addStyle() {
    const css = document.createElement("style");
    css.id = "checkbox-3-state";
    document.getElementsByTagName("head")[0].appendChild(css);
    this.updateStyle();
  }
  updateStyle() {
    const el = document.getElementById("checkbox-3-state");
    if (!el)
      throw "checkbox-3-state element not found!";
    else {
      el.innerText = ":root {--checkbox-3-state: " + this.settings.baseColor + ";--checkbox-3-state-accent: " + this.settings.hoverColor + ";--checkbox-marker-mid-color: var(--checkbox-3-state);--checkbox-marker-mid-color-hover: var(--checkbox-3-state-accent);}";
    }
  }
  removeStyle() {
    const element = document.getElementById("checkbox-3-state");
    if (element) {
      element.remove();
    }
  }
};
var SampleSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", {
      text: "Checkbox 3 states plugin - Settings"
    });
    new import_obsidian.Setting(containerEl).setName("About \u{1F44B}").setDesc("This plugin allows you to have a third state on the checkboxes of the task list. Do a [SHIFT]+[CLICK] on a checkbox to set this third state (not fully done). It adds a `/` instead of an `x` as a value. You can customize the colors below. Enjoy!");
    const baseColorCustomization = new import_obsidian.Setting(containerEl).setName("Third state base color").setDesc("The color of the checkbox Default value: " + DEFAULT_SETTINGS.baseColor);
    const baseColorPicker = new import_obsidian.ColorComponent(baseColorCustomization.controlEl).setValue(this.plugin.settings.baseColor).onChange(async (value) => {
      this.plugin.settings.baseColor = value;
      baseTextValue.setValue(value);
      await this.plugin.saveSettings();
      this.plugin.loadSettings();
    });
    const baseTextValue = new import_obsidian.TextComponent(baseColorCustomization.controlEl).setPlaceholder("Hexa value").setValue(this.plugin.settings.baseColor).onChange(async (value) => {
      this.plugin.settings.baseColor = value;
      baseColorPicker.setValue(value);
      await this.plugin.saveSettings();
    });
    baseColorCustomization.addButton((bt) => {
      bt.setButtonText("Default").onClick(async () => {
        this.plugin.settings.baseColor = DEFAULT_SETTINGS.baseColor;
        baseColorPicker.setValue(DEFAULT_SETTINGS.baseColor);
        baseTextValue.setValue(DEFAULT_SETTINGS.baseColor);
        await this.plugin.saveSettings();
        this.plugin.loadSettings();
      });
    });
    baseColorCustomization.components.push(baseColorPicker, baseTextValue);
    const hoverColorCustomization = new import_obsidian.Setting(containerEl).setName("Third state hover color").setDesc("The color of the checkbox when your cursor is over. Default value: " + DEFAULT_SETTINGS.hoverColor);
    const hoverColorPicker = new import_obsidian.ColorComponent(hoverColorCustomization.controlEl).setValue(this.plugin.settings.hoverColor).onChange(async (value) => {
      this.plugin.settings.hoverColor = value;
      hoverTextValue.setValue(value);
      await this.plugin.saveSettings();
      this.plugin.loadSettings();
    });
    const hoverTextValue = new import_obsidian.TextComponent(hoverColorCustomization.controlEl).setPlaceholder("Hexa value").setValue(this.plugin.settings.hoverColor).onChange(async (value) => {
      this.plugin.settings.hoverColor = value;
      hoverColorPicker.setValue(value);
      await this.plugin.saveSettings();
    });
    hoverColorCustomization.addButton((bt) => {
      bt.setButtonText("Default").onClick(async () => {
        this.plugin.settings.hoverColor = DEFAULT_SETTINGS.hoverColor;
        hoverColorPicker.setValue(DEFAULT_SETTINGS.hoverColor);
        hoverTextValue.setValue(DEFAULT_SETTINGS.hoverColor);
        await this.plugin.saveSettings();
        this.plugin.loadSettings();
      });
    });
    hoverColorCustomization.components.push(hoverColorPicker, hoverTextValue);
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHtcblx0QXBwLFxuXHRDb2xvckNvbXBvbmVudCxcblx0Tm90aWNlLFxuXHRQbHVnaW4sXG5cdFBsdWdpblNldHRpbmdUYWIsXG5cdFNldHRpbmcsXG5cdFRleHRDb21wb25lbnQsXG59IGZyb20gXCJvYnNpZGlhblwiO1xuXG4vLyBSZW1lbWJlciB0byByZW5hbWUgdGhlc2UgY2xhc3NlcyBhbmQgaW50ZXJmYWNlcyFcblxuaW50ZXJmYWNlIFRoaXJkU3RhdGVTZXR0aW5ncyB7XG5cdHRvdWNoZHVyYXRpb246IG51bWJlcjtcblx0YmFzZUNvbG9yOiBzdHJpbmc7XG5cdGhvdmVyQ29sb3I6IHN0cmluZztcbn1cblxuY29uc3QgREVGQVVMVF9TRVRUSU5HUzogVGhpcmRTdGF0ZVNldHRpbmdzID0ge1xuXHQvLyB0b3VjaCBkdXJhdGlvbiBiZWZvcmUgdGhpcmQgY2hlY2svdW5jaGVja1xuXHR0b3VjaGR1cmF0aW9uOiAzMDAsXG5cdGJhc2VDb2xvcjogXCIjZmY5MzBhXCIsXG5cdGhvdmVyQ29sb3I6IFwiI2M3N2EwZlwiLFxufTtcblxuLy8gdGltZXIgdmFyXG5sZXQgdGltZXI6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+O1xubGV0IGxvbmdUb3VjaERvbmUgPSBmYWxzZTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhpcmRTdGF0ZSBleHRlbmRzIFBsdWdpbiB7XG5cdHNldHRpbmdzOiBUaGlyZFN0YXRlU2V0dGluZ3M7XG5cblx0Ly8gV2hhdCB0byBkbyBvbkxvYWQgUGx1Z2luXG5cdGFzeW5jIG9ubG9hZCgpIHtcblx0XHRhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xuXG5cdFx0Ly8gdGhpcyBhZGQgc3R5bGUgaHRtbCBlbGVtZW50IHRvIGhhbmRsZSBzdHlsZXMgdmFyc1xuXHRcdHRoaXMuYWRkU3R5bGUoKTtcblxuXHRcdC8vIFRoaXMgYWRkcyBhIHNldHRpbmdzIHRhYiBzbyB0aGUgdXNlciBjYW4gY29uZmlndXJlIHZhcmlvdXMgYXNwZWN0cyBvZiB0aGUgcGx1Z2luXG5cdFx0dGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBTYW1wbGVTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG5cblx0XHQvLyBJZiB0aGUgcGx1Z2luIGhvb2tzIHVwIGFueSBnbG9iYWwgRE9NIGV2ZW50cyAob24gcGFydHMgb2YgdGhlIGFwcCB0aGF0IGRvZXNuJ3QgYmVsb25nIHRvIHRoaXMgcGx1Z2luKVxuXHRcdC8vIFVzaW5nIHRoaXMgZnVuY3Rpb24gd2lsbCBhdXRvbWF0aWNhbGx5IHJlbW92ZSB0aGUgZXZlbnQgbGlzdGVuZXIgd2hlbiB0aGlzIHBsdWdpbiBpcyBkaXNhYmxlZC5cblx0XHQvLyBNb3VzZSBldmVudFxuXHRcdHRoaXMucmVnaXN0ZXJEb21FdmVudChkb2N1bWVudCwgXCJjbGlja1wiLCAoZXZ0OiBNb3VzZUV2ZW50KSA9PiB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhldnQpO1xuXG5cdFx0XHRjb25zdCBjaGVja2JveCA9IE9iamVjdChldnQudGFyZ2V0KTtcblx0XHRcdGlmIChcblx0XHRcdFx0ZXZ0LnNoaWZ0S2V5ICYmXG5cdFx0XHRcdGNoZWNrYm94LmNsYXNzTmFtZSA9PT0gXCJ0YXNrLWxpc3QtaXRlbS1jaGVja2JveFwiXG5cdFx0XHQpIHtcblx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdHRoaXMub25DaGVja0JveENoYW5nZShjaGVja2JveCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBUb3VjaCBTdGFydCBFdmVudFxuXHRcdHRoaXMucmVnaXN0ZXJEb21FdmVudChcblx0XHRcdGRvY3VtZW50LFxuXHRcdFx0XCJ0b3VjaHN0YXJ0XCIsXG5cdFx0XHQoZXZ0OiBUb3VjaEV2ZW50KSA9PiB7XG5cdFx0XHRcdGNvbnN0IGNoZWNrYm94ID0gT2JqZWN0KGV2dC50YXJnZXQpO1xuXHRcdFx0XHRpZiAoY2hlY2tib3guY2xhc3NOYW1lID09PSBcInRhc2stbGlzdC1pdGVtLWNoZWNrYm94XCIpIHtcblx0XHRcdFx0XHR0aW1lciA9IHNldFRpbWVvdXQoXG5cdFx0XHRcdFx0XHR0aGlzLm9ubG9uZ3RvdWNoLFxuXHRcdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy50b3VjaGR1cmF0aW9uLFxuXHRcdFx0XHRcdFx0Y2hlY2tib3hcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0eyBwYXNzaXZlOiBmYWxzZSB9XG5cdFx0KTtcblxuXHRcdC8vIFRvdWNoIEVuZCBFdmVudFxuXHRcdHRoaXMucmVnaXN0ZXJEb21FdmVudChkb2N1bWVudCwgXCJ0b3VjaGVuZFwiLCAoZXZ0OiBUb3VjaEV2ZW50KSA9PiB7XG5cdFx0XHRjb25zdCBjaGVja2JveCA9IE9iamVjdChldnQudGFyZ2V0KTtcblx0XHRcdGlmIChjaGVja2JveC5jbGFzc05hbWUgPT09IFwidGFzay1saXN0LWl0ZW0tY2hlY2tib3hcIikge1xuXHRcdFx0XHRpZiAodGltZXIpIGNsZWFyVGltZW91dCh0aW1lcik7IC8vIGNsZWFyVGltZW91dCwgbm90IGNsZWFydGltZW91dC4uXG5cdFx0XHRcdGlmIChsb25nVG91Y2hEb25lKSB7XG5cdFx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0bG9uZ1RvdWNoRG9uZSA9IGZhbHNlO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIERpc3BhdGNoZWQgZnVuY3Rpb24gd2l0aCB0aW1lciBvbkxvbmdUb3VjaC4gRHVyYXRpb24gc2VlIGB0b3VjaGR1cmF0aW9uYFxuXHQgKiBAcGFyYW0gY2hlY2tib3hcblx0ICovXG5cdG9ubG9uZ3RvdWNoID0gZnVuY3Rpb24gKGNoZWNrYm94OiBIVE1MRWxlbWVudCkge1xuXHRcdGxvbmdUb3VjaERvbmUgPSB0cnVlO1xuXHRcdGlmIChjaGVja2JveC5kYXRhc2V0LnRhc2sgIT09IFwiL1wiKSB7XG5cdFx0XHRjaGVja2JveC5kYXRhc2V0LnRhc2sgPSBcIi9cIjtcblx0XHRcdE9iamVjdChjaGVja2JveC5jbG9zZXN0KFwiLkh5cGVyTUQtbGlzdC1saW5lXCIpKS5kYXRhc2V0LnRhc2sgPSBcIi9cIjtcblx0XHRcdChcIi9cIik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNoZWNrYm94LmRhdGFzZXQudGFzayA9IFwiIFwiO1xuXHRcdFx0T2JqZWN0KGNoZWNrYm94LmNsb3Nlc3QoXCIuSHlwZXJNRC1saXN0LWxpbmVcIikpLmRhdGFzZXQudGFzayA9IFwiIFwiO1xuXHRcdH1cblx0XHRuZXcgTm90aWNlKFwiVGhpcmQgc3RhdGUgY2hlY2tib3ggdG9nZ2xlZCFcIik7XG5cdH07XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBjaGVja2JveCBpbnRlcmFjdGlvblxuXHQgKiBAcGFyYW0gY2hlY2tib3hcblx0ICovXG5cdG9uQ2hlY2tCb3hDaGFuZ2UgPSBmdW5jdGlvbiAoY2hlY2tib3g6IEhUTUxFbGVtZW50KSB7XG5cdFx0aWYgKGNoZWNrYm94LmRhdGFzZXQudGFzayAhPT0gXCIvXCIpIHtcblx0XHRcdGNoZWNrYm94LmRhdGFzZXQudGFzayA9IFwiL1wiO1xuXHRcdFx0T2JqZWN0KGNoZWNrYm94LmNsb3Nlc3QoXCIuSHlwZXJNRC1saXN0LWxpbmVcIikpLmRhdGFzZXQudGFzayA9IFwiL1wiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjaGVja2JveC5kYXRhc2V0LnRhc2sgPSBcIiBcIjtcblx0XHRcdE9iamVjdChjaGVja2JveC5jbG9zZXN0KFwiLkh5cGVyTUQtbGlzdC1saW5lXCIpKS5kYXRhc2V0LnRhc2sgPSBcIiBcIjtcblx0XHR9XG5cdH07XG5cblx0Ly8gV2hhdCB0byBkbyBvblVuTG9hZCBQbHVnaW5cblx0b251bmxvYWQoKSB7XG5cdFx0dGhpcy5yZW1vdmVTdHlsZSgpO1xuXHR9XG5cblx0YXN5bmMgbG9hZFNldHRpbmdzKCkge1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKFxuXHRcdFx0e30sXG5cdFx0XHRERUZBVUxUX1NFVFRJTkdTLFxuXHRcdFx0YXdhaXQgdGhpcy5sb2FkRGF0YSgpXG5cdFx0KTtcblx0fVxuXG5cdGFzeW5jIHNhdmVTZXR0aW5ncygpIHtcblx0XHRhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuXHRcdHRoaXMudXBkYXRlU3R5bGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgc3R5bGUgaHRtbCBlbGVtZW50IHRvIGhhbmRsZSBzdHlsZXMgdmFyc1xuXHQgKi9cblx0YWRkU3R5bGUoKSB7XG5cdFx0Ly8gYWRkIGEgY3NzIGJsb2NrIGZvciBvdXIgc2V0dGluZ3MtZGVwZW5kZW50IHN0eWxlc1xuXHRcdGNvbnN0IGNzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblx0XHRjc3MuaWQgPSBcImNoZWNrYm94LTMtc3RhdGVcIjtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoY3NzKTtcblxuXHRcdC8vIHVwZGF0ZSB0aGUgc3R5bGUgd2l0aCB0aGUgc2V0dGluZ3MtZGVwZW5kZW50IHN0eWxlc1xuXHRcdHRoaXMudXBkYXRlU3R5bGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGRlIHN0eWxlIHRvIGJlIHN0b3JlIGluIGhlYWRlci5cblx0ICogVHJpZ2dlciBieSBgYWRkU3R5bGVgIHdoZW4gcGx1Z2luIGxvYWRpbmdcblx0ICogVHJpZ2dlciBieSB0aGUgY2hhbmdpbmcgb2YgY29uZmlndXJhdGlvblxuXHQgKi9cblx0dXBkYXRlU3R5bGUoKSB7XG5cdFx0Ly8gZ2V0IHRoZSBjdXN0b20gY3NzIGVsZW1lbnRcblx0XHRjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hlY2tib3gtMy1zdGF0ZVwiKTtcblx0XHRpZiAoIWVsKSB0aHJvdyBcImNoZWNrYm94LTMtc3RhdGUgZWxlbWVudCBub3QgZm91bmQhXCI7XG5cdFx0ZWxzZSB7XG5cdFx0XHQvLyBzZXQgdGhlIHNldHRpbmdzLWRlcGVuZGVudCBjc3Ncblx0XHRcdGVsLmlubmVyVGV4dCA9XG5cdFx0XHRcdFwiOnJvb3Qge1wiICtcblx0XHRcdFx0XCItLWNoZWNrYm94LTMtc3RhdGU6IFwiICtcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5iYXNlQ29sb3IgK1xuXHRcdFx0XHRcIjtcIiArXG5cdFx0XHRcdFwiLS1jaGVja2JveC0zLXN0YXRlLWFjY2VudDogXCIgK1xuXHRcdFx0XHR0aGlzLnNldHRpbmdzLmhvdmVyQ29sb3IgK1xuXHRcdFx0XHRcIjtcIiArXG5cdFx0XHRcdFwiLS1jaGVja2JveC1tYXJrZXItbWlkLWNvbG9yOiB2YXIoLS1jaGVja2JveC0zLXN0YXRlKTtcIiArXG5cdFx0XHRcdFwiLS1jaGVja2JveC1tYXJrZXItbWlkLWNvbG9yLWhvdmVyOiB2YXIoLS1jaGVja2JveC0zLXN0YXRlLWFjY2VudCk7XCIgK1xuXHRcdFx0XHRcIn1cIjtcblx0XHR9XG5cdH1cblxuXHQvLyBDbGVhbiBodG1sIGhlYWQgb24gdW5sb2FkIG9mIHBsdWdpblxuXHRyZW1vdmVTdHlsZSgpIHtcblx0XHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGVja2JveC0zLXN0YXRlXCIpO1xuXHRcdGlmIChlbGVtZW50KSB7XG5cdFx0XHRlbGVtZW50LnJlbW92ZSgpO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gb2Ygc2V0dGluZ3MgcGFuXG4gKi9cbmNsYXNzIFNhbXBsZVNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcblx0cGx1Z2luOiBUaGlyZFN0YXRlO1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IFRoaXJkU3RhdGUpIHtcblx0XHRzdXBlcihhcHAsIHBsdWdpbik7XG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XG5cdH1cblxuXHRkaXNwbGF5KCk6IHZvaWQge1xuXHRcdGNvbnN0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG5cblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xuXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7XG5cdFx0XHR0ZXh0OiBcIkNoZWNrYm94IDMgc3RhdGVzIHBsdWdpbiAtIFNldHRpbmdzXCIsXG5cdFx0fSk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKFwiQWJvdXQgXHVEODNEXHVEQzRCXCIpXG5cdFx0XHQuc2V0RGVzYyhcblx0XHRcdFx0XCJUaGlzIHBsdWdpbiBhbGxvd3MgeW91IHRvIGhhdmUgYSB0aGlyZCBzdGF0ZSBvbiB0aGUgY2hlY2tib3hlcyBvZiB0aGUgdGFzayBsaXN0LiBEbyBhIFtTSElGVF0rW0NMSUNLXSBvbiBhIGNoZWNrYm94IHRvIHNldCB0aGlzIHRoaXJkIHN0YXRlIChub3QgZnVsbHkgZG9uZSkuIEl0IGFkZHMgYSBgL2AgaW5zdGVhZCBvZiBhbiBgeGAgYXMgYSB2YWx1ZS4gWW91IGNhbiBjdXN0b21pemUgdGhlIGNvbG9ycyBiZWxvdy4gRW5qb3khXCJcblx0XHRcdCk7XG5cdFx0Y29uc3QgYmFzZUNvbG9yQ3VzdG9taXphdGlvbiA9IG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoXCJUaGlyZCBzdGF0ZSBiYXNlIGNvbG9yXCIpXG5cdFx0XHQuc2V0RGVzYyhcblx0XHRcdFx0XCJUaGUgY29sb3Igb2YgdGhlIGNoZWNrYm94IERlZmF1bHQgdmFsdWU6IFwiICtcblx0XHRcdFx0XHRERUZBVUxUX1NFVFRJTkdTLmJhc2VDb2xvclxuXHRcdFx0KTtcblx0XHRjb25zdCBiYXNlQ29sb3JQaWNrZXIgPSBuZXcgQ29sb3JDb21wb25lbnQoXG5cdFx0XHRiYXNlQ29sb3JDdXN0b21pemF0aW9uLmNvbnRyb2xFbFxuXHRcdClcblx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5iYXNlQ29sb3IpXG5cdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmJhc2VDb2xvciA9IHZhbHVlO1xuXHRcdFx0XHRiYXNlVGV4dFZhbHVlLnNldFZhbHVlKHZhbHVlKTtcblx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdHRoaXMucGx1Z2luLmxvYWRTZXR0aW5ncygpO1xuXHRcdFx0fSk7XG5cdFx0Y29uc3QgYmFzZVRleHRWYWx1ZSA9IG5ldyBUZXh0Q29tcG9uZW50KFxuXHRcdFx0YmFzZUNvbG9yQ3VzdG9taXphdGlvbi5jb250cm9sRWxcblx0XHQpXG5cdFx0XHQuc2V0UGxhY2Vob2xkZXIoXCJIZXhhIHZhbHVlXCIpXG5cdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYmFzZUNvbG9yKVxuXHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5iYXNlQ29sb3IgPSB2YWx1ZTtcblx0XHRcdFx0YmFzZUNvbG9yUGlja2VyLnNldFZhbHVlKHZhbHVlKTtcblx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHR9KTtcblx0XHRiYXNlQ29sb3JDdXN0b21pemF0aW9uLmFkZEJ1dHRvbigoYnQpID0+IHtcblx0XHRcdGJ0LnNldEJ1dHRvblRleHQoXCJEZWZhdWx0XCIpLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5iYXNlQ29sb3IgPSBERUZBVUxUX1NFVFRJTkdTLmJhc2VDb2xvcjtcblx0XHRcdFx0YmFzZUNvbG9yUGlja2VyLnNldFZhbHVlKERFRkFVTFRfU0VUVElOR1MuYmFzZUNvbG9yKTtcblx0XHRcdFx0YmFzZVRleHRWYWx1ZS5zZXRWYWx1ZShERUZBVUxUX1NFVFRJTkdTLmJhc2VDb2xvcik7XG5cdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHR0aGlzLnBsdWdpbi5sb2FkU2V0dGluZ3MoKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0YmFzZUNvbG9yQ3VzdG9taXphdGlvbi5jb21wb25lbnRzLnB1c2goYmFzZUNvbG9yUGlja2VyLCBiYXNlVGV4dFZhbHVlKTtcblxuXHRcdGNvbnN0IGhvdmVyQ29sb3JDdXN0b21pemF0aW9uID0gbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZShcIlRoaXJkIHN0YXRlIGhvdmVyIGNvbG9yXCIpXG5cdFx0XHQuc2V0RGVzYyhcblx0XHRcdFx0XCJUaGUgY29sb3Igb2YgdGhlIGNoZWNrYm94IHdoZW4geW91ciBjdXJzb3IgaXMgb3Zlci4gRGVmYXVsdCB2YWx1ZTogXCIgK1xuXHRcdFx0XHRcdERFRkFVTFRfU0VUVElOR1MuaG92ZXJDb2xvclxuXHRcdFx0KTtcblx0XHRjb25zdCBob3ZlckNvbG9yUGlja2VyID0gbmV3IENvbG9yQ29tcG9uZW50KFxuXHRcdFx0aG92ZXJDb2xvckN1c3RvbWl6YXRpb24uY29udHJvbEVsXG5cdFx0KVxuXHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmhvdmVyQ29sb3IpXG5cdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmhvdmVyQ29sb3IgPSB2YWx1ZTtcblx0XHRcdFx0aG92ZXJUZXh0VmFsdWUuc2V0VmFsdWUodmFsdWUpO1xuXHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0dGhpcy5wbHVnaW4ubG9hZFNldHRpbmdzKCk7XG5cdFx0XHR9KTtcblx0XHRjb25zdCBob3ZlclRleHRWYWx1ZSA9IG5ldyBUZXh0Q29tcG9uZW50KFxuXHRcdFx0aG92ZXJDb2xvckN1c3RvbWl6YXRpb24uY29udHJvbEVsXG5cdFx0KVxuXHRcdFx0LnNldFBsYWNlaG9sZGVyKFwiSGV4YSB2YWx1ZVwiKVxuXHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmhvdmVyQ29sb3IpXG5cdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmhvdmVyQ29sb3IgPSB2YWx1ZTtcblx0XHRcdFx0aG92ZXJDb2xvclBpY2tlci5zZXRWYWx1ZSh2YWx1ZSk7XG5cdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0fSk7XG5cdFx0aG92ZXJDb2xvckN1c3RvbWl6YXRpb24uYWRkQnV0dG9uKChidCkgPT4ge1xuXHRcdFx0YnQuc2V0QnV0dG9uVGV4dChcIkRlZmF1bHRcIikub25DbGljayhhc3luYyAoKSA9PiB7XG5cdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmhvdmVyQ29sb3IgPSBERUZBVUxUX1NFVFRJTkdTLmhvdmVyQ29sb3I7XG5cdFx0XHRcdGhvdmVyQ29sb3JQaWNrZXIuc2V0VmFsdWUoREVGQVVMVF9TRVRUSU5HUy5ob3ZlckNvbG9yKTtcblx0XHRcdFx0aG92ZXJUZXh0VmFsdWUuc2V0VmFsdWUoREVGQVVMVF9TRVRUSU5HUy5ob3ZlckNvbG9yKTtcblx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdHRoaXMucGx1Z2luLmxvYWRTZXR0aW5ncygpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRob3ZlckNvbG9yQ3VzdG9taXphdGlvbi5jb21wb25lbnRzLnB1c2goXG5cdFx0XHRob3ZlckNvbG9yUGlja2VyLFxuXHRcdFx0aG92ZXJUZXh0VmFsdWVcblx0XHQpO1xuXHR9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBUU87QUFVUCxJQUFNLG1CQUF1QztBQUFBLEVBRTVDLGVBQWU7QUFB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
