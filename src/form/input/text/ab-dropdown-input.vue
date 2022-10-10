<template>
  <section class="ab-dropdown-input" :disabled="disabled">
    <input
      ref="input"
      class="input"
      :class="{
        mandatory: required ? 'mandatory' : '',
        error: error
      }"
      type="text"
      :name="name"
      :disabled="disabled"
      :value="computedValue"
      :placeholder="placeholder"
      :form="form"
      @keydown="handleKeyEvent"
      @input="handleInput"
      @focus="handleFocus"
      @click="handleFocus"
      @change="$emit('change')"
      @blur="handleLeave">
    <span class="bar"></span>
    <label class="label" :class="computedValue || placeholder ? 'active' : ''">{{ label }}</label>
    <div v-show="error" class="error-msg"><slot name="error-msg">{{ errorMessage }}</slot></div>
    <div v-show="showDropdown" ref="dropdown" class="dropdown">
      <ul>
        <li
          v-for="(option, idx) in filteredResults" :key="idx"
          :class="{ selected: idx === focus }">
          <label>
            <input
              v-model="selected"
              type="radio"
              :value="option.item[valueProperty] || option.item"
              :name="`d-${name}`"
              @click="selectItem(option)">
              <slot :option="option">
                <div class="label-ctn">{{ option.item[labelProperty] ? option.item[labelProperty] : option.item }}</div>
              </slot>
          </label>
        </li>
      </ul>
      <div v-if="create && !valueAlreayExist" class="footer-li"><label @click="handleCreate"><strong>"{{ inputValue }}"</strong> (créer)</label></div>
    </div>
  </section>
</template>

<script>
import Fuse from 'fuse.js';

export default {
  name: 'AbDropdownInput',
  props: {
    options: {
      type: Array,
      default: () => ([])
    },
    config: {
      type: Object,
      default: () => ({})
    },
    label: String,
    name: {
      type: String,
      default: ''
    },
    keys: Array,
    labelProperty: String,
    valueProperty: String,
    value: [ String, Number, Object ],
    disabled: Boolean,
    error: Boolean,
    required: Boolean,
    errorMessage: String,
    placeholder: String,
    create: {
      type: Boolean,
      default: true
    },
    form: String
  },
  data() {
    return {
      inputValue: '',
      edited: false,
      selected: this.value,
      focused: false,
      focus: null,
      createdItems: []
    };
  },
  computed: {
    computedValue() {
      if (!this.options.length) return this.inputValue;
      const selectedItem = this.options.find((option) => {
        if (this.isObject(option)) {
          return this.selected && option[this.valueProperty] === this.selected[this.valueProperty];
        }
        return option === this.selected;
      });
      // eslint-disable-next-line no-nested-ternary
      return selectedItem && !this.edited ? this.isObject(selectedItem) ? selectedItem[this.labelProperty] : selectedItem : this.inputValue;
    },
    filteredResults() {
      if (!this.fuse) return [];
      return this.inputValue ? this.fuse.search(this.inputValue) : [];
    },
    showDropdown() {
      if (this.focused && this.inputValue && this.inputValue.length >= 1) return true;
      return false;
    },
    valueAlreayExist() {
      const values = this.filteredResults.map(result => result.item[this.labelProperty] || String(result.item));
      const localValues = this.createdItems.map(result => result.item[this.labelProperty] || String(result.item));
      return values.includes(this.inputValue) || localValues.includes(this.inputValue);
    }
  },
  watch: {
    /**
     * When v-model is changed:
     *   1. Set internal value.
     */
    value(value) {
      this.selected = value;
    },
    options() {
      this.initFuse();
    }
  },
  created() {
    this.initFuse();
  },
  methods: {
    initFuse() {
      this.fuse = new Fuse(this.options, {
        matchAllTokens: true,
        findAllMatches: false,
        minMatchCharLength: 0,
        shouldSort: true,
        threshold: 0.1,
        ...this.config
      });
    },
    selectItem(option) {
      this.inputValue = option.item[this.labelProperty] || String(option.item);
      this.$emit('input', option.item);
      this.$refs.input.focus();
      this.edited = false;
      this.focused = false;
    },
    handleFocus() {
      this.focused = true;
      this.$emit('focus');
    },
    handleLeave() {
      this.$emit('blur');
      setTimeout(() => this.focused = false, 180);
    },
    handleInput(e) {
      if (!this.focused) this.focused = true;
      this.inputValue = e.target.value;
      this.edited = true;
      this.$emit('search', e.target.value);
    },
    handleCreate() {
      if (!this.valueAlreayExist && this.create) {
        // Need to put to false, or computedValue still returns inputValue
        this.edited = false;
        this.focused = false;
        this.$emit('create:new', this.inputValue);
        // if the options are object
        // option value is return as an object with the label property
        // Else the item is the string value
        const item = { ...(this.labelProperty ? { item: { [this.labelProperty]: this.inputValue } } : { item: this.inputValue }) };
        this.createdItems.push(item);
        this.selectItem(item);
      }
    },
    reset() {
      this.inputValue = '';
    },
    /**
     * Determine is the given value is an object or not
     * @param {*} value The value to be tested as an object
     * @see https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript/8511350#8511350
     */
    isObject(value) {
      if (value === null) return false;
      return ((typeof value === 'function') || (typeof value === 'object'));
    },
    handleKeyEvent(event) {
      // FIXME: default select current value
      if (!this.inputValue) return;
      const { dropdown } = this.$refs;
      const list = dropdown.querySelector('ul');
      const items = this.$refs.dropdown.querySelectorAll('li');

      switch (event.keyCode) {
        case 38:
          if (this.focus === null) {
            this.focus = 0;
          } else if (this.focus > -1) {
            this.focus = this.focus - 1;
          }
          break;
        case 40:
          if (this.focus === null) {
            this.focus = 0;
          } else if (this.focus < this.filteredResults.length - 1) {
            this.focus = this.focus + 1;
          }
          this.focused = true;
          break;
        case 13:
          if (this.filteredResults[this.focus]) {
            this.selectItem(this.filteredResults[this.focus]);
          } else {
            this.handleCreate();
          }
          break;
        default:
          break;
      }
      if (this.focus && items[this.focus]) {
        items[this.focus].scrollIntoView({ block: 'nearest', inline: 'start' });
      }
      if (this.focus === 0) {
        list.scrollTo({
          top: 0,
        });
      }
    }
  }
};
</script>

