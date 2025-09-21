<template>
  <div class="content">
    <RouterView></RouterView>
  </div>
</template>

<script>
export default {
  name: "Content",
};
</script>

<style>
.content {
  grid-area: content;
  background-color: #efefef;
  padding: 20px;
}
</style>
