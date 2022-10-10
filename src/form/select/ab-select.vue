<template>
  <section class="ab-select" :disabled="disabled">
    <select
      v-model="computedValue"
      class="select-text"
      v-bind="$attrs"
      :disabled="disabled"
      :form="form"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)">
      <option value="" :disabled="!allowEmpty" selected
      ></option>
      <slot></slot>
    </select>
    <span class="select-highlight"></span>
    <span class="select-bar"></span>
    <label class="select-label" :class="{ 'active': selected.trim() }">{{ label }}</label>
  </section>
</template>

<script>
export default {
  name: 'AbSelect',
  props: {
    label: String,
    name: String,
    placeholder: String,
    value: {
      type: [ String, Number, Boolean, Object, Array, Function ],
      default: null
    },
    allowEmpty: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    error: Boolean,
    errorMessage: String,
    form: String
  },
  data() {
    return {
      selected: this.value,
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.selected;
      },
      set(value) {
        this.selected = value;
        this.$emit('input', value);
      }
    },
  },
  watch: {
    /**
    * When v-model is changed:
    *   1. Set the selected option.
    */
    value(value) {
      this.selected = value;
    }
  }
};
</script>

<style scoped>
  .ab-select {
    position: relative;
    width: 100%;
  }

  .select-text {
    position: relative;
    font-family: inherit;
    background-color: transparent;
    padding: 10px 0 10px 0;
    width: 100%;
    font-size: 1.2rem;
    border-radius: 0;
    border: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.12);
    cursor: pointer;
  }

  option {
    cursor: pointer;
  }

  /* Remove focus */
  .select-text:focus {
    outline: none;
    border-bottom: 1px solid rgba(0, 0 , 0, 0);
  }

    /* Use custom arrow */
  .ab-select .select-text {
    appearance: none;
    -webkit-appearance:none
  }

  .ab-select:after {
    position: absolute;
    top: 18px;
    right: 10px;
    /* Styling the down arrow */
    width: 0;
    height: 0;
    padding: 0;
    content: '';
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid rgba(0, 0, 0, 0.12);
    pointer-events: none;
  }


  /* LABEL ======================================= */
  .select-label {
    color: var(--app-dark-grey, #4c515d);

    font-weight: normal;
    position: absolute;
    pointer-events: none;
    top: 8px;
    will-change: transform;

    transition: 0.2s ease all; 
    -moz-transition: 0.2s ease all; 
    -webkit-transition: 0.2s ease all;
    white-space: nowrap;
  }

  /* active state */
  .select-label.active,
  .select-text:focus ~ .select-label {
    font-size: 10px;
    color: var(--app-primary-color, #148da0);
    transform: translateY(-20px);
  }
  /* Error */
  .select-text:invalid ~ .select-label {
    color: red;
  }

  .ab-select[disabled] label { color: #cecece; }
  .ab-select.mandatory label::after {
    display: inline-block;
    margin-left: 0.1rem;
    line-height: 1rem;
    font-size: 1rem;
    color: var(--app-dark-grey, #4c515d);
    content: '*';
    vertical-align: middle;
  }
  /* active state */
  .ab-select.mandatory select:focus ~ label::after, .ab-select.mandatory .active::after {
    color: var(--app-red-color, #E00202);
  }

  /* BOTTOM BARS ================================= */
  .select-bar {
    position: relative;
    display: block;
    width: 100%;
  }

  .select-bar:before, .select-bar:after {
    background: var(--app-primary-color, #148da0);

    content: '';
    height: 2px;
    width: 0;
    bottom: 0px;
    position: absolute;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }
  .select-bar:before {
    left: 50%;
  }
  .select-bar:after {
    right: 50%;
  }
  /* active state */
  .select-text:focus ~ .select-bar:before, .select-text:focus ~ .select-bar:after {
    width: 50%;
  }

  /* HIGHLIGHTER ================================== */
  .select-highlight {
    position: absolute;
    height: 60%;
    width: 100px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
  }
</style>