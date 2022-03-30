import Vuetify from "vuetify";
import LoginDialogForm from "@/components/LoginDialogForm.vue"

import { createLocalVue, mount } from "@vue/test-utils";


describe("LoginDialogForm.vue", ()=>{
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(()=>{
        vuetify = new Vuetify();
    });

    const mountFunction = options => {
        return mount(LoginDialogForm, {
            localVue,
            vuetify,
            ...options
        })
    }

    it("emits subtitle-link-clicked when the subtitle link is clicked", async () => {
        const wrapper = mountFunction();
        const subtitleLink = wrapper.find("a");

        await subtitleLink.trigger("click");

        expect(wrapper.emitted('subtitle-link-clicked')).toBeTruthy();
    });

    
})