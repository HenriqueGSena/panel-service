<template>
    <div class="px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div class="bg-[#FCC117] rounded-lg">
            <div class="sm:flex sm:items-center sm:justify-between">
                <div class="sm:flex sm:items-center sm:space-x-5">
                    <div class="shrink-0">
                        <img class="mx-auto size-20 rounded-full" src="../../assets/pine.png" alt="">
                    </div>
                    <div class="flex flex-col items-center sm:items-start">
                        <span class="text-xl font-bold text-gray-900 sm:text-4xl"
                            v-text="$t('lang.dash.cleaning')">
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./dashboard.component.ts"></script>

<style scoped>
</style>