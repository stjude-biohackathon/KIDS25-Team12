import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Login from '@/views/Login.vue'

test('Login.vue should mount', () => {
    const wrapper = mount(Login)
    const spanText = wrapper.find('span.v-btn__content').text()

    const val = Math.sqrt(4)
    expect(val).toBe(2)
    expect(spanText).toBe('Login')
})