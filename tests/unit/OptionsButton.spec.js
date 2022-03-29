import Vuetify from "vuetify";
import Vue from "vue";

import OptionsButton from "@/components/OptionsButton.vue"

import { createLocalVue, mount } from "@vue/test-utils";

describe("OptionsButton.vue", () => {
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    })

    const mountFunction = options => {
        return mount(OptionsButton, {
          localVue,
          vuetify,
          ...options,
        })
      }


    it("shows Options, when v-menu icon is clicked", async () => {
        const wrapper = mountFunction();
        const icon = wrapper.find(".v-icon");

        await icon.trigger("click");

        expect(wrapper.find(".edit").exists()).toBeTruthy();
        expect(wrapper.find(".delete").exists()).toBeTruthy();
    })

    it("emits 'edit-button-clicked', when edit button is clicked", async() =>{
        const wrapper = mountFunction();
        const icon = wrapper.find(".v-icon");
        
        await icon.trigger("click");
        await wrapper.find(".edit").trigger("click");

        expect(wrapper.emitted('edit-button-clicked')).toBeTruthy();
    })

    it("emits 'delete-button-clicked', when delete button is clicked", async() =>{
        const wrapper = mountFunction();
        const icon = wrapper.find(".v-icon");
        
        await icon.trigger("click");
        await wrapper.find(".delete").trigger("click");

        expect(wrapper.emitted('delete-button-clicked')).toBeTruthy();
    })
})



