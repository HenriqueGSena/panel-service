<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="mt-4 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300 bg-gray-50">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        class="py-4 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-6">
                                        <span v-text="$t('lang.table.client')"></span>
                                    </th>
                                    <th scope="col" class="px-3 py-4 text-left font-semibold text-gray-900">
                                        <span v-text="$t('lang.table.portal')"></span>
                                    </th>
                                    <th scope="col" class="px-3 py-4 text-left font-semibold text-gray-900">
                                        <span v-text="$t('lang.table.namePortal')"></span>
                                    </th>
                                    <th scope="col" class="px-3 py-4 text-left font-semibold text-gray-900">
                                        <span v-text="$t('lang.table.checkin')"></span>
                                    </th>
                                    <th scope="col" class="px-3 py-4 text-left font-semibold text-gray-900">
                                        <span v-text="$t('lang.table.checkout')"></span>
                                    </th>
                                    <th scope="col" class="px-3 py-4 text-left font-semibold text-gray-900">
                                        <span v-text="$t('lang.table.CodAcc')"></span>
                                    </th>
                                    <th scope="col" class="px-3 py-4 text-left font-semibold text-gray-900">
                                        <span v-text="$t('lang.table.checkOnline')"></span>
                                    </th>
                                    <th scope="col" class="px-3 py-4 text-left font-semibold text-gray-900">
                                        <span v-text="$t('lang.table.arrivalInfo')"></span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-300 bg-white">
                                <tr v-for="service in paginatedServices" :key="service.id">
                                    <td class="whitespace-nowrap py-4 pl-4 font-semibold text-gray-900">
                                        {{ service.fullName }}
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-gray-900">
                                        {{ service.codportal }}
                                    </td>
                                    <td class="whitespace-nowrap px-10 py-4 text-center text-gray-900">
                                        <img :src="getIconForPortal(service.nomeportal)" alt="Ícone do portal"
                                            class="w-6 h-6" />
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-gray-900">
                                        {{ formatDate(service.checkin) }}
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-gray-900">
                                        {{ formatDate(service.checkout) }}
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-gray-900">
                                        {{ service.nomeacomodacao }}
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4">
                                        <span :class="service.checkinOnline
                                            ? 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'
                                            : 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium'">
                                            {{ service.checkinOnline ? 'Realizado' : 'Não Realizado' }}
                                        </span>
                                    </td>
                                    <td class="whitespace-nowrap px-10 py-4 text-gray-900">
                                        {{ service.arrivalInfo }}
                                    </td>
                                    <td class="whitespace-nowrap py-4 text-gray-900">
                                        {{ translateService(service.statusService) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex justify-center items-center mt-2">
                        <div class="inline-flex bg-gray-50 rounded-md px-4 py-2">
                            <span>{{ $t('lang.table.page') }} {{ currentPage }} {{ $t('lang.table.de') }} {{ totalPages
                                }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./table.component.ts"></script>

<style scoped>
</style>