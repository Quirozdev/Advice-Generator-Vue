<template>
  <picture class="divider">
    <source
      media="(min-width: 500px)"
      srcset="../../../assets/images/pattern-divider-desktop.svg"
    />
    <img
      src="../../../assets/images/pattern-divider-mobile.svg"
      alt="Divider"
    />
  </picture>
</template>

<style scoped>
.divider {
  margin-bottom: 1rem;
}

.divider > * {
  display: block;
  max-width: 100%;
}
</style>
