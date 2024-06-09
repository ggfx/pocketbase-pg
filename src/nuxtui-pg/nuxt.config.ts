// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  runtimeConfig: {
    pbApi: '', // can be overridden by NUXT_PB_API environment variable
    pbUser: '', // can be overridden by NUXT_PB_USER environment variable
    pbPass: '', // can be overridden by NUXT_PB_PASS environment variable
    fdAuthToken: '', // can be overriden by NUXT_FD_AUTH_TOKEN environment variable
    public: {
      pbApi: '', // can be overridden by NUXT_PUBLIC_PB_API environment variable
    }
  }
})