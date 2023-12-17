<template>
  <div class="form-radio-group" :class="`${!!error ? 'has-error' : ''}`">
    <div class="row">
      <div class="col" v-for="(item, i) in items" :key="i">
        <label :for="`radio-group-${name}-${i}`">
          <input
            type="radio"
            :name="name"
            :value="item.value"
            @input="$emit('input', $event.target.value)"
            :checked="item.value === value"
          />
          <span>
            {{ item.label }}
          </span>
        </label>
      </div>
    </div>
    <div class="error" v-if="!!error">{{ error }}</div>
  </div>
</template>
<script>
export default {
  name: "FormRadio",
  emits: ["input"],
  props: {
    value: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="scss">
.form-radio-group {
  margin-bottom: 12px;

  label {
    font-size: 13px;
    display: flex;

    span {
      margin-top: 2px;
    }
  }

  &.has-error {
    label {
      color: #900;
    }

    input {
      border: 1px solid #900;
      color: #900;
      background: #ffd7d7;
    }
  }

  .error {
    color: #900;
    font-size: 11px;
  }
}
</style>