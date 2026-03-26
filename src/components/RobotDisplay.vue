<script setup lang="ts">
  import { computed } from 'vue'
  import { useGameStore } from '@/stores/GameStore'
  import { DYNAMIC_IMAGES } from '@/constants/dynamicImages'

  const gameStore = useGameStore()

  const robotImage = computed(() => {
    if (!gameStore.gameState) return DYNAMIC_IMAGES.ROBOT.DEFAULT

    return gameStore.gameState.isHitting
      ? DYNAMIC_IMAGES.ROBOT.LOOSER
      : DYNAMIC_IMAGES.ROBOT.DEFAULT
  })
</script>

<template>
  <div class="control__robot">
    <p>{{ robotImage }}</p>
    <p>{{ gameStore.gameState }}</p>
    <img
      v-if="gameStore.gameState.isWinner"
      class="control__robot-image"
      :src="DYNAMIC_IMAGES.ROBOT.WINNER"
      alt="Робот"
    />
    <img v-else class="control__robot-image" :src="robotImage" alt="Робот" />
  </div>
</template>

<style scoped>
  .control__robot {
    display: flex;
  }

  .control__robot-image {
    margin-top: auto;
    width: 100%;
  }
</style>
