import Vuetify from "vuetify";
import LoginForm from "@/components/LoginForm.vue"

import { createLocalVue, mount } from "@vue/test-utils";

describe("LoginForm.vue", ()=>{
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(()=>{
        vuetify = new Vuetify();
    });

    const mountFunction = options => {
        return mount(LoginForm, {
            localVue,
            vuetify,
            ...options
        })
    }

    it("renders the Form as Login when isRegister = false", async () => {
        const wrapper = mountFunction({propsData: {
            isRegister: false,
        }});


    })



})