<style scoped>
  /* MD input */
  /* INPUT ------------------------------- */
  .ab-dropdown-input {
    position: relative;
    margin-top: 0.7rem;
    --ab-input-label-color: #4c515d;
    --ab-input-label-avtive-color: #148da0;
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

  .ab-dropdown-input.align-right input {
    text-align: right;
  }
  /* LABEL ======================================= */
  .ab-dropdown-input > label {
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
  .ab-dropdown-input[disabled] > label { color: var(--ab-input-disabled-label-color, #cecece); }
  .ab-dropdown-input.mandatory > label::after {
    display: inline-block;
    margin-left: 0.1rem;
    line-height: 1rem;
    font-size: 1rem;
    color: var(--ab-input-mandatory-color, #4c515d);
    content: '*';
    vertical-align: middle;
  }
  /* active state */
  .ab-dropdown-input.mandatory input:focus ~ label::after, .ab-dropdown-input.mandatory .active::after {
    color: var(--ab-input-mandatory-active-color, #E00202);
  }

  input:focus ~ label,
  input:valid ~ .ab-dropdown-input > label,
  .ab-dropdown-input .active {
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

  /* Dropdown */
  .dropdown {
    background-color: var(--ab-dropdown-input-bg-color, #ffffff);
    position: absolute;
    z-index: 30;
    box-shadow: 0 1px 1px rgba(0,0,0,0.2);
    border-radius: 0 0 5px 5px;
    min-width: 100%;
    width: 100%;
  }

  .dropdown ul {
    list-style: none;
    font-size: 1rem;
    margin: 0;
    padding: 1rem 0;
    width: 100%;
    max-height: 20rem;
    overflow-y: auto;
  }
  .dropdown ul li {
    display: block;
    color: var(--ab-dropdown-input-item-color, #148da0);
    font-weight: normal;
  }

  .dropdown ul li label,
  .footer-li label {
    display: block;
  }

  .dropdown ul li label .label-ctn,
  .footer-li label {
    display: block;
    padding: 0.3rem 1rem;
    cursor: pointer;
  }
  .dropdown ul li:hover,
  .footer-li:hover,
  .dropdown ul li.selected {
    background-color: var(--app-dropdown-input-footer-bg-color, #148da0);
    color: var(--app-dropdown-input-footer-color, #ffffff);
  }
  .footer-li {
    font-size: 1rem;
    font-weight: normal;
    margin-bottom: 0.4rem;
  }

  .dropdown input[type=radio] { display: none; }

  /* Error message */
  .error-msg {
    display: inline-block;
    font-weight: 500;
    color: #e00202;
    font-size: .875rem;
    margin-top: .5rem;
  }
</style>
