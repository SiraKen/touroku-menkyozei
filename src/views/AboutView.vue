<script setup lang="ts">
import { information } from '@/data/table';
</script>

<template>
  <div>
    <div class="container pb-10">
      <div class="mb-5">
        <h1 class="text-3xl font-bold">内訳表</h1>
        <p class="text-gray-500">2023年3月の情報です</p>
      </div>
      <table class="w-full">
        <thead>
          <tr>
            <th>種別</th>
            <th>内容</th>
            <th>税</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in information" class="border">
            <td class="border">{{ d.type }}</td>
            <td class="border">{{ d.title }}</td>
            <td class="border">{{ d.description }}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <p>※1&nbsp;計算した税額が15万円に満たないときは15万円</p>
        <p>※2&nbsp;計算した税額が6万円に満たないときは6万円</p>
        <p>※3&nbsp;計算した税額が3万円に満たないときは3万円</p>
        <p>※4&nbsp;資本金の額が1億円以下の会社は1万円</p>
      </div>
    </div>
  </div>
</template>

<style></style>
