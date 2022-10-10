<template>
  <section
    class="ab-input"
    :class="{
      mandatory: required ? 'mandatory' : '',
      passwordReveal: passwordReveal ? 'password-reveal' : '',
      error: error
    }"
    :disabled="disabled">
    <input
      ref="input"
      :type="type"
      :step="step"
      :name="name"
      :placeholder="placeholder"
      :value="computedValue"
      :disabled="disabled"
      :form="form"
      :maxlength="maxlength"
      :minlength="minlength"
      :min="min"
      :max="max"
      :readonly="readonly"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      @input="$emit('input', $event.target.value)">
    <span class="bar"></span>
    <label :class="activeClass">{{ label }}</label>
    <div v-show="error" class="error-msg"><slot name="error-msg">{{ errorMessage }}</slot></div>
    <span v-if="passwordReveal" class="icon-button"><button type="button" @click="handleClick"><ab-icon :icon="icon" :iconset="iconset"></ab-icon></button></span>
  </section>
</template>

<script>
import AbIcon from '../../../icon/ab-icon.vue';

export default {
  name: 'AbInput',
  components: {
    AbIcon
  },
  props: {
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    step: {
      type: [ String, Number ],
      default: '0.0000001'
    },
    name: String,
    placeholder: String,
    value: [ String, Number ],
    disabled: Boolean,
    error: Boolean,
    errorMessage: String,
    passwordReveal: Boolean,
    iconset: String,
    required: Boolean,
    readonly: Boolean,
    form: String,
    maxlength: String,
    minlength: String,
    min: Number,
    max: Number
  },
  data() {
    return {
      inputValue: this.value,
      icon: 'eye-close',
    };
  },
  computed: {
    computedValue() {
      return this.inputValue;
    },
    activeClass() {
      return (this.inputValue !== undefined && this.inputValue !== null && this.inputValue.toString().trim().length > 0) ? 'active' : '';
    }
  },
  watch: {
    /**
     * When v-model is changed:
     *   1. Set internal value.
     */
    value(value) {
      this.inputValue = value;
    }
  },
  methods: {
    handleClick() {
      if (this.type === 'password') {
        this.$refs.input.type = this.$refs.input.type === 'password' ? 'text' : 'password';
        this.icon = this.icon === 'eye-close' ? 'eye' : 'eye-close';
        // Focusing back the input after changing the type
        this.$el.querySelector('input').focus();
      }
    }
  }
};
</script>

<style scoped>
  /* MD input */
  /* INPUT ------------------------------- */
  .ab-input {
    position: relative;
    margin-top: 0.7rem;
  }
  input {
    color: var(--ab-input-color, #4c515d);
    border: none;
    border-bottom: 2px solid var(--ab-input-bar, #EBEFF2);
    font-size: 1.2rem;
    font-family: inherit;
    padding: 3px 0;
    display: block;
    width: 100%;
    background: transparent;
    box-sizing: border-box;
    text-align: inherit;
  }
  input:focus { outline:none; }
  input:disabled {
    color: var(--ab-input-disabled-color, #cecece);
  }
  .ab-input[disabled] label { color: var(--ab-input-disabled-label-color, #cecece); }
  /* Hide input number arrows */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type=number] {
    -moz-appearance:textfield; /* Firefox */
  }

  .ab-input.align-right input {
    text-align: right;
  }
  /* LABEL ======================================= */
  .ab-input label {
    color: var(--ab-input-label-color, #4c515d);

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
  .ab-input.mandatory label::after {
    display: inline-block;
    margin-left: 0.1rem;
    line-height: 1rem;
    font-size: 1rem;
    color: var(--ab-input-mandatory-color, #4c515d);
    content: '*';
    vertical-align: middle;
  }
  /* active state */
  .ab-input.mandatory input:focus ~ label::after, .ab-input.mandatory .active::after {
    color: var(--ab-input-mandatory-active-color, #E00202);
  }

  input:focus ~ label,
  input:valid ~ .ab-input label,
  .ab-input .active {
    font-size: 10px;
    color: var(--ab-input-label-avtive-color, #148da0);
    transform: translateY(-20px);
  }
  input:-webkit-autofill ~ label {
    font-size: 10px;
    color: var(--ab-input-label-avtive-color, #148da0);
    transform: translateY(-20px);
  }
  input:invalid ~ label {
    font-size: 10px;
    transform: translateY(-20px);
  }
  /* BOTTOM BARS ================================= */
  .bar {
    position: relative;
    display: block;
    width: 100%;
  }
  .bar:before, .bar:after {
    background: var(--ab-input-bar-color, #148da0);

    content: '';
    height: 2px;
    width: 0;
    bottom: 0px;
    position: absolute;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }
  .bar:before {
    left: 50%;
  }
  .bar:after {
    right: 50%;
  }
  /* active state */
  input:focus ~ .bar:before, input:focus ~ .bar:after {
    width: 50%;
  }

  /* active state */
  input:focus ~ .highlight {
    -webkit-animation:inputHighlighter 0.3s ease;
    -moz-animation:inputHighlighter 0.3s ease;
    animation:inputHighlighter 0.3s ease;
  }
  /* MD input */

  /* Error state */
  /* .error : input type text, input:invalid : input type email */
  .error input ~ .bar:before, .error input ~ .bar:after,
  .error ~ .bar:before, .error ~ .bar:after,
  input:invalid ~ .bar:before, input:invalid ~ .bar:after {
    width: 50%;
    background: var(--ab-input-mandatory-active-color, #E00202);
  }


  /* Icon-button */
  .icon-button {
    position: absolute;  
    display: inline-block;
    top: 0;
    right: 0;
  }
  .icon-button button {
    background: transparent;
    border: none;
    display: inline-block;
    cursor: pointer;
  }
  .icon-button button:focus { outline: none; }
  .ab-icon { color: var(--app-blue-two); }
  .password-reveal input { padding-right: 3em; }

  /* Error message */
  .error-msg {
    display: inline-block;
    font-weight: 500;
    color: var(--ab-input-error-msg-color,#e00202);
    font-size: .875rem;
    margin-top: .5rem;
  }
</style>
