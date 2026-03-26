<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import gsap from 'gsap'

  const scaleMeter = ref<HTMLElement | null>(null)
  let animation: gsap.core.Tween | null = null

  const startFillAnimation = () => {
    if (!scaleMeter.value) return null

    animation = gsap.to(scaleMeter.value, {
      height: '100%',
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      onRepeat: () => {
        if (scaleMeter.value) {
          gsap.to(scaleMeter.value, {
            scaleX: 1.02,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
          })
        }
      },
    })
  }

  const getHitPower = (): number => {
    if (!scaleMeter.value || !scaleMeter.value.parentElement) return 0
    const wrapperHeight = scaleMeter.value.parentElement.clientHeight
    const currentHeight = scaleMeter.value.clientHeight
    return parseFloat(((currentHeight / wrapperHeight) * 100).toFixed(2))
  }

  const initialScale = () => {
    if (!scaleMeter.value) return
    if (animation) animation.kill()
    scaleMeter.value.style.height = '0%'
    startFillAnimation()
  }

  const displayHitPower = (power: number) => {
    if (!scaleMeter.value) return
    if (animation) animation.kill()
    gsap.killTweensOf(scaleMeter.value)
    gsap.to(scaleMeter.value, {
      height: `${power}%`,
      duration: 0.4,
      ease: 'backOut(1.2)',
      onComplete: () => {
        if (scaleMeter.value) {
          gsap.to(scaleMeter.value, {
            backgroundColor: '#ffd700',
            duration: 0.2,
            yoyo: true,
            repeat: 1,
          })
        }
      },
    })
  }

  defineExpose({
    initialScale,
    displayHitPower,
    getHitPower,
  })

  onMounted(() => {
    if (scaleMeter.value) {
      scaleMeter.value.style.height = '0%'
    }
  })

  onBeforeUnmount(() => {
    if (animation) animation.kill()
    gsap.killTweensOf(scaleMeter.value)
  })
</script>

<template>
  <div class="control__scale">
    <img
      class="control__scale--image"
      src="@/assets/images/scale.png"
      alt="Шкала силы удара"
    />
    <div class="control__fill">
      <div class="control__indicator" ref="scaleMeter"></div>
    </div>
    <img
      class="control__scale-measure"
      src="@/assets/images/scale-1.png"
      alt="Мера силы удара"
    />
  </div>
</template>

<style scoped>
  .control__scale {
    position: relative;
    width: 48px;
    height: 147px;
    margin-left: 23px;
    margin-top: auto;
  }

  .control__scale--image {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .control__fill {
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 34px;
    height: 145px;
    z-index: 2;
  }

  .control__indicator {
    width: 100%;
    background-color: #00d355;
    position: absolute;
    bottom: 0;
    height: 0%;
    border-radius: 2px;
    box-shadow: 0 0 8px rgba(0, 211, 85, 0.6);
    transition: box-shadow 0.2s ease;
  }

  .control__indicator::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -20%;
    height: 4px;
    width: 48px;
    background: linear-gradient(90deg, #fff, #ffd700, #fff);
    border-radius: 2px;
    z-index: 1;
  }

  .control__scale-measure {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
  }
</style>
