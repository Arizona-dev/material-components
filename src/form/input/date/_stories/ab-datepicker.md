## Vue.js implementation of :
https://github.com/charliekassel/vuejs-datepicker

| Custom property                            | Description                       | Default |
| ------------------------------------------ | --------------------------------- | ------- |
| **--select-text-color**                    | Default select text colors        | #4c515d |
| **--select-input-bar**                     | Input button bar color            | #EBEFF2 |
| **--datepicker-highlight-color**           | Default select highlight color    | #148da0 |
| **--select-mandatory-color**               | Mandatory marker color            | #f44336 |
| **--select-error-color**                   | Default select error color        | #f44336 |
| **--datepicker-selected-color**            | Default selected date color       | #ffffff |
| **--datepicker-selected-hover-background** | Default background color on hover | #148da0 |
| **--datepicker-selected-hover-color**      | Default color on hover            | #ffffff |

## Compute disabled dates :

```js
computed: {
  computedDisabledDateFrom() {
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
```
```html
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
```
