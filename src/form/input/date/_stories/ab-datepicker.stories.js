// eslint-disable-next-line no-unused-vars
import Vue from 'vue';
import { storiesOf } from '@storybook/vue';

// Import locals
import { fr } from 'vuejs-datepicker/dist/locale';

// Import component
import AbDatepicker from '../ab-datepicker.vue';

// Import doc
import doc from './ab-datepicker.md';

// Synthax coloration
const html = strings => strings.raw[0];

storiesOf('Material Components|Form/Input/Date/ab-datepicker', module)
  .add('ab-datepicker simple', () => ({
    components: { AbDatepicker },
    data() {
      return {
        selectedDate: new Date(),
        fr
      };
    },
    template: html`
      <section>
        <ab-datepicker
          v-model="selectedDate"
          label="Chose a date"
          :fullMonthName="true"
          :language="fr"
        >
        </ab-datepicker>
        <br>
        <p>Selected date : {{ selectedDate }}</p>
      </section>
    `
  }), { info: { summary: doc } })
  .add('ab-datepicker range', () => ({
    components: { AbDatepicker },
    data() {
      return {
        from: null,
        to: null,
        fr
      };
    },
    computed: {
      computedDisabledDateFrom() {
        console.log(this.to);
        if (!this.to) return {};
        return {
          from: new Date(this.to)
        };
      },
      computedDisabledDateTo() {
        const epoch = 8640000;
        return {
          to: new Date(new Date(this.from).getTime() - epoch)
        };
      },
    },
    template: html`
      <section>
        <main style="display: flex; align-items: center;">
          <ab-datepicker
            v-model="from"
            label="From"
            :fullMonthName="true"
            :language="fr"
            :disabled-dates="computedDisabledDateFrom"
          >
          </ab-datepicker>
          <span style="padding: 0 1rem;">à</span>
          <ab-datepicker
            v-model="to"
            label="To"
            :fullMonthName="true"
            :language="fr"
            :disabled-dates="computedDisabledDateTo"
          >
          </ab-datepicker>
        </main>
        <br>
        <p>From : {{ from }}</p>
        <p>To : {{ to }}</p>
      </section>
    `
  }), { info: { summary: doc } });
