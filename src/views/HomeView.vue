<script setup lang="ts">
import { reactive } from 'vue';
import { information } from '@/data/table';

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
      </div>
      <table cellpadding="3" class="mb-5 w-full">
        <tbody>
          <tr>
            <td class="border">資本金</td>
            <td class="border">
              <input
                type="number"
                class="w-full text-center"
                min="0"
                v-model="state.capital"
                autofocus
              />
            </td>
          </tr>
          <tr>
            <td class="border">資本金の額が1億円以下の会社</td>
            <td class="border text-center">
              <input
                type="checkbox"
                class="mr-3 scale-150"
                v-model="state.capitalIsLessThanOneBillion"
              />
            </td>
          </tr>
          <tr>
            <td class="border">増資金額</td>
            <td class="border">
              <input
                type="number"
                class="w-full text-center"
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
          <tr v-for="d in state.information" class="border">
            <td class="border">{{ d.type }}</td>
            <td class="border">{{ d.title }}</td>
            <td class="border">
              <input
                type="number"
                class="w-full text-right"
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
      <div
        class="fixed left-0 bottom-0 w-full border-t border-gray-200/30 bg-gray-200/30 p-3 backdrop-blur-lg"
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
