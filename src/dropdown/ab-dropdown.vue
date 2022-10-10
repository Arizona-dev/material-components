<template>
  <section class="ab-dropdown" :position="position">
    <div class="container" ref="dropdown">
      <div class="btn" @click="toggle">
        <slot name="button"/>
        <div class="menu" v-if="focus">
          <slot name="list"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'ab-dropdown',
    props: {
      actions: {
        type: Array,
        default: null
      },
      position: {
        type: String,
        default: 'left'
      }
    },
    data() {
      return {
        focus: false,
      }
    },
    methods: {
      toggle() {
        this.focus = !this.focus;
      },
      documentClick(e){
        let el = this.$refs.dropdown;
        let target = e.target;
        if ( el !== target && !el.contains(target)) {
          this.focus = false;
        }
      }
    },
    created () {
      document.addEventListener('click', this.documentClick);
    },
    destroyed () {
      document.removeEventListener('click', this.documentClick);
    },
  }
</script>

<style scoped>
  .ab-dropdown {
    display: inline-block;
  }
  .container {
    display: flex;
    cursor: pointer;
  }
  /* Button 'more' */
  .btn {
    position: relative;
    border: none;
    background: transparent;
  }

  /* menu */
  .menu {
    position: absolute;
    margin-top: 0.6rem;
    min-width: 9rem;
    top: 100%;
    z-index: 999;
  }
  .menu:focus { outline: none; }
  /* Arrow */
  .menu:after {
    position: absolute;
    content: " ";
    bottom: 100%;
    border: solid transparent;
    border-width: 0.5rem;
    border-color: rgba(136, 183, 213, 0);
    border-bottom-color: var(--app-arrow-color, #000000);
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.06);
    height: 0;
    width: 0;
    pointer-events: none;
  }
  [position="left"] .menu,
  [position="left"] .menu:after { left: 0; }
  [position="right"] .menu,
  [position="right"] .menu:after {right: 0; }

  /* List */
  .menu ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    font-family: var(--app-font-medium);
    background-color: var(--app-white-color, #ffffff);
    overflow: hidden;
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
  }
  [position="left"] .menu ul {
    border-radius: 0 8px 8px 8px;
  }
  [position="right"] .menu ul {
    border-radius: 8px 0 8px 8px;
  }
  .menu .item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.4rem;
    box-sizing: border-box;
    min-height: 24px;
  }
  .menu li {
    padding: 0.2rem;
  }
  .menu li:hover {
    background-color: var(--app-item-hover, #148da0);
    color: var(--app-white-color, #ffffff);
  }
  .menu li a {
    display: block;
    flex: 1;
    color: var(--app-drak-grey);
    text-decoration: none;
  }
</style>
<style>
  /* Override ab-icon default style for icons in popover */
  .menu .ab-icon {
    color: var(--app-primary-color);
    position: relative;
    width: 1rem;
    height: 1rem;
    margin: 0;
    margin-right: 0.4rem;
    top: -1px;
  }
</style>