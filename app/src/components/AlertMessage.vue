<template>
  <div :class="`alert alert-${type}`" v-if="!!message">
    <p>{{ message }}</p>
    <button type="button" @click="$emit('clear', '')">X</button>
  </div>
</template>
<script>
export default {
  name: "AlertMessage",
  emits: ["clear"],
  props: {
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "error",
    },
  },
};
</script>
<style lang="scss">
.alert {
  position: relative;
  padding: 10px 16px;
  margin: 10px 0;
  font-size: 13px;

  button {
    display: block;
    position: absolute;
    right: 0;
    top: 5px;
    background: none;
    border: none;
    font-weight: bold;
    cursor: pointer;
  }

  p {
    margin: 0;
  }

  &.alert-error {
    background: #ffd7d7;
    color: #900;

    button {
      color: #900;
    }
  }

  &.alert-success {
    background: #d7ffd7;
    color: #060;

    button {
      color: #060;
    }
  }
}
</style>
