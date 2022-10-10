<template>
  <datepicker
    v-model="selectedDate"
    ref="datepicker"
    class="ab-datepicker"
    :placeholder="placeholder"
    :monday-first="mondayFirst"
    :language="language"
    :inline="inline"
    :format="format"
    :full-month-name="fullMonthName"
    :disabled="disabled"
    :required="required"
    :typeable="typeable"
    :open-date="openDate"
    :disabled-dates="disabledDates"
    :minimum-view="minimumView"
    :maximum-view="maximumView"
    @selected="$emit('selected', $event)"
    @opened="$emit('opened', $event)"
    @closed="$emit('closed', $event)"
    @input="$emit('input', $event)">
    <div slot="beforeCalendarHeader" class="header">
      <span class="clear" @click="clearDate">{{ clearText }}</span>
    </div>
    <div slot="afterDateInput" class="effect">
      <label v-if="!placeholder" :class="selectedDate ? 'active' : ''">{{ label }}</label>
      <span class="bar"></span>
    </div>
  </datepicker>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
  name: 'AbDatepicker',
  components: {
    Datepicker
  },
  props: {
    disabled: Boolean,
    required: Boolean,
    typeable: Boolean,
    openDate: [ Date, String ],
    mondayFirst: {
      type: Boolean,
      default: true
    },
    language: {
      type: Object,
    },
    placeholder: String,
    clearText: {
      type: String,
      default: 'Clear'
    },
    label: {
      type: String,
      default: 'Date'
    },
    inline: Boolean,
    format: [ String, Function ],
    fullMonthName: Boolean,
    disabledDates: Object,
    value: {
      type: [ Date, String ]
    },
    form: String,
    minimumView: {
      type: String,
      default: 'day'
    },
    maximumView: {
      type: String,
      default: 'year'
    }
  },
  data() {
    return {
      selectedDate: this.value,
      innerForm: this.form
    };
  },
  watch: {
    value() {
      this.selectedDate = this.value;
    },
    form() {
      this.innerForm = this.form;
      const input = this.$el.querySelector('input');
      if (input) {
        input.setAttribute('form', this.innerForm);
      }
    }
  },
  mounted() {
    const input = this.$el.querySelector('input');
    if (input) {
      input.setAttribute('form', this.innerForm);
    }
  },
  methods: {
    showCalendar() {
      this.$refs.datepicker.showCalendar();
    },
    clearDate() {
      this.selectedDate = null;
      this.$emit('selected', null);
      this.$emit('input', null);
      this.$emit('cleared');
    },
  },
};
</script>

<style>
/* input */
.ab-datepicker {
  min-width: 3rem;
  width: 100%;
}
.ab-datepicker input {
  width: 100%;
  background-color: transparent;
  color: var(--select-text-color, #4c515d);
  border: none;
  border-bottom: 2px solid var(--select-input-bar, #EBEFF2);
  padding: 0 0 0 0.5rem;
  font-size: 0.9rem;
  min-height: 2rem;
}
.ab-datepicker input:focus {
  outline: none;
}
input:disabled, .ab-datepicker input:disabled::placeholder {
  color: var(--select-text-color, #4c515d);
}

.ab-datepicker .vdp-datepicker__calendar .cell.selected {
  background-color: var(--datepicker-highlight-color, #148da0);
  font-weight: 600;
}

/* Header */
.ab-datepicker .header {
  padding: 0.5rem;
  text-align: right;
}
.ab-datepicker .header .clear:hover {
  cursor: pointer;
  text-decoration: underline;
}

/* Effets */
.effect {
  position: relative;
}
/* Bottom bar */
.bar {
  position: relative;
  display: block;
  width: 100%;
}
.bar:before, .bar:after {
  background-color: var(--datepicker-highlight-color, #148da0);
  content: '';
  height: 2px;
  width: 0;
  bottom: 0;
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

/* Label */
.ab-datepicker label {
  color: var(--select-text-color, #4c515d);
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  top: -1.45rem;
  will-change: transform;

  transition: 0.2s ease all; 
  -moz-transition: 0.2s ease all; 
  -webkit-transition: 0.2s ease all;
  white-space: nowrap;
}

/* input:disabled ~ .material label { @apply text-gray-400 !important; } */
.ab-datepicker.mandatory .effect label::after {
  display: inline-block;
  margin-left: 0.1rem;
  line-height: 1rem;
  font-size: 1rem;
  color: var(--select-mandatory-color, #f44336);
  content: '*';
  vertical-align: middle;
}

input:focus ~ .effect label,
input:valid ~ .effect label,
.ab-datepicker .active {
  font-size: 0.75rem;
  color: var(--datepicker-highlight-color, #148da0);
  transform: translateY(-20px);
}
input:-webkit-autofill ~ .effect label {
  font-size: 0.75rem;
  @apply text-green;
  transform: translateY(-20px);
}
input:invalid ~ .effect label {
  font-size: 0.75rem;
  transform: translateY(-20px);
}


/* Mandatory highlight */
.ab-datepicker.mandatory input:focus ~ .effect label::after,
.ab-datepicker.mandatory input:valid ~ .effect label::after,
.ab-datepicker.mandatory label.active::after {
  color: var(--select-mandatory-color, #f44336);
}

/* active state */
.ab-datepicker input:focus ~ .effect .bar:before, .ab-datepicker input:focus ~ .effect .bar:after,
.ab-datepicker input:focus ~ .bar:before, .ab-datepicker input:focus ~ .bar:after {
  width: 50%;
}

/* active state */
.ab-datepicker input:focus ~ .highlight {
  -webkit-animation:inputHighlighter 0.3s ease;
  -moz-animation:inputHighlighter 0.3s ease;
  animation:inputHighlighter 0.3s ease;
}

/* Error state */
/* .error : input type text, input:invalid : input type email */
.error ~ .bar:before, .error ~ .bar:after,
input:invalid ~ .bar:before, input:invalid ~ .bar:after {
  width: 50%;
  background: var(--select-error-color, #f44336);
}

/* Cells */
.ab-datepicker .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover,
.ab-datepicker .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover,
.ab-datepicker .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
  border: 1px solid var(--datepicker-highlight-color, #148da0);
}
.ab-datepicker .vdp-datepicker__calendar .cell.selected {
  color: var(--datepicker-selected-color, #ffffff);
}
.ab-datepicker .vdp-datepicker__calendar .cell.selected:hover {
  background-color: var(--datepicker-selected-hover-background, #148da0);
  color: var(--datepicker-selected-hover-color, #ffffff);
}
</style>
