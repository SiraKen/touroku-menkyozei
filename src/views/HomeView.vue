<script setup lang="ts">
import { reactive } from 'vue';
import { information } from '@/data/table';
import { APP_CONFIG } from '@/config/app';

const state = reactive({
  information,
  capital: 0,
  capitalIsLessThanOneBillion: false,
  increaseCapital: 0,
});
</script>

<template>
  <div>
    <div class="container pb-20">
      <div class="mb-5">
        <h1 class="text-3xl font-bold">登録免許税 計算ツール</h1>
        <p class="text-gray-500">以下を入力すると税額が即時反映されます。</p>
        <small class="text-gray-500">* 2023年3月の情報です</small>
      </div>
      <table cellpadding="3" class="mb-5 w-full">
        <tbody>
          <tr>
            <td class="border border-gray-300 p-2">資本金</td>
            <td class="border border-gray-300 p-2">
              <input
                type="number"
                class="w-full text-center outline-none focus:border-blue-500 focus:shadow-md"
                min="0"
                v-model="state.capital"
                autofocus
              />
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">
              資本金の額が1億円以下の会社
            </td>
            <td class="border border-gray-300 p-2 text-center">
              <input
                type="checkbox"
                class="mr-3 scale-150 focus:border-blue-500 focus:shadow-md"
                v-model="state.capitalIsLessThanOneBillion"
              />
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">増資金額</td>
            <td class="border border-gray-300 p-2">
              <input
                type="number"
                class="w-full text-center outline-none focus:border-blue-500 focus:shadow-md"
                min="0"
                v-model="state.increaseCapital"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table cellpadding="3" class="mb-5 w-full">
        <thead>
          <tr>
            <th class="w-1/12">種別</th>
            <th class="w-6/12">内容</th>
            <th class="w-2/12">数量</th>
            <th class="w-3/12">税額</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in state.information" class="border border-gray-300 p-2">
            <td class="border border-gray-300 p-2">{{ d.type }}</td>
            <td class="border border-gray-300 p-2">
              <p class="text-lg">{{ d.title }}</p>
              <small class="text-gray-500">{{ d.description }}</small>
            </td>
            <td class="border border-gray-300 p-2">
              <input
                type="number"
                class="w-full text-right outline-none focus:border-blue-500 focus:shadow-md"
                min="0"
                v-model="d.quantity"
              />
            </td>
            <td class="text-right font-bold">
              {{
                (d.price !== undefined
                  ? d.price * d.quantity
                  : d.title === '株式会社の設立'
                  ? Math.max(Math.floor(state.capital * 0.007), 150000) *
                    d.quantity
                  : d.title === '合同会社の設立'
                  ? Math.max(Math.floor(state.capital * 0.007), 60000) *
                    d.quantity
                  : d.title === '株式会社の資本金の額の増加'
                  ? Math.max(Math.floor(state.increaseCapital * 0.007), 30000) *
                    d.quantity
                  : d.title === '役員の変更'
                  ? (state.capitalIsLessThanOneBillion ? 10000 : 30000) *
                    d.quantity
                  : 0
                ).toLocaleString()
              }}
              円
            </td>
          </tr>
        </tbody>
      </table>
      <div class="rounded border bg-gray-100 p-3 text-gray-800">
        <h2 class="text-lg font-bold">備考</h2>
        <p>※1&nbsp;計算した税額が15万円に満たないときは15万円</p>
        <p>※2&nbsp;計算した税額が6万円に満たないときは6万円</p>
        <p>※3&nbsp;計算した税額が3万円に満たないときは3万円</p>
        <p>※4&nbsp;資本金の額が1億円以下の会社は1万円</p>
      </div>
      <!-- Copyright -->
      <div class="py-3 text-center">
        <small class="text-gray-500">
          &copy; {{ APP_CONFIG.COPYRIGHT.YEAR }}
          <a :href="APP_CONFIG.COPYRIGHT.LINK" target="_blank" rel="noopener">{{
            APP_CONFIG.COPYRIGHT.COMPANY
          }}</a>
        </small>
      </div>
      <!-- Fixed footer -->
      <div
        class="fixed left-0 bottom-0 w-full border-t bg-gray-200/30 p-3 backdrop-blur-lg"
      >
        <div class="text-right font-bold">
          <span>登録免許税 合計</span>
          <span class="ml-2 text-2xl">
            {{
              state.information
                .map((d) => {
                  return d.price !== undefined
                    ? d.price * d.quantity
                    : d.title === '株式会社の設立'
                    ? Math.max(Math.floor(state.capital * 0.007), 150000) *
                      d.quantity
                    : d.title === '合同会社の設立'
                    ? Math.max(Math.floor(state.capital * 0.007), 60000) *
                      d.quantity
                    : d.title === '株式会社の資本金の額の増加'
                    ? Math.max(
                        Math.floor(state.increaseCapital * 0.007),
                        30000
                      ) * d.quantity
                    : d.title === '役員の変更'
                    ? (state.capitalIsLessThanOneBillion ? 10000 : 30000) *
                      d.quantity
                    : 0;
                })
                .reduce((a, b) => a + b, 0)
                .toLocaleString()
            }}
            円
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
